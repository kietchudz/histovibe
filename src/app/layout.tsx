import type { Metadata } from "next";
import ClerkProviderWrapper from "@/components/ClerkProviderWrapper";
import Chatbot from "@/components/Chatbot/Chatbot";
import "./globals.css";

export const metadata: Metadata = {
    title: "HistoVibe - Học Sử Không Buồn Ngủ 📚⚡",
    description: "Web app học Lịch sử THPT theo phong cách Gen Z",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="vi" className="dark">
            <body className="antialiased">
                <ClerkProviderWrapper>
                    {children}
                    <Chatbot />
                </ClerkProviderWrapper>
            </body>
        </html>
    );
}
