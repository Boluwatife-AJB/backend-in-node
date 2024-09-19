const nodemailer = require("nodemailer");

/**
 * Sends an email with the given options.
 * @param {object} options - The email options.
 * @param {string} options.to - The recipient's email address.
 * @param {string} options.subject - The email subject.
 * @param {string} options.text - The email body text.
 * @returns {Promise<void>}
 */
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_EMAIL_USERNAME,
      pass: process.env.GOOGLE_EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "noreply@jwt-express-auth",
    to: options.to,
    subject: options.subject,
    text: options.text,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
