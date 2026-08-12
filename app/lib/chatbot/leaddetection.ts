/**
 * Lightweight, dependency-free buying-intent detector. Runs both on the
 * client (to decide when to show the inline lead-capture form) and on the
 * server (kept isomorphic — no server-only imports — so it can be reused
 * anywhere without extra wiring).
 */
const INTENT_PATTERNS: RegExp[] = [
  /\bi\s*am\s*interested\b/i,
  /\bi'?m\s*interested\b/i,
  /\bi\s*want\s*to\s*invest\b/i,
  /\btell\s*me\s*the\s*price\b/i,
  /\bwhat'?s?\s*the\s*price\b/i,
  /\bhow\s*much\s*(does|is|will)\b.*\b(cost|price)\b/i,
  /\bcall\s*me\b/i,
  /\bbook\s*(a\s*)?site\s*visit\b/i,
  /\bschedule\s*(a\s*)?(meeting|visit|call)\b/i,
  /\bi\s*want\s*(the\s*)?brochure\b/i,
  /\bsend\s*me\s*(the\s*)?brochure\b/i,
  /\bi\s*want\s*to\s*buy\b/i,
  /\bi\s*want\s*to\s*book\b/i,
  /\bi\s*(would\s*like|want)\s*to\s*(purchase|invest|book|buy)\b/i,
  /\bcontact\s*me\b/i,
  /\bget\s*in\s*touch\b/i,
  /\barrange\s*a\s*call\b/i,
];

export function detectBuyingIntent(message: string): boolean {
  return INTENT_PATTERNS.some((pattern) => pattern.test(message));
}