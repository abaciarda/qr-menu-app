"use client";

import { motion, Variants } from "framer-motion";
import React from "react";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.03,
            delayChildren: 0.05,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            type: "tween",
            ease: "easeOut",
            duration: 0.2,
        },
    },
};

export default function ContentAnimation({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
        >
            {React.Children.map(children, (child) => (
                <motion.div variants={itemVariants} style={{ willChange: "transform, opacity" }}>
                    {child}
                </motion.div>
            ))}
        </motion.div>
    );
}