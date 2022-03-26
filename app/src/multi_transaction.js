const cardano = require("./lib/cardano");


const sender1 = cardano.wallet("testWallet")
const sender2 = cardano.wallet("testWallet2")
const receiver = cardano.wallet("mainWallet").paymentAddr


// create raw transaction
let txInfo = {
    txIn: [
        cardano.queryUtxo(sender1.paymentAddr)[0],
        cardano.queryUtxo(sender2.paymentAddr)[0]
    ],
    txOut: [
        {
            address: receiver,
            value: { lovelace: (sender1.balance().value.lovelace + sender2.balance().value.lovelace) }
        },
    ],
    // metadata: { 1: { cardano: "First Metadata from cardanocli-js" } },
};

let raw = cardano.transactionBuildRaw(txInfo);

//calculate fee
let fee = cardano.transactionCalculateMinFee({
    ...txInfo,
    txBody: raw,
    witnessCount: 2,
});
console.log(`Calculated transaction fee ${cardano.toAda(fee)} Ada`)

//pay the fee by subtracting it from the sender utxo
txInfo.txOut[0].value.lovelace -= fee;

//create final transaction
let tx = cardano.transactionBuildRaw({ ...txInfo, fee });

//sign the transaction
let txSigned = cardano.transactionSign({
    txBody: tx,
    signingKeys: [sender1.payment.skey, sender2.payment.skey],
});

//broadcast transaction
let txHash = cardano.transactionSubmit(txSigned);
console.log("TxHash: " + txHash);