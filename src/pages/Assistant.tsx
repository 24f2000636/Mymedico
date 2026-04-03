import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Sparkles, AlertTriangle, Paperclip, Mic } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';

type Message = {
  id: string;
  role: 'user' | 'ai' | 'system';
  content: string;
  timestamp: Date;
  isDisclaimer?: boolean;
};

export default function Assistant() {
  const { user } = useAuthStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'system',
      content: 'CareSync AI is an assistant. It provides general information and recommendations based on symptoms. It is NOT a substitute for professional medical advice, diagnosis, or treatment.',
      timestamp: new Date(),
      isDisclaimer: true,
    },
    {
      id: '2',
      role: 'ai',
      content: `Hello ${user?.name.split(' ')[0]}! I'm your CareSync AI Assistant. How can I help you today? You can describe your symptoms, ask about your past records, or seek general wellness advice.`,
      timestamp: new Date(),
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
      let aiResponse = "";
      
      if (!API_KEY) {
        aiResponse = "API key missing. Please ensure VITE_GEMINI_API_KEY is configured in your .env file.";
      } else {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(`You are CareSync AI, a helpful and empathetic medical assistant. You provide general health information, wellness tips, and sensible recommendations. You are NOT a substitute for professional medical advice, diagnosis, or treatment. Always suggest consulting a doctor for severe or persistent symptoms. The user asks: "${newUserMsg.content}"`);
        aiResponse = result.response.text();
      }

      const newAiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: aiResponse,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, newAiMsg]);
    } catch (err) {
      console.error("Gemini API Error:", err);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: "I'm sorry, I'm having trouble connecting to my service right now. Please check your network and API key, and try again later.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] max-w-4xl mx-auto flex flex-col glass-card border-slate-200/60 shadow-lg overflow-hidden relative">
      <div className="bg-gradient-brand p-4 text-white flex justify-between items-center shadow-md z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-lg leading-tight font-poppins">CareSync AI</h2>
            <p className="text-xs text-white/80">Powered by Gemini & Vertex AI Integration</p>
          </div>
        </div>
        <button className="text-white/80 hover:text-white transition-colors bg-white/10 p-2 rounded-lg backdrop-blur-md">
          <AlertTriangle className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} ${msg.isDisclaimer ? 'justify-center' : ''}`}
            >
              {msg.isDisclaimer ? (
                <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs p-3 rounded-xl text-center max-w-lg mx-auto flex items-start gap-2 shadow-sm">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <p>{msg.content}</p>
                </div>
              ) : (
                <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center shadow-sm ${
                    msg.role === 'user' ? 'bg-primary-500 text-white' : 'bg-white border border-slate-200 text-primary-600'
                  }`}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`p-4 rounded-2xl shadow-sm text-sm ${
                    msg.role === 'user' 
                      ? 'bg-primary-500 text-white rounded-tr-sm' 
                      : 'bg-white border border-slate-100 text-slate-700 rounded-tl-sm'
                  }`}>
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    <span className={`text-[10px] mt-2 block opacity-70 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
               <div className="flex gap-3 max-w-[80%] flex-row">
                  <div className="w-8 h-8 shrink-0 rounded-full bg-white border border-slate-200 text-primary-600 flex items-center justify-center shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-4 rounded-2xl shadow-sm bg-white border border-slate-100 rounded-tl-sm flex items-center gap-1">
                    <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-slate-100 z-10">
        <form onSubmit={handleSend} className="flex gap-2">
          <button type="button" className="p-3 text-slate-400 hover:text-primary-500 bg-slate-50 hover:bg-primary-50 rounded-xl transition-colors">
            <Paperclip className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your symptoms or ask a medical question..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all shadow-inner"
          />
          <button type="button" className="p-3 text-slate-400 hover:text-primary-500 bg-slate-50 hover:bg-primary-50 rounded-xl transition-colors">
            <Mic className="w-5 h-5" />
          </button>
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl shadow-md transition-all flex items-center justify-center min-w-[3rem]"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        <p className="text-center text-[10px] text-slate-400 mt-2">
          AI responses are generated for demonstration purposes and are not medical advice.
        </p>
      </div>
    </div>
  );
}
