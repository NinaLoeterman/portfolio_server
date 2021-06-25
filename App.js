const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();

const PORT = 5050;
const HOST = "0.0.0.0";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, HOST, () => {
  console.log(`running on http://${HOST}:${PORT}`);
});

app.post("/messages", (req, res) => {
  const messageData = req.body;
  console.log("message data:", messageData);
  res.send(messageData);
  try {
    sendMessage(messageData);
  } catch (e) {
    console.error("an error occured while sending your message", e);
  }
});

const sendMessage = async (messageData) => {
  const transporter = nodemailer.createTransport({
    service: "outlook",
    port: 25,
    auth: {
      user: "meitar.takeaway@outlook.com",
      pass: "takemeaway!!!",
    },
  });

  const message = {
    from: "meitar.takeaway@outlook.com",
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
