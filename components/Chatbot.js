"use client";
import { useState, useRef, useEffect } from "react";

const starterQuestions = [
  { text: "Tell me about his internship", color: "bg-pink-500" },
  { text: "What projects has he built?", color: "bg-purple-500" },
  { text: "What's his tech stack?", color: "bg-blue-500" },
  { text: "What are his certifications?", color: "bg-green-500" }
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! Ask me anything about Ansh's background. 🌟" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text })
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.answer, sources: data.sources }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, something went wrong. 😅" }]);
    }
    setLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open ? (
        <div className="w-80 md:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border-4 border-gradient-to-r from-pink-500 to-purple-500 flex flex-col overflow-hidden" style={{ height: "600px" }}>
          <div className="p-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl float-animation">🤖</div>
                <div>
                  <h3 className="font-bold text-lg">Ansh's AI Assistant</h3>
                  <p className="text-xs opacity-90">Powered by RAG + Gemini ✨</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="p-1 hover:bg-white/20 rounded-lg transition-all hover:rotate-90">✕</button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3 chat-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} bounce-in`}>
                <div className={`max-w-[85%] p-3 rounded-2xl ${msg.role === "user" ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-none" : "bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-bl-none"}`}>
                  <p className="text-sm">{msg.content}</p>
                  {msg.sources && <p className="text-xs mt-1 opacity-75">📚 {msg.sources.join(", ")}</p>}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl rounded-bl-none">
                  <div className="flex space-x-2">
                    {['bg-pink-500', 'bg-purple-500', 'bg-blue-500'].map((color, i) => (
                      <div key={i} className={`w-2 h-2 ${color} rounded-full animate-bounce`} style={{ animationDelay: `${i * 0.1}s` }}></div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          
          <div className="p-4 border-t">
            <div className="flex flex-wrap gap-2 mb-3">
              {starterQuestions.map((q) => (
                <button key={q.text} onClick={() => sendMessage(q.text)} className={`text-xs text-white ${q.color} px-3 py-1.5 rounded-full hover:scale-110 transition-all shadow-lg`}>
                  {q.text}
                </button>
              ))}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="flex gap-2">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask a question..." className="flex-1 px-4 py-2 border-2 border-pink-300 dark:border-purple-500 rounded-xl bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500" />
              <button type="submit" className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:scale-110 transition-all shadow-lg">🚀</button>
            </form>
          </div>
        </div>
      ) : (
        <button onClick={() => setOpen(true)} className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-6 py-4 rounded-full shadow-2xl hover:scale-110 transition-all glow-effect float-animation flex items-center gap-2 font-bold">
          <span className="text-xl">💬</span>
          <span>Ask me about Ansh</span>
        </button>
      )}
    </div>
  );
}
