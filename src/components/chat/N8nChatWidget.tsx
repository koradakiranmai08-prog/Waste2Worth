import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Minimize2, 
  Maximize2, 
  Trash2, 
  Sparkles, 
  RefreshCw,
  Copy,
  Check,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { sendN8nChatMessage, getOrCreateChatSessionId, ChatMessage } from '../../services/n8nChatService';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-1',
    sender: 'assistant',
    text: "Hello! 👋 I'm your **Waste2Worth Industrial Assistant**, powered by n8n.\n\nI can help you analyze industrial waste, suggest eco-friendly recycling pathways, evaluate effluent water safety, or answer regulatory compliance questions. How can I assist your facility today?",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
];

const SUGGESTIONS = [
  "How to classify spent solvents & chemical waste?",
  "Recommend recycling methods for polypropylene scrap",
  "What are safe BOD/COD effluent discharge levels?",
  "How does Waste2Worth verify disposal manifests?"
];

export const N8nChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('w2w_chat_messages');
      return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
    } catch {
      return INITIAL_MESSAGES;
    }
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem('w2w_chat_messages', JSON.stringify(messages));
    } catch (e) {
      console.warn('Failed to save chat messages', e);
    }
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsg: ChatMessage = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const sessionId = getOrCreateChatSessionId();
      const reply = await sendN8nChatMessage(query, sessionId);

      const botMsg: ChatMessage = {
        id: 'bot_' + Date.now(),
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: 'err_' + Date.now(),
        sender: 'assistant',
        text: `⚠️ *Connection notice:* Could not reach the assistant. Please try again in a few moments.\n\n_Details: ${err?.message || 'Network error'}_`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages(INITIAL_MESSAGES);
    try {
      localStorage.removeItem('w2w_chat_messages');
    } catch (e) {
      console.warn(e);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Basic formatting helper for bold, bullet points, code
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Bold handling
      let formattedLine: React.ReactNode = line;
      if (line.startsWith('### ')) {
        return <h4 key={idx} className="font-bold text-white text-sm mt-2 mb-1">{line.replace('### ', '')}</h4>;
      }
      if (line.startsWith('## ')) {
        return <h3 key={idx} className="font-bold text-white text-base mt-2 mb-1">{line.replace('## ', '')}</h3>;
      }
      if (line.startsWith('* ') || line.startsWith('- ')) {
        return (
          <div key={idx} className="flex items-start gap-2 ml-1 my-0.5">
            <span className="text-[#22C55E] mt-1.5 w-1.5 h-1.5 rounded-full bg-[#22C55E] shrink-0" />
            <span>{line.replace(/^(\*|-)\s+/, '')}</span>
          </div>
        );
      }
      return (
        <p key={idx} className={line ? 'mb-1 leading-relaxed' : 'h-2'}>
          {line}
        </p>
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Chat Window */}
      {isOpen && (
        <div 
          className={`bg-[#101C2C] border border-[#29394D] rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-200 mb-3 ${
            isExpanded 
              ? 'w-[90vw] md:w-[680px] h-[80vh] max-h-[820px]' 
              : 'w-[92vw] sm:w-[420px] h-[560px] max-h-[85vh]'
          }`}
        >
          {/* Header */}
          <div className="p-4 bg-[#162437] border-b border-[#29394D] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center text-[#22C55E]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-white font-heading">Waste2Worth Assistant</h3>
                  <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] text-[10px] font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                    n8n
                  </span>
                </div>
                <p className="text-[11px] text-[#A7B4C5]">Circular Economy & Waste Specialist</p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[#A7B4C5]">
              <button 
                onClick={handleClear} 
                title="Clear Chat History"
                className="p-1.5 rounded-lg hover:text-rose-400 hover:bg-[#1E3048] transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setIsExpanded(!isExpanded)} 
                title={isExpanded ? "Collapse" : "Expand"}
                className="p-1.5 rounded-lg hover:text-white hover:bg-[#1E3048] transition-colors"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button 
                onClick={() => setIsOpen(false)} 
                title="Close Chat"
                className="p-1.5 rounded-lg hover:text-white hover:bg-[#1E3048] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div 
                  key={msg.id} 
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 px-1">
                    <span className="text-[10px] font-medium text-[#A7B4C5]">
                      {isUser ? 'You' : 'n8n Assistant'}
                    </span>
                    <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
                  </div>

                  <div 
                    className={`relative group max-w-[85%] rounded-2xl px-4 py-3 ${
                      isUser 
                        ? 'bg-[#22C55E] text-slate-950 font-medium rounded-tr-none' 
                        : 'bg-[#162437] border border-[#29394D] text-[#F8FAFC] rounded-tl-none shadow-md'
                    }`}
                  >
                    <div className="prose prose-invert prose-xs max-w-none break-words">
                      {renderFormattedText(msg.text)}
                    </div>

                    {!isUser && (
                      <button 
                        onClick={() => handleCopy(msg.id, msg.text)}
                        title="Copy Response"
                        className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded bg-[#101C2C]/80 hover:bg-[#101C2C] text-[#A7B4C5] hover:text-white"
                      >
                        {copiedId === msg.id ? <Check className="w-3 h-3 text-[#22C55E]" /> : <Copy className="w-3 h-3" />}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-1.5 mb-1 px-1">
                  <span className="text-[10px] font-medium text-[#A7B4C5]">n8n Assistant</span>
                </div>
                <div className="bg-[#162437] border border-[#29394D] rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-2 text-[#A7B4C5]">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#22C55E]" />
                  <span>Consulting waste workflow & knowledge base...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions (if few messages) */}
          {messages.length <= 3 && !loading && (
            <div className="px-4 pb-2">
              <p className="text-[10px] text-[#A7B4C5] font-semibold mb-1.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#22C55E]" /> Suggested Questions:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTIONS.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(s)}
                    className="text-left text-[11px] bg-[#162437] hover:bg-[#1E3048] border border-[#29394D] hover:border-[#22C55E]/40 text-[#A7B4C5] hover:text-white px-2.5 py-1 rounded-lg transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Footer */}
          <div className="p-3 bg-[#162437] border-t border-[#29394D]">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about waste, water safety, circular recycling..."
                disabled={loading}
                className="flex-1 bg-[#0B1220] border border-[#29394D] focus:border-[#22C55E] focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="w-10 h-10 rounded-xl bg-[#22C55E] hover:bg-[#16a34a] disabled:opacity-40 disabled:hover:bg-[#22C55E] text-slate-950 flex items-center justify-center transition-all shrink-0 cursor-pointer shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-slate-500">
              <span>n8n Cloud Webhook Active</span>
              <a 
                href="https://energetic.app.n8n.cloud" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-[#22C55E] flex items-center gap-1 transition-colors"
              >
                <span>Workflow Engine</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating Launcher Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle n8n Chat Assistant"
        className="group relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#162437] to-[#1E3048] border-2 border-[#22C55E] shadow-xl hover:scale-105 active:scale-95 transition-all text-[#22C55E] hover:shadow-[#22C55E]/20"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <>
            <Bot className="w-7 h-7 text-[#22C55E] group-hover:rotate-6 transition-transform" />
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#22C55E]"></span>
            </span>
          </>
        )}
      </button>
    </div>
  );
};
