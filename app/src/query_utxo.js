const cardano = require("./cardano");

console.log(cardano.queryUtxo("addr_test1vz3gqg47k529ljfykf8nzv7qwvy4x2y0283ju9e3zth8jqq5p9hym"))
// console.log(cardano.queryTip())

// console.log('### Wallet info:');
// console.log(`name: ${wallet.name}`);
// console.log(`paymentAddr: ${wallet.paymentAddr}`);
// console.log(`stakingAddr: ${wallet.stakingAddr}`);