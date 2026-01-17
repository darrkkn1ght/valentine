import { cn } from "@/lib/utils";

interface SparkleDoodleProps {
  className?: string;
  size?: number;
  color?: string;
}

export const SparkleDoodle = ({ 
  className, 
  size = 32,
  color = "currentColor" 
}: SparkleDoodleProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={cn("text-sparkle", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main sparkle cross */}
      <path
        d="M16 2C16 2 17 10 16 14C16 14 24 13 28 16C24 17 16 16 16 18C16 22 17 28 16 30C16 28 16 22 16 18C14 18 8 17 4 16C8 15 14 16 16 14C16 10 16 4 16 2Z"
        fill={color}
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Small dots */}
      <circle cx="6" cy="6" r="1.5" fill={color} opacity="0.5" />
      <circle cx="26" cy="6" r="1" fill={color} opacity="0.4" />
      <circle cx="26" cy="26" r="1.5" fill={color} opacity="0.5" />
      <circle cx="6" cy="26" r="1" fill={color} opacity="0.4" />
    </svg>
  );
};
