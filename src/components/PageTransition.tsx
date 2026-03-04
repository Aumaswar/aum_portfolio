import { motion } from "framer-motion";
import React from "react";

const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
        filter: "blur(4px)",
    },
    in: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
    },
    out: {
        opacity: 0,
        y: -20,
        filter: "blur(4px)",
    },
};

const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.6,
} as const;

const PageTransition = ({ children }: { children: React.ReactNode }) => {
    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="w-full h-full"
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
