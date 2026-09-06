import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TravelChatbot from "@/components/chat/TravelChatbot";

export default function WebsiteLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {children}
      </main>

      <Footer />

      <TravelChatbot />
    </div>
  );
}