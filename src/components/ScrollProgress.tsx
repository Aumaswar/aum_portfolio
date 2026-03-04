import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { createPortal } from "react-dom";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const element = (
    <motion.div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: "linear-gradient(90deg, hsl(75 80% 60%), hsl(75 80% 75%))",
        transformOrigin: "left",
        zIndex: 2147483647,
        pointerEvents: "none",
        scaleX: scrollYProgress,
      }}
    />
  );

  return createPortal(element, document.body);
};

export default ScrollProgress;
