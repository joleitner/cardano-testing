#!/bin/bash

CONFIG_DIR=config/testnet

if test -e $CONFIG_DIR; then
    echo "remove old config files"
    rm -r $CONFIG_DIR
fi

mkdir -p $CONFIG_DIR
cd $CONFIG_DIR
echo "start downloading to '"$CONFIG_DIR"'.."

wget https://hydra.iohk.io/job/Cardano/cardano-node/cardano-deployment/latest-finished/download/1/testnet-config.json
wget https://hydra.iohk.io/job/Cardano/cardano-node/cardano-deployment/latest-finished/download/1/testnet-byron-genesis.json
wget https://hydra.iohk.io/job/Cardano/cardano-node/cardano-deployment/latest-finished/download/1/testnet-shelley-genesis.json
wget https://hydra.iohk.io/job/Cardano/cardano-node/cardano-deployment/latest-finished/download/1/testnet-alonzo-genesis.json
wget https://hydra.iohk.io/job/Cardano/cardano-node/cardano-deployment/latest-finished/download/1/testnet-topology.json
