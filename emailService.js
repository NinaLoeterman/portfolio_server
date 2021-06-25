const nodemailer = require("nodemailer");

exports.sendMessage = async (messageData) => {
  const transporter = nodemailer.createTransport({
    service: "outlook",
    port: 25,
    auth: {
      user: process.env.SENDING_EMAIL,
      pass: process.env.EMAIL_PWD,
    },
  });

  const message = {
    from: process.env.SENDING_EMAIL,
    to: "nina.loeterman@gmail.com",
    subject: "Someone wants to be in touch!",
    html: ` <div>Name: ${messageData.name}</div>
            <div>Email: ${messageData.email}</div>
            <div>Message: ${messageData.message}</div>`,
  };

  transporter.sendMail(message, (error, info) => {
    error
      ? console.log("an error occured", error)
      : console.log(`message sent: ${info.response}`);
  });
};
