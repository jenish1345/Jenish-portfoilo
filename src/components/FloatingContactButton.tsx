import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle } from "lucide-react";

const FloatingContactButton = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [300, 400], [0, 1]);
  const scale = useTransform(scrollY, [300, 400], [0.8, 1]);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.button
      onClick={scrollToContact}
      style={{ opacity, scale }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-black text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-black/80 transition-colors"
    >
      <MessageCircle className="w-6 h-6" />
    </motion.button>
  );
};

export default FloatingContactButton;
