import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const idea = String(body.idea || "").trim();
    const stage = String(body.stage || "").trim();

    if (!name || !email || !idea || !stage) {
      return Response.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured.");

      return Response.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Prabidhi Uthaan <onboarding@resend.dev>",
      to: ["infopuebi@gmail.com"],
      replyTo: email,
      subject: `New Application from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #20221d;">
          <h2>New Prabidhi Uthaan Application</h2>

          <p><strong>Name:</strong> ${escapeHtml(name)}</p>

          <p><strong>Email:</strong> ${escapeHtml(email)}</p>

          <p><strong>Current Stage:</strong> ${escapeHtml(stage)}</p>

          <p><strong>What are they building?</strong></p>

          <div style="
            background: #f4f1e9;
            padding: 20px;
            border-radius: 6px;
            white-space: pre-wrap;
          ">
            ${escapeHtml(idea)}
          </div>

          <hr style="margin: 30px 0;" />

          <p>
            You can reply directly to this email to contact ${escapeHtml(name)}.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      return Response.json(
        { error: "Failed to send application." },
        { status: 500 }
      );
    }

    return Response.json(
      { success: true, id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Application API error:", error);

    return Response.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
