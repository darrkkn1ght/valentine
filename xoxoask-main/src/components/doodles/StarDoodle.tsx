import { cn } from "@/lib/utils";

interface StarDoodleProps {
  className?: string;
  size?: number;
  color?: string;
}

export const StarDoodle = ({ 
  className, 
  size = 40,
  color = "currentColor" 
}: StarDoodleProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={cn("text-star", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Hand-drawn 4-point star */}
      <path
        d="M20 4L22 16L34 18L22 20L20 32L18 20L6 18L18 16L20 4Z"
        fill={color}
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Small sparkle detail */}
      <circle cx="26" cy="10" r="1.5" fill={color} opacity="0.6" />
      <circle cx="32" cy="26" r="1" fill={color} opacity="0.4" />
    </svg>
  );
};
