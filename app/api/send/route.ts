import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, idea, stage } = body;

    if (!name || !email || !idea || !stage) {
      return Response.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Prabidhi Uthaan <onboarding@resend.dev>",
      to: ["infopuebi@gmail.com"],
      subject: `New Application from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #20221d;">
          <h2>New Prabidhi Uthaan Application</h2>

          <p><strong>Name:</strong> ${name}</p>

          <p><strong>Email:</strong> ${email}</p>

          <p><strong>Current Stage:</strong> ${stage}</p>

          <p><strong>What are they building?</strong></p>

          <div style="
            background: #f4f1e9;
            padding: 20px;
            border-radius: 6px;
            white-space: pre-wrap;
          ">
            ${idea}
          </div>

          <hr style="margin: 30px 0;" />

          <p>
            You can reply directly to this email to contact ${name}.
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
