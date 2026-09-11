import { Resend } from "resend";

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
    const company = String(body.company || "").trim();
    const inquiry = String(body.inquiry || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !inquiry || !message) {
      return Response.json(
        { error: "Please fill in all required fields." },
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

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: "Prabidhi Uthaan <onboarding@resend.dev>",
      to: ["prabidhi.uthaan@gmail.com"],
      replyTo: email,
      subject: `${inquiry} — ${company || name}`,

      html: `
        <div style="
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #20221d;
          max-width: 700px;
          margin: 0 auto;
        ">

          <h2 style="margin-bottom: 24px;">
            New Prabidhi Uthaan Contact
          </h2>

          <p>
            <strong>Name:</strong>
            ${escapeHtml(name)}
          </p>

          <p>
            <strong>Email:</strong>
            ${escapeHtml(email)}
          </p>

          <p>
            <strong>Company / Startup:</strong>
            ${escapeHtml(company || "Not provided")}
          </p>

          <p>
            <strong>Inquiry Type:</strong>
            ${escapeHtml(inquiry)}
          </p>

          <p style="margin-top: 28px;">
            <strong>Message:</strong>
          </p>

          <div style="
            background: #f4f1e9;
            padding: 20px;
            border-radius: 6px;
            white-space: pre-wrap;
          ">
            ${escapeHtml(message)}
          </div>

          <hr style="margin: 30px 0;" />

          <p style="font-size: 14px; color: #666;">
            You can reply directly to this email to contact
            ${escapeHtml(name)}.
          </p>

        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      return Response.json(
        { error: "Failed to send message." },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        id: data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);

    return Response.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
