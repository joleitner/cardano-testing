const cardano = require("./lib/cardano");

const paymentAddr = cardano.wallet("testWallet").paymentAddr

console.log(cardano.queryUtxo(paymentAddr))