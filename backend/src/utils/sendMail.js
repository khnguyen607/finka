require("dotenv").config();
// Import Nodemailer
const nodemailer = require("nodemailer");
// Cấu hình transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Thay bằng email của bạn
    pass: process.env.EMAIL_PASS, // Thay bằng App Password của bạn
  },
});

const Modal = require("../models/config");
async function getModalByCode(code) {
  try {
    const modal = await Modal.findByPk(code);
    return modal.dataValues.data;
  } catch (error) {
    console.log({ error: error.message });
  }
}

const sendMail = async (type, email) => {
  const emails = await getModalByCode("emails");
  const templates = await getModalByCode("templates");
  switch (type) {
    // Gửi cho ng dùng khi đăng ký thành công
    case "newRegisterForUser":
      try {
        console.log(templates.newRegisterForUser);
        await transporter.sendMail({
          from: templates.newRegisterForUser.from + " <your-email@gmail.com>",
          to: email,
          subject: templates.newRegisterForUser.subject,
          html: templates.newRegisterForUser.html,
        });
      } catch (error) {
        console.error("Error sending email:", error);
      }
      break;
    case "newRegisterForAdmin":
      try {
        emails.forEach(async (email) => {
          await transporter.sendMail({
            from:
              templates.newRegisterForAdmin.from + " <your-email@gmail.com>",
            to: email,
            subject: templates.newRegisterForAdmin.subject,
            html: templates.newRegisterForAdmin.html.replace("${email}", email),
          });
        });
      } catch (error) {
        console.error("Error sending email:", error);
      }
      break;
    case "approveForUser":
      try {
        await transporter.sendMail({
          from: templates.approveForUser.from + " <your-email@gmail.com>",
          to: email,
          subject: templates.approveForUser.subject,
          html: templates.approveForUser.html,
        });
      } catch (error) {
        console.error("Error sending email:", error);
      }
      break;
    default:
      break;
  }
};

// Xuất các hàm CRUD
module.exports = {
  sendMail,
};
