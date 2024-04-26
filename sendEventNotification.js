// sendEmailNotification.js
import nodemailer from "nodemailer";
import { EventEmitter } from "node:events";
import { configDotenv } from "dotenv";
configDotenv();
const productEmitter = new EventEmitter(); // Create an instance of EventEmitter
async function sendEmailNotification(product) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASSWORD,
        authMethod: "PLAIN",
        type: "login",
      },
    });

    const mailOptions = {
      from: process.env.APP_EMAIL,
      to: process.env.TO_EMAIL,
      subject: "Nouveau produit ajouté",
      text: `Un nouveau produit a été ajouté : ${product.name}`,
    };

    const result = await transporter.sendMail(mailOptions);
    // console.log("E-mail envoyé" , result);
    console.log("E-mail envoyé avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail :", error);
  }
}
// Event Listener Setup
productEmitter.on("newProductAdded", (product) => {
  sendEmailNotification(product);
});

export default productEmitter;
