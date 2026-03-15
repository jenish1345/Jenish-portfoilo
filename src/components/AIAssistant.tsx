import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { portfolioData } from "@/data/portfolioData";
import { Send, Bot, User as UserIcon } from "lucide-react";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm Jenish's AI assistant. Ask me anything about Antony Jenish Fernando - his projects, skills, education, or experience!" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { personal, projects, skills, education, areasOfInterest, contact } = portfolioData;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Animate new messages
    const lastMessage = document.querySelector('.message-enter:last-child');
    if (lastMessage) {
      lastMessage.classList.add('message-slide-in');
    }
  }, [messages]);

  const getResponse = (question: string): string => {
    const q = question.toLowerCase();

    // Projects
    if (q.includes('project')) {
      return `Jenish has ${projects.length} impressive projects:\n\n${projects.map((p, i) => 
        `${i + 1}. ${p.title}\n   ${p.description}\n   Tech: ${p.technologies.slice(0, 3).join(', ')}`
      ).join('\n\n')}\n\nWant to know more about a specific project? Just ask!`;
    }

    // Skills
    if (q.includes('skill') || q.includes('technolog') || q.includes('know')) {
      return `Jenish's technical skills include:\n\n${skills.join(', ')}\n\nHe's particularly interested in ${areasOfInterest.slice(0, 2).join(' and ')}.`;
    }

    // Education
    if (q.includes('education') || q.includes('study') || q.includes('college') || q.includes('university')) {
      return `Jenish is currently pursuing ${education[0].degree} at ${education[0].institution} (${education[0].years}).\n\nHe completed ${education[1].degree} in ${education[1].stream} from ${education[1].institution}.`;
    }

    // Experience
    if (q.includes('experience') || q.includes('work') || q.includes('intern')) {
      return `Jenish completed an internship at V.O. Chidambaranar Port Trust, where he gained hands-on experience in port operations, logistics management, and maritime technology systems.`;
    }

    // Contact
    if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('phone')) {
      return `You can reach Jenish at:\n\nEmail: ${contact.email}\nPhone: ${contact.phone}\nLinkedIn: ${contact.linkedIn}\nLocation: ${contact.location}`;
    }

    // About
    if (q.includes('about') || q.includes('who') || q.includes('introduce')) {
      return `Antony Jenish Fernando is ${personal.title}. ${personal.summary}`;
    }

    // Interests
    if (q.includes('interest') || q.includes('passion') || q.includes('like')) {
      return `Jenish is passionate about:\n\n${areasOfInterest.map((interest, i) => `${i + 1}. ${interest}`).join('\n')}`;
    }

    // Specific projects
    const projectMatch = projects.find(p => q.includes(p.title.toLowerCase()));
    if (projectMatch) {
      return `${projectMatch.title}:\n\n${projectMatch.description}\n\nTechnologies: ${projectMatch.technologies.join(', ')}\n\nGitHub: ${projectMatch.githubUrl}`;
    }

    // Default
    return `I can help you learn about Jenish! Try asking:\n\n• What are his projects?\n• What technologies does he know?\n• Tell me about his education\n• What is his experience?\n• How can I contact him?\n• What are his interests?`;
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = getResponse(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 800);
  };

  const quickQuestions = [
    "What are his projects?",
    "What technologies does he know?",
    "Tell me about his education",
    "How can I contact him?"
  ];

  return (
    <section className="fade-in-section py-16 px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-semibold mb-6 text-gray-800 tracking-tight">Ask About Me</h2>
          <p className="text-xl text-gray-600 font-light">Chat with my AI assistant to learn more</p>
        </div>

        <Card className="shadow-2xl border-2 border-white/50 rounded-3xl bg-white/60 backdrop-blur-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-100/80 via-pink-100/80 to-blue-100/80 p-6 border-b border-white/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Jenish's AI Assistant</h3>
                <p className="text-sm text-gray-600">Ask me anything about Jenish</p>
              </div>
            </div>
          </div>

          <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-white/40 to-white/60 chat-container">
            {messages.map((message, index) => (
              <div key={index} className={`flex gap-3 message-enter ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                )}
                <div className={`max-w-[75%] p-4 rounded-2xl ${
                  message.role === 'user' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg border-2 border-white/30' 
                    : 'bg-white/80 backdrop-blur-xl text-gray-800 shadow-sm border-2 border-white/50'
                }`}>
                  <p className="whitespace-pre-wrap leading-relaxed font-light text-sm">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <UserIcon className="h-5 w-5 text-gray-700" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3 message-enter">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div className="bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-sm border-2 border-white/50">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-6 bg-white/60 backdrop-blur-xl border-t border-white/40">
            <div className="flex flex-wrap gap-2 mb-4">
              {quickQuestions.map((question) => (
                <Button
                  key={question}
                  variant="outline"
                  size="sm"
                  className="text-xs border-2 border-purple-200/60 text-gray-600 hover:bg-purple-100/80 hover:text-purple-700 hover:border-purple-400 rounded-full transition-all"
                  onClick={() => {
                    setInput(question);
                    setTimeout(() => {
                      const form = document.querySelector('form');
                      form?.requestSubmit();
                    }, 100);
                  }}
                >
                  {question}
                </Button>
              ))}
            </div>
            <form onSubmit={handleSend} className="flex gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about Jenish..."
                className="flex-1 border-2 border-purple-200/60 bg-white/80 backdrop-blur-xl text-gray-800 placeholder:text-gray-400 rounded-full py-6 px-6 text-base focus:border-purple-400 focus:shadow-lg focus:shadow-purple-300/50 transition-all"
              />
              <Button type="submit" size="icon" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full w-12 h-12 flex-shrink-0 transition-all hover:scale-105 shadow-lg">
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default AIAssistant;
