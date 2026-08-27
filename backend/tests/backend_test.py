"""BetoDecor backend API tests (leads, scoring, upload, auth, admin, files)."""
import io
import os
import re
import struct
import zlib
from pathlib import Path

import pytest
import requests
from dotenv import dotenv_values

frontend_env = dotenv_values("/app/frontend/.env")
base_url = os.environ.get("REACT_APP_BACKEND_URL") or frontend_env.get("REACT_APP_BACKEND_URL")
if not base_url:
    raise RuntimeError("REACT_APP_BACKEND_URL missing")
BASE_URL = base_url.rstrip("/")
API = f"{BASE_URL}/api"


def _png_bytes():
    def chunk(t, d):
        c = t + d
        return struct.pack(">I", len(d)) + c + struct.pack(">I", zlib.crc32(c) & 0xFFFFFFFF)
    ihdr = struct.pack(">IIBBBBB", 1, 1, 8, 2, 0, 0, 0)
    idat = zlib.compress(b"\x00\xff\x00\x00")
    return b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", ihdr) + chunk(b"IDAT", idat) + chunk(b"IEND", b"")


@pytest.fixture(scope="session")
def api_client():
    s = requests.Session()
    return s


@pytest.fixture(scope="session")
def test_credentials():
    p = Path("/app/memory/test_credentials.md")
    if not p.exists():
        pytest.skip("missing test_credentials.md")
    c = p.read_text()
    e = re.search(r'(?im)^\s*[-*]?\s*(?:\*\*)?Email(?:\*\*)?\s*:\s*`?([^`\s]+)', c)
    pw = re.search(r'(?im)^\s*[-*]?\s*(?:\*\*)?Password(?:\*\*)?\s*:\s*`?([^`\s]+)', c)
    if not e or not pw:
        pytest.skip("no creds found")
    return {"email": e.group(1), "password": pw.group(1)}


@pytest.fixture(scope="session")
def auth_token(api_client, test_credentials):
    r = api_client.post(f"{API}/auth/login", json=test_credentials)
    if r.status_code != 200:
        pytest.fail(f"login failed {r.status_code}: {r.text[:300]}")
    t = r.json().get("token")
    assert t
    return t


@pytest.fixture(scope="session")
def auth_headers(auth_token):
    return {"Authorization": f"Bearer {auth_token}"}


# ---------------- Health ----------------
class TestHealth:
    def test_root(self, api_client):
        r = api_client.get(f"{API}/")
        assert r.status_code == 200
        assert r.json()["status"] == "online"


# ---------------- Leads + scoring ----------------
def big_lead(gemeente="Zaventem", postcode="1930", files=None):
    return {
        "project_types": ["woning"],
        "oppervlakte": 210, "verdiepingen": 2, "kamers": 8, "bouwjaar": 1968,
        "bewoond": "leeg", "renovatie_type": "volledig",
        "works": ["sloopwerken", "elektriciteit", "sanitair", "vloeren", "pleisterwerk", "keuken", "badkamer", "schilderwerk"],
        "beschrijving": "Volledige renovatie van een woning van 210m2 met alle technieken en afwerking.",
        "budget": "150-250k", "starttermijn": "1m", "heeft_deadline": False,
        "straat": "Konijnenstraat", "huisnummer": "16", "postcode": postcode,
        "gemeente": gemeente, "land": "België",
        "files": files or [],
        "voornaam": "TEST", "achternaam": "Renovatie", "telefoon": "0470123456",
        "email": "test.reno@example.com", "lang": "nl",
    }


