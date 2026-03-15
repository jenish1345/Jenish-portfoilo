import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:antonyjenish1345@gmail.com?subject=${subject}&body=${body}`;
    toast({ title: "Opening email client...", description: "Your message will be sent via your default email app." });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-8">Send a Message</h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input 
          placeholder="Your Name" 
          value={formData.name} 
          onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
          required 
          className="border-2 border-purple-200/60 bg-white/70 backdrop-blur-xl text-gray-800 placeholder:text-gray-400 rounded-2xl py-7 px-6 text-base shadow-sm focus:shadow-purple-300/50 focus:border-purple-400 transition-all" 
        />
        <Input 
          type="email" 
          placeholder="Your Email" 
          value={formData.email} 
          onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
          required 
          className="border-2 border-pink-200/60 bg-white/70 backdrop-blur-xl text-gray-800 placeholder:text-gray-400 rounded-2xl py-7 px-6 text-base shadow-sm focus:shadow-pink-300/50 focus:border-pink-400 transition-all" 
        />
        <Textarea 
          placeholder="Your Message" 
          value={formData.message} 
          onChange={(e) => setFormData({ ...formData, message: e.target.value })} 
          required 
          rows={6} 
          className="border-2 border-blue-200/60 bg-white/70 backdrop-blur-xl text-gray-800 placeholder:text-gray-400 rounded-2xl py-6 px-6 text-base resize-none shadow-sm focus:shadow-blue-300/50 focus:border-blue-400 transition-all" 
        />
        <Button type="submit" className="w-full bg-white/70 backdrop-blur-xl hover:bg-white/90 text-purple-700 rounded-full py-7 text-base font-medium transition-all hover:scale-105 shadow-xl border-2 border-white/50 hover:shadow-2xl hover:shadow-purple-300/50">
          <Send className="mr-2 h-5 w-5" />
          Send Message
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
