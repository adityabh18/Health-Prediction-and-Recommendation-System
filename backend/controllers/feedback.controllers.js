import nodemailer from "nodemailer";

/**
 * @description sendFeedback
 */
export const sendFeedback = async (req, res) => {

  try {

    const { name, email, feedback, rating } = req.body;


    const transporter = nodemailer.createTransport({

      service: "gmail",

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },

    });


    const mailOptions = {

      from: process.env.EMAIL_USER,

      to: process.env.ADMIN_EMAIL,

      subject: "New Feedback Received",

      html: `
        <div style="font-family:sans-serif;padding:20px">

          <h2 style="color:#10b981;">New Feedback</h2>

          <p><b>Name:</b> ${name}</p>

          <p><b>Email:</b> ${email}</p>

          <p><b>Rating:</b> ${rating}</p>

          <p><b>Feedback:</b></p>

          <p>${feedback}</p>

        </div>
      `,
    };


    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Feedback sent successfully",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to send feedback",
    });

  }
};