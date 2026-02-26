'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@clerk/nextjs';
import { updateUserGrade } from '@/app/actions/user';
import ParticleBackground from '@/components/UI/ParticleBackground';
import GlowingOrb from '@/components/UI/GlowingOrb';

type GradeLevel = 10 | 11 | 12;

const gradeOptions: { grade: GradeLevel; title: string; subtitle: string; emoji: string; color: string; gradient: string }[] = [
    {
        grade: 10,
        title: "Lớp 10",
        subtitle: "Newbie 2k10 - Chào sân cấp 3 👋",
        emoji: "🌱",
        color: "from-emerald-400 to-green-600",
        gradient: "linear-gradient(135deg, #10B981 0%, #059669 100%)"
    },
    {
        grade: 11,
        title: "Lớp 11",
        subtitle: "Junior 2k9 - Vững tay chèo 🚣",
        emoji: "⚡",
        color: "from-cyan-400 to-blue-600",
        gradient: "linear-gradient(135deg, #06B6D4 0%, #2563EB 100%)"
    },
    {
        grade: 12,
        title: "Lớp 12",
        subtitle: "Senior 2k8 - Quyết chiến Tốt nghiệp 🔥",
        emoji: "🎯",
        color: "from-orange-400 to-red-600",
        gradient: "linear-gradient(135deg, #F97316 0%, #DC2626 100%)"
    }
];

