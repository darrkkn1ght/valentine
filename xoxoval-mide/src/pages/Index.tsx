import { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { FloatingDoodles } from "@/components/doodles/FloatingDoodles";
import { EntryScene } from "@/components/scenes/EntryScene";
import { BuildUpScene } from "@/components/scenes/BuildUpScene";
import { TeaseScene } from "@/components/scenes/TeaseScene";
import { AskScene } from "@/components/scenes/AskScene";
import { CelebrationScene } from "@/components/scenes/CelebrationScene";
import { SongSelector } from "@/components/SongSelector";
import MusicPlayer from "@/components/MusicPlayer";

type Scene = "entry" | "buildup" | "tease" | "ask" | "celebration";

import { CLIENT_CONFIG as DEFAULT_CONFIG } from "@/config";
import { InteractiveBackground } from "@/components/effects/InteractiveBackground";
import { CursorEffects } from "@/components/effects/CursorEffects";

const Index = () => {
  const [currentScene, setCurrentScene] = useState<Scene>("entry");
  const [selectedSong, setSelectedSong] = useState<string | null>(null);
  const [started, setStarted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Merge default config with any URL parameters
  const params = new URLSearchParams(window.location.search);
  const recipientName = params.get("to") || DEFAULT_CONFIG.recipientName;
  const senderName = DEFAULT_CONFIG.senderName;
  const nickname = DEFAULT_CONFIG.nickname;
  const customMessage = DEFAULT_CONFIG.customMessage;

  useEffect(() => {
    if (recipientName) {
      document.title = `For ${recipientName} 💝`;
    }
  }, [recipientName]);

  const goToNextScene = useCallback((nextScene: Scene) => {
    setCurrentScene(nextScene);
  }, []);

  if (!selectedSong) {
    return <SongSelector onSelect={setSelectedSong} />;
  }

  return (
    <InteractiveBackground>
      <CursorEffects />
      <div className="min-h-screen relative overflow-hidden">
        <MusicPlayer src={selectedSong} />


        {/* Background floating doodles - now on top of paper backgrounds */}
        <FloatingDoodles
          density={currentScene === "celebration" ? "heavy" : "medium"}
        />

        {/* Scene content */}
        <AnimatePresence mode="wait">
          {currentScene === "entry" && (
            <EntryScene
              key="entry"
              recipientName={recipientName}
              nickname={nickname}
              onContinue={() => goToNextScene("buildup")}
            />
          )}

          {currentScene === "buildup" && (
            <BuildUpScene
              key="buildup"
              recipientName={recipientName}
              senderName={senderName}
              customMessage={customMessage}
              onContinue={() => goToNextScene("tease")}
            />
          )}

          {currentScene === "tease" && (
            <TeaseScene
              key="tease"
              onContinue={() => goToNextScene("ask")}
            />
          )}

          {currentScene === "ask" && (
            <AskScene
              key="ask"
              recipientName={recipientName}
              onYes={() => goToNextScene("celebration")}
            />
          )}

          {currentScene === "celebration" && (
            <CelebrationScene
              key="celebration"
              recipientName={recipientName}
              senderName={senderName}
            />
          )}
        </AnimatePresence>
      </div>
    </InteractiveBackground>
  );
};

export default Index;
