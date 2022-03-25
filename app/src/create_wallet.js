const cardano = require("./cardano");

const createWallet = (account) => {
    try {
        paymentKeys = cardano.addressKeyGen(account);
        stakeKeys = cardano.stakeAddressKeyGen(account);
        stakeAddr = cardano.stakeAddressBuild(account);
        paymentAddr = cardano.addressBuild(account, {
            "paymentVkey": paymentKeys.vkey,
            "stakeVkey": stakeKeys.vkey
        });
        return cardano.wallet(account);
    }
    catch (err) {
        console.log(err)
    }

};

const wallet = createWallet("testWallet");

console.log('### Wallet info:');
console.log(`name: ${wallet.name}`);
console.log(`paymentAddr: ${wallet.paymentAddr}`);
console.log(`stakingAddr: ${wallet.stakingAddr}`);