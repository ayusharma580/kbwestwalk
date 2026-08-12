import { Resend } from "resend";
import { buildLeadNotificationEmailHtml } from "./email-templates/lead-notification";
import { buildChatLeadNotificationEmailHtml } from "./email-templates/chat-lead-notification";

let cachedClient: Resend | null = null;

/**
 * Lazily creates (and caches) the Resend client. Not created at module
 * import time so a missing RESEND_API_KEY never crashes the route module —
 * the error is only thrown (and caught) when an email actually needs to be
 * sent.
 */
function getResendClient(): Resend {
  if (cachedClient) {
    return cachedClient;
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error(
      "RESEND_API_KEY is not set. Add it to your .env.local file (project root) and restart the server."
    );
  }

  cachedClient = new Resend(apiKey);
  return cachedClient;
}

export type LeadEmailData = {
  fullName: string;
  phone: string;
  email: string;
  message: string | null;
  interestedIn: string | null;
  budget: string | null;
  sourcePage: string | null;
  submittedAt: Date;
};

export type SendEmailResult = {
  success: boolean;
  error?: string;
};

/**
 * Sends the "New Enquiry" notification email to the admin inbox.
 *
 * This function NEVER throws — it always resolves with a result object,
 * so callers can safely fire-and-check without risking the caller's own
 * success response. Every failure path is logged server-side.
 */
export async function sendLeadNotificationEmail(
  data: LeadEmailData
): Promise<SendEmailResult> {
  try {
    const fromEmail = process.env.FROM_EMAIL;
    const notificationEmail = process.env.NOTIFICATION_EMAIL;

    if (!fromEmail) {
      throw new Error("FROM_EMAIL environment variable is missing.");
    }

    if (!notificationEmail) {
      throw new Error("NOTIFICATION_EMAIL environment variable is missing.");
    }

    const resend = getResendClient();
    const html = buildLeadNotificationEmailHtml(data);

    const { data: result, error } = await resend.emails.send({
      from: fromEmail,
      to: notificationEmail,
      replyTo: data.email,
      subject: "New Enquiry | KB West Walk",
      html,
    });

    if (error) {
      console.error("[resend] Failed to send lead notification email:", error);
      return { success: false, error: error.message };
    }

    console.log("[resend] Lead notification email sent. id:", result?.id);
    return { success: true };
  } catch (error) {
    console.error("[resend] sendLeadNotificationEmail threw:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown email error.",
    };
  }
}

export type ChatLeadEmailData = {
  fullName: string;
  phone: string;
  email: string;
  budget: string | null;
  interestedUnit: string | null;
  preferredTime: string | null;
  conversationSummary: string | null;
  pageUrl: string | null;
  submittedAt: Date;
};

/**
 * Sends the "New Chatbot Lead" notification email to the admin inbox.
 * Same never-throws contract as sendLeadNotificationEmail.
 */
export async function sendChatLeadNotificationEmail(
  data: ChatLeadEmailData
): Promise<SendEmailResult> {
  try {
    const fromEmail = process.env.FROM_EMAIL;
    const notificationEmail = process.env.NOTIFICATION_EMAIL;

    if (!fromEmail) {
      throw new Error("FROM_EMAIL environment variable is missing.");
    }

    if (!notificationEmail) {
      throw new Error("NOTIFICATION_EMAIL environment variable is missing.");
    }

    const resend = getResendClient();
    const html = buildChatLeadNotificationEmailHtml(data);

    const { data: result, error } = await resend.emails.send({
      from: fromEmail,
      to: notificationEmail,
      replyTo: data.email,
      subject: "New Enquiry | KB West Walk",
      html,
    });

    if (error) {
      console.error(
        "[resend] Failed to send chat lead notification email:",
        error
      );
      return { success: false, error: error.message };
    }

    console.log("[resend] Chat lead notification email sent. id:", result?.id);
    return { success: true };
  } catch (error) {
    console.error("[resend] sendChatLeadNotificationEmail threw:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown email error.",
    };
  }
}