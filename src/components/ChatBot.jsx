import React, { useCallback, useEffect, useRef, useState } from "react";
import { trackEvent } from "../analytics.js";

const getTimestamp = () =>
  new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());

const DEFAULT_RATE_LIMIT_LIMIT = 3;
const UNKNOWN_RATE_LIMIT = { limit: DEFAULT_RATE_LIMIT_LIMIT, remaining: null, resetAt: null };

const formatUsageCount = (value) => {
  if (value === null || value === undefined) return "--";
  return String(Math.max(0, Number(value) || 0)).padStart(2, "0");
};

const formatResetTime = (resetAt) => {
  if (!resetAt) return "later";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(resetAt));
};

function ChatMessage({ message }) {
  const label = message.role === "user" ? "YOU" : message.role === "system" ? "SYSTEM" : "KV.AI";

  return (
    <article className={`chat-entry chat-entry-${message.role}`}>
      <header className="chat-entry-meta">
        <span>{label}</span>
        <span>{message.timestamp}</span>
      </header>
      <div className="chat-entry-rule" aria-hidden="true" />
      <div className="chat-entry-body">{message.content}</div>
    </article>
  );
}

export default function ChatBot({ launcherPrefix, onOpen, openSignal = 0, openLocation = "sidebar", hideLauncher = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [isDesktopPanel, setIsDesktopPanel] = useState(false);
  const [rateLimit, setRateLimit] = useState(UNKNOWN_RATE_LIMIT);
  const [rateLimitError, setRateLimitError] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const launcherRef = useRef(null);
  const overlayRef = useRef(null);
  const closeTimerRef = useRef(null);
  const lastOpenSignalRef = useRef(openSignal);

  const hasConversation = messages.length > 0;
  const isLimitReached = rateLimit.remaining === 0;

  const updateRateLimit = useCallback((nextRateLimit) => {
    if (!nextRateLimit || typeof nextRateLimit !== "object") return;

    setRateLimit({
      limit: Number(nextRateLimit.limit) || DEFAULT_RATE_LIMIT_LIMIT,
      remaining: Math.max(0, Number(nextRateLimit.remaining) || 0),
      resetAt: nextRateLimit.resetAt || null,
    });
    setRateLimitError(false);
  }, []);

  const fetchRateLimit = useCallback(async () => {
    try {
      const response = await fetch("/api/chat", { method: "GET" });
      const contentType = response.headers.get("content-type") || "";
      const data = contentType.includes("application/json") ? await response.json() : null;

      if (!response.ok || !data?.rateLimit) {
        throw new Error(data?.message || data?.error || `GET /api/chat failed with HTTP ${response.status}`);
      }

      updateRateLimit(data?.rateLimit);
    } catch (error) {
      console.warn("[chat] Unable to load rate-limit status", {
        error: error instanceof Error ? error.message : String(error),
      });
      setRateLimit(UNKNOWN_RATE_LIMIT);
      setRateLimitError(true);
    }
  }, [updateRateLimit]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 901px)");
    const updateDesktopPanel = () => setIsDesktopPanel(desktopQuery.matches);

    updateDesktopPanel();
    desktopQuery.addEventListener("change", updateDesktopPanel);

    return () => desktopQuery.removeEventListener("change", updateDesktopPanel);
  }, []);

  const setOverlayOrigin = useCallback(() => {
    const rect = launcherRef.current?.getBoundingClientRect();
    if (!rect) {
      document.documentElement.style.setProperty("--chat-origin-x", "50vw");
      document.documentElement.style.setProperty("--chat-origin-y", "50vh");
      return;
    }

    document.documentElement.style.setProperty("--chat-origin-x", `${rect.left + rect.width / 2}px`);
    document.documentElement.style.setProperty("--chat-origin-y", `${rect.top + rect.height / 2}px`);
  }, []);

  const handleOpen = useCallback(() => {
    setOverlayOrigin();
    trackEvent("chat_open", { location: openLocation });
    setIsClosing(false);
    setIsOpen(true);
    setHasNewMessage(false);
    onOpen?.();
  }, [onOpen, openLocation, setOverlayOrigin]);

  const closeChat = useCallback(() => {
    if (!isOpen || isClosing) return;

    setOverlayOrigin();
    setIsClosing(true);

    closeTimerRef.current = window.setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      launcherRef.current?.focus();
    }, 360);
  }, [isClosing, isOpen, setOverlayOrigin]);

  useEffect(() => {
    if (!isOpen) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [isOpen, messages, isLoading]);

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.style.height = "auto";
    inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
  }, [inputValue]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.documentElement.classList.add("chat-active");
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 120);

    return () => {
      window.clearTimeout(focusTimer);
      document.documentElement.classList.remove("chat-active");
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeChat();
        return;
      }

      if (isDesktopPanel || event.key !== "Tab" || !overlayRef.current) return;

      const focusable = overlayRef.current.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeChat, isDesktopPanel, isOpen]);

  useEffect(
    () => () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    },
    [],
  );

  useEffect(() => {
    if (!openSignal || openSignal === lastOpenSignalRef.current) return;
    lastOpenSignalRef.current = openSignal;
    handleOpen();
  }, [handleOpen, openSignal]);

  useEffect(() => {
    if (!isOpen) return;
    fetchRateLimit();
  }, [fetchRateLimit, isOpen]);

  const sendMessage = async (text, source = "manual_input") => {
    const userText = String(text || inputValue).trim();
    if (!userText || isLoading) return;

    if (isLimitReached) {
      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          content: `daily limit reached_\ntry again after ${formatResetTime(rateLimit.resetAt)}`,
          timestamp: getTimestamp(),
        },
      ]);
      return;
    }

    trackEvent("chat_message", { source });

    setInputValue("");
    const userMessage = { role: "user", content: userText, timestamp: getTimestamp() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages
            .filter((message) => message.role === "user" || message.role === "assistant")
            .map((message) => ({ role: message.role, content: message.content })),
        }),
      });

      const contentType = response.headers.get("content-type") || "";
      const data = contentType.includes("application/json") ? await response.json() : null;
      updateRateLimit(data?.rateLimit);

      if (response.status === 429 && data?.error === "question_limit_reached") {
        setMessages((prev) => [
          ...prev,
          {
            role: "system",
            content: `daily limit reached_\ntry again after ${formatResetTime(data?.rateLimit?.resetAt)}`,
            timestamp: getTimestamp(),
          },
        ]);
        return;
      }

      const reply =
        data?.content?.[0]?.text ||
        "KV.AI could not complete that request. Try again in a moment.";

      setMessages((prev) => [...prev, { role: "assistant", content: reply, timestamp: getTimestamp() }]);
      if (!isOpen) setHasNewMessage(true);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          content: "KV.AI could not complete that request. Try again in a moment.",
          timestamp: getTimestamp(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (isLimitReached) return;
      sendMessage();
    }
  };

  return (
    <div className="chat-shell">
      {isOpen && (
        <section
          ref={overlayRef}
          className={`chat-overlay ${isClosing ? "is-closing" : "is-open"} ${hasConversation ? "has-conversation" : "is-intro"}`}
          role="dialog"
          aria-modal={!isDesktopPanel}
          aria-labelledby="chat-overlay-title"
        >
          <div className="chat-texture" aria-hidden="true" />

          <header className="chat-topbar">
            <h2 id="chat-overlay-title" className="chat-title">
              KV.AI
            </h2>
            <button className="chat-close" type="button" onClick={closeChat} aria-label="Close KV.AI">
              ESC / CLOSE X
            </button>
          </header>

          <div className="chat-stage">
            {!hasConversation && (
              <div className="chat-intro" aria-hidden={hasConversation}>
                <p className="chat-prompt">
                  what do you
                  <br />
                  want to ask?<span className="chat-cursor">_</span>
                </p>
              </div>
            )}

            {hasConversation && (
              <div className="chat-transcript" aria-live="polite">
                {messages.map((message, index) => (
                  <ChatMessage key={`${message.role}-${index}-${message.timestamp}`} message={message} />
                ))}

                {isLoading && (
                  <article className="chat-entry chat-entry-assistant" aria-live="polite" aria-label="KV.AI is thinking">
                    <header className="chat-entry-meta">
                      <span>KV.AI</span>
                      <span>{getTimestamp()}</span>
                    </header>
                    <div className="chat-entry-rule" aria-hidden="true" />
                    <div className="chat-processing">processing<span className="chat-cursor">_</span></div>
                  </article>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          <footer className="chat-console">
            <form className="chat-command-form" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="kv-ai-input">
                Ask KV.AI.
              </label>
              <span className="chat-command-prefix" aria-hidden="true">
                &gt;
              </span>
              <textarea
                ref={inputRef}
                id="kv-ai-input"
                className="chat-input"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                onKeyDown={handleInputKeyDown}
                disabled={isLoading || isLimitReached}
                maxLength={1000}
                rows={1}
                placeholder={isLimitReached ? "daily limit reached_" : hasConversation ? "ask another question_" : "ask something_"}
              />
              <button className="send-btn" type="submit" disabled={!inputValue.trim() || isLoading || isLimitReached}>
                SEND &crarr;
              </button>
            </form>
            <div className="chat-usage" aria-live="polite">
              {rateLimitError
                ? "usage unavailable"
                : `${formatUsageCount(rateLimit.remaining)} / ${formatUsageCount(rateLimit.limit)} available`}
            </div>

          </footer>
        </section>
      )}

      {!hideLauncher && (
        <button
          ref={launcherRef}
          className="chat-fab sidebar-link"
          type="button"
          onClick={isOpen ? closeChat : handleOpen}
          aria-label={isOpen ? "Close KV.AI" : "Open KV.AI"}
          aria-expanded={isOpen}
        >
          {hasNewMessage && !isOpen && <span className="chat-badge" aria-hidden="true" />}
          {launcherPrefix && <span aria-hidden="true">{launcherPrefix}</span>}
          question?
        </button>
      )}
    </div>
  );
}
