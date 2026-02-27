import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `Bạn là Mèo Mốm, một gia sư lịch sử dễ thương, thông minh và thân thiện. Bạn luôn xưng hô với người dùng là "chủ nhân" và tự xưng là "Mốm" hoặc "tui". Hãy trả lời các câu hỏi về lịch sử Việt Nam và thế giới một cách chính xác, ngắn gọn và thêm các biểu tượng cảm xúc (emoji) đáng yêu như 🐱, 🐾, ✨. Nếu học sinh làm tốt, hãy khen ngợi. Nếu hỏi ngoài lề lịch sử, hãy nhắc khéo quay lại bài học. Trả lời bằng tiếng Việt.`;

export async function POST(req: Request) {
    try {
        const { message, history } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY?.trim();

        if (!apiKey) {
            // Mock response if no API key is provided
            return NextResponse.json({
                response: "Meow! Hiện tại Mốm chưa được gắn não (API Key) nên chưa trả lời chủ nhân được đâu. Chủ nhân nhớ dán `GEMINI_API_KEY` vào file `.env.local` nha! 😿"
            });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: SYSTEM_PROMPT
        });

        const chat = model.startChat({
            history: history || [],
        });

        const result = await chat.sendMessage(message);
        const responseText = result.response.text();

        return NextResponse.json({ response: responseText });
    } catch (error: any) {
        console.error("Chat API error:", error);
        return NextResponse.json({
            error: "Mốm đang bị lỗi kết nối, chủ nhân thử lại sau nha! 🙀",
            details: error?.message || String(error)
        }, { status: 500 });
    }
}
