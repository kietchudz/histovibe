// HistoVibe Progress Calculator
// Based on user's learning progress and quiz performance

type ProgressInput = {
    isContentRead: boolean;
    totalQuestions: number;
    wrongAnswers: number;
};

type ProgressResult = {
    progress: number;
    message: string;
};

export const calculateHistoVibeProgress = ({
    isContentRead,
    totalQuestions = 5,
    wrongAnswers
}: ProgressInput): ProgressResult => {
    // 1. Chưa đọc xong thì 0% luôn
    if (!isContentRead) {
        return {
            progress: 0,
            message: "Vào học đi ní, lướt Tóp Tóp ít thôi! 🛑"
        };
    }

    // 2. Base 50% (đã đọc xong nội dung)
    const baseScore = 50;

    // 3. Tính điểm phạt (Mỗi câu sai trừ 10%)
    const penalty = wrongAnswers * 10;
    const quizMaxScore = 50;
    const quizScore = Math.max(0, quizMaxScore - penalty);

    // 4. Tổng progress
    const totalProgress = baseScore + quizScore;

    // 5. Gen Z Message based on progress
    let message = "";
    if (totalProgress === 100) {
        message = "Out trình! 💯 Sách giáo khoa gọi bằng cụ!";
    } else if (totalProgress >= 80) {
        message = "Cũng 'ra dẻ' đấy! Sắp thành trùm rồi. 😎";
    } else if (totalProgress >= 60) {
        message = "Ổn áp. Nhưng cần check lại kiến thức chút nha. 🤔";
    } else if (totalProgress === 50) {
        message = "Mới đọc xong thôi hả? Làm bài tập đi đừng lười! 🏃‍♂️";
    } else {
        message = "Học lại đi ní ơi, mất gốc thực sự! SOS 🆘";
    }

    return { progress: totalProgress, message };
};