class TestLeads:
    created = []

    def test_hot_lead_zaventem(self, api_client, auth_headers):
        r = api_client.post(f"{API}/leads", json=big_lead())
        assert r.status_code == 201, r.text
        d = r.json()
        assert d["category"] == "hot", d
        assert d["score"] >= 90, d
        TestLeads.created.append(d["id"])
        # verify persistence
        g = api_client.get(f"{API}/admin/leads/{d['id']}", headers=auth_headers)
        assert g.status_code == 200
        lead = g.json()
        assert "_id" not in lead
        assert lead["gemeente"] == "Zaventem"
        assert lead["status"] == "nieuw"
        assert lead["score"] == d["score"]
        assert lead["geschatte_waarde"] == 200000
        assert lead["score_breakdown"]["location_class"] == "core"

    def test_outside_area_capped(self, api_client):
        r = api_client.post(f"{API}/leads", json=big_lead("Oostende", "8400"))
        assert r.status_code == 201, r.text
        d = r.json()
        TestLeads.created.append(d["id"])
        assert d["score"] <= 75, d
        assert d["category"] != "hot", d

    def test_small_keuken_lead_low_or_normal(self, api_client):
        p = big_lead()
        p.update({
            "project_types": ["keuken"], "renovatie_type": "gedeeltelijk",
            "oppervlakte": 12, "works": ["keuken"], "budget": "10-25k",
            "starttermijn": "3-6m", "beschrijving": "Kleine keuken",
        })
        r = api_client.post(f"{API}/leads", json=p)
        assert r.status_code == 201, r.text
        d = r.json()
        TestLeads.created.append(d["id"])
        assert d["category"] in ("low", "normal"), d

    def test_missing_project_type(self, api_client):
        p = big_lead()
        p["project_types"] = []
        r = api_client.post(f"{API}/leads", json=p)
        assert r.status_code == 422

    def test_invalid_email(self, api_client):
        p = big_lead()
        p["email"] = "not-an-email"
        r = api_client.post(f"{API}/leads", json=p)
        assert r.status_code == 422


# ---------------- Upload ----------------
class TestUpload:
    ref = {}

    def test_upload_png(self, api_client):
        r = api_client.post(f"{API}/upload", files={"file": ("t.png", io.BytesIO(_png_bytes()), "image/png")})
        assert r.status_code == 200, r.text
        d = r.json()
        for k in ("id", "storage_path", "original_filename", "content_type", "size"):
            assert k in d, d
        assert d["original_filename"] == "t.png"
        assert d["size"] > 0
        TestUpload.ref = d

    def test_upload_disallowed_type(self, api_client):
        r = api_client.post(f"{API}/upload", files={"file": ("t.txt", io.BytesIO(b"hello"), "text/plain")})
        assert r.status_code == 400

    def test_upload_empty(self, api_client):
        r = api_client.post(f"{API}/upload", files={"file": ("t.png", io.BytesIO(b""), "image/png")})
        assert r.status_code == 400


# ---------------- Files (protected) ----------------
class TestFiles:
    def test_file_served_with_token(self, api_client, auth_token, auth_headers):
        up = api_client.post(f"{API}/upload", files={"file": ("f.png", io.BytesIO(_png_bytes()), "image/png")})
        assert up.status_code == 200
        ref = up.json()
        lead = big_lead(files=[ref])
        cr = api_client.post(f"{API}/leads", json=lead)
        assert cr.status_code == 201
        TestLeads.created.append(cr.json()["id"])
        path = ref["storage_path"]
        no_auth = requests.get(f"{API}/files/{path}")
        assert no_auth.status_code == 401, no_auth.status_code
        ok = requests.get(f"{API}/files/{path}", params={"token": auth_token})
        assert ok.status_code == 200, ok.text[:200]
        assert ok.content[:8] == b"\x89PNG\r\n\x1a\n"


# ---------------- Auth ----------------
class TestAuth:
    def test_login_success(self, api_client, test_credentials):
        r = api_client.post(f"{API}/auth/login", json=test_credentials)
        assert r.status_code == 200
        d = r.json()
        assert isinstance(d.get("token"), str) and len(d["token"]) > 20
        assert d["user"]["email"] == test_credentials["email"]
        assert d["user"]["role"] == "admin"

    def test_login_invalid_password(self, test_credentials):
        r = requests.post(f"{API}/auth/login", json={"email": test_credentials["email"], "password": "WrongPass123"})
        assert r.status_code in (401, 429), r.status_code

    def test_me(self, api_client, auth_headers, test_credentials):
        r = api_client.get(f"{API}/auth/me", headers=auth_headers)
        assert r.status_code == 200
        assert r.json()["email"] == test_credentials["email"]

    def test_me_bad_token(self):
        r = requests.get(f"{API}/auth/me", headers={"Authorization": "Bearer garbage"})
        assert r.status_code == 401

    def test_admin_endpoints_require_auth(self):
        for ep in ("/admin/stats", "/admin/leads"):
            r = requests.get(f"{API}{ep}")
            assert r.status_code == 401, f"{ep} -> {r.status_code}"

    def test_bcrypt_hash_format(self):
        import asyncio
        from motor.motor_asyncio import AsyncIOMotorClient
        from dotenv import dotenv_values as dv
        env = dv("/app/backend/.env")

        async def check():
            c = AsyncIOMotorClient(env["MONGO_URL"])
            u = await c[env["DB_NAME"]].users.find_one({})
            c.close()
            return u
        u = asyncio.get_event_loop().run_until_complete(check()) if False else asyncio.run(check())
        assert u is not None
        assert u["password_hash"].startswith("$2b$"), u["password_hash"][:10]


