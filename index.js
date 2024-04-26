//index.js
import * as readline from "readline";
import productEmitter from "./sendEventNotification.js"
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
//create objet produit to send.
const newProduct = {};
// taper les info du nouveau produit
rl.question("Nom du produit: ", (name) => {
  newProduct.name = name;

  rl.question("Prix: ", (price) => {
    newProduct.price = parseFloat(price);
    console.log("L'objet produit chargé en mémoire :", newProduct);
    rl.close();
    // emettre evenement d'ajout du produit
    productEmitter.emit("newProductAdded", newProduct);
  });
});
