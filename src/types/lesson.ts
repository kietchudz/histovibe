// Lesson Types for HistoVibe

export type CardType = "text" | "quote" | "timeline";

export interface Card {
    id: number;
    type: CardType;
    content: string;
    note?: string;
    url?: string;
}

export interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
}

export interface Lesson {
    id: string;
    title: string;
    genZTitle: string;
    level: 10 | 11 | 12;
    cards: Card[];
    quiz: QuizQuestion[];
    url?: string;
}

export interface LessonMeta {
    id: string;
    title: string;
    genZTitle: string;
    level: 10 | 11 | 12;
    cardCount: number;
    quizCount: number;
}
