import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FloatingDoodles } from "@/components/doodles/FloatingDoodles";
import { HeartDoodle } from "@/components/doodles/HeartDoodle";
import { Typewriter } from "@/components/effects/Typewriter";
import { PaperBackground } from "@/components/effects/PaperBackground";

interface BuildUpSceneProps {
  recipientName: string;
  onContinue: () => void;
}

const messages = [
  "Every moment with you feels like magic ✨",
  "You make my heart skip a beat 💓",
  "I can't imagine my life without you...",
];

export const BuildUpScene = ({ recipientName, onContinue }: BuildUpSceneProps) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showButton, setShowButton] = useState(false);

  const handleMessageComplete = () => {
    if (currentMessage < messages.length - 1) {
      setTimeout(() => {
        setCurrentMessage(prev => prev + 1);
      }, 2000); // Increased readability pause
    } else {
      setTimeout(() => {
        setShowButton(true);
      }, 1000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 1 }} // Smoother scene transition
    >
      <PaperBackground>
        <section className="scene">
          <FloatingDoodles density="medium" />

          <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
            {/* Hearts decoration */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="flex justify-center gap-4 mb-8"
            >
              <HeartDoodle size={40} className="animate-float text-heart" />
              <HeartDoodle size={56} variant={2} className="animate-float-slow text-primary" />
              <HeartDoodle size={40} className="animate-float-fast text-heart" />
            </motion.div>

            {/* Messages Container */}
            <div className="min-h-[200px] flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                {messages.slice(0, currentMessage + 1).map((message, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }} // Clean fade out
                    transition={{ duration: 0.8 }} // Slower text fade
                    className={`text-2xl md:text-4xl font-handwritten mb-6 crayon-text ${index === currentMessage
                        ? "text-foreground"
                        : "text-muted-foreground/60 scale-90 hidden" // Hide previous messages completely to prevent layout shifts/clutter if mode isn't handling it
                      }`}
                    style={{ transform: `rotate(${(index % 2 === 0 ? -1 : 1) * 1.5}deg)` }}
                  >
                    {index === currentMessage ? (
                      <Typewriter
                        text={message}
                        speed={100} // Slower typing
                        onComplete={handleMessageComplete}
                      />
                    ) : (
                      message
                    )}
                  </motion.p>
                ))}
              </AnimatePresence>
            </div>

            {/* Continue Button */}
            <AnimatePresence>
              {showButton && (
                <motion.button
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  onClick={onContinue}
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 text-lg font-crayon text-primary-foreground flex items-center gap-3 mx-auto"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)",
                    borderRadius: "55% 45% 50% 50% / 50% 50% 50% 50%",
                    boxShadow: "4px 5px 0 hsl(var(--primary-deep) / 0.3)",
                    transform: "rotate(2deg)",
                  }}
                >
                  <span>Keep reading</span>
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    💕
                  </motion.span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </section>
      </PaperBackground>
    </motion.div>
  );
};
