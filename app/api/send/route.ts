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
      console.error("RESEND_API_KEY is missing");

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
      subject: `New Pitch Submission — ${name}`,
      html: `
        <h2>New Prabidhi Uthaan Pitch</h2>

        <p><strong>Name:</strong> ${name}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Current Stage:</strong> ${stage}</p>

        <hr />

        <h3>Idea</h3>
        <p>${idea}</p>
      `,
    });

    if (error) {
      console.error("RESEND ERROR:", error);

      return Response.json(
        { error: error.message || "Failed to send email." },
        { status: 500 }
      );
    }

    console.log("EMAIL SENT:", data);

    return Response.json({
      success: true,
      message: "Application received.",
    });
  } catch (error) {
    console.error("API ERROR:", error);

    return Response.json(
      { error: "Something went wrong while submitting." },
      { status: 500 }
    );
  }
}
