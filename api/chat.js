/* eslint-env node */
import https from "https";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const body = JSON.stringify({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1000,
    system: req.body.system,
    messages: req.body.messages,
  });

  return new Promise((resolve) => {
    const options = {
      hostname: "api.anthropic.com",
      path: "/v1/messages",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "Content-Length": Buffer.byteLength(body),
      },
    };

    const request = https.request(options, (response) => {
      let data = "";
      response.on("data", (chunk) => { data += chunk; });
      response.on("end", () => {
        try {
          res.status(200).json(JSON.parse(data));
        } catch {
          res.status(500).json({ error: "Failed to parse response" });
        }
        resolve();
      });
    });

    request.on("error", (err) => {
      res.status(500).json({ error: err.message });
      resolve();
    });

    request.write(body);
    request.end();
  });
}