import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/app/lib/supabaseAdmin";
import { sendLeadNotificationEmail } from "@/app/lib/resend";

type EnquiryPayload = {
  name?: unknown;
  mobile?: unknown;
  email?: unknown;
  comments?: unknown;
  interestedIn?: unknown;
  budget?: unknown;
  sourcePage?: unknown;
};

function toTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function toNullableString(value: unknown): string | null {
  const str = toTrimmedString(value);
  return str.length > 0 ? str : null;
}

export async function POST(request: Request) {
  try {
    // ---- 1. Safely parse the incoming JSON body ----
    let body: EnquiryPayload;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error("Request JSON parse error:", parseError);
      return NextResponse.json(
        { success: false, message: "Invalid JSON in request body." },
        { status: 400 }
      );
    }

    const name = toTrimmedString(body.name);
    const mobile = toTrimmedString(body.mobile);
    const email = toTrimmedString(body.email);
    const comments = toNullableString(body.comments);
    const interestedIn = toNullableString(body.interestedIn);
    const budget = toNullableString(body.budget);
    const sourcePage = toNullableString(body.sourcePage);

    // ---- 2. Validate required fields ----
    if (!name || !mobile || !email) {
      return NextResponse.json(
        { success: false, message: "Please fill all required fields." },
        { status: 400 }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // ---- 3. Get the Supabase admin client (throws a clear error if env vars are missing) ----
    let supabaseAdmin;
    try {
      supabaseAdmin = getSupabaseAdmin();
    } catch (configError) {
      console.error("Supabase configuration error:", configError);
      return NextResponse.json(
        {
          success: false,
          message:
            configError instanceof Error
              ? configError.message
              : "Supabase is not configured correctly.",
        },
        { status: 500 }
      );
    }

    const submittedAt = new Date();

    // ---- 4. Insert the lead ----
    const { error } = await supabaseAdmin.from("leads").insert([
      {
        full_name: name,
        phone: mobile,
        email: email,
        message: comments,
        interested_in: interestedIn,
        budget: budget,
        source_page: sourcePage,
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    // ---- 5. Send the admin notification email ----
    // Runs AFTER the lead is safely stored. Fully isolated: sendLeadNotificationEmail
    // never throws, and this try/catch guarantees an email failure can never
    // fail the API response or affect the already-saved lead.
    try {
      const emailResult = await sendLeadNotificationEmail({
        fullName: name,
        phone: mobile,
        email: email,
        message: comments,
        interestedIn: interestedIn,
        budget: budget,
        sourcePage: sourcePage,
        submittedAt,
      });

      if (!emailResult.success) {
        console.error(
          "Lead saved, but notification email failed:",
          emailResult.error
        );
      }
    } catch (emailError) {
      console.error(
        "Lead saved, but notification email threw an unexpected error:",
        emailError
      );
    }

    // ---- 6. Success (lead is saved regardless of email outcome) ----
    return NextResponse.json(
      { success: true, message: "Lead submitted successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Unhandled API Error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { success: false, message: "Method not allowed." },
    { status: 405 }
  );
}