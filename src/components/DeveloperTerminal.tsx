import { useState, useRef, useEffect } from "react";
import { portfolioData } from "@/data/portfolioData";

interface TerminalLine {
  type: 'command' | 'output';
  content: string;
}

const DeveloperTerminal = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'output', content: 'Welcome to Jenish\'s Portfolio Terminal v1.0.0' },
    { type: 'output', content: 'Type "help" to see available commands.' },
    { type: 'output', content: '' }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const { personal, projects, skills, education, contact } = portfolioData;

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();
    let output = '';

    switch (command) {
      case 'help':
        output = 'Available commands:\n  about     - Learn about Jenish\n  skills    - View technical skills\n  projects  - List all projects\n  education - View education background\n  contact   - Get contact information\n  clear     - Clear terminal';
        break;
      case 'about':
        output = `${personal.name}\n${personal.title}\n\n${personal.summary}`;
        break;
      case 'skills':
        output = `Technical Skills:\n${skills.join(', ')}`;
        break;
      case 'projects':
        output = `Projects (${projects.length}):\n\n${projects.map((p, i) => `${i + 1}. ${p.title}\n   ${p.technologies.slice(0, 3).join(', ')}\n   ${p.githubUrl}`).join('\n\n')}`;
        break;
      case 'education':
        output = `${education[0].degree}\n${education[0].institution}\n${education[0].years}`;
        break;
      case 'contact':
        output = `Email: ${contact.email}\nPhone: ${contact.phone}\nLinkedIn: ${contact.linkedIn}\nLocation: ${contact.location}`;
        break;
      case 'clear':
        setHistory([]);
        return;
      case '':
        return;
      default:
        output = `Command not found: ${cmd}\nType "help" to see available commands.`;
    }

    setHistory(prev => [
      ...prev,
      { type: 'command', content: cmd },
      { type: 'output', content: output },
      { type: 'output', content: '' }
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input);
      setInput("");
    }
  };

  return (
    <section className="py-32 px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-semibold mb-6 text-gray-900 tracking-tight">Developer Terminal</h2>
          <p className="text-xl text-gray-500 font-light">Try some commands to explore</p>
        </div>

        <div className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-dot bg-red-500"></div>
            <div className="terminal-dot bg-yellow-500"></div>
            <div className="terminal-dot bg-green-500"></div>
            <span className="ml-4 text-sm text-gray-400">jenish@portfolio ~ %</span>
          </div>
          <div ref={terminalRef} className="terminal-body overflow-y-auto max-h-96">
            {history.map((line, index) => (
              <div key={index}>
                {line.type === 'command' ? (
                  <div className="flex gap-2">
                    <span className="terminal-prompt">❯</span>
                    <span className="text-white">{line.content}</span>
                  </div>
                ) : (
                  <div className="terminal-output whitespace-pre-wrap">{line.content}</div>
                )}
              </div>
            ))}
            <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
              <span className="terminal-prompt">❯</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="terminal-input"
                autoFocus
                spellCheck={false}
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperTerminal;
