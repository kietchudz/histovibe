import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { calculateHistoVibeProgress } from '@/lib/progress';

interface LessonScore {
    progress: number;
    message: string;
    wrongAnswers: number;
    completedAt: string;
}

interface HistoVibeState {
    streak: number;
    lastStudyDate: string | null;
    completedLessons: string[];
    lessonProgress: Record<string, number>;
    lessonScores: Record<string, LessonScore>;
    isMuted: boolean;
    grade: 10 | 11 | 12;
    setGrade: (grade: 10 | 11 | 12) => void;
    updateStreak: () => void;
    checkStreakDecay: () => void;
    markLessonComplete: (lessonId: string) => void;
    saveLessonProgress: (lessonId: string, cardIndex: number) => void;
    saveLessonScore: (lessonId: string, isContentRead: boolean, wrongAnswers: number) => void;
    toggleMute: () => void;
    resetProgress: () => void;
    clearLocalData: () => void;
    getTotalProgress: () => number;
}

const getTodayString = () => new Date().toISOString().split('T')[0];

export const useStore = create<HistoVibeState>()(
    persist(
        (set, get) => ({
            streak: 0,
            lastStudyDate: null,
            completedLessons: [],
            lessonProgress: {},
            lessonScores: {},
            isMuted: false,
            grade: 10,

            setGrade: (grade: 10 | 11 | 12) => set({ grade }),

            updateStreak: () => {
                const today = getTodayString();
                const { lastStudyDate, streak } = get();
                if (lastStudyDate === today) return;
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const yesterdayString = yesterday.toISOString().split('T')[0];
                if (lastStudyDate === yesterdayString) {
                    set({ streak: streak + 1, lastStudyDate: today });
                } else {
                    set({ streak: 1, lastStudyDate: today });
                }
            },

            checkStreakDecay: () => {
                const today = getTodayString();
                const { lastStudyDate } = get();
                if (!lastStudyDate) return;
                if (lastStudyDate === today) return;
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const yesterdayString = yesterday.toISOString().split('T')[0];
                if (lastStudyDate !== yesterdayString) {
                    // More than 1 day without studying → streak lost
                    set({ streak: 0 });
                }
            },

            markLessonComplete: (lessonId: string) => {
                const { completedLessons } = get();
                if (!completedLessons.includes(lessonId)) {
                    set({ completedLessons: [...completedLessons, lessonId] });
                }
            },

            saveLessonProgress: (lessonId: string, cardIndex: number) => {
                const { lessonProgress } = get();
                set({ lessonProgress: { ...lessonProgress, [lessonId]: cardIndex } });
            },

            saveLessonScore: (lessonId: string, isContentRead: boolean, wrongAnswers: number) => {
                const { lessonScores } = get();
                const { progress, message } = calculateHistoVibeProgress({
                    isContentRead,
                    totalQuestions: 5,
                    wrongAnswers
                });
                set({
                    lessonScores: {
                        ...lessonScores,
                        [lessonId]: {
                            progress,
                            message,
                            wrongAnswers,
                            completedAt: new Date().toISOString()
                        }
                    }
                });
            },

            toggleMute: () => set({ isMuted: !get().isMuted }),

            resetProgress: () => set({
                streak: 0,
                lastStudyDate: null,
                completedLessons: [],
                lessonProgress: {},
                lessonScores: {},
                grade: 10,
            }),

            // Clear local data on logout (preserves grade)
            clearLocalData: () => set({
                streak: 0,
                lastStudyDate: null,
                completedLessons: [],
                lessonProgress: {},
                lessonScores: {},
            }),

            getTotalProgress: () => {
                const { lessonScores } = get();
                const scores = Object.values(lessonScores);
                if (scores.length === 0) return 0;
                const total = scores.reduce((sum, s) => sum + s.progress, 0);
                return Math.round(total / scores.length);
            },
        }),
        { name: 'histovibe-storage' }
    )
);
