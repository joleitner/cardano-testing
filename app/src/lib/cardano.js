const Cardano = require("cardanocli-js");
const path = require("path")

const options = {}
options.network = "testnet-magic 1097911063"
options.shelleyGenesisPath = path.join(__dirname, `../../config/testnet-shelley-genesis.json`)
options.socketPath = "/ipc/node.socket"

const cardano = new Cardano(options);

module.exports = cardano;