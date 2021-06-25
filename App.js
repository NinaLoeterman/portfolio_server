const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();

const port = 5050;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`portfolio_server listening at http://localhost:${port}`);
});

app.post("/messages", (req, res) => {
  const messageData = req.body.data;
  console.log("message data:", messageData);
  res.send(messageData);
  sendMessage(messageData).catch(
    console.error("an error occured while sending your message", e)
  );
});

const sendMessage = async (messageData) => {
  const transporter = nodemailer.createTransport({
    service: "outlook",
    port: 25,
    auth: {
      user: "spaceholder@outlook.com", //fill this in,
      pass: "spaceholder", //fill this in
    },
  });

  const message = {
    from: "placeholder@outlook.com",
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
