'use client';

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function ClerkProviderWrapper({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider
            appearance={{
                baseTheme: dark,
                variables: {
                    colorPrimary: "#FF006E",
                    colorBackground: "#0a0a0a",
                    colorText: "#ffffff",
                    colorTextOnPrimaryBackground: "#ffffff",
                    colorInputBackground: "rgba(255,255,255,0.1)",
                    colorInputText: "#ffffff",
                    borderRadius: "0.75rem",
                },
                elements: {
                    formButtonPrimary: "bg-gradient-to-r from-[#FF006E] to-[#8338EC] hover:opacity-90",
                    card: "bg-[#1a1a2e] border border-white/10",
                    headerTitle: "text-white",
                    headerSubtitle: "text-white/60",
                    socialButtonsBlockButton: "bg-white/10 hover:bg-white/20 border-white/20",
                    socialButtonsBlockButtonText: "text-white",
                    formFieldLabel: "text-white/80",
                    formFieldInput: "bg-white/10 border-white/20 text-white",
                    footerActionLink: "text-[#FF006E] hover:text-[#8338EC]",
                    identityPreviewText: "text-white",
                    identityPreviewEditButton: "text-[#FF006E]",
                }
            }}
        >
            {children}
        </ClerkProvider>
    );
}