# ---------------- Admin ----------------
class TestAdmin:
    def test_stats(self, api_client, auth_headers):
        r = api_client.get(f"{API}/admin/stats", headers=auth_headers)
        assert r.status_code == 200
        d = r.json()
        for k in ("total", "new", "by_category", "by_status", "total_value", "per_gemeente", "per_type"):
            assert k in d
        assert d["total"] >= 8
        assert d["total_value"] > 0

    def test_leads_sorted_desc(self, api_client, auth_headers):
        r = api_client.get(f"{API}/admin/leads", headers=auth_headers)
        assert r.status_code == 200
        leads = r.json()
        assert len(leads) >= 8
        scores = [l["score"] for l in leads]
        assert scores == sorted(scores, reverse=True), scores
        assert all("_id" not in l for l in leads)

    def test_filter_category_hot(self, api_client, auth_headers):
        r = api_client.get(f"{API}/admin/leads", headers=auth_headers, params={"category": "hot"})
        assert r.status_code == 200
        assert len(r.json()) > 0
        assert all(l["category"] == "hot" for l in r.json())

    def test_filter_status(self, api_client, auth_headers):
        r = api_client.get(f"{API}/admin/leads", headers=auth_headers, params={"status": "nieuw"})
        assert r.status_code == 200
        assert all(l["status"] == "nieuw" for l in r.json())

    def test_filter_q(self, api_client, auth_headers):
        cr = api_client.post(f"{API}/leads", json=big_lead())
        assert cr.status_code == 201
        TestLeads.created.append(cr.json()["id"])
        r = api_client.get(f"{API}/admin/leads", headers=auth_headers, params={"q": "TEST"})
        assert r.status_code == 200
        res = r.json()
        assert len(res) > 0
        assert all("test" in (l["voornaam"] + l["achternaam"] + l["email"] + (l.get("gemeente") or "")).lower() for l in res)

    def test_status_update_persists(self, api_client, auth_headers):
        cr = api_client.post(f"{API}/leads", json=big_lead())
        lid = cr.json()["id"]
        TestLeads.created.append(lid)
        r = api_client.patch(f"{API}/admin/leads/{lid}/status", headers=auth_headers, json={"status": "bezocht"})
        assert r.status_code == 200
        assert r.json()["status"] == "bezocht"
        g = api_client.get(f"{API}/admin/leads/{lid}", headers=auth_headers)
        assert g.json()["status"] == "bezocht"

    def test_status_invalid(self, api_client, auth_headers):
        cr = api_client.post(f"{API}/leads", json=big_lead())
        lid = cr.json()["id"]
        TestLeads.created.append(lid)
        r = api_client.patch(f"{API}/admin/leads/{lid}/status", headers=auth_headers, json={"status": "bogus"})
        assert r.status_code == 400

    def test_lead_not_found(self, api_client, auth_headers):
        r = api_client.get(f"{API}/admin/leads/does-not-exist", headers=auth_headers)
        assert r.status_code == 404


# ---------------- Cleanup ----------------
@pytest.fixture(scope="session", autouse=True)
def cleanup():
    yield
    import asyncio
    from motor.motor_asyncio import AsyncIOMotorClient
    from dotenv import dotenv_values as dv
    env = dv("/app/backend/.env")

    async def rm():
        c = AsyncIOMotorClient(env["MONGO_URL"])
        await c[env["DB_NAME"]].leads.delete_many({"voornaam": "TEST"})
        c.close()
    asyncio.run(rm())
