'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import type { Card } from '@/types/lesson';
import MascotSVG from '../MascotSVG';

export default function TimelineCard({ card }: { card: Card }) {
    const parseTimelineContent = (content: string) => {
        return content.split('\n').filter(line => line.trim()).map(line => {
            const [year, event] = line.split('|').map(s => s.trim());
            return { year, event };
        });
    };

    const timelineEvents = parseTimelineContent(card.content);

    return (
        <motion.div
            className="h-full w-full relative flex flex-col justify-center items-center px-4 py-2 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="relative max-w-md w-full max-h-[75vh] overflow-y-auto pr-1 pointer-events-auto">
                {/* Animated timeline line */}
                <motion.div
                    className="absolute left-4 top-0 bottom-0 w-0.5"
                    style={{ top: '0' }}
                    initial={{ background: 'rgba(255,255,255,0.2)' }}
                    animate={{
                        background: [
                            'linear-gradient(180deg, #FF2E97 0%, #A855F7 50%, #00D4FF 100%)',
                            'linear-gradient(180deg, #00D4FF 0%, #FF2E97 50%, #A855F7 100%)',
                            'linear-gradient(180deg, #A855F7 0%, #00D4FF 50%, #FF2E97 100%)',
                        ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Glow effect for the line */}
                <motion.div
                    className="absolute left-3.5 top-0 bottom-0 w-1.5 blur-sm"
                    style={{
                        background: 'linear-gradient(180deg, #FF2E97 0%, #A855F7 50%, #00D4FF 100%)',
                        top: '0'
                    }}
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Timeline events */}
                {timelineEvents.map((event, index) => (
                    <motion.div
                        key={index}
                        className="relative pl-12 pb-6 last:pb-0"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.15, duration: 0.4 }}
                    >
                        {/* Timeline dot with pulse effect */}
                        <motion.div
                            className="absolute left-1.5 top-1 w-6 h-6 rounded-full bg-cyber-dark border-2 border-neon-pink flex items-center justify-center"
                            whileHover={{ scale: 1.2 }}
                            initial={{ boxShadow: '0 0 0 rgba(255, 46, 151, 0)' }}
                            animate={{
                                boxShadow: [
                                    '0 0 5px rgba(255, 46, 151, 0.5)',
                                    '0 0 15px rgba(255, 46, 151, 0.8)',
                                    '0 0 5px rgba(255, 46, 151, 0.5)'
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                        >
                            <div className="w-2 h-2 rounded-full bg-neon-pink" />
                        </motion.div>

                        {/* Event card */}
                        <motion.div
                            className="glass-strong rounded-xl p-4 relative overflow-hidden border border-white/10"
                            whileHover={{ scale: 1.02, borderColor: 'rgba(255, 46, 151, 0.3)' }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* Gradient accent */}
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-neon-pink to-neon-purple rounded-l-xl" />

                            <span className="text-neon-pink font-display font-bold text-lg block mb-1">
                                {event.year}
                            </span>
                            <p className="text-white/90 leading-relaxed">{event.event}</p>
                        </motion.div>
                    </motion.div>
                ))}

                {/* Note at the bottom */}
                {card.note && (
                    <motion.div
                        className="mt-6 flex items-center justify-center gap-2 text-sm text-neon-green/80"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <span className="text-lg">⏳</span>
                        <span className="italic">{card.note}</span>
                    </motion.div>
                )}

                {card.url && (
                    <motion.div
                        className="mt-3 pt-2 flex justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        <a href={card.url} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-neon-blue hover:text-neon-pink transition-colors pointer-events-auto">
                            <span>🔗</span>
                            <span className="underline underline-offset-2">Tìm hiểu thêm</span>
                        </a>
                    </motion.div>
                )}
            </div>

            {/* Mascot Teacher */}
            <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-32 h-40 md:w-40 md:h-48 pointer-events-none z-20 flex justify-end">
                <MascotSVG variant="teacher" />
            </div>
        </motion.div>
    );
}
