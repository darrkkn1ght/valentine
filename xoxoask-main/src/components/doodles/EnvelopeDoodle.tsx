import { cn } from "@/lib/utils";

interface EnvelopeDoodleProps {
  className?: string;
  size?: number;
  isOpen?: boolean;
}

export const EnvelopeDoodle = ({ 
  className, 
  size = 64,
  isOpen = false
}: EnvelopeDoodleProps) => {
  return (
    <svg
      width={size}
      height={size * 0.75}
      viewBox="0 0 64 48"
      fill="none"
      className={cn("text-primary", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Envelope body */}
      <rect
        x="4"
        y={isOpen ? "16" : "8"}
        width="56"
        height="32"
        rx="3"
        fill="hsl(var(--card))"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
      />
      
      {/* Envelope flap */}
      {isOpen ? (
        <path
          d="M4 16L32 4L60 16"
          fill="hsl(var(--paper))"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M4 8L32 24L60 8"
          fill="hsl(var(--paper-alt))"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      
      {/* Heart seal */}
      <path
        d="M32 28C32 27 33 26 34 27C35 26 36 27 36 28C36 29 34 31 34 31C34 31 32 29 32 28Z"
        fill="hsl(var(--heart))"
      />
      
      {/* Decorative lines */}
      <path
        d="M14 36H28"
        stroke="hsl(var(--muted-foreground))"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M14 40H22"
        stroke="hsl(var(--muted-foreground))"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
};
