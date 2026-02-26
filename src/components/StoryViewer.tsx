'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Lesson, Card } from '@/types/lesson';
import { useStore } from '@/store/useStore';
import ProgressBar from './ProgressBar';
import { TextCard, QuoteCard, TimelineCard } from './Card';
import Quiz from './Quiz';

interface StoryViewerProps {
    lesson: Lesson;
    onClose: () => void;
}

export default function StoryViewer({ lesson, onClose }: StoryViewerProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);
    const [isAnimating, setIsAnimating] = useState(true);
    const [isContentRead, setIsContentRead] = useState(false);
    const { updateStreak, saveLessonProgress, markLessonComplete, saveLessonScore } = useStore();
    const totalSlides = lesson.cards.length;
    const isLastCard = currentIndex === totalSlides - 1;

    useEffect(() => {
        if (isPaused || showQuiz) return;
        const timer = setTimeout(() => {
            if (isLastCard) {
                setIsContentRead(true);
                setShowQuiz(true);
            }
            else handleNext();
        }, 5000);
        return () => clearTimeout(timer);
    }, [currentIndex, isPaused, showQuiz, isLastCard]);

    useEffect(() => { updateStreak(); }, [updateStreak]);
    useEffect(() => { saveLessonProgress(lesson.id, currentIndex); }, [lesson.id, currentIndex, saveLessonProgress]);

    const handleNext = useCallback(() => {
        if (currentIndex < totalSlides - 1) {
            setCurrentIndex(p => p + 1);
            setIsAnimating(true);
        }
        else {
            setIsContentRead(true);
            setShowQuiz(true);
        }
    }, [currentIndex, totalSlides]);

    const handlePrev = useCallback(() => {
        if (currentIndex > 0) { setCurrentIndex(p => p - 1); setIsAnimating(true); }
    }, [currentIndex]);

    const handleTap = (zone: 'left' | 'right' | 'center') => {
        if (zone === 'left') handlePrev();
        else if (zone === 'right') handleNext();
    };

    // Toggle pause instead of hold
    const togglePause = () => {
        setIsPaused(prev => !prev);
        setIsAnimating(prev => !prev);
    };

    const handleQuizComplete = (wrongAnswers: number) => {
        // Calculate and save score
        saveLessonScore(lesson.id, isContentRead, wrongAnswers);
        markLessonComplete(lesson.id);
        onClose();
    };

    const renderCard = (card: Card) => {
        switch (card.type) {
            case 'text': return <TextCard card={card} />;
            case 'quote': return <QuoteCard card={card} />;
            case 'timeline': return <TimelineCard card={card} />;
            default: return <TextCard card={card} />;
        }
    };

    if (showQuiz) return <Quiz questions={lesson.quiz} onComplete={handleQuizComplete} onBack={() => setShowQuiz(false)} />;

    return (
        <div className="story-viewer">
            <div className="absolute top-0 left-0 right-0 z-50">
                <ProgressBar total={totalSlides} current={currentIndex} isAnimating={isAnimating && !isPaused} />
            </div>
            <div className="absolute top-8 left-0 right-0 z-50 px-4 flex items-center justify-between">
                <button onClick={onClose} className="p-2 rounded-full glass hover:bg-white/10 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="text-center flex-1 px-4">
                    <p className="text-sm text-white/60 truncate">{lesson.title}</p>
                    <p className="text-xs text-neon-pink">Lớp {lesson.level}</p>
                </div>
                {/* Pause/Play button */}
                <button onClick={togglePause} className="p-2 rounded-full glass hover:bg-white/10 transition-colors">
                    {isPaused ? (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    ) : (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                    )}
                </button>
            </div>
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    className="absolute inset-0 pt-20 pb-16 z-30 pointer-events-none"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                >
                    {renderCard(lesson.cards[currentIndex])}
                </motion.div>
            </AnimatePresence>
            {/* Tap zones for navigation */}
            <div className="tap-zone tap-zone-left" onClick={() => handleTap('left')} />
            <div className="tap-zone tap-zone-center" onClick={togglePause} />
            <div className="tap-zone tap-zone-right" onClick={() => handleTap('right')} />
            {/* Pause overlay */}
            <AnimatePresence>
                {isPaused && (
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center bg-black/60 z-30 cursor-pointer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={togglePause}
                    >
                        <motion.div
                            className="flex flex-col items-center gap-4"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                        >
                            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                                <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                            <p className="text-white/80 text-sm">Nhấn để tiếp tục</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Navigation hints */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-6 text-xs text-white/40">
                <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    Lùi
                </span>
                <span className="flex items-center gap-1">
                    {isPaused ? '▶️' : '⏸️'} Tạm dừng
                </span>
                <span className="flex items-center gap-1">
                    Tiếp
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </span>
            </div>
        </div>
    );
}
