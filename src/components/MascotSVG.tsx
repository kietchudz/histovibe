'use client';

import { motion } from 'framer-motion';

export type MascotVariant = 'happy' | 'sad' | 'teacher' | 'default';

interface MascotProps {
    variant?: MascotVariant;
    className?: string;
    animate?: boolean;
}

export default function MascotSVG({ variant = 'default', className = 'w-32 h-40', animate = true }: MascotProps) {
    const isSad = variant === 'sad';
    const isTeacher = variant === 'teacher';
    const isHappy = variant === 'happy';

    // Animation configuration
    const floatingAnimation = animate ? { y: [0, -4, 0] } : {};
    const floatingTransition = animate ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {};

    return (
        <motion.div
            className={`relative ${className}`}
            animate={floatingAnimation}
            transition={floatingTransition}
        >
            <svg viewBox="0 0 200 260" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                {/* === DEF & GRADIENTS === */}
                <defs>
                    <linearGradient id="dressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FF69B4" />
                        <stop offset="50%" stopColor="#FF1493" />
                        <stop offset="100%" stopColor="#DB7093" />
                    </linearGradient>
                    <linearGradient id="teacherDressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8A2BE2" />
                        <stop offset="50%" stopColor="#4B0082" />
                        <stop offset="100%" stopColor="#483D8B" />
                    </linearGradient>
                    <linearGradient id="furGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFE4C4" />
                        <stop offset="100%" stopColor="#FFDAB9" />
                    </linearGradient>
                    <radialGradient id="cheekGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#FF69B4" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#FF69B4" stopOpacity="0" />
                    </radialGradient>
                </defs>

                {/* === DRESS === */}
                {/* Use a slightly different color if teacher variant for fun, or keep same. Let's keep the pink dress for brand consistency, or purple for teacher. Let's use pink */}
                <path d="M60 155 Q100 150 140 155 L155 240 Q100 250 45 240 Z" fill={isTeacher ? "url(#teacherDressGrad)" : "url(#dressGrad)"} />

                {/* Dress sparkles (only if animated) */}
                {animate && (
                    <>
                        <circle cx="80" cy="190" r="2" fill="white" opacity="0.7">
                            <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="120" cy="180" r="1.5" fill="white" opacity="0.5">
                            <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="95" cy="210" r="2" fill="white" opacity="0.6">
                            <animate attributeName="opacity" values="0.2;0.9;0.2" dur="2.5s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="110" cy="225" r="1.5" fill="white" opacity="0.4">
                            <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite" />
                        </circle>
                    </>
                )}
                {/* Dress collar */}
                <ellipse cx="100" cy="155" rx="25" ry="6" fill={isTeacher ? "#9370DB" : "#FF1493"} />

                {/* === CAT HEAD === */}
                {/* Head base */}
                <ellipse cx="100" cy="100" rx="50" ry="45" fill="url(#furGrad)" />

                {/* Left Ear */}
                <polygon points="60,65 50,25 80,55" fill="#FFDAB9" />
                <polygon points="63,62 55,32 77,55" fill="#FFB6C1" />

                {/* Right Ear */}
                <polygon points="140,65 150,25 120,55" fill="#FFDAB9" />
                <polygon points="137,62 145,32 123,55" fill="#FFB6C1" />

                {/* === TÓC HAI MÁI === */}
                <path d="M55 75 Q70 50 100 60 Q85 70 70 80 Z" fill="#8B4513" />
                <path d="M145 75 Q130 50 100 60 Q115 70 130 80 Z" fill="#8B4513" />
                <path d="M65 65 Q80 35 100 40 Q120 35 135 65 Q120 50 100 52 Q80 50 65 65" fill="#8B4513" />

                {/* === FACE === */}
                {/* Eyes */}
                {isSad ? (
                    <>
                        {/* Angry/Sad Eyes */}
                        <path d="M72 95 Q80 88 88 95 Q80 92 72 95 Z" fill="#2C1810" />
                        <path d="M112 95 Q120 88 128 95 Q120 92 112 95 Z" fill="#2C1810" />
                        {/* Tear drops */}
                        {animate ? (
                            <>
                                <path d="M72 102 Q72 106 75 106 Q78 106 78 102 Q78 98 75 95 Q72 98 72 102 Z" fill="#87CEEB" opacity="0.8">
                                    <animate attributeName="transform" type="translate" values="0,0; 0,5; 0,0" dur="2s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" values="0.8; 0; 0.8" dur="2s" repeatCount="indefinite" />
                                </path>
                                <path d="M125 105 Q125 109 128 109 Q131 109 131 105 Q131 101 128 98 Q125 101 125 105 Z" fill="#87CEEB" opacity="0.8">
                                    <animate attributeName="transform" type="translate" values="0,0; 0,6; 0,0" dur="1.5s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" values="0.8; 0; 0.8" dur="1.5s" repeatCount="indefinite" />
                                </path>
                            </>
                        ) : (
                            <>
                                <path d="M72 102 Q72 106 75 106 Q78 106 78 102 Q78 98 75 95 Q72 98 72 102 Z" fill="#87CEEB" opacity="0.8" />
                                <path d="M125 105 Q125 109 128 109 Q131 109 131 105 Q131 101 128 98 Q125 101 125 105 Z" fill="#87CEEB" opacity="0.8" />
                            </>
                        )}
                    </>
                ) : (
                    <>
                        {/* Happy / Default / Teacher Eyes */}
                        <ellipse cx="80" cy="95" rx="8" ry="9" fill="white" />
                        <ellipse cx="120" cy="95" rx="8" ry="9" fill="white" />
                        {/* Pupils */}
                        <ellipse cx={isTeacher ? "85" : "82"} cy="96" rx="5" ry="6" fill="#2C1810" />
                        <ellipse cx={isTeacher ? "125" : "122"} cy="96" rx="5" ry="6" fill="#2C1810" />
                        {/* Eye shine */}
                        <circle cx={isTeacher ? "87" : "84"} cy="93" r="2.5" fill="white" />
                        <circle cx={isTeacher ? "127" : "124"} cy="93" r="2.5" fill="white" />
                    </>
                )}

                {/* Glasses for teacher variant */}
                {isTeacher && (
                    <g>
                        <rect x="65" y="85" width="30" height="20" rx="4" fill="none" stroke="#D4AF37" strokeWidth="2.5" />
                        <rect x="105" y="85" width="30" height="20" rx="4" fill="none" stroke="#D4AF37" strokeWidth="2.5" />
                        <line x1="95" y1="95" x2="105" y2="95" stroke="#D4AF37" strokeWidth="2.5" />
                        {/* Shine on glasses */}
                        <line x1="70" y1="90" x2="80" y2="100" stroke="white" strokeWidth="1" opacity="0.5" />
                        <line x1="110" y1="90" x2="120" y2="100" stroke="white" strokeWidth="1" opacity="0.5" />
                    </g>
                )}

                {/* Cheek blush */}
                <ellipse cx="68" cy="108" rx="8" ry="5" fill="url(#cheekGlow)" />
                <ellipse cx="132" cy="108" rx="8" ry="5" fill="url(#cheekGlow)" />

                {/* Nose */}
                <ellipse cx="100" cy="105" rx="3" ry="2.5" fill="#FFB6C1" />

                {/* Mouth */}
                <g>
                    {isSad ? (
                        <>
                            <path d="M92 118 Q100 110 108 118" stroke="#2C1810" strokeWidth="2" fill="none" opacity="1">
                                {animate && <animate attributeName="opacity" values="1;1;0;0;1;1" dur="2s" repeatCount="indefinite" />}
                            </path>
                            {animate && (
                                <g opacity="0">
                                    <animate attributeName="opacity" values="0;0;1;1;0;0" dur="2s" repeatCount="indefinite" />
                                    <path d="M92 115 Q100 110 108 115 Q108 125 100 125 Q92 125 92 115 Z" fill="#2C1810" />
                                    <ellipse cx="100" cy="122" rx="6" ry="2" fill="#FF6B6B" />
                                </g>
                            )}
                        </>
                    ) : isHappy ? (
                        <>
                            <path d="M88 114 Q95 120 100 118 Q108 122 115 114" stroke="#2C1810" strokeWidth="2" fill="none" opacity="1">
                                {animate && <animate attributeName="opacity" values="1;1;0;0;1;1" dur="3s" repeatCount="indefinite" />}
                            </path>
                            {animate && (
                                <g opacity="0">
                                    <animate attributeName="opacity" values="0;0;1;1;0;0" dur="3s" repeatCount="indefinite" />
                                    <path d="M88 112 Q95 108 100 112 Q108 108 115 112 Q110 126 100 128 Q90 126 88 112 Z" fill="#FF6B6B" />
                                    <ellipse cx="100" cy="122" rx="6" ry="3" fill="#CC4444" />
                                </g>
                            )}
                        </>
                    ) : (
                        /* Default / Teacher mouth: small cute smile */
                        <path d="M92 114 Q96 118 100 114 Q104 118 108 114" stroke="#2C1810" strokeWidth="2" fill="none" />
                    )}
                </g>

                {/* Whiskers */}
                <line x1="55" y1="100" x2="75" y2="105" stroke="#2C1810" strokeWidth="1" opacity="0.4" />
                <line x1="55" y1="108" x2="75" y2="108" stroke="#2C1810" strokeWidth="1" opacity="0.4" />
                <line x1="125" y1="105" x2="145" y2="100" stroke="#2C1810" strokeWidth="1" opacity="0.4" />
                <line x1="125" y1="108" x2="145" y2="108" stroke="#2C1810" strokeWidth="1" opacity="0.4" />

                {/* === ARMS === */}
                {/* Left arm */}
                <g>
                    {animate ? (
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            values="0 55 160;-15 55 160;0 55 160;10 55 160;0 55 160"
                            dur="2s"
                            repeatCount="indefinite"
                        />
                    ) : null}
                    {isTeacher ? (
                        /* Holding a pointer stick */
                        <>
                            {/* Pointing arm */}
                            <path d="M60 158 Q20 120 10 90" stroke="url(#furGrad)" strokeWidth="12" strokeLinecap="round" fill="none" />
                            {/* Stick (moved inside viewbox) */}
                            <line x1="15" y1="95" x2="30" y2="20" stroke="#8B4513" strokeWidth="4" />
                            <circle cx="30" cy="20" r="3.5" fill="red" />
                            <circle cx="10" cy="90" r="8" fill="#FFDAB9" />
                        </>
                    ) : (
                        <>
                            <path d="M60 158 Q40 145 30 125" stroke="url(#furGrad)" strokeWidth="12" strokeLinecap="round" fill="none" />
                            <circle cx="28" cy="122" r="7" fill="#FFDAB9" />
                        </>
                    )}
                </g>

                {/* Right arm */}
                <g>
                    {animate ? (
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            values="0 145 160;5 145 160;0 145 160;-5 145 160;0 145 160"
                            dur="2.5s"
                            repeatCount="indefinite"
                        />
                    ) : null}
                    <path d="M140 158 Q160 145 165 130" stroke="url(#furGrad)" strokeWidth="12" strokeLinecap="round" fill="none" />
                    <circle cx="167" cy="127" r="7" fill="#FFDAB9" />
                </g>

                {/* === TIARA/CROWN === */}
                <path d="M78 58 L82 45 L90 55 L100 38 L110 55 L118 45 L122 58" fill="gold" stroke="#DAA520" strokeWidth="1" />
                <circle cx="100" cy="42" r="3" fill="#FF69B4" />
                <circle cx="88" cy="50" r="2" fill="#87CEEB" />
                <circle cx="112" cy="50" r="2" fill="#87CEEB" />

                {/* === TAIL === */}
                <path d="M145 200 Q170 180 165 160 Q175 155 170 145" stroke="#FFDAB9" strokeWidth="8" strokeLinecap="round" fill="none">
                    {animate && (
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            values="0 145 200;5 145 200;0 145 200;-3 145 200;0 145 200"
                            dur="3s"
                            repeatCount="indefinite"
                        />
                    )}
                </path>
            </svg>
        </motion.div>
    );
}
