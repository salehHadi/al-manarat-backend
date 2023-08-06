const nodemailer = require("nodemailer");

const mailHelper = async (data) => {
  const transporter = await nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  console.log(data);

  const message = {
    from: "sasa97977s@hotmail.com",
    to: data.email,
    subject: "reset your password ✔",
    text: "click on the next link to reset?",
    html: `<a>${data.myURL}</a>`,
  };

  await transporter.sendMail(message);
};

module.exports = mailHelper;
