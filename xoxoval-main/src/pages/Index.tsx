import { useState, useCallback } from "react";
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

// CLIENT CONFIGURATION - EDIT THIS FOR EACH NEW ORDER
const CLIENT_CONFIG = {
  recipientName: "My Love",
  senderName: "Your Secret Admirer"
};

const Index = () => {
  const [currentScene, setCurrentScene] = useState<Scene>("entry");
  const [selectedSong, setSelectedSong] = useState<string | null>(null);
  const { recipientName, senderName } = CLIENT_CONFIG;

  const goToNextScene = useCallback((nextScene: Scene) => {
    setCurrentScene(nextScene);
  }, []);

  if (!selectedSong) {
    return <SongSelector onSelect={setSelectedSong} />;
  }

  return (
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
            onContinue={() => goToNextScene("buildup")}
          />
        )}

        {currentScene === "buildup" && (
          <BuildUpScene
            key="buildup"
            recipientName={recipientName}
            senderName={senderName}
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
  );
};

export default Index;
