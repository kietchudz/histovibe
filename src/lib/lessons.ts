import type { Lesson, LessonMeta } from '@/types/lesson';

// Grade 10 lessons
import grade10Lesson1 from '@/data/lessons/grade10_lesson1.json';
import grade10Lesson2 from '@/data/lessons/grade10_lesson2.json';
import grade10Lesson3 from '@/data/lessons/grade10_lesson3.json';
import grade10Lesson4 from '@/data/lessons/grade10_lesson4.json';
import grade10Lesson5 from '@/data/lessons/grade10_lesson5.json';
import grade10Lesson6 from '@/data/lessons/grade10_lesson6.json';
import grade10Lesson7 from '@/data/lessons/grade10_lesson7.json';
import grade10Lesson8 from '@/data/lessons/grade10_lesson8.json';
import grade10Lesson9 from '@/data/lessons/grade10_lesson9.json';
import grade10Lesson10 from '@/data/lessons/grade10_lesson10.json';
import grade10Lesson11 from '@/data/lessons/grade10_lesson11.json';
import grade10Lesson12 from '@/data/lessons/grade10_lesson12.json';
import grade10Lesson13 from '@/data/lessons/grade10_lesson13.json';
import grade10Lesson14 from '@/data/lessons/grade10_lesson14.json';
import grade10Lesson15 from '@/data/lessons/grade10_lesson15.json';
import grade10Lesson16 from '@/data/lessons/grade10_lesson16.json';
import grade10Lesson17 from '@/data/lessons/grade10_lesson17.json';

// Grade 11 lessons
import grade11Lesson1 from '@/data/lessons/grade11_lesson1.json';
import grade11Lesson2 from '@/data/lessons/grade11_lesson2.json';
import grade11Lesson3 from '@/data/lessons/grade11_lesson3.json';
import grade11Lesson4 from '@/data/lessons/grade11_lesson4.json';
import grade11Lesson5 from '@/data/lessons/grade11_lesson5.json';
import grade11Lesson6 from '@/data/lessons/grade11_lesson6.json';
import grade11Lesson7 from '@/data/lessons/grade11_lesson7.json';
import grade11Lesson8 from '@/data/lessons/grade11_lesson8.json';
import grade11Lesson9 from '@/data/lessons/grade11_lesson9.json';
import grade11Lesson10 from '@/data/lessons/grade11_lesson10.json';
import grade11Lesson11 from '@/data/lessons/grade11_lesson11.json';
import grade11Lesson12 from '@/data/lessons/grade11_lesson12.json';
import grade11Lesson13 from '@/data/lessons/grade11_lesson13.json';

// Grade 12 lessons
import grade12Lesson1 from '@/data/lessons/grade12_lesson1.json';
import grade12Lesson2 from '@/data/lessons/grade12_lesson2.json';
import grade12Lesson3 from '@/data/lessons/grade12_lesson3.json';
import grade12Lesson4 from '@/data/lessons/grade12_lesson4.json';
import grade12Lesson5 from '@/data/lessons/grade12_lesson5.json';
import grade12Lesson6 from '@/data/lessons/grade12_lesson6.json';
import grade12Lesson7 from '@/data/lessons/grade12_lesson7.json';
import grade12Lesson8 from '@/data/lessons/grade12_lesson8.json';
import grade12Lesson9 from '@/data/lessons/grade12_lesson9.json';
import grade12Lesson10 from '@/data/lessons/grade12_lesson10.json';
import grade12Lesson11 from '@/data/lessons/grade12_lesson11.json';
import grade12Lesson12 from '@/data/lessons/grade12_lesson12.json';
import grade12Lesson13 from '@/data/lessons/grade12_lesson13.json';
import grade12Lesson14 from '@/data/lessons/grade12_lesson14.json';
import grade12Lesson15 from '@/data/lessons/grade12_lesson15.json';
import grade12Lesson16 from '@/data/lessons/grade12_lesson16.json';

