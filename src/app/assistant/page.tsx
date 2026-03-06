"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { Bot, Send, User } from "lucide-react";

const mockMessages = [
  { id: 1, role: "assistant", content: "Hello! I'm your AI assistant. How can I help you today?" }
];

export default function AssistantPage() {
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: "user", content: input },
      {
        id: Date.now() + 1,
        role: "assistant",
        content:
          "I suggest scheduling a service soon. Your Honda City is approaching 50,000 km and may need oil change, brake inspection, and tire rotation. Estimated cost: ₹3,500."
      }
    ]);
    setInput("");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-6 py-10">
        <AnimatedContainer>
          <h1 className="text-4xl font-display font-extrabold mb-2 bg-accent-gradient bg-clip-text text-transparent">
            AI Assistant
          </h1>
          <p className="text-slate-400 mb-10">Get smart maintenance tips and cost estimates</p>
        </AnimatedContainer>

        <GlassCard className="max-w-4xl mx-auto">
          <div className="h-[500px] overflow-y-auto space-y-4 mb-4 pr-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-cyan/20">
                    <Bot className="h-4 w-4 text-accent-cyan" />
                  </div>
                )}
                <div
                  className={`max-w-md rounded-2xl px-4 py-3 text-sm ${
                    msg.role === "user"
                      ? "bg-accent-blue/20 text-white"
                      : "bg-white/5 text-slate-200"
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-blue/20">
                    <User className="h-4 w-4 text-accent-blue" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about maintenance, cost, or service..."
              className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm placeholder:text-slate-500 focus:border-accent-blue focus:outline-none"
            />
            <button onClick={handleSend} className="btn-primary">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </GlassCard>
      </main>
    </div>
  );
}
