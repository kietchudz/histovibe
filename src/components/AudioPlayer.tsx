'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';

const LOFI_AUDIO_URL = 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3';

export default function AudioPlayer() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const { isMuted, toggleMute } = useStore();

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.3;
            audioRef.current.loop = true;
            audioRef.current.play().catch(() => console.log('Autoplay blocked'));
        }
    }, []);

    useEffect(() => {
        if (audioRef.current) audioRef.current.muted = isMuted;
    }, [isMuted]);

    const handleToggle = () => {
        if (audioRef.current?.paused) audioRef.current.play();
        toggleMute();
    };

    return (
        <>
            <audio ref={audioRef} src={LOFI_AUDIO_URL} preload="auto" />
            <motion.button onClick={handleToggle} className="fixed bottom-6 right-6 z-50 p-4 rounded-full glass-strong hover:bg-white/10 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} title={isMuted ? 'Bật nhạc' : 'Tắt nhạc'}>
                {isMuted ? (
                    <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                )}
            </motion.button>
        </>
    );
}
