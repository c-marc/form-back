const formData = require("form-data");
const Mailgun = require("mailgun.js");

const mailgun = new Mailgun(formData);
const client = mailgun.client({
  username: process.env.MG_USERNAME,
  key: process.env.MG_API_KEY,
});

const sendMessage = async (
  firstName,
  lastName,
  email,
  subject,
  message,
  to
) => {
  const messageData = {
    from: `${firstName} ${lastName} <${email}>`,
    to: to,
    subject: subject,
    text: message,
  };

  try {
    return client.messages.create(process.env.MG_DOMAIN, messageData);
  } catch (error) {
    throw new Error("MG service error", { cause: error });
  }
};

module.exports = sendMessage;
