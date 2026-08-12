import type { LeadEmailData } from "../resend";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, value: string | null): string {
  const safeValue = value && value.trim() ? escapeHtml(value) : "—";
  return `
    <tr>
      <td style="padding:14px 20px;border-bottom:1px solid #f0e6d2;font-family:Georgia, 'Times New Roman', serif;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#8b1a1a;font-weight:600;vertical-align:top;width:35%;">
        ${label}
      </td>
      <td style="padding:14px 20px;border-bottom:1px solid #f0e6d2;font-family:Arial, Helvetica, sans-serif;font-size:14px;color:#2b2b2b;vertical-align:top;">
        ${safeValue.replace(/\n/g, "<br/>")}
      </td>
    </tr>`;
}

export function buildLeadNotificationEmailHtml(data: LeadEmailData): string {
  const formattedTime = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(data.submittedAt);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>New Enquiry | KB West Walk</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f1ea;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    New enquiry from ${escapeHtml(data.fullName)} — ${escapeHtml(data.phone)}
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f1ea;padding:32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:4px;overflow:hidden;box-shadow:0 6px 24px rgba(0,0,0,0.08);">

          <!-- Header / Brand -->
          <tr>
            <td style="background-color:#0a0e1a;padding:28px 24px;text-align:center;">
              <div style="font-family:Georgia, 'Times New Roman', serif;color:#d4af5a;font-size:22px;letter-spacing:0.12em;font-weight:700;">
                KB WEST WALK
              </div>
              <div style="font-family:Arial, Helvetica, sans-serif;color:#c9c9c9;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;margin-top:6px;">
                Retail Shops &nbsp;&#8226;&nbsp; Food Court &nbsp;&#8226;&nbsp; Studio Apartments
              </div>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding:28px 24px 8px 24px;text-align:center;background-color:#ffffff;">
              <div style="font-family:Georgia, 'Times New Roman', serif;font-size:20px;color:#8b1a1a;letter-spacing:0.04em;">
                New Lead Received
              </div>
              <div style="width:40px;height:2px;background-color:#8b1a1a;margin:10px auto 0 auto;"></div>
            </td>
          </tr>

          <!-- Details -->
          <tr>
            <td style="padding:12px 12px 8px 12px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                ${row("Name", data.fullName)}
                ${row("Phone", data.phone)}
                ${row("Email", data.email)}
                ${row("Message", data.message)}
                ${row("Interested In", data.interestedIn)}
                ${row("Budget", data.budget)}
                ${row("Source Page", data.sourcePage)}
                ${row("Submitted At", formattedTime)}
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:8px 24px 32px 24px;text-align:center;">
              <a href="tel:${encodeURIComponent(data.phone)}" style="display:inline-block;background-color:#8b1a1a;color:#ffffff;text-decoration:none;font-family:Arial, Helvetica, sans-serif;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;padding:12px 28px;border-radius:2px;">
                Call ${escapeHtml(data.phone)}
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f4f1ea;padding:18px 24px;text-align:center;border-top:1px solid #e5ddc8;">
              <div style="font-family:Arial, Helvetica, sans-serif;font-size:11px;color:#8a8478;letter-spacing:0.05em;">
                KB West Walk Website &nbsp;&#8226;&nbsp; This is an automated notification
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}