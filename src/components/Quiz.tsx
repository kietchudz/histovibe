'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QuizQuestion } from '@/types/lesson';
import { shuffleArray, shuffleQuizOptions } from '@/lib/utils';
import { calculateHistoVibeProgress } from '@/lib/progress';
import MascotCongrats from './MascotCongrats';

interface QuizProps {
    questions: QuizQuestion[];
    onComplete: (wrongAnswers: number) => void;
    onBack: () => void;
}

interface ShuffledQuestion {
    original: QuizQuestion;
    shuffledOptions: string[];
    correctIndex: number;
}

export default function Quiz({ questions, onComplete, onBack }: QuizProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [isQuizComplete, setIsQuizComplete] = useState(false);

    const shuffledQuestions = useMemo<ShuffledQuestion[]>(() => {
        return shuffleArray(questions).map(q => {
            const { shuffledOptions, newCorrectIndex } = shuffleQuizOptions(q.options, q.correctAnswer);
            return { original: q, shuffledOptions, correctIndex: newCorrectIndex };
        });
    }, [questions]);

    const currentQuestion = shuffledQuestions[currentIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctIndex;
    const totalQuestions = shuffledQuestions.length;
    const wrongAnswers = totalQuestions - score;

    const handleSelectAnswer = (index: number) => {
        if (showResult) return;
        setSelectedAnswer(index);
        setShowResult(true);
        if (index === currentQuestion.correctIndex) setScore(p => p + 1);
    };

    const handleNext = () => {
        if (currentIndex < totalQuestions - 1) {
            setCurrentIndex(p => p + 1);
            setSelectedAnswer(null);
            setShowResult(false);
        } else {
            setIsQuizComplete(true);
        }
    };

    if (isQuizComplete) {
        const { progress, message } = calculateHistoVibeProgress({
            isContentRead: true,
            totalQuestions,
            wrongAnswers
        });

        return (
            <div className="story-viewer flex items-center justify-center p-6 overflow-y-auto">
                <motion.div
                    className="glass-strong rounded-3xl p-8 max-w-md w-full text-center relative overflow-hidden"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                >
                    {/* Background gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 via-transparent to-neon-blue/20 pointer-events-none" />

                    {/* Progress circle */}
                    <div className="relative mb-6">
                        <svg className="w-32 h-32 mx-auto transform -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                            <motion.circle
                                cx="50" cy="50" r="45"
                                fill="none"
                                stroke="url(#gradient)"
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeDasharray={`${progress * 2.83} 283`}
                                initial={{ strokeDasharray: "0 283" }}
                                animate={{ strokeDasharray: `${progress * 2.83} 283` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            />
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#FF006E" />
                                    <stop offset="50%" stopColor="#8338EC" />
                                    <stop offset="100%" stopColor="#3A86FF" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.span
                                className="text-4xl font-display font-bold bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue bg-clip-text text-transparent"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                {progress}%
                            </motion.span>
                        </div>
                    </div>

                    {/* Score detail */}
                    <div className="mb-4 flex justify-center gap-6">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-neon-green">{score}</p>
                            <p className="text-xs text-white/50">Đúng</p>
                        </div>
                        <div className="w-px bg-white/20" />
                        <div className="text-center">
                            <p className="text-2xl font-bold text-neon-pink">{wrongAnswers}</p>
                            <p className="text-xs text-white/50">Sai</p>
                        </div>
                    </div>

                    {/* Gen Z message */}
                    <motion.p
                        className="text-lg text-white/80 mb-6 font-medium"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        {message}
                    </motion.p>

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={onBack}
                            className="flex-1 py-3 px-6 rounded-xl glass hover:bg-white/10 transition-all hover:scale-105"
                        >
                            Xem lại bài
                        </button>
                        <button
                            onClick={() => onComplete(wrongAnswers)}
                            className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue font-semibold hover:opacity-90 transition-all hover:scale-105"
                        >
                            Hoàn tất ✨
                        </button>
                    </div>

                    {/* Mascot Mèo Mốm */}
                    <MascotCongrats score={score} total={totalQuestions} />
                </motion.div>
            </div>
        );
    }

    return (
        <div className="story-viewer flex flex-col p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <button onClick={onBack} className="p-2 rounded-full glass hover:bg-white/10 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full glass text-sm font-display font-bold text-neon-blue">
                        Quiz {currentIndex + 1}/{totalQuestions}
                    </span>
                </div>
                <div className="px-3 py-1 rounded-full glass flex items-center gap-1">
                    <span className="text-neon-green">🎯</span>
                    <span className="font-bold text-neon-green">{score}</span>
                </div>
            </div>

            {/* Progress dots */}
            <div className="flex gap-2 mb-8">
                {Array.from({ length: totalQuestions }).map((_, i) => (
                    <motion.div
                        key={i}
                        className={`h-2 flex-1 rounded-full transition-colors ${i < currentIndex ? 'bg-neon-green' :
                            i === currentIndex ? 'bg-gradient-to-r from-neon-blue to-neon-purple' :
                                'bg-white/20'
                            }`}
                        initial={false}
                        animate={{ scale: i === currentIndex ? 1.1 : 1 }}
                    />
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex-1 flex flex-col"
                >
                    {/* Question card */}
                    <div className="glass-strong rounded-2xl p-6 mb-6 relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue" />
                        <p className="text-xl font-medium text-white leading-relaxed">{currentQuestion.original.question}</p>
                    </div>

                    {/* Options */}
                    <div className="space-y-3 flex-1">
                        {currentQuestion.shuffledOptions.map((option, index) => {
                            let optionClass = 'w-full text-left p-4 rounded-xl glass transition-all';
                            let borderClass = 'border-2 border-transparent';

                            if (showResult) {
                                if (index === currentQuestion.correctIndex) {
                                    optionClass += ' bg-neon-green/20';
                                    borderClass = 'border-2 border-neon-green';
                                }
                                else if (index === selectedAnswer) {
                                    optionClass += ' bg-neon-pink/20';
                                    borderClass = 'border-2 border-neon-pink';
                                }
                            } else {
                                optionClass += ' hover:bg-white/10 hover:scale-[1.02]';
                            }

                            return (
                                <motion.button
                                    key={index}
                                    onClick={() => handleSelectAnswer(index)}
                                    disabled={showResult}
                                    className={`${optionClass} ${borderClass}`}
                                    whileTap={{ scale: 0.98 }}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-neon-purple/30 mr-3 font-bold">
                                        {String.fromCharCode(65 + index)}
                                    </span>
                                    {option}
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Result feedback */}
                    <AnimatePresence>
                        {showResult && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, height: 0 }}
                                animate={{ opacity: 1, y: 0, height: 'auto' }}
                                exit={{ opacity: 0, y: 20, height: 0 }}
                                className={`mt-4 p-4 rounded-xl ${isCorrect ? 'bg-neon-green/20 border border-neon-green/50' : 'bg-neon-pink/20 border border-neon-pink/50'}`}
                            >
                                <p className="text-sm">
                                    <span className="font-bold text-lg mr-2">{isCorrect ? '✅' : '❌'}</span>
                                    {isCorrect ? 'Chính xác!' : 'Sai rồi!'} {currentQuestion.original.explanation}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Next button */}
                    {showResult && (
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={handleNext}
                            className="mt-6 py-4 px-8 rounded-xl bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink font-semibold text-lg hover:opacity-90 transition-all hover:scale-105"
                        >
                            {currentIndex < totalQuestions - 1 ? 'Câu tiếp theo →' : 'Xem kết quả 🎉'}
                        </motion.button>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
