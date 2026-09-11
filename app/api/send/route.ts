import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const { name, email, idea, stage } = await request.json();

    if (!name || !email || !idea || !stage) {
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
      to: ["prabidhiuthaan.org@gmail.com"],
      replyTo: email,
      subject: `New Pitch from ${name}`,
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; max-width: 650px; margin: 0 auto; padding: 30px; color: #222;">
          <h1>New Pitch Submission</h1>

          <p>
            A new idea has been submitted through the Prabidhi Uthaan website.
          </p>

          <hr style="margin: 25px 0;" />

          <p>
            <strong>Name:</strong><br />
            ${name}
          </p>

          <p>
            <strong>Email:</strong><br />
            ${email}
          </p>

          <p>
            <strong>What are they building?</strong><br />
            ${idea}
          </p>

          <p>
            <strong>Current stage:</strong><br />
            ${stage}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      return Response.json(
        { error: "Failed to send the application." },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("API error:", error);

    return Response.json(
      {
        error: "Something went wrong while submitting the application.",
      },
      { status: 500 }
    );
  }
}