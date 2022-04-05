const helper = require("./lib/helper.js");
const cardano = require("./lib/cardano");

const creatorWallet = cardano.wallet("mainWallet")

const ASSETNAME = "MY_FIRST_NFT"
const ASSETNAME_ENCODED = helper.stringToBase16(ASSETNAME)
const AMOUNT = 1
const IPFS_HASH = "QmfEAGS5YZ9VMExS5q5F5yU78UUCc3pmQMNSsvKaW1HsgE"

// 1. create policy key pair
try {
    cardano.addressKeyGen("policy");
} catch {
    console.log("Policy key pair already exists")
}
const policyKeys = cardano.wallet("policy").payment

// 2. create policy
const policy = {
            "type": "sig",
            "keyHash": cardano.addressKeyHash("policy")
}

const POLICY_ID = cardano.transactionPolicyid(policy)
const ASSET_ID = POLICY_ID + "." + ASSETNAME_ENCODED

//3. define metadata
const metadata = {
    "721": {
      [POLICY_ID]: {
        [ASSETNAME_ENCODED]: {
          "name": ASSETNAME,
          "description": "My first NFT on the Cardano testnet",
          "files": [{
            "name": "my_first_nft.json",
            "mediaType": "application/json",
            "src": "ipfs://" + IPFS_HASH
          }]
        }
      },
      "version": "1.0"
    }
  }

//4. create raw minting transaction
let creatorValues = creatorWallet.balance().value
delete creatorValues.undefined

let txInfo = {
    txIn: creatorWallet.balance().utxo,
    txOut: [
        {
            address: creatorWallet.paymentAddr,
            value: {
                ...creatorValues,
                [ASSET_ID]: AMOUNT
            },
        },
    ],
    mint: [{
        action: "mint",
        quantity: AMOUNT,
        asset: ASSET_ID,
        script: policy
    }],
    metadata
};
let raw = cardano.transactionBuildRaw(txInfo);

//5. calculate fee
let fee = cardano.transactionCalculateMinFee({
    ...txInfo,
    txBody: raw,
    witnessCount: 2,
});
console.log(`Calculated transaction fee ${cardano.toAda(fee)} Ada`)


//6. create final transaction
//pay the fee by subtracting it from the creator's wallet utxo
txInfo.txOut[0].value.lovelace -= fee;
let tx = cardano.transactionBuildRaw({ ...txInfo, fee });

//7. sign the transaction
let txSigned = cardano.transactionSign({
    txBody: tx,
    signingKeys: [creatorWallet.payment.skey, policyKeys.skey],
});

//8. finally broadcast transaction and mint tokens
let txHash = cardano.transactionSubmit(txSigned);
console.log("TxHash: " + txHash);