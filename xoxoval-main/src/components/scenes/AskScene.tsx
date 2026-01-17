import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypewriterText } from "../TypewriterText";
import { ValentineButton } from "../ValentineButton";
import { HeartDoodle } from "../doodles/HeartDoodle";
import { PaperBackground } from "../PaperBackground";

interface AskSceneProps {
  recipientName: string;
  onYes: () => void;
}

const noResponses = [
  "Are you sure? 🥺",
  "Really really sure? 😢",
  "The button is getting smaller... 👀",
  "Please reconsider... 💔",
  "I'll give you cookies! 🍪",
  "Pretty pretty please? 🙏",
  "Look how big the Yes button is! →",
  "You're breaking my heart! 😭",
  "One more chance? 💝",
  "Okay okay... check the No button 👀"
];

export const AskScene = ({ recipientName, onYes }: AskSceneProps) => {
  const [noCount, setNoCount] = useState(0);
  const [isEvading, setIsEvading] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);

  const handleNo = useCallback(() => {
    if (noCount >= 8) {
      // After enough clicks, the no button becomes yes!
      onYes();
      return;
    }
    
    setNoCount(prev => prev + 1);
    
    // Start evading after 2 clicks
    if (noCount >= 2) {
      setIsEvading(true);
      setTimeout(() => setIsEvading(false), 300);
    }
  }, [noCount, onYes]);

  // Calculate yes button size based on no count
  const yesButtonScale = 1 + (noCount * 0.12);

  return (
    <PaperBackground variant="crumpled">
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Floating hearts that increase with each "no" */}
        <AnimatePresence>
          {[...Array(Math.min(noCount + 3, 15))].map((_, i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-none"
              style={{
                left: `${5 + (i * 7)}%`,
                top: `${10 + (i % 5) * 18}%`
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 0.3 + (noCount * 0.04),
                scale: 1,
                y: [0, -20, 0],
                rotate: [0, 15, -15, 0]
              }}
              transition={{
                y: { duration: 2.5 + i * 0.3, repeat: Infinity },
                rotate: { duration: 3 + i * 0.2, repeat: Infinity },
                delay: i * 0.15
              }}
            >
              <HeartDoodle 
                size={18 + (noCount * 2) + (i % 3) * 4} 
                variant={i % 3 === 0 ? "filled" : i % 3 === 1 ? "outline" : "double"} 
                animate={false}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.div
          className="text-center z-10 max-w-2xl"
          initial={{ y: 30 }}
          animate={{ y: 0 }}
        >
          {/* Big pulsing heart */}
          <motion.div
            className="mb-8 inline-block"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 3, -3, 0],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <HeartDoodle size={70 + noCount * 6} variant="filled" animate={false} />
          </motion.div>

          {/* The big question with crayon style */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl text-foreground mb-8 leading-tight font-crayon"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            onAnimationComplete={() => setShowQuestion(true)}
          >
            {showQuestion ? (
              <TypewriterText 
                text={`${recipientName}, will you be my Valentine?`}
                speed={60}
              />
            ) : (
              <span className="opacity-0">{recipientName}, will you be my Valentine?</span>
            )}
          </motion.h1>

          {/* Response text when clicking no */}
          <AnimatePresence mode="wait">
            {noCount > 0 && (
              <motion.p
                key={noCount}
                className="text-xl md:text-2xl text-primary mb-8 font-scribble"
                initial={{ opacity: 0, y: 10, rotate: -2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {noResponses[Math.min(noCount - 1, noResponses.length - 1)]}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Buttons - intentionally misaligned for hand-drawn feel */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-8"
            style={{ 
              gap: `${16 + noCount * 8}px`,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5 }}
          >
            {/* Yes button - grows and wobbles invitingly */}
            <motion.div
              animate={{ 
                scale: yesButtonScale,
                rotate: [0, 2, -2, 1, -1, 0],
              }}
              transition={{ 
                scale: { type: "spring", stiffness: 200 },
                rotate: { duration: 2, repeat: Infinity }
              }}
              style={{
                marginTop: noCount > 0 ? `-${noCount * 3}px` : 0,
                marginRight: noCount > 3 ? `${noCount * 5}px` : 0,
              }}
            >
              <ValentineButton variant="yes" onClick={onYes}>
                Yes! 💕
              </ValentineButton>
            </motion.div>

            {/* No button - shrinks, spins, runs away, eventually becomes yes */}
            <motion.div
              animate={{
                rotate: noCount > 3 ? [0, 5, -5, 3, -3, 0] : 0,
                opacity: Math.max(0.4, 1 - noCount * 0.06),
              }}
              transition={{ 
                rotate: { duration: 0.5, repeat: noCount > 3 ? Infinity : 0 }
              }}
              style={{
                marginTop: noCount > 0 ? `${noCount * 5}px` : 0,
                marginLeft: noCount > 3 ? `-${noCount * 3}px` : 0,
              }}
            >
              <ValentineButton 
                variant="no" 
                onClick={handleNo}
                isEvading={isEvading}
                noCount={noCount}
              >
                No 😅
              </ValentineButton>
            </motion.div>
          </motion.div>

          {/* Hint text after many nos */}
          {noCount >= 5 && (
            <motion.p
              className="text-sm text-muted-foreground mt-8 font-handwritten"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
            >
              (psst... the No button is giving up 👀)
            </motion.p>
          )}
        </motion.div>
      </motion.div>
    </PaperBackground>
  );
};
