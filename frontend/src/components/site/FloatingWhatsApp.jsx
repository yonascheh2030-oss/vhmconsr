import { MessageCircle } from "lucide-react";
import { SITE } from "@/constants/betodecor";

export const FloatingWhatsApp = () => (
  <a
    href={SITE.whatsapp}
    target="_blank"
    rel="noopener noreferrer"
    data-testid="floating-whatsapp"
    aria-label="WhatsApp"
    className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(0,0,0,0.2)] hover:scale-105 transition-transform"
  >
    <MessageCircle className="w-7 h-7" />
  </a>
);
