const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  try {
    if (!options.email) {
      throw new Error("No recipients defined");
    }

    console.log("Preparing to send email...");
    console.log("Recipient email:", options.email);

    const transport = nodemailer.createTransport({
      service: "Gmail",
      port: process.env.SMPT_PORT,
      auth: {
        user: process.env.SMPT_EMAIL,
        pass: process.env.SMPT_PASS,
      },
      secure: false,
    });

    console.log("Transport configuration created successfully.");

    const message = {
      from: `${process.env.SMPT_FROM_NAME} <${process.env.SMPT_FROM_EMAIL}> `,
      to: options.email,
      subject: options.subject,
      text: options.text,
    };

    console.log("Message details:", message);

    await transport.sendMail(message);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw error;
  }
};

module.exports = sendEmail;
