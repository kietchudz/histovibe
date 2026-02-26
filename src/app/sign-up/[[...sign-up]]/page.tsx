import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <main className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-neon-pink/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-neon-purple/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-neon-blue/20 rounded-full blur-3xl" />

            <div className="relative z-10 w-full max-w-md px-4">
                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-display font-bold mb-2">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue">
                            HistoVibe
                        </span>
                    </h1>
                    <p className="text-white/60">Gia nhập cộng đồng Gen Z yêu sử! 🚀</p>
                </div>

                {/* Clerk Sign Up */}
                <SignUp
                    appearance={{
                        elements: {
                            rootBox: "w-full",
                            card: "w-full shadow-2xl shadow-neon-purple/20",
                        }
                    }}
                    routing="path"
                    path="/sign-up"
                />
            </div>
        </main>
    );
}
