import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScatteredTextProps {
    text: string;
    className?: string;
    delay?: number;
    wordMode?: boolean;
}

export const ScatteredText = ({ text, className, delay = 0, wordMode = false }: ScatteredTextProps) => {
    const items = wordMode ? text.split(" ") : text.split("");

    return (
        <div className={cn("inline-block", className)}>
            {items.map((item, index) => {
                // Random rotation between -5 and 5 degrees
                const rotation = Math.random() * 10 - 5;
                // Random y offset between -2 and 2 px
                const yOffset = Math.random() * 4 - 2;

                return (
                    <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.5, y: 10, rotate: 0 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: [10, yOffset],
                            rotate: [0, rotation],
                        }}
                        transition={{
                            duration: 0.4,
                            delay: delay + index * 0.05,
                            type: "spring",
                            stiffness: 200,
                        }}
                        className="inline-block origin-bottom"
                        style={{ marginRight: wordMode ? "0.3em" : "0.02em" }}
                    >
                        {item === " " ? "\u00A0" : item}
                    </motion.span>
                );
            })}
        </div>
    );
};
