export type ChatRole = "user" | "assistant";

export type ChatMessageKind =
  | "text"
  | "lead-form"
  | "lead-success"
  | "error";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  kind: ChatMessageKind;
  content: string;
  createdAt: string;
};

export type LeadFormData = {
  fullName: string;
  phone: string;
  email: string;
  budget: string;
  interestedUnit: string;
  preferredTime: string;
};

export type QuickReply = {
  label: string;
  message: string;
};

export type ChatApiRequestBody = {
  sessionToken: string;
  pageUrl: string;
  messages: { role: ChatRole; content: string }[];
};

export type ChatLeadApiRequestBody = LeadFormData & {
  sessionToken: string;
  pageUrl: string;
  conversationSummary: string;
};