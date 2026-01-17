import { cn } from "@/lib/utils";

interface ArrowDoodleProps {
  className?: string;
  size?: number;
  color?: string;
  direction?: "right" | "down" | "curved";
}

export const ArrowDoodle = ({ 
  className, 
  size = 60,
  color = "currentColor",
  direction = "curved"
}: ArrowDoodleProps) => {
  if (direction === "curved") {
    return (
      <svg
        width={size}
        height={size * 0.6}
        viewBox="0 0 60 36"
        fill="none"
        className={cn("text-primary", className)}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Curved love arrow */}
        <path
          d="M4 28C12 8 32 4 48 12"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Arrow head */}
        <path
          d="M42 6L48 12L42 18"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Small heart at start */}
        <path
          d="M6 32C6 30 8 28 10 30C12 28 14 30 14 32C14 34 10 38 10 38C10 38 6 34 6 32Z"
          fill={color}
        />
      </svg>
    );
  }

  if (direction === "down") {
    return (
      <svg
        width={size * 0.4}
        height={size}
        viewBox="0 0 24 60"
        fill="none"
        className={cn("text-primary", className)}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 4V48"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M4 40L12 52L20 40"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size * 0.4}
      viewBox="0 0 60 24"
      fill="none"
      className={cn("text-primary", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 12H48"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M40 4L52 12L40 20"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};
