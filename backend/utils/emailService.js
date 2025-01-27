const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
 host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, 
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from:process.env.EMAIL ,
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
