import { motion } from "framer-motion";

interface PaperBackgroundProps {
  variant?: "default" | "crumpled" | "celebration";
  children: React.ReactNode;
}

export const PaperBackground = ({ variant = "default", children }: PaperBackgroundProps) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Base paper gradient */}
      <div className="absolute inset-0 paper-texture" />
      
      {/* Crumpled paper texture overlay with CSS patterns */}
      <div className="absolute inset-0 crumpled-paper opacity-60" />
      
      {/* Paper grain noise overlay */}
      <div className="absolute inset-0 paper-grain opacity-30" />
      
      {/* Subtle fold lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        {/* Horizontal fold */}
        <motion.line
          x1="0"
          y1="50%"
          x2="100%"
          y2="50%"
          stroke="hsl(var(--doodle-stroke))"
          strokeWidth="0.5"
          strokeDasharray="5,10"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        {/* Vertical fold */}
        <motion.line
          x1="50%"
          y1="0"
          x2="50%"
          y2="100%"
          stroke="hsl(var(--doodle-stroke))"
          strokeWidth="0.5"
          strokeDasharray="5,10"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.8 }}
        />
        {/* Diagonal crease */}
        <motion.path
          d="M 0 0 Q 30% 35%, 100% 100%"
          stroke="hsl(var(--doodle-stroke))"
          strokeWidth="0.3"
          fill="none"
          opacity="0.3"
        />
      </svg>
      
      {/* Torn/rough edges */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top edge */}
        <svg className="absolute top-0 left-0 w-full h-8" preserveAspectRatio="none">
          <path
            d="M0,8 Q5,2 10,6 T20,4 T30,7 T40,3 T50,6 T60,2 T70,5 T80,3 T90,7 T100,4 L100,0 L0,0 Z"
            fill="hsl(var(--background))"
            className="opacity-80"
          />
        </svg>
        {/* Bottom edge */}
        <svg className="absolute bottom-0 left-0 w-full h-8 rotate-180" preserveAspectRatio="none">
          <path
            d="M0,8 Q5,2 10,6 T20,4 T30,7 T40,3 T50,6 T60,2 T70,5 T80,3 T90,7 T100,4 L100,0 L0,0 Z"
            fill="hsl(var(--background))"
            className="opacity-80"
          />
        </svg>
      </div>
      
      {/* Coffee stain for extra charm */}
      {variant === "crumpled" && (
        <motion.div
          className="absolute top-[15%] right-[10%] w-24 h-20 rounded-[50%] bg-gradient-to-br from-amber-200/20 to-amber-300/10 blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1 }}
        />
      )}
      
      {/* Celebration confetti shadows */}
      {variant === "celebration" && (
        <div className="absolute inset-0 celebration-bg opacity-30" />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
