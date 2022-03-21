FROM inputoutput/cardano-node:latest

COPY config/testnet config/testnet

ENV NETWORK=testnet
ENV CARDANO_NODE_SOCKET_PATH=/ipc/node.socket
ENV NETWORK_MAGIC=1097911063

ENTRYPOINT [ "cardano-node", "run", \
    "--topology", "config/testnet/testnet-topology.json", \
    "--database-path", "data/db", \
    "--socket-path", "/ipc/node.socket", \
    "--host-addr", "127.0.0.1", \
    "--port", "1337", \
    "--config", "config/testnet/testnet-config.json" ]
