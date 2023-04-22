const express = require("express");
const cors = require("cors");

require("dotenv").config();

const sendMessage = require("./src/services/mailgun");

const app = express();

app.use(cors());
app.use(express.json());

/* MAILGUN CONFIGURATION */

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/send", async (req, res) => {
  try {
    const { firstName, lastName, email, subject, message } = req.body;

    // TODO: validate

    await sendMessage(
      firstName,
      lastName,
      email,
      subject,
      message,
      (to = "mcar176@gmail.com") // to: "nono@lereacteur.io",
    );

    res.json({ message: "Message succesfully sent!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  res.json(404);
});

app.listen(process.env.PORT, () => console.log("Up and running !"));
