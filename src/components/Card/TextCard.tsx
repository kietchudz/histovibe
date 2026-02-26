'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import type { Card } from '@/types/lesson';
import MascotSVG from '../MascotSVG';

export default function TextCard({ card }: { card: Card }) {
    return (
        <motion.div
            className="h-full w-full relative flex flex-col justify-center items-center px-4 py-2 pointer-events-none"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            {/* Floating decorative elements */}
            <motion.div
                className="absolute top-20 left-10 w-20 h-20 rounded-full bg-gradient-to-r from-neon-pink/20 to-neon-purple/20 blur-2xl pointer-events-none"
                animate={{
                    x: [0, 20, 0],
                    y: [0, -15, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-32 right-10 w-24 h-24 rounded-full bg-gradient-to-r from-neon-blue/20 to-neon-green/20 blur-2xl pointer-events-none"
                animate={{
                    x: [0, -20, 0],
                    y: [0, 15, 0],
                    scale: [1, 1.2, 1]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />

            {/* Main card content - scrollable */}
            <motion.div
                className="relative glass-strong rounded-2xl p-4 max-w-md w-full border border-white/10 overflow-hidden max-h-[70vh] flex flex-col pointer-events-auto"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
            >
                {/* Top gradient line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue" />

                {/* Shimmer effect */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 pointer-events-none"
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                />

                {/* Scrollable content area */}
                <div className="overflow-y-auto flex-1 pr-1 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                    {/* Content - smaller text for better fit */}
                    <p className="relative text-base md:text-lg font-medium leading-relaxed text-white whitespace-pre-line text-center">
                        {card.content}
                    </p>

                    {/* Note section */}
                    {card.note && (
                        <motion.div
                            className="mt-4 pt-3 border-t border-white/10"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <p className="text-xs text-neon-blue/90 italic flex items-start gap-2 justify-center">
                                <span className="text-base">💡</span>
                                <span>{card.note}</span>
                            </p>
                        </motion.div>
                    )}

                    {card.url && (
                        <motion.div
                            className="mt-3 pt-2 flex justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <a href={card.url} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs text-neon-blue hover:text-neon-pink transition-colors pointer-events-auto">
                                <span>🔗</span>
                                <span className="underline underline-offset-2">Tìm hiểu thêm</span>
                            </a>
                        </motion.div>
                    )}
                </div>
            </motion.div>

            {/* Mascot Teacher */}
            <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-32 h-40 md:w-40 md:h-48 pointer-events-none z-20">
                <MascotSVG variant="teacher" />
            </div>
        </motion.div>
    );
}
