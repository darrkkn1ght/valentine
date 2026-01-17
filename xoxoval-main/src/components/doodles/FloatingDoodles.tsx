import { motion } from "framer-motion";
import { HeartDoodle } from "./HeartDoodle";
import { StarDoodle } from "./StarDoodle";
import { SparkleDoodle } from "./SparkleDoodle";

interface FloatingDoodlesProps {
  density?: "light" | "medium" | "heavy";
}

export const FloatingDoodles = ({ density = "medium" }: FloatingDoodlesProps) => {
  const doodles = [
    { Component: HeartDoodle, props: { variant: "filled" as const, size: 28 }, style: { top: "10%", left: "5%" }, delay: 0 },
    { Component: HeartDoodle, props: { variant: "outline" as const, size: 24 }, style: { top: "20%", right: "8%" }, delay: 0.3 },
    { Component: StarDoodle, props: { size: 20 }, style: { top: "15%", left: "15%" }, delay: 0.5 },
    { Component: SparkleDoodle, props: { size: 18 }, style: { top: "30%", right: "12%" }, delay: 0.2 },
    { Component: HeartDoodle, props: { variant: "filled" as const, size: 20 }, style: { top: "45%", left: "3%" }, delay: 0.7 },
    { Component: SparkleDoodle, props: { size: 16 }, style: { top: "55%", right: "5%" }, delay: 0.4 },
    { Component: StarDoodle, props: { size: 24 }, style: { top: "65%", left: "8%" }, delay: 0.1 },
    { Component: HeartDoodle, props: { variant: "outline" as const, size: 32 }, style: { top: "75%", right: "10%" }, delay: 0.6 },
    { Component: SparkleDoodle, props: { size: 20 }, style: { top: "85%", left: "12%" }, delay: 0.8 },
    { Component: HeartDoodle, props: { variant: "filled" as const, size: 22 }, style: { top: "90%", right: "15%" }, delay: 0.9 },
  ];

  const visibleDoodles = density === "light" 
    ? doodles.slice(0, 4) 
    : density === "heavy" 
      ? doodles 
      : doodles.slice(0, 7);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {visibleDoodles.map((doodle, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={doodle.style}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ 
            delay: doodle.delay,
            duration: 0.5,
            ease: "backOut"
          }}
        >
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              x: [0, 5, -5, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4 + index * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: doodle.delay
            }}
          >
            <doodle.Component {...doodle.props} animate={false} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};
