require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-chai-matchers");

/** @type import('hardhat/config').HardhatUserConfig */

const polymainnet_PRIVATE_KEY = "51476301944acfc0470650171472e4824dbe89d10a460bb7224eb53837d0560a";
const polytestnet_PRIVATE_KEY = "78501fb8da333ed1c8312a2a4138bde909e280519157d5cac7e627222f2886b9";


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    polymainnet: {
      url: `https://polygon-rpc.com`,
      accounts: [polymainnet_PRIVATE_KEY]
    },    
    polytestnet: {
      url: `https://rpc-mumbai.maticvigil.com`,
      accounts: [polytestnet_PRIVATE_KEY]
    },
    amoytestnet: {
      url: `https://80002.rpc.thirdweb.com`,
      accounts: [polytestnet_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: "b882cb5d-a8d8-454d-b54b-38cb50811315",
    customChains: [
      {
        network: "amoytestnet",
        chainId: 80002,
        urls: {
          apiURL: "https://www.oklink.com/api/explorer/v1/contract/verify/async/api/polygonAmoy",
          browserURL: "https://www.oklink.com/amoy"
        }
      }
    ]
  },
};

