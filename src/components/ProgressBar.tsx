'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
    total: number;
    current: number;
    isAnimating?: boolean;
}

export default function ProgressBar({ total, current, isAnimating = false }: ProgressBarProps) {
    return (
        <div className="flex gap-1 px-2 py-3">
            {Array.from({ length: total }).map((_, index) => (
                <div key={index} className="h-1 flex-1 rounded-full bg-white/20 overflow-hidden">
                    {index < current ? (
                        <div className="h-full w-full bg-gradient-to-r from-neon-pink to-neon-purple" />
                    ) : index === current ? (
                        <motion.div
                            className="h-full bg-gradient-to-r from-neon-pink to-neon-purple"
                            initial={{ width: '0%' }}
                            animate={{ width: isAnimating ? '100%' : '0%' }}
                            transition={{ duration: 5, ease: 'linear' }}
                        />
                    ) : null}
                </div>
            ))}
        </div>
    );
}
