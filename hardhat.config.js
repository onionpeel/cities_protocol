require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config()
const fs = require("fs");

const defaultNetwork = "localhost";

function mnemonic() {
  try {
    return fs.readFileSync("./mnemonic.txt").toString().trim();
  } catch (e) {
    if (defaultNetwork !== "localhost") {
    }
  }
  return "";
}

module.exports = {
  defaultNetwork,

  networks: {
    hardhat: {
      chainId: 1337
    },
    localhost: {
      url: "http://localhost:8545",
    },
    skale: {
      url: "https://eth-global-10.skalenodes.com:10200",
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/faefe1dcd6094fb388019173d2328d8f",
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    mainnet: {
      url: "https://mainnet.infura.io/v3/faefe1dcd6094fb388019173d2328d8f",
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/faefe1dcd6094fb388019173d2328d8f",
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    kovan: {
      url: "https://kovan.infura.io/v3/faefe1dcd6094fb388019173d2328d8f",
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    xdai: {
      url: 'https://dai.poa.network',
      gasPrice: 1000000000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.5.16"
      },
      {
        version: "0.6.0"
      },
      {
        version: "0.5.8"
      },
      {
        version: "0.6.12"
      },
      {
        version: "0.7.0"
      }],
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  etherscan: {
    apiKey: "FQKZCMUAQUA688R7FVDIH9BGD6698JIFPZ"
    //npx hardhat verify --network rinkeby 0xD2820666665C127852213554E2B1cfA8A8199Ef8 "0xa55E01a40557fAB9d87F993d8f5344f1b2408072" "0x36bede640D19981A82090519bC1626249984c908" "0xF4C5310E51F6079F601a5fb7120bC72a70b96e2A" "0x745861AeD1EEe363b4AaA5F1994Be40b1e05Ff90" "EEEE ABNAEL MACHADO DE LIMA - CENE" "[5,7,10]" "[300,500,100]" "3" "500"
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: './frontend/src/contracts'

  },
  mocha: {
    timeout: 10000000
  }

};
