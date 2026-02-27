// Netlify Function: AI-assisted contact form reply
//
// What it does:
// - Triggered by Netlify Form submission (use this function as a Form notification)
// - Calls OpenAI to generate a reply draft
// - Emails the draft + original message to you via Resend
//
// Required Netlify environment variables:
// - OPENAI_API_KEY      (from OpenAI)
// - RESEND_API_KEY      (from Resend)
// - REPLY_TO_EMAIL      (your inbox, e.g. aum.aswar06@gmail.com)

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const REPLY_TO_EMAIL = process.env.REPLY_TO_EMAIL;

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let payload;
  try {
    const body = JSON.parse(event.body || "{}");
    payload = body.payload || body;
  } catch (err) {
    console.error("Failed to parse Netlify form payload", err);
    return { statusCode: 400, body: "Invalid payload" };
  }

  const data = payload.data || {};
  const name = (data.name || "").toString().trim() || "Someone";
  const email = (data.email || "").toString().trim();
  const message = (data.message || "").toString().trim();

  if (!OPENAI_API_KEY) {
    console.warn("OPENAI_API_KEY missing; skipping AI reply generation.");
    return { statusCode: 200, body: "OK (no OPENAI_API_KEY set)" };
  }

  const systemPrompt =
    "You are Aum Aswar, a beginner front-end developer. " +
    "You reply politely, clearly, and concisely in 4–8 sentences. " +
    "You are honest about your experience level and eager to learn.";

  const userPrompt = [
    "You received this portfolio contact form submission.",
    "",
    `Name: ${name}`,
    `Email: ${email || "(not provided)"}`,
    "",
    "Message:",
    message || "(no message provided)",
    "",
    "Write an email reply as Aum.",
    "- Be friendly and professional.",
    "- If they mention a project, show interest and ask 1–2 clarifying questions.",
    "- If it's clearly spam, respond very briefly or say you can't help.",
    "",
    "Return only the email body, no subject line or greeting from the model.",
  ].join("\n");

  let replyText = "";

  try {
    const aiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
      }),
    });

    if (!aiRes.ok) {
      console.error("OpenAI API error:", await aiRes.text());
      throw new Error(`OpenAI request failed with status ${aiRes.status}`);
    }

    const completion = await aiRes.json();
    replyText =
      completion.choices?.[0]?.message?.content?.toString().trim() ||
      "Hi,\n\nThank you for your message! I appreciate you reaching out.\n\nBest,\nAum";
  } catch (err) {
    console.error("Failed to generate AI reply", err);
    replyText =
      "Hi,\n\nThank you for your message! I appreciate you reaching out and will get back to you soon.\n\nBest,\nAum";
  }

  // Email the draft + original message to you using Resend (if configured)
  if (RESEND_API_KEY && REPLY_TO_EMAIL) {
    try {
      const subject = `New portfolio message from ${name}`;
      const textBody = [
        "You received a new portfolio contact form submission.",
        "",
        `Name: ${name}`,
        `Email: ${email || "(not provided)"}`,
        "",
        "Message:",
        message || "(no message provided)",
        "",
        "---------------------------",
        "AI-suggested reply (draft):",
        "",
        replyText,
      ].join("\n");

      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Aum Portfolio <onboarding@resend.dev>",
          to: [REPLY_TO_EMAIL],
          subject,
          text: textBody,
        }),
      });

      if (!resendRes.ok) {
        console.error("Resend API error:", await resendRes.text());
      }
    } catch (err) {
      console.error("Failed to send email via Resend", err);
    }
  } else {
    console.warn(
      "RESEND_API_KEY or REPLY_TO_EMAIL not set; skipping email send. AI reply was:",
      replyText,
    );
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true }),
  };
};

