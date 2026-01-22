import { useState } from "react";
import { motion } from "framer-motion";
import { FloatingDoodles } from "@/components/doodles/FloatingDoodles";
import { HeartDoodle } from "@/components/doodles/HeartDoodle";
import { ValentineButton } from "../ValentineButton";
import { Typewriter } from "@/components/effects/Typewriter";
import { PaperBackground } from "@/components/effects/PaperBackground";

interface AskSceneProps {
  recipientName: string;
  senderName: string;
  onYes: () => void;
  onNo: () => void;
}

export const AskScene = ({ recipientName, senderName, onYes, onNo }: AskSceneProps) => {
  const [questionRevealed, setQuestionRevealed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
    >
      <PaperBackground>
        <section className="scene">
          <FloatingDoodles density="heavy" />

          <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
            {/* Big Hearts */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                type: "spring",
                stiffness: 100
              }}
              className="mb-8"
            >
              <div className="flex justify-center items-center gap-2">
                <HeartDoodle size={60} className="animate-heartbeat text-heart" />
                <div className="[animation-delay:0.2s]">
                  <HeartDoodle size={80} variant={2} className="animate-heartbeat text-primary" />
                </div>
                <div className="[animation-delay:0.4s]">
                  <HeartDoodle size={60} className="animate-heartbeat text-heart" />
                </div>
              </div>
            </motion.div>

            {/* The Big Question */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mb-16"
            >
              <h2
                className="text-4xl md:text-6xl lg:text-7xl font-handwritten text-love-gradient leading-tight mb-4 crayon-text"
                style={{ transform: "rotate(-1deg)" }}
              >
                <Typewriter
                  text={`${recipientName}, will you be my Valentine?`}
                  speed={75}
                  delay={800}
                  onComplete={() => setQuestionRevealed(true)}
                />
              </h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: questionRevealed ? 1 : 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-muted-foreground font-crayon mt-6"
                style={{ transform: "rotate(1deg)" }}
              >
                ~ With all my love, {senderName} <HeartDoodle size={20} className="inline-block text-primary align-middle" />
              </motion.p>
            </motion.div>

            {/* Buttons - Organic freestyle layout */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{
                y: questionRevealed ? 0 : 30,
                opacity: questionRevealed ? 1 : 0
              }}
              transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
              className="relative flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12"
            >
              {/* Yes button - slightly rotated and offset */}
              <motion.div
                style={{ transform: "rotate(-3deg)" }}
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                <ValentineButton variant="yes" onClick={onYes}>
                  <span className="flex items-center gap-2">
                    Yes! <HeartDoodle size={24} className="text-white fill-white" />
                  </span>
                </ValentineButton>
              </motion.div>

              {/* No button - Runaway logic */}
              <motion.div
                style={{ transform: "rotate(2deg) translateY(10px)" }}
                animate={{
                  y: [0, 3, 0],
                  x: [0, 2, 0]
                }}
                whileHover={{
                  x: [0, Math.random() * 200 - 100],
                  y: [0, Math.random() * 200 - 100],
                  transition: { duration: 0.2 }
                }}
                onMouseEnter={(e) => {
                  const target = e.currentTarget;
                  const x = (Math.random() - 0.5) * 300;
                  const y = (Math.random() - 0.5) * 300;
                  target.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random() * 20 - 10}deg)`;
                }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.5 }}
              >
                <ValentineButton variant="no" onClick={onNo}>
                  Maybe later...
                </ValentineButton>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </PaperBackground>
    </motion.div>
  );
};
