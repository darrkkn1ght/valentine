import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FloatingDoodles } from "@/components/doodles/FloatingDoodles";
import { ArrowDoodle } from "@/components/doodles/ArrowDoodle";
import { PaperBackground } from "@/components/effects/PaperBackground";

interface TeaseSceneProps {
  onContinue: () => void;
}

const teaseTexts = [
  "So...",
  "I've been thinking...",
  "And I really need to ask you something...",
  "Something that's been on my mind...",
  "For a while now... 💭",
];

export const TeaseScene = ({ onContinue }: TeaseSceneProps) => {
  const [currentText, setCurrentText] = useState(0);
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    if (currentText < teaseTexts.length - 1) {
      const timer = setTimeout(() => {
        setCurrentText(prev => prev + 1);
      }, 1800);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShowArrow(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [currentText]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6 }}
    >
      <PaperBackground>
        <section className="scene">
          <FloatingDoodles density="light" />
          
          <div className="relative z-10 text-center max-w-xl mx-auto px-4">
            {/* Animated Text */}
            <div className="min-h-[150px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentText}
                  initial={{ opacity: 0, y: 30, rotateX: -20 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -30, rotateX: 20 }}
                  transition={{ 
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="text-3xl md:text-5xl font-handwritten text-foreground crayon-text"
                  style={{ transform: `rotate(${(currentText % 2 === 0 ? -2 : 2)}deg)` }}
                >
                  {teaseTexts[currentText]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Suspense Dots */}
            {currentText === teaseTexts.length - 1 && !showArrow && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center gap-2 mt-8"
              >
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    animate={{ 
                      opacity: [0.3, 1, 0.3],
                      scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 1.2,
                      delay: i * 0.2
                    }}
                    className="w-3 h-3 rounded-full bg-primary"
                  />
                ))}
              </motion.div>
            )}

            {/* Arrow and Button */}
            <AnimatePresence>
              {showArrow && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-12 flex flex-col items-center gap-6"
                >
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowDoodle direction="down" size={50} />
                  </motion.div>
                  
                  <motion.button
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.05, rotate: -3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onContinue}
                    className="px-10 py-5 text-xl font-crayon text-primary-foreground"
                    style={{
                      background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)",
                      borderRadius: "50% 55% 45% 55% / 55% 45% 55% 45%",
                      boxShadow: "5px 6px 0 hsl(var(--primary-deep) / 0.35)",
                      transform: "rotate(-2deg)",
                    }}
                  >
                    Reveal the question 💝
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </PaperBackground>
    </motion.div>
  );
};
