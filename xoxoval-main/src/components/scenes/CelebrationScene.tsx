import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Confetti } from "../Confetti";
import { TypewriterText } from "../TypewriterText";
import { HeartDoodle } from "../doodles/HeartDoodle";
import { StarDoodle } from "../doodles/StarDoodle";
import { SparkleDoodle } from "../doodles/SparkleDoodle";

interface CelebrationSceneProps {
  recipientName: string;
  senderName: string;
}

export const CelebrationScene = ({ recipientName, senderName }: CelebrationSceneProps) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Restart confetti periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setShowConfetti(false);
      setTimeout(() => setShowConfetti(true), 100);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden celebration-bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Confetti isActive={showConfetti} />

      {/* Celebration decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute"
            style={{
              left: `${5 + i * 12}%`,
              top: `${10 + (i % 3) * 30}%`
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 20, -20, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2
            }}
          >
            <HeartDoodle size={30 + i * 5} variant="filled" animate={false} />
          </motion.div>
        ))}
        
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute"
            style={{
              right: `${10 + i * 15}%`,
              top: `${20 + i * 15}%`
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <StarDoodle size={24 + i * 4} animate={false} />
          </motion.div>
        ))}

        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute"
            style={{
              left: `${20 + i * 12}%`,
              bottom: `${10 + i * 10}%`
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.3, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3
            }}
          >
            <SparkleDoodle size={18 + i * 3} animate={false} />
          </motion.div>
        ))}
      </div>

      {showContent && (
        <motion.div
          className="text-center z-10 max-w-2xl"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          {/* Big animated heart */}
          <motion.div
            className="mb-8"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <HeartDoodle size={120} variant="filled" animate={false} />
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <TypewriterText 
              text="YAAAY! 🎉"
              speed={100}
            />
          </motion.h1>

          <motion.p
            className="text-3xl md:text-4xl text-foreground mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            You made me the happiest person! 💕
          </motion.p>

          <motion.p
            className="text-2xl text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            I knew you'd say yes, {recipientName}! 🥰
          </motion.p>

          <motion.div
            className="mt-12 p-8 bg-card/60 backdrop-blur-sm rounded-3xl border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5 }}
          >
            <p className="text-xl text-muted-foreground mb-4">
              Can't wait to celebrate with you!
            </p>
            <motion.p
              className="text-2xl text-foreground"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Happy Valentine's Day! 💝
            </motion.p>
            <p className="text-lg text-muted-foreground mt-6">
              With all my love,
            </p>
            <p className="text-2xl text-primary mt-2">
              {senderName} 💌
            </p>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};
