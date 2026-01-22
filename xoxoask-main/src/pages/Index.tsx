import { useState } from "react";
import { ValentineApp } from "@/components/valentine/ValentineApp";
import { SongSelector } from "@/components/SongSelector";
import MusicPlayer from "@/components/MusicPlayer";

// CLIENT CONFIGURATION - EDIT THIS FOR EACH NEW ORDER
const CLIENT_CONFIG = {
  recipientName: "My Love",
  senderName: "Your Secret Admirer"
};

const Index = () => {
  const [selectedSong, setSelectedSong] = useState<string | null>(null);
  // Use config values
  const { recipientName, senderName } = CLIENT_CONFIG;

  if (!selectedSong) {
    return <SongSelector onSelect={setSelectedSong} />;
  }

  return (
    <main className="min-h-screen">
      <MusicPlayer src={selectedSong} />
      <ValentineApp
        recipientName={recipientName}
        senderName={senderName}
      />
    </main>
  );
};

export default Index;
