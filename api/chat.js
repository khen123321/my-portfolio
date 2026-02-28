/* eslint-env node */
import https from "https";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const body = JSON.stringify({
    model: "llama-3.1-8b-instant",
    max_tokens: 1000,
    messages: [
      { role: "system", content: req.body.system },
      ...req.body.messages,
    ],
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
      response.on("data", (chunk) => { data += chunk; });
      response.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          // Return raw for debugging if choices missing
          if (!parsed.choices?.[0]?.message?.content) {
            res.status(200).json({ content: [{ text: "Debug: " + JSON.stringify(parsed) }] });
          } else {
            const message = parsed.choices[0].message.content;
            res.status(200).json({ content: [{ text: message }] });
          }
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