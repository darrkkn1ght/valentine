import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypewriterText } from "../TypewriterText";
import { HeartDoodle } from "../doodles/HeartDoodle";
import { PaperBackground } from "../PaperBackground";

interface BuildUpSceneProps {
  recipientName: string;
  senderName: string;
  onContinue: () => void;
}

const messages = [
  "Every moment with you feels like magic ✨",
  "Your smile lights up my whole world 🌟",
  "I think about you all the time...",
  "And I have something really important to ask you..."
];

export const BuildUpScene = ({ recipientName, senderName, onContinue }: BuildUpSceneProps) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showContinue, setShowContinue] = useState(false);

  useEffect(() => {
    if (currentMessage < messages.length - 1) {
      const timer = setTimeout(() => {
        setCurrentMessage(prev => prev + 1);
      }, 3500);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShowContinue(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentMessage]);

  return (
    <PaperBackground variant="crumpled">
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center p-8 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Floating hearts background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${10 + i * 12}%`,
                top: `${15 + (i % 4) * 20}%`
              }}
              animate={{
                y: [0, -25, 0],
                rotate: [0, 12, -12, 0],
                opacity: [0.25, 0.5, 0.25]
              }}
              transition={{
                duration: 3 + i * 0.4,
                repeat: Infinity,
                delay: i * 0.25
              }}
            >
              <HeartDoodle
                size={16 + i * 5}
                variant={i % 3 === 0 ? "filled" : i % 3 === 1 ? "outline" : "double"}
                animate={false}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center z-10 max-w-2xl"
          layout
        >
          <motion.p
            className="text-xl text-muted-foreground mb-8 font-scribble"
            initial={{ opacity: 0, rotate: -1 }}
            animate={{ opacity: 1, rotate: -1 }}
          >
            Dear {recipientName},
          </motion.p>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentMessage}
              initial={{ opacity: 0, y: 30, rotate: 1 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="min-h-[120px] flex items-center justify-center"
            >
              <h2 className="text-3xl md:text-5xl text-foreground leading-relaxed font-crayon">
                <TypewriterText
                  text={messages[currentMessage]}
                  speed={50}
                />
              </h2>
            </motion.div>
          </AnimatePresence>

          {/* Progress dots - hand drawn style */}
          <div className="flex justify-center gap-4 mt-12 mb-8">
            {messages.map((_, i) => (
              <motion.div
                key={i}
                className={`w-3 h-3 ${i <= currentMessage ? "bg-primary" : "bg-border"
                  }`}
                style={{
                  borderRadius: i % 2 === 0 ? "50% 50% 45% 55%" : "45% 55% 50% 50%",
                  transform: `rotate(${(i - 2) * 5}deg)`,
                }}
                animate={i === currentMessage ? {
                  scale: [1, 1.4, 1],
                  rotate: [(i - 2) * 5, (i - 2) * 5 + 10, (i - 2) * 5]
                } : {}}
                transition={{ duration: 0.5 }}
              />
            ))}
          </div>

          <AnimatePresence>
            {showContinue && (
              <motion.button
                onClick={onContinue}
                className="btn-wobbly btn-yes-wobbly px-8 py-4 text-2xl"
                initial={{ opacity: 0, scale: 0.8, rotate: 3 }}
                animate={{ opacity: 1, scale: 1, rotate: 3 }}
                whileHover={{
                  scale: 1.08,
                  rotate: [null, 0, 6, 3],
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                  borderRadius: "50% 50% 45% 55% / 45% 55% 50% 50%",
                }}
              >
                Continue... 💝
              </motion.button>
            )}
          </AnimatePresence>

          <motion.p
            className="text-lg text-muted-foreground mt-12 font-handwritten"
            initial={{ opacity: 0, rotate: 2 }}
            animate={{ opacity: 0.7, rotate: 2 }}
            transition={{ delay: 1 }}
          >
            — {senderName}
          </motion.p>
        </motion.div>
      </motion.div>
    </PaperBackground>
  );
};
