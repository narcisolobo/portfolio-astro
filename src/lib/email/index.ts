import { Resend } from "resend";
import { getSecret } from "astro:env/server";

const resend = new Resend(getSecret("RESEND_API_KEY"));

async function resendContactEmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  return await resend.emails.send({
    from: "narciso@narcisolobo.com",
    to: "hello@narcisolobo.com",
    subject: `New message from ${name}`,
    replyTo: email,
    text: `site: narcisolobo.com ${message}`,
  });
}

export { resendContactEmail };
