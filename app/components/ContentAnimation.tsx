"use client";

import { motion, Variants } from "framer-motion";
import React from "react";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.04,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            type: "tween",
            ease: "easeOut",
            duration: 0.25,
        },
    },
};

export default function ContentAnimation({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 xl:grid-cols-3 gap-4"
        >
            {React.Children.map(children, (child) => (
                <motion.div variants={itemVariants}>
                    {child}
                </motion.div>
            ))}
        </motion.div>
    );
}