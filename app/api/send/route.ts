const resend = new Resend(process.env.RESEND_API_KEY);

const result = await resend.emails.send({
  from: "Prabidhi Uthaan <onboarding@resend.dev>",
  to: ["to: ["skapplies@gmail.com"],"],
  replyTo: email,
  subject: `New Pitch Submission — ${name}`,
  html: `
    <h2>New Prabidhi Uthaan Pitch</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Stage:</strong> ${stage}</p>
    <p><strong>Idea:</strong></p>
    <p>${idea}</p>
  `,
});

console.log("RESEND RESULT:", result);

if (result.error) {
  return Response.json(
    { error: result.error.message || "Resend failed." },
    { status: 500 }
  );
}

return Response.json({ success: true });
