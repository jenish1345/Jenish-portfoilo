import AIAssistant from "@/components/AIAssistant";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const AIChat = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-32 pb-24">
        <AIAssistant />
      </div>
      <Footer />
    </div>
  );
};

export default AIChat;
