import { motion, Easing } from "framer-motion";

interface HeartDoodleProps {
  className?: string;
  variant?: "filled" | "outline" | "double";
  size?: number;
  color?: string;
  animate?: boolean;
}

export const HeartDoodle = ({ 
  className = "", 
  variant = "filled",
  size = 48,
  color,
  animate = true 
}: HeartDoodleProps) => {
  const animationProps = animate ? {
    animate: { 
      scale: [1, 1.1, 1],
      rotate: [0, 5, -5, 0]
    },
    transition: { 
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut" as Easing
    }
  } : {};

  if (variant === "outline") {
    return (
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        className={className}
        {...animationProps}
      >
        <path
          d="M24 42s-16-10-16-22c0-6 4.5-11 10-11 3.5 0 6 2 6 2s2.5-2 6-2c5.5 0 10 5 10 11 0 12-16 22-16 22z"
          fill="none"
          stroke={color || "currentColor"}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-heart-red"
        />
      </motion.svg>
    );
  }

  if (variant === "double") {
    return (
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 64 48"
        className={className}
        {...animationProps}
      >
        <path
          d="M18 38s-12-8-12-17c0-5 3.5-8.5 7.5-8.5 2.5 0 4.5 1.5 4.5 1.5s2-1.5 4.5-1.5c4 0 7.5 3.5 7.5 8.5 0 9-12 17-12 17z"
          className="text-heart-pink"
          fill="currentColor"
        />
        <path
          d="M46 38s-12-8-12-17c0-5 3.5-8.5 7.5-8.5 2.5 0 4.5 1.5 4.5 1.5s2-1.5 4.5-1.5c4 0 7.5 3.5 7.5 8.5 0 9-12 17-12 17z"
          className="text-heart-red"
          fill="currentColor"
        />
      </motion.svg>
    );
  }

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      {...animationProps}
    >
      <path
        d="M24 42s-16-10-16-22c0-6 4.5-11 10-11 3.5 0 6 2 6 2s2.5-2 6-2c5.5 0 10 5 10 11 0 12-16 22-16 22z"
        className="text-heart-red"
        fill="currentColor"
      />
      {/* Hand-drawn imperfection lines */}
      <path
        d="M20 18c-1 1-2 3-2 5"
        fill="none"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </motion.svg>
  );
};
