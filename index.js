//index.js
import productEmitter from "./sendEventNotification.js";
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
//create a produit to send.
const newProduct = {};
// entrer les attributs du produit
rl.question("Nom du produit: ", (name) => {
  newProduct.name = name;

  rl.question("Prix: ", (price) => {
    newProduct.price = parseFloat(price);
    console.log("L'objet produit :", newProduct);
    rl.close();
    // emettre evenement d'ajout du produit
    productEmitter.emit("newProductAdded", newProduct);
  });
});
