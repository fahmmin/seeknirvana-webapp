import { NextResponse } from "next/server";
import { getResend, getResendFrom } from "@/lib/email/resend-client";
import { preorderConfirmationHtml, preorderConfirmationText } from "@/lib/email/templates";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, address, color, size } = body;

    if (!email || !name || !address || !color || !size) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const resend = getResend();
    const fromEmail = getResendFrom();

    if (!resend || !fromEmail) {
      console.error("Resend not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: "Pre-order Confirmed | Seek Nirvana",
      html: preorderConfirmationHtml({ name, address, color, size }),
      text: preorderConfirmationText({ name, address, color, size }),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("Preorder API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
