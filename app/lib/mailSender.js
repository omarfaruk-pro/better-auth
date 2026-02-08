import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, text }) {

  const { error } = await resend.emails.send({
    from: "auth@web-themes.xyz",
    to,
    subject,
    html:text
  });

  if (error) {
    console.error("Resend error:", error);
    throw error;
  }
}
