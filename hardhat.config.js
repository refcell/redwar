require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

let private_key = process.env.BUILDSPACE_METAMASK_PRIVATE_KEY;
let alchemy_api_url = process.env.ALCHEMY_API_URL;

module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: alchemy_api_url,
      accounts: [ private_key ]
    }
  }
};
