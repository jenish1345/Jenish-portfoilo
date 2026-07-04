import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import { EMAILJS_CONFIG, isEmailJSConfigured } from "@/lib/emailjs";

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [emailError, setEmailError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === "email") {
      if (value && !validateEmail(value)) {
        setEmailError("Please enter a valid email address.");
      } else {
        setEmailError("");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setIsSending(true);

    try {
      if (isEmailJSConfigured()) {
        await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_email: EMAILJS_CONFIG.TO_EMAIL,
            reply_to: formData.email,
          },
          { publicKey: EMAILJS_CONFIG.PUBLIC_KEY }
        );
        toast({
          title: "Message sent!",
          description: "I'll get back to you within 24 hours.",
        });
      } else {
        // Fallback until EmailJS is configured
        const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
        const body = encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        );
        window.open(
          `mailto:antonyjenishfernando@gmail.com?subject=${subject}&body=${body}`,
          "_blank"
        );
        toast({
          title: "Opening email client…",
          description: "Your message will be sent via your default email app.",
        });
      }

      setFormData({ name: "", email: "", message: "" });
      setEmailError("");
    } catch {
      toast({
        title: "Failed to send",
        description: "Please email me directly at antonyjenishfernando@gmail.com",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-8">Send a Message</h3>
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <Input
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
          className="border-2 border-purple-200/60 bg-white/70 backdrop-blur-xl text-gray-800 placeholder:text-gray-400 rounded-2xl py-7 px-6 text-base shadow-sm focus:shadow-purple-300/50 focus:border-purple-400 transition-all"
        />

        <div>
          <Input
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
            aria-invalid={!!emailError}
            aria-describedby={emailError ? "cf-email-error" : undefined}
            className={`border-2 bg-white/70 backdrop-blur-xl text-gray-800 placeholder:text-gray-400 rounded-2xl py-7 px-6 text-base shadow-sm transition-all ${
              emailError
                ? "border-red-400 focus:border-red-400"
                : "border-pink-200/60 focus:shadow-pink-300/50 focus:border-pink-400"
            }`}
          />
          {emailError && (
            <p id="cf-email-error" role="alert" className="mt-1.5 text-xs text-red-500 flex items-center gap-1 px-1">
              <span>⚠</span> {emailError}
            </p>
          )}
        </div>

        <Textarea
          placeholder="Your Message"
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          required
          rows={6}
          className="border-2 border-blue-200/60 bg-white/70 backdrop-blur-xl text-gray-800 placeholder:text-gray-400 rounded-2xl py-6 px-6 text-base resize-none shadow-sm focus:shadow-blue-300/50 focus:border-blue-400 transition-all"
        />

        <Button
          type="submit"
          disabled={isSending || !!emailError || !formData.email || !formData.message || !formData.name}
          className="w-full bg-white/70 backdrop-blur-xl hover:bg-white/90 text-purple-700 rounded-full py-7 text-base font-medium transition-all hover:scale-105 shadow-xl border-2 border-white/50 hover:shadow-2xl hover:shadow-purple-300/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          aria-label="Send message"
        >
          {isSending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send className="mr-2 h-5 w-5" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
