const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const { sendMessage } = require("./emailService");

const PORT = 5050;
const HOST = "0.0.0.0";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, HOST, () => {
  console.log(`running on http://${HOST}:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("hello!");
});

app.post("/messages", (req, res) => {
  const messageData = req.body;
  res.send(messageData);
  try {
    sendMessage(messageData);
  } catch (e) {
    console.error("an error occured while sending a message", e);
  }
});