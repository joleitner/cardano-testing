# Cardano testing

This project is intended to try out the Cardano Blockchain.
To enable the simplest possible setup Docker was used for the project.
To start the `cardano-node` only Docker needs to be installed. 
When the node is started for the first time, the complete blockchain is downloaded, so you have to be patient here (approx. 10GB).

Start `cardano-node`:
```bash
$ docker-compose up
```

To open a bash in the `cardano-node`:
```bash
$ docker-compose exec cardano-node bash
```