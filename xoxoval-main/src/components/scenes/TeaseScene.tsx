import { motion } from "framer-motion";
import { TypewriterText } from "../TypewriterText";
import { HeartDoodle } from "../doodles/HeartDoodle";
import { SparkleDoodle } from "../doodles/SparkleDoodle";
import { PaperBackground } from "../PaperBackground";

interface TeaseSceneProps {
  onContinue: () => void;
}

export const TeaseScene = ({ onContinue }: TeaseSceneProps) => {
  return (
    <PaperBackground variant="crumpled">
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center p-8 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Decorative elements with more wobble */}
        <motion.div
          className="absolute top-20 left-10"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity }
          }}
        >
          <SparkleDoodle size={32} animate={false} />
        </motion.div>

        <motion.div
          className="absolute top-32 right-20"
          animate={{ 
            y: [0, -10, 0],
            rotate: [5, -5, 5],
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <SparkleDoodle size={24} animate={false} />
        </motion.div>
        
        <motion.div
          className="absolute bottom-20 right-10"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 8, -8, 0],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <HeartDoodle size={48} variant="double" animate={false} />
        </motion.div>

        <motion.div
          className="absolute bottom-32 left-16"
          animate={{ 
            y: [0, -12, 0],
            x: [0, 5, 0],
          }}
          transition={{ duration: 2.8, repeat: Infinity }}
        >
          <HeartDoodle size={28} variant="outline" animate={false} />
        </motion.div>

        {/* Main wobbling heart */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="mb-8"
        >
          <motion.div
            animate={{ 
              rotate: [0, 6, -6, 3, -3, 0],
              scale: [1, 1.08, 1, 1.05, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <HeartDoodle size={100} variant="filled" animate={false} />
          </motion.div>
        </motion.div>

        <motion.div
          className="text-center max-w-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl text-foreground mb-6 font-crayon">
            <TypewriterText 
              text="Okay, here it goes..."
              speed={60}
              delay={500}
            />
          </h2>

          <motion.p
            className="text-2xl text-muted-foreground mb-4 font-scribble"
            initial={{ opacity: 0, rotate: -1 }}
            animate={{ opacity: 1, rotate: -1 }}
            transition={{ delay: 2.5 }}
          >
            I've been wanting to ask you this for so long...
          </motion.p>

          <motion.p
            className="text-xl text-muted-foreground mb-12 font-handwritten"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4 }}
          >
            *takes a deep breath* 😊
          </motion.p>

          <motion.button
            onClick={onContinue}
            className="btn-wobbly btn-yes-wobbly px-8 py-4 text-2xl"
            initial={{ opacity: 0, y: 20, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ delay: 5 }}
            whileHover={{ 
              scale: 1.08,
              rotate: [null, 3, -3, 2, -2, 0],
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              borderRadius: "55% 45% 50% 50% / 50% 50% 45% 55%",
            }}
          >
            I'm ready! 💗
          </motion.button>
        </motion.div>
      </motion.div>
    </PaperBackground>
  );
};
