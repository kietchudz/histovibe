'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useUser, useClerk, UserButton } from '@clerk/nextjs';
import { useStore } from '@/store/useStore';
import { updateUserGrade } from '@/app/actions/user';
import Link from 'next/link';

type GradeLevel = 10 | 11 | 12;

const grades: { value: GradeLevel; label: string; emoji: string }[] = [
    { value: 10, label: 'Lớp 10', emoji: '🌱' },
    { value: 11, label: 'Lớp 11', emoji: '⚡' },
    { value: 12, label: 'Lớp 12', emoji: '🎯' },
];

// Calculate rank based on grade level
const getRank = (grade: GradeLevel) => {
    switch (grade) {
        case 12: return { title: 'Sử Thần 🎯', color: 'text-yellow-400' };
        case 11: return { title: 'Chiến Binh ⚡', color: 'text-neon-purple' };
        case 10:
        default: return { title: 'Tân Binh 🌱', color: 'text-neon-pink' };
    }
};

export default function ProfilePage() {
    const router = useRouter();
    const { user, isLoaded } = useUser();
    const { signOut } = useClerk();
    const { completedLessons, streak, lessonScores, resetProgress, clearLocalData, grade: localGrade } = useStore();
    const [isUpdating, setIsUpdating] = useState(false);

    const currentGrade = (user?.publicMetadata?.grade as GradeLevel) || localGrade || 10;
    const rank = getRank(currentGrade);

    // Calculate average score
    const scores = Object.values(lessonScores);
    const averageScore = scores.length > 0
        ? Math.round(scores.reduce((sum, s) => sum + s.progress, 0) / scores.length)
        : 0;

    // Sync user grade to local store when logged in
    // This ensures that if they log out, the local store has the latest grade
    useEffect(() => {
        if (user?.publicMetadata?.grade) {
            const serverGrade = user.publicMetadata.grade as GradeLevel;
            if (serverGrade !== localGrade) {
                useStore.getState().setGrade(serverGrade);
            }
        }
    }, [user, localGrade]);

    const handleChangeGrade = async (newGrade: GradeLevel) => {
        console.log('handleChangeGrade called with:', newGrade, 'currentGrade:', currentGrade);

        if (newGrade === currentGrade) {
            // Already on this grade, do nothing
            return;
        }

        setIsUpdating(true);

        // Always update local store so it persists even if user logs out later
        const { setGrade } = useStore.getState();
        setGrade(newGrade);

        try {
            if (!user) {
                // Guest user - done
                alert(`Đã đổi sang Lớp ${newGrade}! (Chế độ khách)`);
                setIsUpdating(false);
                return;
            }

            console.log('Calling updateUserGrade...');
            const result = await updateUserGrade(newGrade);
            console.log('updateUserGrade result:', result);

            // Show alert before redirect so user knows it worked
            alert(`Đã đổi sang Lớp ${newGrade}! Đang chuyển hướng...`);

            // Force a full page reload to get fresh session data from Clerk
            // This ensures publicMetadata is properly refreshed
            window.location.href = '/';
        } catch (error) {
            console.error('Failed to update grade:', error);
            alert('Lỗi khi đổi lớp: ' + (error instanceof Error ? error.message : String(error)));
            setIsUpdating(false);
        }
    };

    const handleSignOut = async () => {
        clearLocalData();
        await signOut();
        router.push('/');
    };

    const handleResetProgress = () => {
        if (confirm('Bạn có chắc muốn xóa toàn bộ tiến trình học? Hành động này không thể hoàn tác!')) {
            resetProgress();
            router.refresh();
        }
    };

    if (!isLoaded) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-neon-pink border-t-transparent rounded-full animate-spin" />
            </main>
        );
    }

    return (
        <main className="min-h-screen pb-24 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-neon-pink/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 -left-40 w-80 h-80 bg-neon-purple/20 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <header className="relative z-10 p-6 flex items-center justify-between">
                <Link href="/" className="p-2 rounded-full glass hover:bg-white/10 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </Link>
                <h1 className="text-xl font-display font-bold">Hồ sơ</h1>
                <div className="w-10" />
            </header>

            <div className="relative z-10 px-6 space-y-6">
                {/* User Info Card */}
                <motion.div
                    className="glass-strong rounded-2xl p-6 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {/* Avatar */}
                    <div className="flex justify-center mb-4">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-neon-purple/50">
                                {user?.imageUrl ? (
                                    <img src={user.imageUrl} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-neon-pink to-neon-purple flex items-center justify-center text-3xl">
                                        {user?.firstName?.[0] || '?'}
                                    </div>
                                )}
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-neon-green flex items-center justify-center text-sm">
                                ✓
                            </div>
                        </div>
                    </div>

                    {/* Name */}
                    <h2 className="text-2xl font-display font-bold text-white mb-1">
                        {user?.fullName || user?.firstName || 'HistoViber'}
                    </h2>
                    <p className="text-white/60 text-sm">{user?.primaryEmailAddress?.emailAddress}</p>

                    {/* Rank Badge */}
                    <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full glass">
                        <span className={`font-bold ${rank.color}`}>{rank.title}</span>
                    </div>
                </motion.div>

                {/* Grade Selection */}
                <motion.div
                    className="glass-strong rounded-2xl p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <h3 className="font-bold text-white mb-4">Khối lớp</h3>

                    {/* Always show grade buttons for easy switching */}
                    <div className="grid grid-cols-3 gap-3">
                        {grades.map(g => (
                            <button
                                key={g.value}
                                type="button"
                                onClick={() => {
                                    console.log('Button clicked for grade:', g.value);
                                    handleChangeGrade(g.value);
                                }}
                                disabled={isUpdating}
                                className={`p-4 rounded-xl text-center transition-all cursor-pointer bg-white/5 border border-white/10 ${g.value === currentGrade
                                    ? 'ring-2 ring-neon-pink bg-neon-pink/20'
                                    : 'hover:bg-white/10 hover:border-neon-pink/50'
                                    } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <span className="text-2xl block mb-1">{g.emoji}</span>
                                <span className="text-sm font-medium">{g.label}</span>
                                {g.value === currentGrade && (
                                    <span className="block text-xs text-neon-pink mt-1">Đang chọn</span>
                                )}
                            </button>
                        ))}
                    </div>

                    {isUpdating && (
                        <div className="mt-4 text-center text-neon-blue text-sm flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-neon-blue border-t-transparent rounded-full animate-spin" />
                            Đang cập nhật...
                        </div>
                    )}
                </motion.div>

                {/* Stats */}
                <motion.div
                    className="glass-strong rounded-2xl p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h3 className="font-bold text-white mb-4">Thành tích</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-neon-orange/10 text-center">
                            <p className="text-3xl mb-1">🔥</p>
                            <p className="text-2xl font-bold text-neon-orange">{streak}</p>
                            <p className="text-xs text-white/50">Streak</p>
                        </div>
                        <div className="p-4 rounded-xl bg-neon-green/10 text-center">
                            <p className="text-3xl mb-1">✅</p>
                            <p className="text-2xl font-bold text-neon-green">{completedLessons.length}</p>
                            <p className="text-xs text-white/50">Bài hoàn thành</p>
                        </div>
                        <div className="p-4 rounded-xl bg-neon-blue/10 text-center">
                            <p className="text-3xl mb-1">📊</p>
                            <p className="text-2xl font-bold text-neon-blue">{averageScore}%</p>
                            <p className="text-xs text-white/50">Điểm TB</p>
                        </div>
                        <div className="p-4 rounded-xl bg-neon-purple/10 text-center">
                            <p className="text-3xl mb-1">🏆</p>
                            <p className="text-2xl font-bold text-neon-purple">{scores.filter(s => s.progress === 100).length}</p>
                            <p className="text-xs text-white/50">Điểm tuyệt đối</p>
                        </div>
                    </div>
                </motion.div>

                {/* Actions */}
                <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <button
                        onClick={handleResetProgress}
                        className="w-full py-4 px-6 rounded-xl glass text-white/60 hover:text-white hover:bg-white/10 transition-colors text-left flex items-center gap-3"
                    >
                        <span>🗑️</span>
                        <span>Xóa tiến trình học</span>
                    </button>
                    <button
                        onClick={handleSignOut}
                        className="w-full py-4 px-6 rounded-xl glass text-neon-pink hover:bg-neon-pink/20 transition-colors text-left flex items-center gap-3"
                    >
                        <span>🚪</span>
                        <span>Đăng xuất</span>
                    </button>
                </motion.div>
            </div>
        </main>
    );
}
