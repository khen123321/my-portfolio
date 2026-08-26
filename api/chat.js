/* global Buffer, process */
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
- Technical Skills: UI/UX Design, Figma prototyping, Next.js, React, TypeScript, Redux, Tailwind CSS, Laravel, PHP, Supabase, PostgreSQL, MySQL, WordPress, WooCommerce, responsive web development, IT Troubleshooting
- Soft Skills: Communication, Active Listening, Problem Solving, Critical Thinking
- Work Experience 1: IT Intern/Programmer at CLIMBS Life and General Insurance Cooperative (Feb-May 2026). Worked as the developer and UI builder for the CLIMBS Internship Monitoring System (CIMS), using TypeScript, Redux, Laravel, PHP, and MySQL.
- Work Experience 2: Freelance web and UI developer. Built a Wedding RSVP & Guest Management Platform with a guided RSVP flow, admin response management, and Google Sheets-backed workflows.
- Featured Project: TapTapTap — NFC Business Platform. Khen worked as the Full-Stack Developer / Project Developer. It is a full-stack NFC storefront and business platform built with Next.js, React, TypeScript, Tailwind CSS, Supabase, PostgreSQL, and Vercel. It includes dynamic product management, a custom NFC product designer, Supabase Auth with application-level roles and Row Level Security, Supabase Storage image handling, first-party product and visitor analytics, and Next.js storefront cache revalidation. It is live at https://www.taptaptap.shop/. Payment/order management features such as PayMongo, GCash checkout, card payments, payment webhooks, automatic payment verification, complete order management, shipping workflow, and refunds are planned/future functionality, not completed portfolio features.
- Other Notable Projects: CLIMBS Internship Monitoring System, Wedding RSVP & Guest Management Platform, Storage Management System, P-Lament IoT recycling system thesis, dashboard UI prototypes
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
const GROQ_MODEL = "openai/gpt-oss-20b";

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

function getGroqErrorDetails(data) {
  if (!data) return {};

  try {
    const parsed = JSON.parse(data);
    const error = parsed?.error;

    if (!error || typeof error !== "object") {
      return { message: typeof parsed?.message === "string" ? parsed.message : undefined };
    }

    return {
      message: typeof error.message === "string" ? error.message : undefined,
      type: typeof error.type === "string" ? error.type : undefined,
      code: typeof error.code === "string" ? error.code : undefined,
    };
  } catch {
    return { message: data.slice(0, 500) };
  }
}

function logGroqFailure(message, details = {}) {
  console.error(`[chat] ${message}`, {
    model: GROQ_MODEL,
    ...details,
  });
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.GROQ_API_KEY) {
    console.error("[chat] GROQ_API_KEY is missing");
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
    model: GROQ_MODEL,
    max_tokens: 450,
    messages: [{ role: "system", content: PORTFOLIO_CONTEXT }, ...messages],
  });

  return new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve();
    };

    const options = {
      hostname: "api.groq.com",
      path: "/openai/v1/chat/completions",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
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
          const errorDetails = getGroqErrorDetails(data);
          logGroqFailure("Groq request failed", {
            status: statusCode,
            statusText: response.statusMessage,
            error: errorDetails,
          });
          sendUnavailable(res);
          finish();
          return;
        }

        try {
          const parsed = JSON.parse(data);
          const message = parsed.choices?.[0]?.message?.content;

          if (!message) {
            logGroqFailure("Groq response did not contain a completion message", {
              status: statusCode,
            });
            sendUnavailable(res);
            finish();
            return;
          }

          res.status(200).json({ content: [{ text: message }] });
        } catch (error) {
          logGroqFailure("Groq response JSON parsing failed", {
            status: statusCode,
            error: error instanceof Error ? error.message : String(error),
          });
          sendUnavailable(res);
        }

        finish();
      });
    });

    request.setTimeout(REQUEST_TIMEOUT_MS, () => {
      request.destroy(new Error("Request timed out"));
    });

    request.on("error", (error) => {
      logGroqFailure("Groq network request failed", {
        error: error instanceof Error ? error.message : String(error),
      });
      sendUnavailable(res);
      finish();
    });

    request.write(body);
    request.end();
  });
}
