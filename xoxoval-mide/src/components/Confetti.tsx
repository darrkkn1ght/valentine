import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  rotation: number;
  delay: number;
  duration: number;
  size: number;
  shape: "heart" | "circle" | "star";
}

interface ConfettiProps {
  isActive: boolean;
  duration?: number;
}

export const Confetti = ({ isActive, duration = 4000 }: ConfettiProps) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (isActive) {
      const colors = [
        "hsl(350, 80%, 55%)", // heart-red
        "hsl(340, 65%, 70%)", // heart-pink
        "hsl(350, 50%, 85%)", // heart-blush
        "hsl(45, 90%, 60%)",  // sparkle-gold
        "hsl(15, 60%, 85%)",  // coral
      ];

      const shapes: ConfettiPiece["shape"][] = ["heart", "circle", "star"];

      const newPieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2,
        size: 8 + Math.random() * 12,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      }));

      setPieces(newPieces);

      const timer = setTimeout(() => {
        setPieces([]);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isActive, duration]);

  const renderShape = (piece: ConfettiPiece) => {
    switch (piece.shape) {
      case "heart":
        return (
          <svg width={piece.size} height={piece.size} viewBox="0 0 24 24">
            <path
              d="M12 21s-8-5-8-11c0-3 2.5-5.5 5-5.5 1.5 0 3 1 3 1s1.5-1 3-1c2.5 0 5 2.5 5 5.5 0 6-8 11-8 11z"
              fill={piece.color}
            />
          </svg>
        );
      case "star":
        return (
          <svg width={piece.size} height={piece.size} viewBox="0 0 24 24">
            <path
              d="M12 2l3 7 7 1-5 5 1 7-6-4-6 4 1-7-5-5 7-1z"
              fill={piece.color}
            />
          </svg>
        );
      default:
        return (
          <div
            style={{
              width: piece.size,
              height: piece.size,
              backgroundColor: piece.color,
              borderRadius: "50%",
            }}
          />
        );
    }
  };

  return (
    <AnimatePresence>
      {pieces.length > 0 && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
          {pieces.map((piece) => (
            <motion.div
              key={piece.id}
              className="absolute"
              style={{ left: `${piece.x}%` }}
              initial={{ 
                top: -20, 
                rotate: 0,
                opacity: 1 
              }}
              animate={{ 
                top: "110%", 
                rotate: piece.rotation + 720,
                x: [0, 30, -30, 20, -20, 0],
                opacity: [1, 1, 1, 0.5, 0]
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: piece.duration,
                delay: piece.delay,
                ease: "easeIn"
              }}
            >
              {renderShape(piece)}
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};
