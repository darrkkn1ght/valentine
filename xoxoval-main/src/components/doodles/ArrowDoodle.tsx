import { motion, Easing } from "framer-motion";

interface ArrowDoodleProps {
  className?: string;
  size?: number;
  direction?: "right" | "left" | "up" | "down" | "curved";
  animate?: boolean;
}

export const ArrowDoodle = ({ 
  className = "", 
  size = 64,
  direction = "right",
  animate = true 
}: ArrowDoodleProps) => {
  const animationProps = animate ? {
    animate: { 
      x: direction === "right" ? [0, 5, 0] : direction === "left" ? [0, -5, 0] : 0,
      y: direction === "down" ? [0, 5, 0] : direction === "up" ? [0, -5, 0] : 0
    },
    transition: { 
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut" as Easing
    }
  } : {};

  if (direction === "curved") {
    return (
      <motion.svg
        width={size}
        height={size * 0.75}
        viewBox="0 0 80 60"
        className={className}
        {...animationProps}
      >
        <path
          d="M10 50 Q 40 10 70 30"
          fill="none"
          className="text-heart-red"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="4 2"
        />
        <path
          d="M65 25 L75 30 L68 38"
          fill="none"
          className="text-heart-red"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    );
  }

  const rotation = {
    right: 0,
    down: 90,
    left: 180,
    up: 270
  }[direction];

  return (
    <motion.svg
      width={size}
      height={size * 0.5}
      viewBox="0 0 64 32"
      className={className}
      style={{ transform: `rotate(${rotation}deg)` }}
      {...animationProps}
    >
      <path
        d="M5 16 H 50"
        fill="none"
        className="text-doodle-stroke"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="6 3"
      />
      <path
        d="M45 8 L 58 16 L 45 24"
        fill="none"
        className="text-doodle-stroke"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
};
