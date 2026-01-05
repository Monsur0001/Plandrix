import { Resend } from "resend";

export async function onRequestPost({ request, env }) {
  try {
    const data = await request.json();

    const resend = new Resend(env.RESEND_API_KEY);

    const result = await resend.emails.send({
      from: "Plandrix <no-reply@plandrix.co.uk>",
      to: ["info@plandrix.co.uk"],
      subject: "New Contact Form Submission",
      reply_to: data.email,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
