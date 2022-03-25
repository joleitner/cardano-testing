const cardano = require("./cardano");

const wallet = cardano.wallet("mainWallet")

console.log(wallet.balance())