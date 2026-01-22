import { motion } from "framer-motion";
import { Music, Play } from "lucide-react";
import { useState } from "react";
import { ValentineButton } from "./ValentineButton";
import { PaperBackground } from "./PaperBackground";
import { HeartDoodle } from "./doodles/HeartDoodle";
import { MusicNoteDoodle } from "./doodles/MusicNoteDoodle";
import { SparkleDoodle } from "./doodles/SparkleDoodle";
import { StarDoodle } from "./doodles/StarDoodle";

interface SongSelectorProps {
    onSelect: (songUrl: string) => void;
}

const songs = [
    {
        id: 1,
        title: "Until I Found You",
        artist: "Stephen Sanchez",
        url: "/music/background-music.mp3",
        Doodle: (props: any) => <MusicNoteDoodle {...props} variant={1} color="#3b82f6" /> // Blueish
    },
    {
        id: 2,
        title: "Ordinary",
        artist: "Alex Warren",
        url: "/music/ordinary.mp3",
        Doodle: (props: any) => <MusicNoteDoodle {...props} variant={2} color="#8b5cf6" /> // Purpleish
    },
    {
        id: 3,
        title: "Sailor Song",
        artist: "Gigi Perez",
        url: "/music/sailor-song.mp3",
        Doodle: (props: any) => <StarDoodle {...props} color="#06b6d4" /> // Cyan
    },
    {
        id: 4,
        title: "Lover",
        artist: "Taylor Swift",
        url: "/music/lover.mp3",
        Doodle: (props: any) => <HeartDoodle {...props} color="#ec4899" /> // Pink
    }
];

export const SongSelector = ({ onSelect }: SongSelectorProps) => {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    return (
        <PaperBackground variant="default">
            <div className="min-h-screen flex flex-col items-center justify-center p-8 z-10 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md w-full"
                >
                    <div className="text-center mb-10 relative">
                        {/* Decorative elements */}
                        <motion.div
                            className="absolute -top-10 -left-10 hidden md:block"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            <SparkleDoodle size={40} className="text-primary/40" />
                        </motion.div>

                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="inline-block mb-4 p-4 bg-white/50 rounded-full shadow-sm backdrop-blur-sm"
                        >
                            <MusicNoteDoodle size={60} className="text-primary" />
                        </motion.div>

                        <h1 className="text-4xl font-crayon text-foreground mb-2 flex items-center justify-center gap-3">
                            Pick Our Vibe
                            <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                <MusicNoteDoodle size={32} variant={2} className="text-primary" />
                            </motion.div>
                        </h1>
                        <p className="text-muted-foreground font-handwritten text-xl">
                            Select a song to start the experience
                        </p>
                    </div>

                    <div className="space-y-4 mb-10">
                        {songs.map((song) => (
                            <motion.button
                                key={song.id}
                                onClick={() => setSelectedId(song.id)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 group relative overflow-hidden ${selectedId === song.id
                                    ? "bg-primary/5 border-primary shadow-lg"
                                    : "bg-white/60 border-input hover:border-primary/50"
                                    }`}
                            >
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-background border-2 transition-colors ${selectedId === song.id ? "border-primary animate-spin-slow" : "border-muted"
                                    }`}>
                                    <song.Doodle size={24} />
                                </div>
                                <div className="flex-1 text-left z-10">
                                    <h3 className={`font-bold font-crayon ${selectedId === song.id ? "text-primary" : "text-foreground"}`}>
                                        {song.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">{song.artist}</p>
                                </div>
                                {selectedId === song.id && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="text-primary z-10"
                                    >
                                        <Play className="fill-current w-6 h-6" />
                                    </motion.div>
                                )}
                            </motion.button>
                        ))}
                    </div>

                    <div className={`flex justify-center ${!selectedId ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}>
                        <ValentineButton
                            variant="yes"
                            onClick={() => {
                                if (selectedId) {
                                    const song = songs.find(s => s.id === selectedId);
                                    if (song) onSelect(song.url);
                                }
                            }}
                        >
                            <span className="flex items-center gap-2">
                                Start Experience
                                <SparkleDoodle size={20} className="text-white fill-white" />
                            </span>
                        </ValentineButton>
                    </div>
                </motion.div>
            </div>
        </PaperBackground>
    );
};
