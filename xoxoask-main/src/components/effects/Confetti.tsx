import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

interface ConfettiProps {
  isActive: boolean;
  className?: string;
  pieceCount?: number;
}

const COLORS = [
  "hsl(350, 70%, 65%)",  // Primary rose
  "hsl(15, 80%, 65%)",   // Accent coral
  "hsl(45, 90%, 65%)",   // Sparkle gold
  "hsl(280, 40%, 75%)",  // Secondary lavender
  "hsl(350, 80%, 60%)",  // Heart red
  "hsl(0, 0%, 100%)",    // White
];

export const Confetti = ({ 
  isActive, 
  className,
  pieceCount = 50 
}: ConfettiProps) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (isActive) {
      const newPieces: ConfettiPiece[] = Array.from({ length: pieceCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2,
        size: 8 + Math.random() * 8,
        rotation: Math.random() * 360,
      }));
      setPieces(newPieces);

      // Clear after animation
      const timeout = setTimeout(() => {
        setPieces([]);
      }, 4500);

      return () => clearTimeout(timeout);
    }
  }, [isActive, pieceCount]);

  if (!isActive || pieces.length === 0) return null;

  return (
    <div className={cn("confetti-container", className)}>
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            top: "-20px",
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            animation: `confetti ${piece.duration}s linear forwards`,
            animationDelay: `${piece.delay}s`,
            transform: `rotate(${piece.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
};
