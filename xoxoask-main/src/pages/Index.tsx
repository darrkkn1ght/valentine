import { ValentineApp } from "@/components/valentine/ValentineApp";

const Index = () => {
  // These can be customized via URL params or a personalization form
  const recipientName = "My Love";
  const senderName = "Your Secret Admirer";

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
