
import { useEffect, useRef, useState } from "react";
import { Music, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // Sync state with actual audio status
        const updateState = () => setIsPlaying(!audio.paused);
        audio.addEventListener('play', updateState);
        audio.addEventListener('pause', updateState);

        // Define the click handler for fallback
        const handleFirstClick = () => {
            audio.play()
                .catch((err) => {
                    console.error("User interaction play failed:", err);
                });
            // Remove listener after first interaction
            document.removeEventListener('click', handleFirstClick);
        };

        // Attempt auto-play immediately
        const playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise
                .catch(() => {
                    console.log("Autoplay prevented. Waiting for user interaction.");
                    // Add click listener as fallback
                    document.addEventListener('click', handleFirstClick);
                });
        }

        return () => {
            document.removeEventListener('click', handleFirstClick);
            audio.removeEventListener('play', updateState);
            audio.removeEventListener('pause', updateState);
        };
    }, []);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (audioRef.current.paused) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <audio
                ref={audioRef}
                loop
                src="/music/background-music.mp3"
                preload="auto"
            />
            <Button
                variant="outline"
                size="icon"
                className="rounded-full w-12 h-12 bg-white/80 backdrop-blur-sm border-pink-200 hover:bg-white hover:border-pink-300 shadow-lg transition-all duration-300 hover:scale-105"
                onClick={togglePlay}
            >
                {isPlaying ? (
                    <Music2 className="h-6 w-6 text-pink-500 animate-pulse" />
                ) : (
                    <Music className="h-6 w-6 text-pink-400" />
                )}
            </Button>
        </div>
    );
};

export default MusicPlayer;
