const nodemailer = require("nodemailer");

const mailHelper = async (data) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const message = {
    from: "sasa97977s@hotmail.com",
    to: data.email,
    subject: "Hello ✔",
    text: "Hello world?",
    html: `<a>Hello world?</a>`,
  };

  await transporter.sendMail(message);
};

module.exports = mailHelper;
