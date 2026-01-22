import { cn } from "@/lib/utils";

interface MusicNoteDoodleProps {
    className?: string;
    size?: number;
    color?: string;
    variant?: 1 | 2;
}

export const MusicNoteDoodle = ({
    className,
    size = 32,
    color = "currentColor",
    variant = 1
}: MusicNoteDoodleProps) => {
    if (variant === 2) {
        return (
            <svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                className={cn("text-primary", className)}
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Beamed Eighth Notes */}
                <path
                    d="M9 18V5L21 3V16"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round" // Hand-drawn feel
                    strokeLinejoin="round"
                />
                <circle cx="6" cy="18" r="3" fill={color} />
                <circle cx="18" cy="16" r="3" fill={color} />
                {/* Sketchy line */}
                <path
                    d="M9 8L21 6"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="4 2"
                />
            </svg>
        );
    }

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            className={cn("text-primary", className)}
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Eighth Note */}
            <path
                d="M9 18V5L21 3V16" // Stem
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-0" // Hidden guide
            />
            <path
                d="M12 4V16"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
            />
            <circle cx="10" cy="18" r="3" fill={color} />
            <path
                d="M12 8C16 8 18 12 18 12"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
};
