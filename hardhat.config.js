require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();

let private_key = process.env.BUILDSPACE_METAMASK_PRIVATE_KEY;
let alchemy_api_url = process.env.ALCHEMY_API_URL;
let prod_alchemy_api_url = process.env.PROD_ALCHEMY_KEY;
let etherscanApiKey = process.env.ETHERSCAN_API_KEY;

console.log("using etherscan api key:", etherscanApiKey)

module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: alchemy_api_url,
      accounts: [ private_key ]
    },
    mainnet: {
      chainId: 1,
      url: prod_alchemy_api_url,
      accounts: [private_key],
    },
  },
  etherscan: {
    apiKey: etherscanApiKey
  }
};
