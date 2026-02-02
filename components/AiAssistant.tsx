
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Patient } from '../types';
import { Send, Bot, User, Sparkles, Loader2, RefreshCw } from 'lucide-react';

interface AiAssistantProps {
  patients: Patient[];
}

const AiAssistant: React.FC<AiAssistantProps> = ({ patients }) => {
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: "Hello! I am MediSync AI. I can help you summarize patient records, provide medical insights, or answer questions about hospital management. How can I assist you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      const context = `You are a professional medical assistant for a hospital management system. 
      You have access to current patient records (though you should be professional about privacy).
      Current Patient Count: ${patients.length}.
      Patients: ${patients.map(p => `${p.name} (MRN: ${p.mrn}) - ${p.condition}`).join(', ')}.
      Help the staff with their queries concisely and professionally.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: context,
        }
      });

      const aiText = response.text || "I'm sorry, I couldn't process that request.";
      setMessages(prev => [...prev, { role: 'assistant', content: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting to my knowledge base right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col animate-in fade-in zoom-in-95 duration-500">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-t-3xl text-white flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
            <Bot size={28} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">AI Clinical Assistant</h2>
            <p className="text-xs text-blue-100 flex items-center gap-1">
              <Sparkles size={12} />
              Powered by Gemini 3 Flash
            </p>
          </div>
        </div>
        <button 
          onClick={() => setMessages([{ role: 'assistant', content: "Context cleared. How can I help?" }])}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <RefreshCw size={18} />
        </button>
      </div>

      <div className="flex-1 bg-white border-x border-slate-100 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none shadow-md' 
                  : 'bg-slate-50 text-slate-700 border border-slate-100 rounded-tl-none'
              }`}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[80%]">
              <div className="w-8 h-8 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center shrink-0">
                <Bot size={16} />
              </div>
              <div className="bg-slate-50 text-slate-400 p-4 rounded-2xl rounded-tl-none border border-slate-100 flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                Assistant is thinking...
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-x border-b border-slate-100 rounded-b-3xl">
        <div className="relative">
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask about patient trends, records, or medical help..."
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-4 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${
              input.trim() && !isLoading ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-[10px] text-center text-slate-400 mt-2 uppercase font-bold tracking-widest">
          AI assistant may provide inaccurate info. Verify clinical decisions.
        </p>
      </div>
    </div>
  );
};

export default AiAssistant;
