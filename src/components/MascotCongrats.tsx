'use client';

import { motion } from 'framer-motion';
import MascotSVG from './MascotSVG';

interface MascotCongratsProps {
    score: number;
    total: number;
}

export default function MascotCongrats({ score, total }: MascotCongratsProps) {
    // Logic for Mèo Mốm's dialogue
    const ratio = score / total;
    const isLowScore = ratio < 0.6; // Dưới 3/5 (60%)

    // Thêm các câu thoại
    const sadMessages = [
        "Trời đất ơi, chủ nhân làm kiểu gì mà chỉ được ",
        "Chê nha! Sao chủ nhân chỉ đạt ",
        "Huhu Mốm buồn quá đi, chủ nhân chỉ đúng ",
    ];
    const sadEndings = [
        " vậy? 😿 Đọc bài lại giùm tui nha!",
        " thôi á? 😾 Này là chưa học bài kỹ đúng hông?",
        " thế này! 🙀 Ôn lại lý thuyết ngay đi!",
    ];

    const happyMessages = [
        "✨ Chúc mừng chủ nhân đã đạt ",
        "Đỉnh quá! Chủ nhân xuất sắc đạt ",
        "Meow! Chủ nhân tuyệt vời, đúng tận ",
    ];
    const happyEndings = [
        ", chủ nhân đã vất vả rồi! 💕",
        " luôn! Tự hào muốn bớt rụng lông! 😻",
        " lận đó! Mốm thưởng cho gặm cá! 🐟",
    ];

    // Lấy ngẫu nhiên cẩu thoại cho khỏi chán (có thể dùng index cố định dưa vào điểm để đỡ bị chớp chớp, hoặc thôi cứ randomize)
    // Để an toàn hydrate / render client bên này không lo vì nó mount xong mới tính (hoặc cứ random đơn giản)
    // Dùng memo hoặc hash nhỏ để nhất quán nếu cần, nhưng quiz chỉ chiếu 1 lần nên random thẳng
    const randomIdx = (score + total) % 3; // Hack nhỏ để random theo số cho đồng nhất ko break hydration

    const messagePrefix = isLowScore ? sadMessages[randomIdx] : happyMessages[randomIdx];
    const messageSuffix = isLowScore ? sadEndings[randomIdx] : happyEndings[randomIdx];
    const scoreColor = isLowScore ? "text-neon-pink" : "text-neon-green";

    return (
        <motion.div
            className="mt-6 flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
        >
            {/* Speech Bubble */}
            <motion.div
                className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 max-w-[280px] text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8, duration: 0.4 }}
            >
                <p className="text-sm text-white/90 leading-relaxed">
                    {messagePrefix}
                    <span className={`font-bold ${scoreColor}`}>{score}/{total}</span>
                    {messageSuffix}
                </p>
                {/* Speech bubble tail */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/10 border-b border-r border-white/20 rotate-45" />
            </motion.div>

            {/* Mèo Mốm Character */}
            <MascotSVG
                variant={isLowScore ? 'sad' : 'happy'}
                className="w-32 h-40"
            />

            {/* Name tag */}
            <motion.p
                className="text-xs text-neon-pink font-display font-bold tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
            >
                ~ Mèo Mốm ~
            </motion.p>
        </motion.div>
    );
}
