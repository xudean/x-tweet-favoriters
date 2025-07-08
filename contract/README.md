## Prepare
### Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

- **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
- **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
- **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
- **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage
### Run anvil
```shell
anvil
```

### Copy env file

This project has set a privateKey(anvil privateKey) for testing purposes.

```shell
cp .env.anvil .env
```

### Build

```shell
$ forge install
```

### Test

```shell
$ forge build
```

### Deploy

*** Before deploy contract, please set your tweet url and favorite you want to verify in script/AttestationVerifier.sol#L35-36***

```shell
forge script script/AttestationVerifier.s.sol:AttestationVerifierDeployer --fork-url ${RPC_URL} --private-key ${PRIVATE_KEY} --broadcast
```

Save contract address for demo.



