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

// Hàm gửi email
async function sendEmail(to, subject, text, html) {
  try {
    const info = await transporter.sendMail({
      from: '"Bin Dev" <your-email@gmail.com>', // Đổi tên người gửi
      to: to, // Người nhận
      subject: subject, // Chủ đề
      text: text, // Nội dung văn bản
      html: html, // Nội dung HTML (nếu có)
    });

    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// Gửi thử email
sendEmail(
  "khnguyen.job@gmail.com", // Email người nhận
  "Chào từ Node.js", // Chủ đề
  "Đây là email gửi bằng Node.js", // Nội dung văn bản
  "<h1>Hello!</h1><p>Đây là email gửi từ Node.js</p>" // Nội dung HTML
);