export default function OnboardingPage() {
    const router = useRouter();
    const { user } = useUser();
    const [selectedGrade, setSelectedGrade] = useState<GradeLevel | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const handleSelectGrade = (grade: GradeLevel) => {
        setSelectedGrade(grade);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 1500);
    };

    const handleStart = async () => {
        if (!selectedGrade || !user) return;

        setIsLoading(true);
        try {
            await updateUserGrade(selectedGrade);

            // Small delay to ensure metadata is propagated
            await new Promise(resolve => setTimeout(resolve, 300));

            // Full page reload to re-run middleware with fresh data
            window.location.href = '/';
        } catch (error) {
            console.error('Failed to update grade:', error);
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center relative overflow-hidden p-6 bg-cyber-dark">
            {/* Animated Background */}
            <ParticleBackground />

            {/* Glowing Orbs */}
            <GlowingOrb color="pink" size="lg" position={{ top: '-10%', right: '-5%' }} delay={0} />
            <GlowingOrb color="purple" size="lg" position={{ bottom: '-10%', left: '-5%' }} delay={1} />
            <GlowingOrb color="blue" size="md" position={{ top: '30%', left: '10%' }} delay={2} />
            <GlowingOrb color="green" size="sm" position={{ bottom: '20%', right: '15%' }} delay={3} />

            {/* Confetti Effect */}
            <AnimatePresence>
                {showConfetti && (
                    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
                        {[...Array(30)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-3 h-3 rounded-full"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    background: ['#FF2E97', '#00D4FF', '#A855F7', '#39FF14', '#FFE600'][Math.floor(Math.random() * 5)],
                                }}
                                initial={{ y: -20, opacity: 1, scale: 1 }}
                                animate={{
                                    y: window.innerHeight + 20,
                                    opacity: 0,
                                    rotate: Math.random() * 360,
                                    scale: Math.random() * 0.5 + 0.5,
                                }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    duration: Math.random() * 2 + 1.5,
                                    ease: 'easeOut',
                                    delay: Math.random() * 0.5,
                                }}
                            />
                        ))}
                    </div>
                )}
            </AnimatePresence>

            <div className="relative z-10 w-full max-w-3xl">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <motion.div
                        className="inline-block mb-4"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                        <span className="text-6xl">🎓</span>
                    </motion.div>

                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
                        <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue animate-gradient-x">
                            Bạn thuộc thế hệ nào?
                        </span>
                    </h1>

                    <p className="text-white/60 text-lg md:text-xl">
                        Chọn khối lớp để nhận nội dung phù hợp nhất!
                    </p>

                    {user && (
                        <motion.p
                            className="mt-4 text-lg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <span className="text-white/60">Xin chào, </span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-purple font-bold">
                                {user.firstName || 'bạn'}
                            </span>
                            <span className="text-white/60">! </span>
                            <motion.span
                                className="inline-block"
                                animate={{ rotate: [0, 20, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                            >
                                👋
                            </motion.span>
                        </motion.p>
                    )}
                </motion.div>

                {/* Grade Selection Cards */}
                <div className="grid gap-6 md:grid-cols-3">
                    {gradeOptions.map((option, index) => (
                        <motion.button
                            key={option.grade}
                            onClick={() => handleSelectGrade(option.grade)}
                            disabled={isLoading}
                            className={`relative group p-8 rounded-3xl text-left transition-all duration-500 transform-gpu
                                backdrop-blur-xl border border-white/10
                                ${selectedGrade === option.grade
                                    ? 'bg-white/15 scale-105 border-white/30'
                                    : 'bg-white/5 hover:bg-white/10 hover:scale-[1.02]'
                                }
                                ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                            `}
                            style={{
                                boxShadow: selectedGrade === option.grade
                                    ? '0 0 40px rgba(168, 85, 247, 0.3), inset 0 1px 1px rgba(255,255,255,0.1)'
                                    : '0 4px 30px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255,255,255,0.05)',
                            }}
                            initial={{ opacity: 0, y: 40, rotateX: 20 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{ delay: index * 0.15, duration: 0.5, ease: 'easeOut' }}
                            whileHover={{
                                y: -8,
                                transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {/* Gradient border on selection */}
                            {selectedGrade === option.grade && (
                                <motion.div
                                    className="absolute inset-0 rounded-3xl opacity-50"
                                    style={{
                                        background: option.gradient,
                                        filter: 'blur(20px)',
                                        zIndex: -1,
                                    }}
                                    layoutId="selectedGlow"
                                />
                            )}

                            {/* Card Content */}
                            <div className="relative z-10">
                                <motion.span
                                    className="text-6xl mb-6 block"
                                    animate={selectedGrade === option.grade ? {
                                        scale: [1, 1.2, 1],
                                        rotate: [0, 10, -10, 0]
                                    } : {}}
                                    transition={{ duration: 0.5 }}
                                >
                                    {option.emoji}
                                </motion.span>

                                <h3 className={`text-3xl font-display font-bold mb-3 transition-colors duration-300
                                    ${selectedGrade === option.grade ? 'text-white' : 'text-white/90 group-hover:text-white'}
                                `}>
                                    {option.title}
                                </h3>

                                <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors">
                                    {option.subtitle}
                                </p>

                                {/* Selection indicator */}
                                <AnimatePresence>
                                    {selectedGrade === option.grade && (
                                        <motion.div
                                            className="absolute top-6 right-6"
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            exit={{ scale: 0, rotate: 180 }}
                                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                        >
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-pink to-neon-purple flex items-center justify-center shadow-lg shadow-neon-purple/50">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <motion.path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={3}
                                                        d="M5 13l4 4L19 7"
                                                        initial={{ pathLength: 0 }}
                                                        animate={{ pathLength: 1 }}
                                                        transition={{ duration: 0.3 }}
                                                    />
                                                </svg>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.button>
                    ))}
                </div>

                {/* Start Button */}
                <AnimatePresence>
                    {selectedGrade && (
                        <motion.div
                            className="mt-10"
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                        >
                            <motion.button
                                onClick={handleStart}
                                disabled={isLoading}
                                className={`w-full py-6 px-10 rounded-2xl font-display font-bold text-2xl text-white 
                                    bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue 
                                    relative overflow-hidden group
                                    ${isLoading ? 'opacity-80 cursor-wait' : 'hover:scale-[1.02]'}
                                `}
                                style={{
                                    boxShadow: '0 0 30px rgba(168, 85, 247, 0.5), 0 0 60px rgba(255, 46, 151, 0.3)',
                                }}
                                whileHover={{
                                    boxShadow: '0 0 40px rgba(168, 85, 247, 0.7), 0 0 80px rgba(255, 46, 151, 0.5)',
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {/* Shimmer effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                                    initial={{ x: '-100%' }}
                                    animate={{ x: '200%' }}
                                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                                />

                                {/* Button content */}
                                <span className="relative flex items-center justify-center gap-4">
                                    {isLoading ? (
                                        <>
                                            <motion.div
                                                className="w-7 h-7 border-4 border-white border-t-transparent rounded-full"
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                            />
                                            <span>Đang khởi tạo vũ trụ...</span>
                                        </>
                                    ) : (
                                        <>
                                            <motion.span
                                                animate={{ x: [0, 5, 0] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                            >
                                                🚀
                                            </motion.span>
                                            <span>Bắt Đầu Học Ngay!</span>
                                        </>
                                    )}
                                </span>
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Footer hint */}
                <motion.p
                    className="text-center text-white/30 text-sm mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    💡 Bạn có thể thay đổi lựa chọn này sau trong phần Hồ sơ
                </motion.p>
            </div>
        </main>
    );
}
