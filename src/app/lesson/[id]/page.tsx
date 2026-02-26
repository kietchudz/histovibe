'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getLesson } from '@/lib/lessons';
import { StoryViewer, AudioPlayer } from '@/components';
import type { Lesson } from '@/types/lesson';

export default function LessonPage() {
    const params = useParams();
    const router = useRouter();
    const [lesson, setLesson] = useState<Lesson | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const lessonId = params.id as string;
        const lessonData = getLesson(lessonId);
        if (lessonData) setLesson(lessonData);
        setLoading(false);
    }, [params.id]);

    const handleClose = () => router.push('/');

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-4xl mb-4 animate-pulse">⏳</div>
                    <p className="text-white/60">Đang tải bài học...</p>
                </div>
            </div>
        );
    }

    if (!lesson) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="glass-strong rounded-3xl p-8 text-center max-w-md">
                    <div className="text-6xl mb-4">😢</div>
                    <h2 className="text-xl font-bold mb-2">Không tìm thấy bài học</h2>
                    <p className="text-white/60 mb-6">Bài học này chưa có hoặc đường dẫn không đúng.</p>
                    <button onClick={handleClose} className="px-6 py-3 rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple font-semibold">
                        ← Quay lại trang chủ
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <StoryViewer lesson={lesson} onClose={handleClose} />
            <AudioPlayer />
        </>
    );
}
