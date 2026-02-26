'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useUser, SignedIn, SignedOut } from '@clerk/nextjs';
import { getAllLessonMeta, LESSON_COUNTS } from '@/lib/lessons';
import { useStore } from '@/store/useStore';
import { AudioPlayer } from '@/components';


type GradeLevel = 10 | 11 | 12;

export default function Home() {
    const { user, isLoaded } = useUser();
    const { streak, completedLessons, lessonScores, grade: localGrade, checkStreakDecay } = useStore();

    // Check streak decay on app load
    useEffect(() => {
        checkStreakDecay();
    }, [checkStreakDecay]);
    const userGrade = (user?.publicMetadata?.grade as GradeLevel) || localGrade || 10;
    const lessons = getAllLessonMeta().filter(l => l.level === userGrade);
    const totalLessons = LESSON_COUNTS[userGrade];
    const completedCount = completedLessons.filter(id => id.startsWith(`grade${userGrade}`)).length;

    // Calculate average score for selected grade
    const gradeScores = Object.entries(lessonScores)
        .filter(([id]) => id.startsWith(`grade${userGrade}`))
        .map(([, score]) => score.progress);
    const averageScore = gradeScores.length > 0
        ? Math.round(gradeScores.reduce((a, b) => a + b, 0) / gradeScores.length)
        : 0;

    return (
        <main className="min-h-screen pb-24">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-neon-pink/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-20 -left-40 w-80 h-80 bg-neon-purple/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-60 h-60 bg-neon-blue/20 rounded-full blur-3xl" />
                <div className="relative z-10 px-6 pt-8 pb-6">
                    {/* Top bar with profile */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex-1" />
                        <SignedIn>
                            <Link href="/profile">
                                <motion.div
                                    className="flex items-center gap-3 glass-strong rounded-full px-4 py-2 hover:bg-white/10 transition-colors"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {user?.imageUrl ? (
                                        <img src={user.imageUrl} alt="" className="w-8 h-8 rounded-full" />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-pink to-neon-purple flex items-center justify-center text-sm font-bold">
                                            {user?.firstName?.[0] || '?'}
                                        </div>
                                    )}
                                    <span className="text-sm font-medium text-white/80 hidden sm:block">
                                        {user?.firstName || 'Profile'}
                                    </span>
                                </motion.div>
                            </Link>
                        </SignedIn>
                        <SignedOut>
                            <Link href="/sign-in">
                                <motion.button
                                    className="glass-strong rounded-full px-4 py-2 text-sm font-medium hover:bg-white/10 transition-colors"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Đăng nhập
                                </motion.button>
                            </Link>
                        </SignedOut>
                    </div>

                    {/* Logo */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                        <h1 className="text-5xl md:text-6xl font-display font-bold mb-2">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue">HistoVibe</span>
                        </h1>
                        <p className="text-white/60 text-lg">Học sử không buồn ngủ 📚⚡</p>
                    </motion.div>

                    {/* Streak banner */}
                    {streak > 0 && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="mt-6 flex justify-center"
                        >
                            <div className="glass-strong rounded-full px-6 py-3 flex items-center gap-2 border border-neon-orange/30">
                                <span className="text-2xl animate-pulse">🔥</span>
                                <span className="text-neon-orange font-bold">{streak} ngày liên tục!</span>
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Current Grade Badge */}
            <section className="px-6 mb-6">
                <Link href="/profile">
                    <motion.div
                        className="flex items-center justify-between p-4 glass-strong rounded-2xl hover:bg-white/5 transition-colors cursor-pointer"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-pink to-neon-purple flex items-center justify-center text-2xl">
                                {userGrade === 10 ? '🌱' : userGrade === 11 ? '⚡' : '🎯'}
                            </div>
                            <div>
                                <p className="font-bold text-white">Lớp {userGrade}</p>
                                <p className="text-sm text-white/50">Đang học nội dung lớp {userGrade}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-neon-pink">
                            <span className="text-sm">Đổi lớp</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </motion.div>
                </Link>
            </section>

            {/* Progress Overview */}
            <section className="px-6 mb-8">
                <div className="glass-strong rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-white/60 text-sm">Tiến độ Lớp {userGrade}</p>
                            <p className="text-2xl font-bold">
                                <span className="text-neon-green">{completedCount}</span>
                                <span className="text-white/40">/{totalLessons}</span>
                                <span className="text-sm text-white/50 ml-2">bài học</span>
                            </p>
                        </div>
                        {averageScore > 0 && (
                            <div className="text-right">
                                <p className="text-white/60 text-sm">Điểm TB</p>
                                <p className={`text-2xl font-bold ${averageScore >= 80 ? 'text-neon-green' :
                                    averageScore >= 60 ? 'text-neon-blue' :
                                        'text-neon-orange'
                                    }`}>
                                    {averageScore}%
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${(completedCount / totalLessons) * 100}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                    </div>
                </div>
            </section>

            {/* Lesson List */}
            <section className="px-6">
                <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
                    <span className="text-neon-blue">📖</span>
                    Danh sách bài học
                </h2>
                <div className="space-y-4">
                    {lessons.length > 0 ? lessons.map((lesson, index) => {
                        const isCompleted = completedLessons.includes(lesson.id);
                        const score = lessonScores[lesson.id];

                        return (
                            <motion.div
                                key={lesson.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link href={`/lesson/${lesson.id}`}>
                                    <div className={`glass rounded-2xl p-5 card-lift relative overflow-hidden ${isCompleted ? 'border-l-4 border-neon-green' : ''
                                        }`}>
                                        {isCompleted && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-neon-green/5 to-transparent pointer-events-none" />
                                        )}

                                        <div className="flex items-start justify-between relative">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-white mb-1">{lesson.title}</h3>
                                                <p className="text-sm text-neon-pink font-medium">{lesson.genZTitle}</p>
                                                <div className="mt-3 flex gap-4 text-xs text-white/50">
                                                    <span className="flex items-center gap-1">📚 {lesson.cardCount} thẻ</span>
                                                    <span className="flex items-center gap-1">❓ {lesson.quizCount} câu</span>
                                                </div>
                                                {score && (
                                                    <div className="mt-2 flex items-center gap-2">
                                                        <div className="h-1.5 flex-1 max-w-24 bg-white/10 rounded-full overflow-hidden">
                                                            <div
                                                                className={`h-full rounded-full ${score.progress >= 80 ? 'bg-neon-green' :
                                                                    score.progress >= 60 ? 'bg-neon-blue' :
                                                                        'bg-neon-orange'
                                                                    }`}
                                                                style={{ width: `${score.progress}%` }}
                                                            />
                                                        </div>
                                                        <span className={`text-xs font-bold ${score.progress >= 80 ? 'text-neon-green' :
                                                            score.progress >= 60 ? 'text-neon-blue' :
                                                                'text-neon-orange'
                                                            }`}>
                                                            {score.progress}%
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex items-center">
                                                {isCompleted ? (
                                                    <div className="w-10 h-10 rounded-full bg-neon-green/20 flex items-center justify-center">
                                                        <span className="text-xl">✅</span>
                                                    </div>
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-pink to-neon-purple flex items-center justify-center shadow-lg shadow-neon-pink/30">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    }) : (
                        <div className="glass rounded-2xl p-8 text-center">
                            <div className="text-4xl mb-4">🚧</div>
                            <p className="text-white/60">Các bài học Lớp {userGrade} đang được cập nhật...</p>
                            <p className="text-sm text-neon-pink mt-2">Coming soon! ⚡</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Stats Section */}
            <section className="px-6 mt-10">
                <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
                    <span className="text-neon-purple">📊</span>
                    Thống kê nhanh
                </h2>
                <div className="grid grid-cols-3 gap-3">
                    <motion.div className="glass-strong rounded-xl p-4 text-center" whileHover={{ scale: 1.02 }}>
                        <div className="text-2xl mb-1">🔥</div>
                        <div className="text-2xl font-bold text-neon-orange">{streak}</div>
                        <div className="text-xs text-white/50">Streak</div>
                    </motion.div>
                    <motion.div className="glass-strong rounded-xl p-4 text-center" whileHover={{ scale: 1.02 }}>
                        <div className="text-2xl mb-1">✅</div>
                        <div className="text-2xl font-bold text-neon-green">{completedLessons.length}</div>
                        <div className="text-xs text-white/50">Hoàn thành</div>
                    </motion.div>
                    <motion.div className="glass-strong rounded-xl p-4 text-center" whileHover={{ scale: 1.02 }}>
                        <div className="text-2xl mb-1">📚</div>
                        <div className="text-2xl font-bold text-neon-blue">46</div>
                        <div className="text-xs text-white/50">Tổng bài</div>
                    </motion.div>
                </div>
            </section>

            <AudioPlayer />
        </main>
    );
}
