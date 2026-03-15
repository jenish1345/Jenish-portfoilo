import { Button } from "@/components/ui/button";
import ContactForm from "@/components/ContactForm";
import { portfolioData } from "@/data/portfolioData";
import { Linkedin, Mail, Github } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Contact = () => {
  const { contact } = portfolioData;

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-32 pb-24 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-24 animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-semibold mb-6 text-gray-900 tracking-tight">Let's Connect</h1>
            <p className="text-xl text-gray-500 font-light">Interested in collaborations or tech discussions?</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">Contact Information</h2>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl hover:shadow-sm transition-all group">
                <Mail className="h-6 w-6 text-gray-400 group-hover:text-gray-900 transition-colors" />
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{contact.email}</span>
              </a>
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl hover:shadow-sm transition-all group">
                <span className="text-gray-400 group-hover:text-gray-900 transition-colors text-xl">📱</span>
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{contact.phone}</span>
              </a>
              <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl">
                <span className="text-gray-400 text-xl">📍</span>
                <span className="text-gray-700">{contact.location}</span>
              </div>
              <div className="flex gap-4 pt-4">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-blue-50 hover:text-blue-600 w-12 h-12 transition-all" onClick={() => window.open(contact.linkedIn, '_blank')}>
                  <Linkedin className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-blue-50 hover:text-blue-600 w-12 h-12 transition-all" onClick={() => window.open('https://github.com/jenish1345', '_blank')}>
                  <Github className="h-6 w-6" />
                </Button>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
