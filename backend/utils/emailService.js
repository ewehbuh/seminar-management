const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 1025, // Mailhog port
  secure: false,
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: 'ewehbuh8@gmail.com',
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
