const helper = require("./lib/helper.js");
const cardano = require("./lib/cardano");

creatorWallet = cardano.wallet("mainWallet")

TOKENNAME = helper.stringToBase16("JoNaS")
TOKENAMOUNT = 10000

// 1. create policy key pair
try {
    cardano.addressKeyGen("policy");
} catch {
    console.log("Policy key pair already exists")
}
policyKeys = cardano.wallet("policy").payment

// 2. create policy
policy = {
    "keyHash": cardano.addressKeyHash("policy"),
    "type": "sig"
}
policyId = cardano.transactionPolicyid(policy)

//3. create raw minting transaction
let txInfo = {
    txIn: creatorWallet.balance().utxo,
    txOut: [
        {
            address: creatorWallet.paymentAddr,
            value: {
                lovelace: creatorWallet.balance().value.lovelace,
                [policyId + "." + TOKENNAME]: TOKENAMOUNT
            },
        },
    ],
    mint: [{
        action: "mint",
        quantity: TOKENAMOUNT,
        asset: policyId + "." + TOKENNAME,
        script: policy
    }]
};
let raw = cardano.transactionBuildRaw(txInfo);

//4. calculate fee
let fee = cardano.transactionCalculateMinFee({
    ...txInfo,
    txBody: raw,
    witnessCount: 2,
});
console.log(`Calculated transaction fee ${cardano.toAda(fee)} Ada`)


//5. create final transaction
//pay the fee by subtracting it from the creator's wallet utxo
txInfo.txOut[0].value.lovelace -= fee;
let tx = cardano.transactionBuildRaw({ ...txInfo, fee });

//6. sign the transaction
let txSigned = cardano.transactionSign({
    txBody: tx,
    signingKeys: [creatorWallet.payment.skey, policyKeys.skey],
});

//7. finally broadcast transaction and mint tokens
let txHash = cardano.transactionSubmit(txSigned);
console.log("TxHash: " + txHash);