import { motion, Easing } from "framer-motion";

interface SparkleDoodleProps {
  className?: string;
  size?: number;
  animate?: boolean;
}

export const SparkleDoodle = ({ 
  className = "", 
  size = 24,
  animate = true 
}: SparkleDoodleProps) => {
  const animationProps = animate ? {
    animate: { 
      opacity: [0.4, 1, 0.4],
      scale: [0.8, 1.2, 0.8],
      rotate: [0, 180, 360]
    },
    transition: { 
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut" as Easing
    }
  } : {};

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      {...animationProps}
    >
      <path
        d="M12 0L14 8L22 10L14 12L12 20L10 12L2 10L10 8Z"
        className="text-sparkle-gold"
        fill="currentColor"
      />
    </motion.svg>
  );
};
