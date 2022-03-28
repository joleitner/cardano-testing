const cardano = require("./lib/cardano");

const paymentAddr = cardano.wallet("mainWallet").paymentAddr
console.log(cardano.queryUtxo(paymentAddr))