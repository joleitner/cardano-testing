const cardano = require("./lib/cardano");

const wallet = cardano.wallet("mainWallet")

console.log(`${wallet.name}: ${cardano.toAda(wallet.balance().value.lovelace)} Ada`)