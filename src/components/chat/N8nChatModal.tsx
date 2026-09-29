import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Trash2, 
  Sparkles, 
  RefreshCw,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Recycle,
  Droplets,
  Layers
} from 'lucide-react';
import { sendN8nChatMessage, getOrCreateChatSessionId, ChatMessage } from '../../services/n8nChatService';

interface N8nChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

const DEFAULT_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-m-1',
    sender: 'assistant',
    text: "Welcome to the **Waste2Worth Intelligent Assistant**!\n\nConnected directly to our **n8n automated workflow engine**, I can assist with:\n- Industrial waste classification & secondary marketplace matching\n- Water pollution risk assessment & BOD/COD effluent guidelines\n- EPA/Pollution Control Board compliance requirements\n- Material recovery techniques and carbon offset tracking\n\nHow can I help you today?",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
];

export const N8nChatModal: React.FC<N8nChatModalProps> = ({ isOpen, onClose, initialPrompt }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('w2w_chat_messages_modal');
      return saved ? JSON.parse(saved) : DEFAULT_MESSAGES;
    } catch {
      return DEFAULT_MESSAGES;
    }
  });

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 150);
      if (initialPrompt && initialPrompt.trim()) {
        handleSend(initialPrompt);
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    try {
      localStorage.setItem('w2w_chat_messages_modal', JSON.stringify(messages));
    } catch (e) {
      console.warn(e);
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsg: ChatMessage = {
      id: 'm_usr_' + Date.now(),
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
        id: 'm_bot_' + Date.now(),
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: 'm_err_' + Date.now(),
        sender: 'assistant',
        text: `⚠️ *Connection notice:* Could not reach the assistant. Please try again.\n\n_Details: ${err?.message || 'Network error'}_`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages(DEFAULT_MESSAGES);
    try {
      localStorage.removeItem('w2w_chat_messages_modal');
    } catch (e) {
      console.warn(e);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      if (line.startsWith('### ')) {
        return <h4 key={idx} className="font-bold text-white text-sm mt-3 mb-1">{line.replace('### ', '')}</h4>;
      }
      if (line.startsWith('## ')) {
        return <h3 key={idx} className="font-bold text-white text-base mt-3 mb-1">{line.replace('## ', '')}</h3>;
      }
      if (line.startsWith('* ') || line.startsWith('- ')) {
        return (
          <div key={idx} className="flex items-start gap-2 ml-1 my-1">
            <span className="text-[#22C55E] mt-1.5 w-1.5 h-1.5 rounded-full bg-[#22C55E] shrink-0" />
            <span>{line.replace(/^(\*|-)\s+/, '')}</span>
          </div>
        );
      }
      return (
        <p key={idx} className={line ? 'mb-1.5 leading-relaxed' : 'h-2'}>
          {line}
        </p>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-3xl h-[85vh] max-h-[780px] bg-[#101C2C] border border-[#29394D] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scaleUp"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#162437] border-b border-[#29394D] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center text-[#22C55E]">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white font-heading">Waste2Worth Assistant</h2>
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 text-[#22C55E] text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                  n8n Cloud Webhook Active
                </span>
              </div>
              <p className="text-xs text-[#A7B4C5]">Circular Economy, Water Pollution Prevention & Regulatory Compliance</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={handleClear} 
              title="Clear Conversation"
              className="p-2 rounded-xl bg-[#0B1220] hover:bg-[#1E3048] text-[#A7B4C5] hover:text-rose-400 border border-[#29394D] transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button 
              onClick={onClose} 
              title="Close Dialog"
              className="p-2 rounded-xl bg-[#0B1220] hover:bg-[#1E3048] text-[#A7B4C5] hover:text-white border border-[#29394D] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Domain Shortcuts Banner */}
        <div className="px-5 py-2.5 bg-[#0D1826] border-b border-[#29394D]/60 flex items-center gap-2 overflow-x-auto text-xs scrollbar-none">
          <span className="text-[#A7B4C5] text-[11px] font-semibold whitespace-nowrap flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#22C55E]" /> Topics:
          </span>
          <button
            onClick={() => handleSend("What are the criteria for listing post-industrial plastic scrap on Waste2Worth?")}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#162437] hover:bg-[#1E3048] border border-[#29394D] text-[#A7B4C5] hover:text-white whitespace-nowrap transition-colors"
          >
            <Recycle className="w-3 h-3 text-[#22C55E]" />
            Polymer Scrap
          </button>
          <button
            onClick={() => handleSend("How can we treat high COD and BOD in industrial textile effluent?")}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#162437] hover:bg-[#1E3048] border border-[#29394D] text-[#A7B4C5] hover:text-white whitespace-nowrap transition-colors"
          >
            <Droplets className="w-3 h-3 text-[#06B6D4]" />
            Effluent & COD/BOD
          </button>
          <button
            onClick={() => handleSend("Explain the legal chain of custody and manifest requirements for hazardous industrial sludge.")}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#162437] hover:bg-[#1E3048] border border-[#29394D] text-[#A7B4C5] hover:text-white whitespace-nowrap transition-colors"
          >
            <ShieldCheck className="w-3 h-3 text-amber-400" />
            Compliance & Manifests
          </button>
          <button
            onClick={() => handleSend("How does secondary raw material exchange benefit our ESG reporting and scope 3 emissions?")}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#162437] hover:bg-[#1E3048] border border-[#29394D] text-[#A7B4C5] hover:text-white whitespace-nowrap transition-colors"
          >
            <Layers className="w-3 h-3 text-indigo-400" />
            ESG & Scope 3
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-sm">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div 
                key={msg.id} 
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-2 mb-1 px-1">
                  <span className="text-xs font-semibold text-[#A7B4C5]">
                    {isUser ? 'You' : 'n8n Assistant'}
                  </span>
                  <span className="text-[11px] text-slate-500">{msg.timestamp}</span>
                </div>

                <div 
                  className={`relative group max-w-[85%] rounded-2xl px-5 py-3.5 ${
                    isUser 
                      ? 'bg-[#22C55E] text-slate-950 font-medium rounded-tr-none' 
                      : 'bg-[#162437] border border-[#29394D] text-[#F8FAFC] rounded-tl-none shadow-md'
                  }`}
                >
                  <div className="prose prose-invert prose-sm max-w-none break-words">
                    {renderFormattedText(msg.text)}
                  </div>

                  {!isUser && (
                    <button 
                      onClick={() => handleCopy(msg.id, msg.text)}
                      title="Copy Response"
                      className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg bg-[#101C2C]/80 hover:bg-[#101C2C] text-[#A7B4C5] hover:text-white"
                    >
                      {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2 mb-1 px-1">
                <span className="text-xs font-semibold text-[#A7B4C5]">n8n Assistant</span>
              </div>
              <div className="bg-[#162437] border border-[#29394D] rounded-2xl rounded-tl-none px-5 py-4 flex items-center gap-3 text-[#A7B4C5]">
                <RefreshCw className="w-4 h-4 animate-spin text-[#22C55E]" />
                <span>Running n8n workflow query...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Footer */}
        <div className="p-4 bg-[#162437] border-t border-[#29394D]">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-3"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about waste management, recycling, water pollution, or regulatory compliance..."
              disabled={loading}
              className="flex-1 bg-[#0B1220] border border-[#29394D] focus:border-[#22C55E] focus:outline-none rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-5 py-3 rounded-xl bg-[#22C55E] hover:bg-[#16a34a] disabled:opacity-40 disabled:hover:bg-[#22C55E] text-slate-950 font-semibold text-sm flex items-center gap-2 transition-all shrink-0 cursor-pointer shadow-md"
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center justify-between mt-2.5 px-1 text-xs text-slate-500">
            <span>Direct Webhook: <code className="text-[#22C55E] font-mono text-[11px]">https://energetic.app.n8n.cloud/.../chat</code></span>
            <a 
              href="https://energetic.app.n8n.cloud" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-[#22C55E] flex items-center gap-1 transition-colors"
            >
              <span>Powered by n8n Cloud</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
