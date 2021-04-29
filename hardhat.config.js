require('dotenv').config()
require("@nomiclabs/hardhat-waffle");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.0",
  paths: {
    artifacts: './frontend/src/contracts'
  },
  networks: {
    rinkeby: {
      url: 'https://rinkeby.infura.io/v3/3945f5582e1e4484868d3f148c003623',
      accounts: [`0x26d8f96400b696031a8ff240390b4c45760d397e0a8558ee84f91eb521012265`]
    }
  }
};
