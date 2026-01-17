import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { HeartDoodle } from "../doodles/HeartDoodle";

interface ValentineButtonProps {
  variant: "yes" | "no";
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}

const noButtonMessages = [
  "Hehe, not that easy! 😜",
  "Are you suuure?",
  "Think again! 💭",
  "Really?? 🥺",
  "But whyyy",
  "Pleeeease?",
  "I'll be sad... 😢",
  "One more chance!",
  "Pretty please? 🙏",
  "I know you want to say yes!",
  "Fine... click me 😏",
];

const noButtonTexts = [
  "Maybe later...",
  "Hmm...",
  "Let me think",
  "Uhh...",
  "Well...",
  "I guess...",
  "OK fine...",
  "You win!",
  "YES! 💖",
];

export const ValentineButton = ({
  variant,
  onClick,
  className,
  children,
}: ValentineButtonProps) => {
  const [attempts, setAttempts] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentText, setCurrentText] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleNoInteraction = () => {
    if (variant !== "no") return;
    
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    // Different behaviors based on attempt count
    if (newAttempts <= 3) {
      // Run away to random position
      const maxX = Math.min(window.innerWidth * 0.3, 200);
      const maxY = Math.min(window.innerHeight * 0.2, 100);
      const newX = (Math.random() - 0.5) * maxX * 2;
      const newY = (Math.random() - 0.5) * maxY * 2;
      setPosition({ x: newX, y: newY });
    } else if (newAttempts <= 5) {
      // Start spinning and shrinking
      setIsSpinning(true);
      setRotation(prev => prev + 360);
      setScale(prev => Math.max(prev - 0.15, 0.5));
      setTimeout(() => setIsSpinning(false), 500);
      
      // Change position too
      const newX = (Math.random() - 0.5) * 150;
      const newY = (Math.random() - 0.5) * 80;
      setPosition({ x: newX, y: newY });
    } else if (newAttempts <= 7) {
      // Change text progressively
      setCurrentText(prev => Math.min(prev + 1, noButtonTexts.length - 1));
      setRotation(prev => prev + (Math.random() - 0.5) * 30);
    } else {
      // Give up and change to "YES"
      setCurrentText(noButtonTexts.length - 1);
      setScale(1.1);
      setRotation(0);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleNoClick = () => {
    if (attempts >= 7 || currentText === noButtonTexts.length - 1) {
      onClick();
    }
  };

  const getMessage = () => {
    if (attempts === 0) return null;
    return noButtonMessages[Math.min(attempts - 1, noButtonMessages.length - 1)];
  };

  if (variant === "yes") {
    return (
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.08, rotate: [-1, 1, -1] }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "group relative px-8 py-5 text-xl font-handwritten text-primary-foreground",
          "flex items-center gap-3",
          "transition-all duration-200",
          className
        )}
        style={{
          background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)",
          borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%",
          boxShadow: "4px 6px 0 hsl(var(--primary-deep) / 0.4), 0 10px 30px -10px hsl(var(--primary) / 0.5)",
          border: "3px solid hsl(var(--primary-deep) / 0.3)",
          transform: "rotate(-2deg)",
        }}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <HeartDoodle size={28} className="text-primary-foreground drop-shadow-sm" />
        </motion.div>
        
        <span className="relative">
          {children}
          {/* Underline scribble */}
          <svg 
            className="absolute -bottom-1 left-0 w-full h-2 text-primary-foreground/40"
            viewBox="0 0 100 8"
            preserveAspectRatio="none"
          >
            <path 
              d="M0,4 Q10,2 20,5 T40,3 T60,6 T80,4 T100,5" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
        
        <motion.div
          animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
        >
          <HeartDoodle size={28} className="text-primary-foreground drop-shadow-sm" />
        </motion.div>
        
        {/* Shimmer effect */}
        <motion.div 
          className="absolute inset-0 overflow-hidden"
          style={{ borderRadius: "inherit" }}
        >
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12"
          />
        </motion.div>
      </motion.button>
    );
  }

  // No button - the playful one!
  const isConverted = currentText === noButtonTexts.length - 1;

  return (
    <div className="relative">
      {/* Floating message */}
      <AnimatePresence>
        {getMessage() && !isConverted && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -45, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap z-20"
          >
            <span 
              className="inline-block px-3 py-1 bg-card text-sm font-handwritten text-foreground rounded-full shadow-lg border-2 border-dashed border-primary/30"
              style={{ transform: `rotate(${(Math.random() - 0.5) * 10}deg)` }}
            >
              {getMessage()}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={buttonRef}
        onMouseEnter={handleNoInteraction}
        onTouchStart={handleNoInteraction}
        onClick={handleNoClick}
        animate={{
          x: position.x,
          y: position.y,
          rotate: rotation,
          scale: isConverted ? 1.1 : scale,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        whileHover={isConverted ? { scale: 1.15 } : undefined}
        whileTap={{ scale: 0.9 }}
        className={cn(
          "relative px-6 py-4 text-lg font-handwritten",
          "transition-colors duration-300",
          isConverted 
            ? "text-primary-foreground" 
            : "text-muted-foreground",
          className
        )}
        style={{
          background: isConverted 
            ? "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)"
            : "hsl(var(--card))",
          borderRadius: "45% 55% 50% 50% / 55% 45% 55% 45%",
          border: isConverted 
            ? "3px solid hsl(var(--primary-deep) / 0.3)"
            : "2px dashed hsl(var(--border))",
          boxShadow: isConverted
            ? "3px 4px 0 hsl(var(--primary-deep) / 0.4)"
            : "2px 3px 0 hsl(var(--muted-foreground) / 0.2)",
          transform: `rotate(${isConverted ? -2 : 3}deg)`,
        }}
      >
        {isSpinning && (
          <motion.span
            className="absolute inset-0 flex items-center justify-center text-2xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            😵‍💫
          </motion.span>
        )}
        
        <span className={isSpinning ? "opacity-0" : "opacity-100"}>
          {isConverted ? (
            <span className="flex items-center gap-2">
              <HeartDoodle size={20} className="text-primary-foreground" />
              {noButtonTexts[currentText]}
            </span>
          ) : (
            noButtonTexts[currentText] || children
          )}
        </span>

        {/* Little X marks for attempts */}
        {!isConverted && attempts > 0 && attempts < 6 && (
          <div className="absolute -top-2 -right-2 flex gap-0.5">
            {[...Array(Math.min(attempts, 5))].map((_, i) => (
              <span 
                key={i} 
                className="text-xs text-primary/60"
                style={{ transform: `rotate(${(Math.random() - 0.5) * 30}deg)` }}
              >
                ✗
              </span>
            ))}
          </div>
        )}
      </motion.button>
    </div>
  );
};
