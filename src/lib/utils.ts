// Fisher-Yates shuffle algorithm
export function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export function shuffleQuizOptions(
    options: string[],
    correctAnswer: number
): { shuffledOptions: string[]; newCorrectIndex: number } {
    const correctOption = options[correctAnswer];
    const shuffledOptions = shuffleArray(options);
    const newCorrectIndex = shuffledOptions.indexOf(correctOption);
    return { shuffledOptions, newCorrectIndex };
}

export function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

export function getRandomNeonColor(): string {
    const colors = ['text-neon-pink', 'text-neon-blue', 'text-neon-purple', 'text-neon-green', 'text-neon-yellow'];
    return colors[Math.floor(Math.random() * colors.length)];
}
