import { motion } from "framer-motion";
import { HeartDoodle } from "./doodles/HeartDoodle";
import { useState, useEffect } from "react";

interface ValentineButtonProps {
  variant: "yes" | "no";
  onClick: () => void;
  children: React.ReactNode;
  isEvading?: boolean;
  noCount?: number;
}

// Funny messages when clicking no
const noButtonTexts = [
  "No 😅",
  "Nope 🙈",
  "Still no? 😢",
  "Really? 💔",
  "Aw cmon! 🥺",
  "Pweease? 🐶",
  "Last chance!",
  "FINE. Yes.",
  "💕 Yes 💕",
];

export const ValentineButton = ({ 
  variant, 
  onClick, 
  children,
  isEvading = false,
  noCount = 0
}: ValentineButtonProps) => {
  const [isWobbling, setIsWobbling] = useState(false);
  const [buttonText, setButtonText] = useState(children);
  
  // For "no" button - update text based on noCount
  useEffect(() => {
    if (variant === "no" && noCount > 0) {
      const textIndex = Math.min(noCount, noButtonTexts.length - 1);
      setButtonText(noButtonTexts[textIndex]);
    }
  }, [noCount, variant]);

  const handleClick = () => {
    setIsWobbling(true);
    setTimeout(() => setIsWobbling(false), 500);
    onClick();
  };

  // Calculate shrinking for no button
  const noShrinkScale = variant === "no" ? Math.max(0.4, 1 - noCount * 0.08) : 1;
  const noRotation = variant === "no" ? (noCount % 2 === 0 ? -5 : 5) * Math.min(noCount, 5) : 0;
  
  // Check if no button should turn into yes
  const shouldBecomeYes = variant === "no" && noCount >= noButtonTexts.length - 2;

  // Different border-radius for hand-drawn look
  const borderRadiusVariants = [
    "40% 60% 55% 45% / 55% 45% 55% 45%",
    "55% 45% 50% 50% / 45% 55% 45% 55%",
    "45% 55% 60% 40% / 50% 50% 55% 45%",
    "50% 50% 45% 55% / 55% 45% 50% 50%",
    "60% 40% 55% 45% / 45% 55% 60% 40%",
  ];

  const currentBorderRadius = borderRadiusVariants[noCount % borderRadiusVariants.length];

  const baseClasses = `
    relative overflow-visible
    px-8 py-4 text-2xl md:text-3xl font-bold
    font-handwritten
    transition-colors duration-200
    border-[3px]
  `;
  
  const yesClasses = `
    bg-primary text-primary-foreground
    border-doodle-stroke/60
    hover:bg-primary/90
  `;
  
  const noClasses = shouldBecomeYes ? `
    bg-primary text-primary-foreground
    border-doodle-stroke/60
  ` : `
    bg-muted text-muted-foreground
    border-dashed border-doodle-stroke/40
    hover:bg-secondary
  `;

  return (
    <motion.button
      onClick={handleClick}
      className={`${baseClasses} ${variant === "yes" ? yesClasses : noClasses}`}
      style={{
        borderRadius: currentBorderRadius,
        boxShadow: variant === "yes" 
          ? "4px 4px 0px hsl(350 30% 40% / 0.3), inset -2px -2px 0px hsl(35 40% 98% / 0.3)"
          : "2px 2px 0px hsl(350 30% 40% / 0.2)",
      }}
      initial={{ rotate: variant === "yes" ? -2 : 3 }}
      whileHover={{ 
        scale: variant === "yes" ? 1.1 : (shouldBecomeYes ? 1.1 : 0.95),
        rotate: variant === "yes" ? [null, -5, 5, -3, 3, 0] : [null, 8, -8, 5, -5, noRotation],
      }}
      whileTap={{ scale: 0.9, rotate: 0 }}
      animate={{
        scale: noShrinkScale,
        rotate: noRotation,
        x: isEvading ? (Math.random() - 0.5) * 300 : 0,
        y: isEvading ? (Math.random() - 0.5) * 150 : 0,
        ...(isWobbling && variant === "no" ? {
          x: [0, -10, 10, -5, 5, 0],
          rotate: [noRotation, noRotation - 10, noRotation + 10, noRotation - 5, noRotation + 5, noRotation],
        } : {}),
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 15,
        rotate: { duration: 0.4, ease: "easeInOut" }
      }}
    >
      {/* Sketchy underline decoration for yes */}
      {variant === "yes" && (
        <svg 
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[120%] h-3 pointer-events-none"
          viewBox="0 0 100 10"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M5,5 Q15,2 25,6 T45,4 T65,7 T85,3 T95,5"
            stroke="hsl(var(--heart-red))"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </svg>
      )}

      {/* Floating hearts for yes button */}
      {variant === "yes" && (
        <>
          <motion.span
            className="absolute -left-4 -top-4"
            animate={{ 
              rotate: [0, 15, -10, 5, 0],
              y: [0, -5, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <HeartDoodle size={20} variant="filled" animate={false} />
          </motion.span>
          
          <motion.span
            className="absolute -right-3 -bottom-3"
            animate={{ 
              rotate: [0, -10, 15, -5, 0],
              y: [0, -3, 0],
            }}
            transition={{ duration: 2.3, repeat: Infinity, delay: 0.3 }}
          >
            <HeartDoodle size={18} variant="filled" animate={false} />
          </motion.span>

          <motion.span
            className="absolute -right-2 -top-3"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <HeartDoodle size={12} variant="outline" animate={false} />
          </motion.span>
        </>
      )}

      {/* Crossed out effect for no button after many clicks */}
      {variant === "no" && noCount >= 4 && noCount < noButtonTexts.length - 2 && (
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <motion.line
            x1="10"
            y1="90"
            x2="90"
            y2="10"
            stroke="hsl(var(--doodle-stroke))"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3 }}
          />
        </svg>
      )}
      
      <span className="relative z-10">
        {variant === "no" ? buttonText : children}
      </span>
      
      {/* Shimmer effect for Yes button */}
      {(variant === "yes" || shouldBecomeYes) && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent rounded-[inherit]"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
        />
      )}

      {/* Sparkles when no becomes yes */}
      {shouldBecomeYes && (
        <>
          {[...Array(4)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute text-lg"
              style={{
                top: `${-10 + (i % 2) * 120}%`,
                left: `${-10 + Math.floor(i / 2) * 120}%`,
              }}
              animate={{
                scale: [0, 1.2, 0],
                rotate: [0, 180, 360],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              ✨
            </motion.span>
          ))}
        </>
      )}
    </motion.button>
  );
};
