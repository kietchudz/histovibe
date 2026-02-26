'use client';

import { motion } from 'framer-motion';

interface GlowingOrbProps {
    color: 'pink' | 'blue' | 'purple' | 'green';
    size?: 'sm' | 'md' | 'lg';
    position: { top?: string; left?: string; right?: string; bottom?: string };
    delay?: number;
}

const colorMap = {
    pink: {
        bg: 'bg-neon-pink/30',
        shadow: 'shadow-[0_0_60px_30px_rgba(255,46,151,0.4)]',
    },
    blue: {
        bg: 'bg-neon-blue/30',
        shadow: 'shadow-[0_0_60px_30px_rgba(0,212,255,0.4)]',
    },
    purple: {
        bg: 'bg-neon-purple/30',
        shadow: 'shadow-[0_0_60px_30px_rgba(168,85,247,0.4)]',
    },
    green: {
        bg: 'bg-neon-green/30',
        shadow: 'shadow-[0_0_60px_30px_rgba(57,255,20,0.4)]',
    },
};

const sizeMap = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-72 h-72',
};

export default function GlowingOrb({ color, size = 'md', position, delay = 0 }: GlowingOrbProps) {
    const { bg, shadow } = colorMap[color];
    const sizeClass = sizeMap[size];

    return (
        <motion.div
            className={`absolute rounded-full blur-3xl ${bg} ${shadow} ${sizeClass}`}
            style={{ ...position }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.2, 1],
                x: [0, 20, -10, 0],
                y: [0, -15, 10, 0],
            }}
            transition={{
                duration: 8,
                repeat: Infinity,
                delay,
                ease: 'easeInOut',
            }}
        />
    );
}
