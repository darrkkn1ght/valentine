import { cn } from "@/lib/utils";

interface HeartDoodleProps {
  className?: string;
  variant?: 1 | 2;
  size?: number;
  color?: string;
}

export const HeartDoodle = ({ 
  className, 
  variant = 1, 
  size = 48,
  color = "currentColor" 
}: HeartDoodleProps) => {
  if (variant === 2) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        className={cn("text-heart", className)}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Hand-drawn heart variant 2 - more sketchy */}
        <path
          d="M24 42C24 42 6 30 6 18C6 12 10 6 17 6C21 6 24 10 24 10C24 10 27 6 31 6C38 6 42 12 42 18C42 30 24 42 24 42Z"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{ 
            strokeDasharray: "2 0",
            filter: "url(#hand-drawn-2)"
          }}
        />
        <path
          d="M17 14C15 14 13 16 13 18"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.7"
        />
        <defs>
          <filter id="hand-drawn-2">
            <feTurbulence baseFrequency="0.03" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" />
          </filter>
        </defs>
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={cn("text-heart", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Hand-drawn heart variant 1 - filled */}
      <path
        d="M24 41C24 41 7 29 7 17C7 11 11 7 17 7C20.5 7 23 9 24 11C25 9 27.5 7 31 7C37 7 41 11 41 17C41 29 24 41 24 41Z"
        fill={color}
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      {/* Highlight */}
      <path
        d="M16 16C14 16 12 18 12 20"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
};
