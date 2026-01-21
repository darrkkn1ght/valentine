import { ValentineApp } from "@/components/valentine/ValentineApp";

// CLIENT CONFIGURATION - EDIT THIS FOR EACH NEW ORDER
const CLIENT_CONFIG = {
  recipientName: "My Love",
  senderName: "Your Secret Admirer"
};

const Index = () => {
  // Use config values
  const { recipientName, senderName } = CLIENT_CONFIG;

  return (
    <main className="min-h-screen">
      <ValentineApp
        recipientName={recipientName}
        senderName={senderName}
      />
    </main>
  );
};

export default Index;
