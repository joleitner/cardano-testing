const cardano = require("./lib/cardano");

const sender = cardano.wallet("mainWallet")
const receiver = cardano.wallet("testWallet").paymentAddr
const tokenId = "45f03bbf553b65bcdcefc6900edfd9c14ac76cd89743e8929243d6e5.4a6f4e6153"
const tokenAmount = 90

// sender value fix for undefined value
// all values need to be included in case sender has tokens
let senderValues = sender.balance().value
delete senderValues.undefined

// create raw transaction
let txInfo = {
    txIn: sender.balance().utxo,
    txOut: [
        //value going back to sender
        {
            address: sender.paymentAddr,
            value: {
                ...senderValues,
                [tokenId]: sender.balance().value[tokenId] - tokenAmount,
                // it is mandatory to send at least >1 Ada with the token
                lovelace: sender.balance().value.lovelace - cardano.toLovelace(1.5),
            },
        },
        //value going to receiver
        {
            address: receiver,
            value: {
                [tokenId]: tokenAmount,
                lovelace: cardano.toLovelace(1.5)
            }
        },
    ],
};

let raw = cardano.transactionBuildRaw(txInfo);

//calculate fee
let fee = cardano.transactionCalculateMinFee({
    ...txInfo,
    txBody: raw,
    witnessCount: 1,
});
console.log(`Calculated transaction fee ${cardano.toAda(fee)} Ada`)

//pay the fee by subtracting it from the sender utxo
txInfo.txOut[0].value.lovelace -= fee;

//create final transaction
let tx = cardano.transactionBuildRaw({ ...txInfo, fee });

//sign the transaction
let txSigned = cardano.transactionSign({
    txBody: tx,
    signingKeys: [sender.payment.skey],
});

//broadcast transaction
let txHash = cardano.transactionSubmit(txSigned);
console.log("TxHash: " + txHash);