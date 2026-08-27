import { createContext, useContext, useEffect, useState } from "react";
import { api, setToken, clearToken, getToken, authHeaders } from "@/lib/api";

const AuthCtx = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null = checking, false = unauthenticated, object = authenticated

  useEffect(() => {
    (async () => {
      const t = getToken();
      if (!t) {
        setUser(false);
        return;
      }
      try {
        const { data } = await api.get("/auth/me", { headers: authHeaders() });
        setUser(data);
      } catch {
        clearToken();
        setUser(false);
      }
    })();
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    clearToken();
    setUser(false);
  };

  return <AuthCtx.Provider value={{ user, login, logout }}>{children}</AuthCtx.Provider>;
};

export const useAuth = () => useContext(AuthCtx);
