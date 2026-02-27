import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface TextRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const TextReveal = ({ children, delay = 0, className = "" }: TextRevealProps) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.33, 1, 0.68, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export const ScrollTextReveal = ({ children, delay = 0, className = "" }: TextRevealProps) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.33, 1, 0.68, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default TextReveal;
