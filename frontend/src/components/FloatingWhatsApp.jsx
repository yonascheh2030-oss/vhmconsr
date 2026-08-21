import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { SITE } from "../constants/site";

export const FloatingWhatsApp = () => (
  <motion.a
    href={SITE.whatsapp}
    target="_blank"
    rel="noopener noreferrer"
    data-testid="whatsapp-float"
    aria-label="WhatsApp Sanivolt"
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 2, type: "spring", stiffness: 260, damping: 18 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-xl"
  >
    <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring" />
    <MessageCircle className="relative w-7 h-7 text-white" />
  </motion.a>
);
