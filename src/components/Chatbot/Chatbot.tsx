'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import MascotSVG from '../MascotSVG';

export default function Chatbot() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
        { role: 'model', text: 'Meow! Chủ nhân có thắc mắc gì về bài học lịch sử không? Cứ hỏi Mốm nhé! 🐾' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setIsLoading(true);

        try {
            const historyObj = messages.slice(1).map(m => ({
                role: m.role,
                parts: [{ text: m.text }]
            }));

            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg, history: historyObj })
            });

            const data = await res.json();

            if (data.error) {
                setMessages(prev => [...prev, { role: 'model', text: data.error }]);
            } else {
                setMessages(prev => [...prev, { role: 'model', text: data.response }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { role: 'model', text: 'Mốm nghe không rõ, chủ nhân nói lại nha! 🙀' }]);
        } finally {
            setIsLoading(false);
        }
    };

    // Hide chatbot on lesson pages
    if (pathname?.startsWith('/lesson')) return null;

    return (
        <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end pointer-events-none">
            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="mb-4 w-80 sm:w-96 h-[500px] max-h-[70vh] glass-panel border border-white/20 rounded-2xl flex flex-col overflow-hidden pointer-events-auto shadow-2xl shadow-neon-pink/20"
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-neon-pink to-neon-purple p-4 flex items-center justify-between shadow-md z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center overflow-hidden border border-white/30 p-1">
                                    <MascotSVG variant="default" className="w-full h-full" animate={false} />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold tracking-wide">Mèo Mốm Gia Sư</h3>
                                    <p className="text-white/80 text-xs">Sẵn sàng giải đáp lịch sử!</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white/80 hover:text-white transition p-1 rounded-full hover:bg-white/10"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-neon-pink/50 scrollbar-track-transparent">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] rounded-2xl px-4 py-2 ${msg.role === 'user'
                                        ? 'bg-neon-blue/80 text-white rounded-tr-sm'
                                        : 'bg-white/10 text-white/90 border border-white/10 rounded-tl-sm'
                                        }`}>
                                        <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-white/10 text-white/90 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
                                        <motion.div className="w-1.5 h-1.5 bg-neon-pink rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity }} />
                                        <motion.div className="w-1.5 h-1.5 bg-neon-purple rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                                        <motion.div className="w-1.5 h-1.5 bg-neon-blue rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-3 bg-cyber-dark/50 border-t border-white/10 backdrop-blur-md">
                            <form
                                className="flex gap-2"
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                            >
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Hỏi chủ nhân Mốm..."
                                    className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-neon-pink/50 transition"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-pink to-neon-purple flex items-center justify-center text-white font-bold hover:scale-105 active:scale-95 transition disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    ↑
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className={`pointer-events-auto relative w-16 h-16 md:w-20 md:h-20 rounded-full shadow-lg shadow-neon-pink/30 flex items-center justify-center overflow-hidden border-2 transition-colors duration-300 ${isOpen ? 'border-neon-purple bg-cyber-dark z-20' : 'border-neon-pink bg-black/40 hover:bg-black/60'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Glow ring */}
                <motion.div
                    className="absolute inset-0 rounded-full border border-neon-pink/50 pointer-events-none"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Mascot face inside button */}
                {!isOpen ? (
                    <div className="w-12 h-14 md:w-16 md:h-18 mt-2 drop-shadow-md">
                        <MascotSVG variant="default" animate={false} />
                    </div>
                ) : (
                    <span className="text-2xl text-neon-pink drop-shadow-md">✕</span>
                )}
            </motion.button>
        </div>
    );
}
