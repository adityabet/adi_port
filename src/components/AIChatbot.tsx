import { useState, useEffect, useRef } from "react";
import { Send, Sparkles, X, MessageSquare, Terminal, Dot } from "lucide-react";

interface Message {
  role: "user" | "model";
  content: string;
}

interface AIChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_PROMPTS = [
  { text: "Why should we hire Aditya?", icon: "💼" },
  { text: "Tell me about his AmbuGrid Internship.", icon: "⚙️" },
  { text: "How does his AR Restaurant Platform work?", icon: "🍕" },
  { text: "What are his core machine learning skills?", icon: "📈" }
];

export default function AIChatbot({ isOpen, onClose }: AIChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content: "Welcome! I am Aditya's **AI Twin v1.0**. I have full semantic knowledge of his projects, engineering skills, and internships. Select a prompt below or ask me any interview question!"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg]
        })
      });

      const data = await response.json();
      if (response.ok && data.content) {
        setMessages((prev) => [...prev, { role: "model", content: data.content }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            content: "My connection experienced a minor anomaly. I can reassure you that Aditya is reachable directly at adityabet214@gmail.com!"
          }
        ]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content: "Network handshake timed out. However, you can review Aditya's skills directly in the sections behind me or email him at adityabet214@gmail.com!"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 w-[360px] md:w-[410px] h-[550px] rounded-2xl glass-panel border border-brand-cyan/20 flex flex-col shadow-[0_15px_40px_rgba(0,0,0,0.5)] overflow-hidden z-50 animate-slideUp">
      {/* Glow highlight */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-gold" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:15px_15px] pointer-events-none" />

      {/* Header panel */}
      <div className="p-4 bg-dark-bg/85 border-b border-white/5 flex items-center justify-between z-10">
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-brand-cyan/30 to-brand-purple/30 p-[1px]">
            <div className="w-full h-full rounded-full bg-dark-bg flex items-center justify-center">
              <Sparkles size={12} className="text-brand-cyan animate-pulse" />
            </div>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-dark-bg flex items-center justify-center">
              <Dot className="text-white scale-150 animate-ping" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-xs text-white tracking-wide">ADITYA_AI</span>
              <span className="text-[8px] font-mono bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/25 px-1.5 py-0.5 rounded-full">v1.0</span>
            </div>
            <span className="text-[9px] font-mono text-neutral-400 block mt-0.5">Cognitive Recruiter Replica</span>
          </div>
        </div>

        <button
          onClick={onClose}
          data-cursor="close"
          className="p-1.5 rounded-full hover:bg-white/5 text-neutral-400 hover:text-white transition-all cursor-pointer focus:outline-none"
        >
          <X size={16} />
        </button>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-neutral-950/40 relative">
        {messages.map((msg, i) => {
          const isModel = msg.role === "model";
          return (
            <div
              key={i}
              className={`flex flex-col max-w-[85%] ${isModel ? "self-start" : "self-end items-end"}`}
            >
              <span className="text-[8px] font-mono text-neutral-500 mb-1">
                {isModel ? "Replica" : "You"}
              </span>
              <div
                className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                  isModel
                    ? "bg-neutral-900/60 border border-white/5 text-neutral-300 rounded-tl-none shadow-md"
                    : "bg-brand-cyan text-dark-bg font-medium rounded-tr-none shadow-[0_4px_15px_rgba(249,115,22,0.15)]"
                }`}
              >
                {/* Parse basic markdown styling for highlights */}
                <p className="whitespace-pre-wrap">
                  {msg.content.split("**").map((part, index) => {
                    if (index % 2 === 1) {
                      return (
                        <strong key={index} className={isModel ? "text-brand-cyan font-semibold" : "text-neutral-900 font-extrabold"}>
                          {part}
                        </strong>
                      );
                    }
                    return part;
                  })}
                </p>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="self-start flex flex-col max-w-[80%]">
            <span className="text-[8px] font-mono text-neutral-500 mb-1">Replica</span>
            <div className="p-3 bg-neutral-900/40 border border-white/5 rounded-2xl rounded-tl-none flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Presets Grid */}
      {messages.length === 1 && (
        <div className="px-4 py-2 border-t border-white/5 bg-neutral-950/60 z-10">
          <span className="text-[9px] font-mono tracking-wider text-neutral-500 uppercase block mb-2">Preset Questions</span>
          <div className="grid grid-cols-2 gap-2">
            {PRESET_PROMPTS.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(prompt.text)}
                className="p-2 text-left bg-neutral-900/50 hover:bg-brand-cyan/5 border border-white/5 hover:border-brand-cyan/25 rounded-xl text-[10px] text-neutral-300 hover:text-brand-cyan transition-all duration-300 cursor-pointer flex items-center gap-1.5 truncate focus:outline-none"
              >
                <span>{prompt.icon}</span>
                <span className="truncate">{prompt.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input section */}
      <div className="p-3 bg-dark-bg/90 border-t border-white/5 flex items-center gap-2 z-10">
        <div className="relative flex-1">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage(inputValue);
            }}
            placeholder="Type your interview question..."
            className="w-full bg-neutral-900/60 border border-white/10 hover:border-white/20 focus:border-brand-cyan/60 rounded-full py-2.5 pl-4 pr-10 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand-cyan/30 placeholder-neutral-500 transition-all"
          />
          <Terminal size={12} className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-neutral-500" />
        </div>
        <button
          onClick={() => handleSendMessage(inputValue)}
          disabled={!inputValue.trim()}
          className="w-9 h-9 rounded-full bg-brand-cyan text-dark-bg flex items-center justify-center hover:bg-orange-400 active:scale-95 disabled:bg-neutral-800 disabled:text-neutral-600 transition-all cursor-pointer focus:outline-none shadow-[0_0_15px_rgba(249,115,22,0.2)]"
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}
