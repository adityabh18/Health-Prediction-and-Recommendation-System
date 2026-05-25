import nodemailer from "nodemailer";

/**
 * @description sendContactMessage
 */
export const sendContactMessage = async (req, res) => {
  try {
    const { name, email, phone, service, issueType, symptoms } = req.body;

    // respond immediately
    res.status(200).json({
      message: "Message received. We will contact you soon!",
    });

    // send email in background (non-blocking)
    setImmediate(async () => {
      try {
        await transporter.sendMail({
          from: email,
          to: process.env.EMAIL_USER,
          subject: `New Contact - ${issueType}`,
          html: `
            <h3>New Contact Request</h3>
            <p><b>Name:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Phone:</b> ${phone}</p>
            <p><b>Service:</b> ${service}</p>
            <p><b>Issue:</b> ${issueType}</p>
            <p><b>Symptoms:</b> ${symptoms}</p>
          `,
        });
      } catch (err) {
        console.log("Email error:", err);
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};