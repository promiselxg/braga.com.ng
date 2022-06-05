const sgMail = require('@sendgrid/mail');
const sendEmail = async (msg) => {
  try {
    await sgMail.send(msg);
    console.log('Email sent');
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendEmail,
};