const lessons: Record<string, Lesson> = {
    // Grade 10
    'grade10_lesson1': grade10Lesson1 as Lesson,
    'grade10_lesson2': grade10Lesson2 as Lesson,
    'grade10_lesson3': grade10Lesson3 as Lesson,
    'grade10_lesson4': grade10Lesson4 as Lesson,
    'grade10_lesson5': grade10Lesson5 as Lesson,
    'grade10_lesson6': grade10Lesson6 as Lesson,
    'grade10_lesson7': grade10Lesson7 as Lesson,
    'grade10_lesson8': grade10Lesson8 as Lesson,
    'grade10_lesson9': grade10Lesson9 as Lesson,
    'grade10_lesson10': grade10Lesson10 as Lesson,
    'grade10_lesson11': grade10Lesson11 as Lesson,
    'grade10_lesson12': grade10Lesson12 as Lesson,
    'grade10_lesson13': grade10Lesson13 as Lesson,
    'grade10_lesson14': grade10Lesson14 as Lesson,
    'grade10_lesson15': grade10Lesson15 as Lesson,
    'grade10_lesson16': grade10Lesson16 as Lesson,
    'grade10_lesson17': grade10Lesson17 as Lesson,
    // Grade 11
    'grade11_lesson1': grade11Lesson1 as Lesson,
    'grade11_lesson2': grade11Lesson2 as Lesson,
    'grade11_lesson3': grade11Lesson3 as Lesson,
    'grade11_lesson4': grade11Lesson4 as Lesson,
    'grade11_lesson5': grade11Lesson5 as Lesson,
    'grade11_lesson6': grade11Lesson6 as Lesson,
    'grade11_lesson7': grade11Lesson7 as Lesson,
    'grade11_lesson8': grade11Lesson8 as Lesson,
    'grade11_lesson9': grade11Lesson9 as Lesson,
    'grade11_lesson10': grade11Lesson10 as Lesson,
    'grade11_lesson11': grade11Lesson11 as Lesson,
    'grade11_lesson12': grade11Lesson12 as Lesson,
    'grade11_lesson13': grade11Lesson13 as Lesson,
    // Grade 12
    'grade12_lesson1': grade12Lesson1 as Lesson,
    'grade12_lesson2': grade12Lesson2 as Lesson,
    'grade12_lesson3': grade12Lesson3 as Lesson,
    'grade12_lesson4': grade12Lesson4 as Lesson,
    'grade12_lesson5': grade12Lesson5 as Lesson,
    'grade12_lesson6': grade12Lesson6 as Lesson,
    'grade12_lesson7': grade12Lesson7 as Lesson,
    'grade12_lesson8': grade12Lesson8 as Lesson,
    'grade12_lesson9': grade12Lesson9 as Lesson,
    'grade12_lesson10': grade12Lesson10 as Lesson,
    'grade12_lesson11': grade12Lesson11 as Lesson,
    'grade12_lesson12': grade12Lesson12 as Lesson,
    'grade12_lesson13': grade12Lesson13 as Lesson,
    'grade12_lesson14': grade12Lesson14 as Lesson,
    'grade12_lesson15': grade12Lesson15 as Lesson,
    'grade12_lesson16': grade12Lesson16 as Lesson,
};

export function getLesson(id: string): Lesson | null {
    return lessons[id] || null;
}

export function getAllLessonMeta(): LessonMeta[] {
    return Object.values(lessons).map(lesson => ({
        id: lesson.id,
        title: lesson.title,
        genZTitle: lesson.genZTitle,
        level: lesson.level,
        cardCount: lesson.cards.length,
        quizCount: lesson.quiz.length,
    }));
}

export function getLessonsByLevel(level: 10 | 11 | 12): LessonMeta[] {
    return getAllLessonMeta().filter(lesson => lesson.level === level);
}

export const LESSON_COUNTS = { 10: 17, 11: 13, 12: 16 } as const;
