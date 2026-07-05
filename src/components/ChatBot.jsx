import React, { useEffect, useRef, useState } from "react";
import { trackEvent } from "../analytics.js";

const QUICK_REPLIES = [
  "What technologies do you use?",
  "Are you available for hire?",
  "Tell me about your projects",
  "How can I contact you?",
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm Khen's AI assistant. Ask me anything about his work, skills, or availability.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleOpen = () => {
    trackEvent("chat_open", { location: "floating_button" });
    setIsOpen(true);
    setHasNewMessage(false);
  };

  const sendMessage = async (text) => {
    const userText = (text || inputValue).trim();
    if (!userText || isLoading) return;

    trackEvent("chat_message", { source: text ? "quick_reply" : "manual_input" });

    setInputValue("");
    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const apiMessages = newMessages
        .filter((_, index) => index > 0)
        .map((message) => ({ role: message.role, content: message.content }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: apiMessages,
        }),
      });

      const data = await response.json();
      const reply =
        data?.content?.[0]?.text ||
        "Sorry, I had trouble responding. Please try again or reach out via email.";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      if (!isOpen) setHasNewMessage(true);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please email Khen directly at versonkhenjoshua@gmail.com.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <style>{`
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
        .quick-reply-btn:hover { background: #dbeafe; }
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
          position: relative;
        }
        .fab-btn:hover { transform: scale(1.08); background: #1d4ed8; }
        @media (max-width: 520px) {
          .chat-window { width: calc(100vw - 32px) !important; height: min(520px, calc(100vh - 112px)) !important; }
        }
      `}</style>

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
        {isOpen && (
          <div className="chat-window chat-slide-up" style={{
            width: "360px",
            height: "520px",
            background: "#fff",
            borderRadius: "20px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px #e5e7eb",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            fontFamily: "'DM Sans', sans-serif",
          }}>
            <div style={{
              background: "#2563eb",
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}>
              <div style={{
                width: "36px",
                height: "36px",
                background: "rgba(255,255,255,0.2)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.78rem",
                fontWeight: "800",
                color: "#fff",
              }}>AI</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#fff", fontWeight: "700", fontSize: "0.95rem" }}>
                  Khen's Assistant
                </div>
                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.75rem" }}>
                  <span style={{
                    display: "inline-block",
                    width: "7px",
                    height: "7px",
                    background: "#4ade80",
                    borderRadius: "50%",
                    marginRight: "5px",
                    verticalAlign: "middle",
                  }} />
                  Online - Replies instantly
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                  width: "30px",
                  height: "30px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >x</button>
            </div>

            <div style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}>
              {messages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={message.role === "user" ? "chat-msg-user" : "chat-msg-bot"}>
                  {message.content}
                </div>
              ))}

              {isLoading && (
                <div className="chat-msg-bot" style={{ display: "flex", gap: "4px", alignItems: "center", padding: "12px 16px" }}>
                  {[0, 150, 300].map((delay) => (
                    <span key={delay} className="typing-dot" style={{
                      width: "6px",
                      height: "6px",
                      background: "#6b7280",
                      borderRadius: "50%",
                      display: "inline-block",
                      animationDelay: `${delay}ms`,
                    }} />
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {messages.length <= 2 && !isLoading && (
              <div style={{
                padding: "0 16px 12px",
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
              }}>
                {QUICK_REPLIES.map((reply) => (
                  <button key={reply} type="button" className="quick-reply-btn" onClick={() => sendMessage(reply)}>
                    {reply}
                  </button>
                ))}
              </div>
            )}

            <div style={{
              borderTop: "1px solid #e5e7eb",
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "#fff",
            }}>
              <input
                ref={inputRef}
                className="chat-input"
                type="text"
                placeholder="Ask me anything..."
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                maxLength={1000}
              />
              <button
                type="button"
                className="send-btn"
                onClick={() => sendMessage()}
                disabled={!inputValue.trim() || isLoading}
                aria-label="Send message"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </div>
        )}

        <button className="fab-btn bounce-in" type="button" onClick={isOpen ? () => setIsOpen(false) : handleOpen} aria-label={isOpen ? "Close chat" : "Open chat"}>
          {hasNewMessage && !isOpen && (
            <div style={{
              position: "absolute",
              top: "-2px",
              right: "-2px",
              width: "14px",
              height: "14px",
              background: "#ef4444",
              borderRadius: "50%",
              border: "2px solid #fff",
            }} />
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
