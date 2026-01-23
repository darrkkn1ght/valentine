import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScatteredTextProps {
    text: string;
    className?: string;
    delay?: number;
    wordMode?: boolean; // if true, splits by words instead of chars.
}

export const ScatteredText = ({ text, className, delay = 0, wordMode = false }: ScatteredTextProps) => {
    if (wordMode) {
        const items = text.split(" ");
        return (
            <div className={cn("inline-block", className)}>
                {items.map((item, index) => {
                    const rotation = Math.random() * 10 - 5;
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
                            style={{ marginRight: "0.3em" }}
                        >
                            {item}
                        </motion.span>
                    );
                })}
            </div>
        );
    }

    // Default character mode with word grouping
    const words = text.split(" ");
    let charCount = 0;

    return (
        <div className={cn("inline-block", className)}>
            {words.map((word, wIndex) => {
                const chars = word.split("");

                return (
                    <span key={wIndex} className="inline-block whitespace-nowrap">
                        {chars.map((char, cIndex) => {
                            const index = charCount++;
                            const rotation = Math.random() * 10 - 5;
                            const yOffset = Math.random() * 4 - 2;

                            return (
                                <motion.span
                                    key={`${wIndex}-${cIndex}`}
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
                                    style={{ marginRight: "0.02em" }}
                                >
                                    {char}
                                </motion.span>
                            );
                        })}
                        {/* Add space after word if not last */}
                        {wIndex < words.length - 1 && (() => {
                            const index = charCount++;
                            const rotation = Math.random() * 10 - 5;
                            const yOffset = Math.random() * 4 - 2;

                            return (
                                <motion.span
                                    key={`space-${wIndex}`}
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
                                    style={{ marginRight: "0.02em" }}
                                >
                                    {"\u00A0"}
                                </motion.span>
                            );
                        })()}
                    </span>
                );
            })}
        </div>
    );
};
