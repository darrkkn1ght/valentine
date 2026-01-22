import { motion } from "framer-motion";
import { EnvelopeDoodle } from "@/components/doodles/EnvelopeDoodle";
import { FloatingDoodles } from "@/components/doodles/FloatingDoodles";
import { Typewriter } from "@/components/effects/Typewriter";
import { PaperBackground } from "@/components/effects/PaperBackground";

interface EntrySceneProps {
  recipientName: string;
  onContinue: () => void;
}

export const EntryScene = ({ recipientName, onContinue }: EntrySceneProps) => {
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

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
            className="relative z-10 text-center max-w-lg mx-auto"
          >
            {/* Envelope Icon */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mb-8 flex justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="cursor-pointer"
              >
                <EnvelopeDoodle size={100} />
              </motion.div>
            </motion.div>

            {/* Greeting Text */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-5xl md:text-7xl font-handwritten text-love-gradient mb-6 crayon-text"
              style={{ transform: "rotate(-2deg)" }}
            >
              Hey {recipientName}...
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="text-xl md:text-2xl text-muted-foreground mb-10 font-crayon"
              style={{ transform: "rotate(1deg)" }}
            >
              <Typewriter
                text="I have something special to tell you..."
                speed={75}
                delay={1200}
              />
            </motion.p>

            {/* Continue Button */}
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2.5, duration: 0.5 }}
              onClick={onContinue}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 text-lg font-crayon text-foreground transition-all duration-300"
              style={{
                background: "hsl(var(--card))",
                borderRadius: "50% 45% 55% 50% / 45% 55% 45% 55%",
                border: "2px dashed hsl(var(--primary) / 0.4)",
                boxShadow: "3px 4px 0 hsl(var(--primary) / 0.2)",
                transform: "rotate(-1deg)",
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Open the letter
                <motion.span
                  animate={{ x: [0, 5, 0], rotate: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <EnvelopeDoodle size={20} className="text-foreground" />
                </motion.span>
              </span>
            </motion.button>
          </motion.div>
        </section>
      </PaperBackground>
    </motion.div>
  );
};
