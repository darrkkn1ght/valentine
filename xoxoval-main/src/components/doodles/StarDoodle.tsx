import { motion, Easing } from "framer-motion";

interface StarDoodleProps {
  className?: string;
  size?: number;
  animate?: boolean;
}

export const StarDoodle = ({ 
  className = "", 
  size = 32,
  animate = true 
}: StarDoodleProps) => {
  const animationProps = animate ? {
    animate: { 
      rotate: [0, 360],
      scale: [0.9, 1.1, 0.9]
    },
    transition: { 
      rotate: { duration: 8, repeat: Infinity, ease: "linear" as Easing },
      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" as Easing }
    }
  } : {};

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      {...animationProps}
    >
      <path
        d="M16 2l4 9 10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1z"
        className="text-sparkle-gold"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* Sparkle highlight */}
      <circle cx="14" cy="10" r="1.5" fill="rgba(255,255,255,0.6)" />
    </motion.svg>
  );
};
