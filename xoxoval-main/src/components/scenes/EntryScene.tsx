import { motion } from "framer-motion";
import { EnvelopeDoodle } from "../doodles/EnvelopeDoodle";
import { TypewriterText } from "../TypewriterText";
import { PaperBackground } from "../PaperBackground";

interface EntrySceneProps {
  recipientName: string;
  onContinue: () => void;
}

export const EntryScene = ({ recipientName, onContinue }: EntrySceneProps) => {
  return (
    <PaperBackground variant="default">
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
          className="mb-8"
        >
          <EnvelopeDoodle size={120} isOpen={false} />
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl text-center text-foreground mb-6 font-crayon"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <TypewriterText 
            text={`Hey ${recipientName}...`}
            speed={80}
            delay={1000}
          />
        </motion.h1>

        <motion.p
          className="text-2xl md:text-3xl text-muted-foreground text-center mb-12 font-scribble"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          I have something special for you 💕
        </motion.p>

        <motion.button
          onClick={onContinue}
          className="btn-wobbly btn-yes-wobbly px-8 py-4 text-2xl"
          initial={{ opacity: 0, y: 20, rotate: -3 }}
          animate={{ opacity: 1, y: 0, rotate: -3 }}
          transition={{ delay: 3 }}
          whileHover={{ 
            scale: 1.08, 
            rotate: [null, -5, 5, -3, 3, 0],
            y: -3 
          }}
          whileTap={{ scale: 0.95, rotate: 0 }}
          style={{
            borderRadius: "45% 55% 50% 50% / 50% 50% 55% 45%",
          }}
        >
          Open the letter ✉️
        </motion.button>
      </motion.div>
    </PaperBackground>
  );
};
