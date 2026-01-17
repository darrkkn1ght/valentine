import { motion } from "framer-motion";

interface AudioToggleProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const AudioToggle = ({ isPlaying, onToggle }: AudioToggleProps) => {
  return (
    <motion.button
      onClick={onToggle}
      className="fixed top-4 right-4 z-50 p-3 rounded-full bg-card/80 backdrop-blur-sm border border-border shadow-lg hover:shadow-xl transition-shadow"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      {isPlaying ? (
        <svg width="24" height="24" viewBox="0 0 24 24" className="text-primary">
          <path
            d="M3 9v6h4l5 5V4L7 9H3z"
            fill="currentColor"
          />
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.path
              d="M14 9.5c.5.5 1 1.5 1 2.5s-.5 2-1 2.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <motion.path
              d="M16.5 7c1 1 2 3 2 5s-1 4-2 5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            />
          </motion.g>
        </svg>
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" className="text-muted-foreground">
          <path
            d="M3 9v6h4l5 5V4L7 9H3z"
            fill="currentColor"
          />
          <line
            x1="20"
            y1="4"
            x2="4"
            y2="20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}
    </motion.button>
  );
};
