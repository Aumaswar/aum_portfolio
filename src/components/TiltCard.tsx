import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className = "" }) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth out the motion values
    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 40 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 40 });

    // Rotate card between -15 and 15 degrees based on mouse position
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    // Glare effect positioning based on cursor
    const glareX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
    const glareY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);
    const glareOpacity = useTransform(x, [-0.5, 0, 0.5], [0.3, 0, 0.3]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();

        // Normalized position from -0.5 to 0.5
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={`relative w-full h-full perspective-1000 ${className}`}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
            <div
                className="w-full h-full relative"
                style={{ transform: "translateZ(30px)" }} // Elevate content for 3D depth
            >
                {children}
            </div>

            {/* Glare effect */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-20 rounded-xl mix-blend-overlay"
                style={{
                    background: "radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, transparent 60%)",
                    left: glareX,
                    top: glareY,
                    opacity: glareOpacity,
                    transform: "translate(-50%, -50%)",
                    width: "200%",
                    height: "200%"
                }}
            />
        </motion.div>
    );
};

export default TiltCard;
