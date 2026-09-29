import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  Trash2, 
  Sparkles, 
  RefreshCw,
  Copy,
  Check,
  Download,
  Share2,
  ExternalLink,
  ShieldCheck,
  Recycle,
  Droplets,
  Layers,
  HelpCircle,
  FileText
} from 'lucide-react';
import { sendN8nChatMessage, getOrCreateChatSessionId, ChatMessage } from '../../services/n8nChatService';
import { useApp } from '../../context/AppContext';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'view_init_1',
    sender: 'assistant',
    text: "Welcome to the **Dedicated Waste2Worth n8n AI Console**!\n\nThis interface is linked directly to your n8n workflow at `https://energetic.app.n8n.cloud/webhook/c247b46e-148e-49d3-b1cf-04b63765dc3c/chat`.\n\nYou can query this agent for:\n1. **Material Classification & Valorization**: Discover circular matches for by-products.\n2. **Effluent Pollution Risk**: Assess BOD, COD, pH, TSS, and safe pre-discharge parameters.\n3. **Regulatory Compliance & Manifests**: Verify state PCB / EPA hazardous waste guidelines.\n4. **Workflow Automation Guidance**: Formulate automation triggers for collection logistics.\n\nSelect a quick prompt below or type your customized industrial query.",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
];

export const N8nChatView: React.FC = () => {
  const { currentUser, currentRole } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('w2w_chat_view_messages');
      return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
    } catch {
      return INITIAL_MESSAGES;
    }
  });

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState(() => getOrCreateChatSessionId());

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem('w2w_chat_view_messages', JSON.stringify(messages));
    } catch (e) {
      console.warn(e);
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsg: ChatMessage = {
      id: 'v_usr_' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const reply = await sendN8nChatMessage(query, sessionId);
      const botMsg: ChatMessage = {
        id: 'v_bot_' + Date.now(),
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: 'v_err_' + Date.now(),
        sender: 'assistant',
        text: `⚠️ *Workflow notice:* Unable to fetch response from n8n webhook. Please ensure the workflow is active.\n\n_Error: ${err?.message || 'Network error'}_`,
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
      localStorage.removeItem('w2w_chat_view_messages');
    } catch (e) {
      console.warn(e);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExport = () => {
    const transcript = messages.map(m => `[${m.timestamp}] ${m.sender.toUpperCase()}:\n${m.text}\n`).join('\n---\n\n');
    const blob = new Blob([transcript], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `waste2worth-chat-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetSession = () => {
    const newSid = 'w2w_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
    try {
      localStorage.setItem('w2w_n8n_session_id', newSid);
    } catch {}
    setSessionId(newSid);
    setMessages(INITIAL_MESSAGES);
  };

  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      if (line.startsWith('### ')) {
        return <h4 key={idx} className="font-bold text-white text-base mt-3 mb-1">{line.replace('### ', '')}</h4>;
      }
      if (line.startsWith('## ')) {
        return <h3 key={idx} className="font-bold text-white text-lg mt-4 mb-2">{line.replace('## ', '')}</h3>;
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
        <p key={idx} className={line ? 'mb-2 leading-relaxed' : 'h-2'}>
          {line}
        </p>
      );
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-[#162437] border border-[#29394D]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center text-[#22C55E]">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white font-heading">n8n Waste Intelligence Agent</h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 text-[#22C55E] text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                Webhook Connected
              </span>
            </div>
            <p className="text-xs text-[#A7B4C5] mt-1">
              Autonomous conversational agent executing against the Waste2Worth workflow endpoint
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={resetSession}
            title="Reset Session ID"
            className="px-3 py-2 rounded-xl bg-[#0B1220] hover:bg-[#1E3048] border border-[#29394D] text-[#A7B4C5] hover:text-white text-xs font-medium transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>New Session</span>
          </button>
          <button
            onClick={handleExport}
            title="Export Markdown Transcript"
            className="px-3 py-2 rounded-xl bg-[#0B1220] hover:bg-[#1E3048] border border-[#29394D] text-[#A7B4C5] hover:text-white text-xs font-medium transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>
          <button
            onClick={handleClear}
            title="Clear Chat"
            className="px-3 py-2 rounded-xl bg-[#0B1220] hover:bg-rose-950/40 border border-[#29394D] hover:border-rose-500/40 text-[#A7B4C5] hover:text-rose-400 text-xs font-medium transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Main Chat Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: Quick Prompts & Session Info */}
        <div className="lg:col-span-1 space-y-4">
          <div className="p-4 rounded-2xl bg-[#162437] border border-[#29394D] space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#22C55E]" /> Recommended Queries
            </h4>
            <div className="space-y-2">
              <button
                onClick={() => handleSend("What are the most profitable recovery pathways for post-industrial HDPE and PP scrap?")}
                className="w-full text-left p-2.5 rounded-xl bg-[#0B1220] hover:bg-[#1E3048] border border-[#29394D] hover:border-[#22C55E]/40 text-xs text-[#A7B4C5] hover:text-white transition-all flex items-start gap-2"
              >
                <Recycle className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                <span>Polymer & Plastic Valorization</span>
              </button>

              <button
                onClick={() => handleSend("Our effluent testing shows pH 4.8 and COD 550 mg/L. What biological or chemical treatment steps are required before municipal sewer release?")}
                className="w-full text-left p-2.5 rounded-xl bg-[#0B1220] hover:bg-[#1E3048] border border-[#29394D] hover:border-[#06B6D4]/40 text-xs text-[#A7B4C5] hover:text-white transition-all flex items-start gap-2"
              >
                <Droplets className="w-4 h-4 text-[#06B6D4] shrink-0 mt-0.5" />
                <span>High COD / Acidic Wastewater</span>
              </button>

              <button
                onClick={() => handleSend("How can an industrial facility document hazardous waste chain-of-custody to satisfy EPA/PCB audit standards?")}
                className="w-full text-left p-2.5 rounded-xl bg-[#0B1220] hover:bg-[#1E3048] border border-[#29394D] hover:border-amber-400/40 text-xs text-[#A7B4C5] hover:text-white transition-all flex items-start gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Hazardous Manifest Compliance</span>
              </button>

              <button
                onClick={() => handleSend("Calculate estimated carbon offset savings if we divert 50 tons of textile offcuts from landfill to fiber reclamation.")}
                className="w-full text-left p-2.5 rounded-xl bg-[#0B1220] hover:bg-[#1E3048] border border-[#29394D] hover:border-indigo-400/40 text-xs text-[#A7B4C5] hover:text-white transition-all flex items-start gap-2"
              >
                <Layers className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>Textile Diversion & Carbon Offset</span>
              </button>
            </div>
          </div>

          {/* Webhook Status Details Card */}
          <div className="p-4 rounded-2xl bg-[#162437] border border-[#29394D] space-y-2 text-xs">
            <h4 className="font-bold text-white uppercase text-[10px] tracking-wider text-slate-400">Webhook Diagnostics</h4>
            <div className="font-mono text-[11px] space-y-1.5 text-slate-400">
              <div className="flex justify-between">
                <span>Target:</span>
                <span className="text-[#22C55E]">n8n Cloud</span>
              </div>
              <div className="flex justify-between">
                <span>Session ID:</span>
                <span className="text-white truncate max-w-[130px]" title={sessionId}>{sessionId}</span>
              </div>
              <div className="flex justify-between">
                <span>User Context:</span>
                <span className="text-white">{currentUser.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Role:</span>
                <span className="text-[#22C55E] capitalize">{currentRole}</span>
              </div>
            </div>
            <div className="pt-2 border-t border-[#29394D]">
              <a
                href="https://energetic.app.n8n.cloud/webhook/c247b46e-148e-49d3-b1cf-04b63765dc3c/chat"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-[#22C55E] hover:underline flex items-center gap-1"
              >
                <span>Direct Webhook URL</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Chat History and Input */}
        <div className="lg:col-span-3 flex flex-col h-[700px] rounded-2xl bg-[#101C2C] border border-[#29394D] overflow-hidden">
          {/* Chat Scroll Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5 text-sm">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div 
                  key={msg.id} 
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-2 mb-1 px-1">
                    <span className="text-xs font-semibold text-[#A7B4C5]">
                      {isUser ? `${currentUser.name} (${currentRole})` : 'n8n Assistant'}
                    </span>
                    <span className="text-[11px] text-slate-500">{msg.timestamp}</span>
                  </div>

                  <div 
                    className={`relative group max-w-[85%] rounded-2xl px-5 py-4 ${
                      isUser 
                        ? 'bg-[#22C55E] text-slate-950 font-medium rounded-tr-none' 
                        : 'bg-[#162437] border border-[#29394D] text-[#F8FAFC] rounded-tl-none shadow-md'
                    }`}
                  >
                    <div className="prose prose-invert max-w-none break-words">
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
                  <span>Processing through n8n workflow node...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Field */}
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
                placeholder="Ask about waste characterization, water effluent, circular matching, or legal compliance..."
                disabled={loading}
                className="flex-1 bg-[#0B1220] border border-[#29394D] focus:border-[#22C55E] focus:outline-none rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="px-6 py-3.5 rounded-xl bg-[#22C55E] hover:bg-[#16a34a] disabled:opacity-40 disabled:hover:bg-[#22C55E] text-slate-950 font-semibold text-sm flex items-center gap-2 transition-all shrink-0 cursor-pointer shadow-md"
              >
                <span>Send</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
