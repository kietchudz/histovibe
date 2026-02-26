'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import type { Card } from '@/types/lesson';
import MascotSVG from '../MascotSVG';

export default function QuoteCard({ card }: { card: Card }) {
    return (
        <motion.div
            className="h-full w-full relative flex flex-col justify-center items-center px-4 py-2 pointer-events-none"
            initial={{ opacity: 0, scale: 0.85, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.85, rotateX: -10 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            <div className="relative max-w-md w-full">
                {/* Animated quote marks */}
                <motion.span
                    className="absolute -top-6 -left-2 text-5xl text-neon-pink/40 font-serif select-none pointer-events-none"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    "
                </motion.span>
                <motion.span
                    className="absolute -bottom-8 -right-2 text-5xl text-neon-pink/40 font-serif rotate-180 select-none pointer-events-none"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    "
                </motion.span>

                {/* Main quote card - scrollable */}
                <motion.div
                    className="relative glass-strong rounded-2xl p-4 border-l-4 border-neon-pink overflow-hidden max-h-[70vh] flex flex-col pointer-events-auto"
                    whileHover={{ scale: 1.01, borderLeftWidth: 6 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Background gradient decoration */}
                    <motion.div
                        className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-neon-pink/20 to-neon-purple/10 blur-3xl pointer-events-none"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                    />

                    {/* Shimmer line */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-pink/10 to-transparent pointer-events-none"
                        initial={{ x: '-100%' }}
                        animate={{ x: '200%' }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    />

                    {/* Scrollable content */}
                    <div className="overflow-y-auto flex-1 pr-1">
                        {/* Quote content - smaller text */}
                        <p className="relative text-lg md:text-xl font-display font-semibold leading-relaxed text-white italic text-center">
                            {card.content}
                        </p>

                        {/* Author/Note */}
                        {card.note && (
                            <motion.div
                                className="mt-4 flex items-center justify-end gap-2"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <div className="h-px flex-1 bg-gradient-to-l from-neon-purple/50 to-transparent" />
                                <p className="text-sm text-neon-purple font-medium whitespace-nowrap">
                                    — {card.note}
                                </p>
                            </motion.div>
                        )}

                        {card.url && (
                            <motion.div
                                className="mt-3 pt-2 flex justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
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
            </div>

            {/* Mascot Teacher */}
            <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-32 h-40 md:w-40 md:h-48 pointer-events-none z-20">
                <MascotSVG variant="teacher" />
            </div>
        </motion.div>
    );
}
