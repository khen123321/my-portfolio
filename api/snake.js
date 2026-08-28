/* global process */
import { createClient } from "@supabase/supabase-js";

const TABLE_NAME = "snake_scores";
const MAX_SCORE = 400;
const PLAYER_NAME_PATTERN = /^[A-Za-z0-9 _.-]{1,16}$/;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_POSTS = 8;

const postCounts = new Map();

function getClientIp(req) {
  const forwardedFor = req.headers["x-forwarded-for"];

  if (typeof forwardedFor === "string" && forwardedFor.trim()) {
    return forwardedFor.split(",")[0].trim();
  }

  return req.socket?.remoteAddress || "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  const current = postCounts.get(ip);

  if (!current || now > current.resetAt) {
    postCounts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX_POSTS;
}

function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !supabaseSecretKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseSecretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function parseBody(body) {
  if (!body) return {};
  if (typeof body === "object") return body;
  if (typeof body !== "string") return null;

  try {
    return JSON.parse(body);
  } catch {
    return null;
  }
}

function validateScorePayload(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { error: "Invalid request body" };
  }

  const playerName = typeof body.playerName === "string" ? body.playerName.trim() : "";
  const score = body.score;

  const hasControlCharacter = [...playerName].some((char) => {
    const code = char.charCodeAt(0);
    return code < 32 || code === 127;
  });

  if (!playerName || playerName.length > 16 || hasControlCharacter || !PLAYER_NAME_PATTERN.test(playerName)) {
    return { error: "Invalid player name" };
  }

  if (!Number.isInteger(score) || score < 0 || score > MAX_SCORE) {
    return { error: "Invalid score" };
  }

  return { playerName, score };
}

function publicLeaderboard(rows = []) {
  return rows.map((row) => ({
    playerName: row.player_name,
    score: row.score,
  }));
}

function sendJson(res, status, body) {
  res.status(status).json(body);
}

async function getLeaderboard(supabase) {
  return supabase
    .from(TABLE_NAME)
    .select("player_name, score")
    .order("score", { ascending: false })
    .order("created_at", { ascending: true })
    .limit(3);
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "GET" && req.method !== "POST") {
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  if (req.method === "POST") {
    const body = parseBody(req.body);
    const payload = validateScorePayload(body);

    if (payload.error) {
      return sendJson(res, 400, { error: payload.error });
    }

    if (isRateLimited(getClientIp(req))) {
      return sendJson(res, 429, { error: "Too many score submissions. Please try again soon." });
    }

    const supabase = getSupabaseClient();

    if (!supabase) {
      console.error("[snake] Supabase environment variables are missing");
      return sendJson(res, 503, { error: "Leaderboard unavailable" });
    }

    const { error: insertError } = await supabase
      .from(TABLE_NAME)
      .insert({
        player_name: payload.playerName,
        score: payload.score,
      });

    if (insertError) {
      console.error("[snake] score insert failed", {
        message: insertError.message,
        code: insertError.code,
      });
      return sendJson(res, 502, { error: "Score could not be submitted" });
    }

    const { data, error } = await getLeaderboard(supabase);

    if (error) {
      console.error("[snake] leaderboard refresh failed", {
        message: error.message,
        code: error.code,
      });
      return sendJson(res, 200, { leaderboard: [] });
    }

    return sendJson(res, 201, { leaderboard: publicLeaderboard(data) });
  }

  const supabase = getSupabaseClient();

  if (!supabase) {
    console.error("[snake] Supabase environment variables are missing");
    return sendJson(res, 503, { error: "Leaderboard unavailable" });
  }

  const { data, error } = await getLeaderboard(supabase);

  if (error) {
    console.error("[snake] leaderboard fetch failed", {
      message: error.message,
      code: error.code,
    });
    return sendJson(res, 502, { error: "Leaderboard unavailable" });
  }

  return sendJson(res, 200, { leaderboard: publicLeaderboard(data) });
}
