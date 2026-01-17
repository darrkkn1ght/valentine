import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Confetti } from "@/components/effects/Confetti";
import { HeartDoodle } from "@/components/doodles/HeartDoodle";
import { SparkleDoodle } from "@/components/doodles/SparkleDoodle";
import { StarDoodle } from "@/components/doodles/StarDoodle";
import { PaperBackground } from "@/components/effects/PaperBackground";

interface CelebrationSceneProps {
  recipientName: string;
  senderName: string;
}

export const CelebrationScene = ({ recipientName, senderName }: CelebrationSceneProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Trigger confetti immediately
    setShowConfetti(true);

    // Show message after a short delay
    const messageTimer = setTimeout(() => {
      setShowMessage(true);
    }, 500);

    // Trigger more confetti bursts
    const confettiTimer = setInterval(() => {
      setShowConfetti(false);
      setTimeout(() => setShowConfetti(true), 100);
    }, 3000);

    return () => {
      clearTimeout(messageTimer);
      clearInterval(confettiTimer);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <PaperBackground variant="celebration">
        <section className="scene overflow-hidden">
          <Confetti isActive={showConfetti} pieceCount={80} />
          
          {/* Floating decorations */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  y: "100vh", 
                  x: `${10 + Math.random() * 80}vw`,
                  opacity: 0,
                  scale: 0 
                }}
                animate={{ 
                  y: "-10vh",
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1, 1, 0.5]
                }}
                transition={{ 
                  duration: 8 + Math.random() * 4,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
                className="absolute"
              >
                {i % 3 === 0 ? (
                  <HeartDoodle size={30 + Math.random() * 20} className="text-heart" />
                ) : i % 3 === 1 ? (
                  <StarDoodle size={20 + Math.random() * 15} className="text-sparkle" />
                ) : (
                  <SparkleDoodle size={20 + Math.random() * 10} className="text-star" />
                )}
              </motion.div>
            ))}
          </div>

          <div className="relative z-10 text-center max-w-3xl mx-auto px-4 py-12">
            {/* Big animated heart */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 10,
                delay: 0.2
              }}
              className="mb-8"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <HeartDoodle size={120} className="mx-auto text-heart drop-shadow-2xl" />
              </motion.div>
            </motion.div>

            {/* Celebration message */}
            {showMessage && (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, type: "spring" }}
              >
                <motion.h1
                  className="text-5xl md:text-7xl lg:text-8xl font-handwritten text-love-gradient mb-6 crayon-text"
                  style={{ transform: "rotate(-2deg)" }}
                  animate={{ scale: [1, 1.02, 1], rotate: [-2, -1, -2] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  Yay! 🎉
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-2xl md:text-3xl font-handwritten text-foreground mb-4 crayon-text"
                  style={{ transform: "rotate(1deg)" }}
                >
                  {recipientName} said YES!
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-xl text-muted-foreground mb-8 font-crayon"
                  style={{ transform: "rotate(-1deg)" }}
                >
                  This is going to be the best Valentine's Day ever! 💕
                </motion.p>

                {/* Love message card */}
                <motion.div
                  initial={{ y: 30, opacity: 0, rotate: -3 }}
                  animate={{ y: 0, opacity: 1, rotate: -2 }}
                  transition={{ delay: 1.2 }}
                  className="p-8 max-w-md mx-auto bg-card/90"
                  style={{
                    borderRadius: "45% 55% 50% 50% / 50% 45% 55% 50%",
                    border: "3px dashed hsl(var(--primary) / 0.4)",
                    boxShadow: "6px 8px 0 hsl(var(--primary) / 0.15)",
                  }}
                >
                  <p className="text-2xl font-handwritten text-foreground leading-relaxed crayon-text">
                    "{recipientName} & {senderName}"
                  </p>
                  <p className="text-4xl mt-3">💑</p>
                  <p className="text-sm text-muted-foreground mt-4 font-crayon">
                    Valentine's Day 2025
                  </p>
                </motion.div>

                {/* Share prompt */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                  className="mt-12 text-muted-foreground font-crayon"
                  style={{ transform: "rotate(1deg)" }}
                >
                  Share this moment forever 📸
                </motion.p>
              </motion.div>
            )}
          </div>
        </section>
      </PaperBackground>
    </motion.div>
  );
};
