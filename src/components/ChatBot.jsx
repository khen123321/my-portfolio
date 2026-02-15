import React, { useState, useRef, useEffect } from "react";

// ==========================================
//  PORTFOLIO CONTEXT — Customize this info
// ==========================================
const PORTFOLIO_CONTEXT = `
You are a helpful AI assistant embedded in Khen Joshua Verson's portfolio website.
Your job is to answer visitor questions about Khen and his work.
Be friendly, concise, and helpful. Keep responses short (2-4 sentences max).

About Khen:
- Full name: Khen Joshua Verson
- BS Information Technology student at University of Science and Technology of Southern Philippines (USTP)
- Skills: React, React Native, Web Development, UI/UX Design, Firebase, IT Infrastructure
- Currently open to full-time opportunities and freelance projects
- Notable project: Storage Management System (React + Firebase + Google Sheets)
- Thesis: P-Lament IoT recycling system with mobile app and 3D model
- Certification: IT Support Specialist from Cisco
- Academic email: khenjoshua.verson@1.ustp.edu.ph
- GitHub: https://github.com/khen123321
- Facebook: https://www.facebook.com/khenjosh740/

If asked something you don't know about Khen, suggest the visitor reach out via email.
If asked something completely unrelated to Khen or his work, politely redirect to portfolio-related topics.
`;

const QUICK_REPLIES = [
  "What technologies do you use?",
  "Are you available for hire?",
  "Tell me about your projects",
  "How can I contact you?",
];

