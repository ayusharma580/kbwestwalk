
import OpenAI from "openai";

let cachedClient: OpenAI | null = null;

/**
 * Lazily creates (and caches) the OpenAI client. Not created at module
 * import time so a missing OPENAI_API_KEY never crashes the route module —
 * the error is only thrown (and caught) when a chat request actually needs
 * the model.
 */
export function getOpenAIClient(): OpenAI {
  if (cachedClient) {
    return cachedClient;
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY is not set. Add it to your .env.local file (project root) and restart the server."
    );
  }

  cachedClient = new OpenAI({ apiKey });
  return cachedClient;
}

export const CHAT_MODEL = process.env.OPENAI_CHAT_MODEL || "gpt-4o-mini";