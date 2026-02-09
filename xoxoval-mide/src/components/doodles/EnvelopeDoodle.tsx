import { motion } from "framer-motion";

interface EnvelopeDoodleProps {
  className?: string;
  size?: number;
  animate?: boolean;
  isOpen?: boolean;
}

export const EnvelopeDoodle = ({ 
  className = "", 
  size = 80,
  animate = true,
  isOpen = false 
}: EnvelopeDoodleProps) => {
  return (
    <motion.svg
      width={size}
      height={size * 0.75}
      viewBox="0 0 80 60"
      className={className}
      animate={animate ? { 
        y: [0, -5, 0],
        rotate: isOpen ? [0, -2, 2, 0] : 0
      } : {}}
      transition={{ 
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {/* Envelope body */}
      <rect
        x="5"
        y="15"
        width="70"
        height="42"
        rx="4"
        className="text-paper-cream"
        fill="currentColor"
        stroke="hsl(var(--doodle-stroke))"
        strokeWidth="2.5"
      />
      
      {/* Envelope flap - closed or open */}
      <motion.path
        d={isOpen 
          ? "M5 15 L40 -5 L75 15" 
          : "M5 15 L40 38 L75 15"
        }
        fill="none"
        stroke="hsl(var(--doodle-stroke))"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        animate={{ 
          d: isOpen 
            ? "M5 15 L40 -5 L75 15" 
            : "M5 15 L40 38 L75 15"
        }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Heart seal */}
      <motion.path
        d="M40 42s-6-4-6-9c0-2.5 2-4.5 4-4.5 1.5 0 2.5 1 2.5 1s1-1 2.5-1c2 0 4 2 4 4.5 0 5-6 9-6 9z"
        className="text-heart-red"
        fill="currentColor"
        animate={animate ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      
      {/* Decorative lines */}
      <line x1="15" y1="48" x2="35" y2="48" stroke="hsl(var(--border))" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="15" y1="52" x2="28" y2="52" stroke="hsl(var(--border))" strokeWidth="1.5" strokeLinecap="round" />
    </motion.svg>
  );
};