// ==========================================
//  CHATBOT COMPONENT
// ==========================================
export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "👋 Hi! I'm Khen's AI assistant. Ask me anything about his work, skills, or availability!",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    setHasNewMessage(false);
  };

  const sendMessage = async (text) => {
    const userText = (text || inputValue).trim();
    if (!userText || isLoading) return;

    setInputValue("");
    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Build API message history (exclude the greeting which has no role pairing)
      const apiMessages = newMessages
        .filter((_, i) => i > 0) // Skip initial greeting
        .map((m) => ({ role: m.role, content: m.content }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 1000,
          system: PORTFOLIO_CONTEXT,
          messages: apiMessages,
        }),
      });

      const data = await response.json();
      const reply =
        data?.content?.[0]?.text ||
        "Sorry, I had trouble responding. Please try again or reach out via email!";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      if (!isOpen) setHasNewMessage(true);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Oops! Something went wrong. Please email Khen directly at khenjoshua.verson@1.ustp.edu.ph",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <style>{`
        @keyframes chat-slide-up {
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes bounce-in {
          0%   { transform: scale(0); }
          60%  { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
        @keyframes typing-dot {
          0%, 80%, 100% { transform: scale(0.7); opacity: 0.4; }
          40%           { transform: scale(1);   opacity: 1; }
        }
        .chat-msg-user {
          background: #2563eb;
          color: #fff;
          border-radius: 18px 18px 4px 18px;
          padding: 10px 14px;
          font-size: 0.9rem;
          line-height: 1.5;
          max-width: 80%;
          align-self: flex-end;
          word-break: break-word;
        }
        .chat-msg-bot {
          background: #f3f4f6;
          color: #111827;
          border-radius: 18px 18px 18px 4px;
          padding: 10px 14px;
          font-size: 0.9rem;
          line-height: 1.5;
          max-width: 80%;
          align-self: flex-start;
          word-break: break-word;
        }
        .quick-reply-btn {
          background: #eff6ff;
          color: #2563eb;
          border: 1px solid #bfdbfe;
          border-radius: 20px;
          padding: 6px 14px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s;
          white-space: nowrap;
          font-family: 'DM Sans', sans-serif;
        }
        .quick-reply-btn:hover {
          background: #dbeafe;
        }
        .chat-input {
          flex: 1;
          border: none;
          outline: none;
          background: transparent;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          color: #111827;
          padding: 0;
          resize: none;
        }
        .chat-input::placeholder { color: #9ca3af; }
        .send-btn {
          background: #2563eb;
          color: #fff;
          border: none;
          border-radius: 10px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.15s;
          flex-shrink: 0;
        }
        .send-btn:hover { background: #1d4ed8; }
        .send-btn:disabled { background: #d1d5db; cursor: not-allowed; }
        .fab-btn {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #2563eb;
          border: none;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(37,99,235,0.45);
          transition: transform 0.2s, background 0.2s;
          animation: bounce-in 0.4s ease-out;
          position: relative;
        }
        .fab-btn:hover { transform: scale(1.08); background: #1d4ed8; }
      `}</style>

      {/* FLOATING ACTION BUTTON */}
      <div style={{
        position: "fixed",
        bottom: "28px",
        right: "28px",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "12px",
      }}>

        {/* CHAT WINDOW */}
        {isOpen && (
          <div style={{
            width: "360px",
            height: "520px",
            background: "#fff",
            borderRadius: "20px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px #e5e7eb",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            animation: "chat-slide-up 0.25s ease-out",
            fontFamily: "'DM Sans', sans-serif",
          }}>

            {/* HEADER */}
            <div style={{
              background: "#2563eb",
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}>
              <div style={{
                width: "36px", height: "36px",
                background: "rgba(255,255,255,0.2)",
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "18px",
              }}>🤖</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#fff", fontWeight: "700", fontSize: "0.95rem" }}>
                  Khen's Assistant
                </div>
                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.75rem" }}>
                  <span style={{
                    display: "inline-block", width: "7px", height: "7px",
                    background: "#4ade80", borderRadius: "50%", marginRight: "5px",
                    verticalAlign: "middle",
                  }}></span>
                  Online · Replies instantly
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "none", borderRadius: "8px",
                  color: "#fff", width: "30px", height: "30px",
                  cursor: "pointer", fontSize: "1.1rem",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >×</button>
            </div>

            {/* MESSAGES */}
            <div style={{
              flex: 1, overflowY: "auto", padding: "16px",
              display: "flex", flexDirection: "column", gap: "10px",
            }}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={msg.role === "user" ? "chat-msg-user" : "chat-msg-bot"}
                >
                  {msg.content}
                </div>
              ))}

              {/* TYPING INDICATOR */}
              {isLoading && (
                <div className="chat-msg-bot" style={{ display: "flex", gap: "4px", alignItems: "center", padding: "12px 16px" }}>
                  {[0, 150, 300].map((delay, i) => (
                    <span key={i} style={{
                      width: "6px", height: "6px",
                      background: "#6b7280", borderRadius: "50%",
                      display: "inline-block",
                      animation: `typing-dot 1.2s ${delay}ms ease-in-out infinite`,
                    }}></span>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* QUICK REPLIES — show only at start */}
            {messages.length <= 2 && !isLoading && (
              <div style={{
                padding: "0 16px 12px",
                display: "flex", flexWrap: "wrap", gap: "8px",
              }}>
                {QUICK_REPLIES.map((q) => (
                  <button key={q} className="quick-reply-btn" onClick={() => sendMessage(q)}>
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* INPUT AREA */}
            <div style={{
              borderTop: "1px solid #e5e7eb",
              padding: "12px 16px",
              display: "flex", alignItems: "center", gap: "10px",
              background: "#fff",
            }}>
              <input
                ref={inputRef}
                className="chat-input"
                type="text"
                placeholder="Ask me anything..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
              />
              <button
                className="send-btn"
                onClick={() => sendMessage()}
                disabled={!inputValue.trim() || isLoading}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>

          </div>
        )}

        {/* FAB TOGGLE BUTTON */}
        <button className="fab-btn" onClick={isOpen ? () => setIsOpen(false) : handleOpen}>
          {/* Badge */}
          {hasNewMessage && !isOpen && (
            <div style={{
              position: "absolute", top: "-2px", right: "-2px",
              width: "14px", height: "14px",
              background: "#ef4444", borderRadius: "50%",
              border: "2px solid #fff",
            }}></div>
          )}
          {isOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          )}
        </button>
      </div>
    </>
  );
}