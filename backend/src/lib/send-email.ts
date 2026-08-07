import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface Props {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async (
  { to, subject, html }: Props,
) => {
  const { data, error } = await resend.emails.send({
    from: "Todo <onboarding@resend.dev>",
    to,
    subject,
    html,
  });

  if (error) {
    throw new Error("failed to send email");
  }

  return data;
};
