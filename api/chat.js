/* global process */
import https from "https";

const PORTFOLIO_CONTEXT = `
You are a helpful AI assistant embedded in Khen Joshua Verson's portfolio website.
Your job is to answer visitor questions about Khen and his work.
Be friendly, concise, and helpful. Keep responses short, usually 2-4 sentences.

About Khen:
- Full name: Khen Joshua G. Verson
- Location: Barra, Opol, Misamis Oriental
- Education: BS Information Technology, University of Science and Technology of Southern Philippines (USTP), 2022-2026
- Email: versonkhenjoshua@gmail.com
- Technical Skills: UI/UX Design, Figma prototyping, React, TypeScript, Redux, Laravel, PHP, MySQL, WordPress, WooCommerce, responsive web development, IT Troubleshooting
- Soft Skills: Communication, Active Listening, Problem Solving, Critical Thinking
- Work Experience 1: IT Intern/Programmer at CLIMBS Life and General Insurance Cooperative (Feb-May 2026). Worked as the developer and UI builder for the CLIMBS Internship Monitoring System (CIMS), using TypeScript, Redux, Laravel, PHP, and MySQL.
- Work Experience 2: Freelance web and UI developer. Built a Wedding RSVP & Guest Management Platform with a guided RSVP flow, admin response management, and Google Sheets-backed workflows.
- Other Notable Projects: Storage Management System, P-Lament IoT recycling system thesis, dashboard UI prototypes
- Achievements & Certifications: Civil Service Exam Passer (March 2026), Dean's Lister (4th Year), Cisco IT Support Badge
- GitHub: https://github.com/khen123321
- Facebook: https://www.facebook.com/khenjosh740/

If asked about private company URLs or source code for CIMS, explain that it is a private internal company system and suggest contacting Khen for a safe walkthrough.
If asked something you do not know about Khen, suggest the visitor reach out via email.
If asked something unrelated to Khen or his work, politely redirect to portfolio-related topics.
`;

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 12;
const REQUEST_TIMEOUT_MS = 10_000;
const MAX_MESSAGES = 10;
const MAX_MESSAGE_LENGTH = 1000;

const requestCounts = new Map();

function getClientIp(req) {
  const forwardedFor = req.headers["x-forwarded-for"];

  if (typeof forwardedFor === "string" && forwardedFor.trim()) {
    return forwardedFor.split(",")[0].trim();
  }

  return req.socket?.remoteAddress || "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  const current = requestCounts.get(ip);

  if (!current || now > current.resetAt) {
    requestCounts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX_REQUESTS;
}

function normalizeMessages(messages) {
  if (!Array.isArray(messages) || messages.length === 0) return null;

  const recentMessages = messages.slice(-MAX_MESSAGES);
  const normalized = [];

  for (const message of recentMessages) {
    if (!message || typeof message !== "object") return null;
    if (message.role !== "user" && message.role !== "assistant") return null;
    if (typeof message.content !== "string") return null;

    const content = message.content.trim().slice(0, MAX_MESSAGE_LENGTH);
    if (!content) return null;

    normalized.push({ role: message.role, content });
  }

  return normalized;
}

function sendUnavailable(res) {
  if (!res.headersSent) {
    res.status(502).json({ error: "Chat is temporarily unavailable" });
  }
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({ error: "Chat is not configured" });
  }

  if (isRateLimited(getClientIp(req))) {
    return res.status(429).json({ error: "Too many chat requests. Please try again soon." });
  }

  const messages = normalizeMessages(req.body?.messages);

  if (!messages) {
    return res.status(400).json({ error: "Invalid chat request" });
  }

  const body = JSON.stringify({
    model: "llama-3.1-8b-instant",
    max_tokens: 450,
    messages: [{ role: "system", content: PORTFOLIO_CONTEXT }, ...messages],
  });

  return new Promise((resolve) => {
    const options = {
      hostname: "api.groq.com",
      path: "/openai/v1/chat/completions",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
    };

    const request = https.request(options, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        const statusCode = response.statusCode || 500;

        if (statusCode < 200 || statusCode >= 300) {
          sendUnavailable(res);
          resolve();
          return;
        }

        try {
          const parsed = JSON.parse(data);
          const message = parsed.choices?.[0]?.message?.content;

          if (!message) {
            sendUnavailable(res);
            resolve();
            return;
          }

          res.status(200).json({ content: [{ text: message }] });
        } catch {
          sendUnavailable(res);
        }

        resolve();
      });
    });

    request.setTimeout(REQUEST_TIMEOUT_MS, () => {
      request.destroy(new Error("Request timed out"));
    });

    request.on("error", () => {
      sendUnavailable(res);
      resolve();
    });

    request.write(body);
    request.end();
  });
}
