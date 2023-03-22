###  Install dependencies
npm install hardhat @openzeppelin/contracts nft.storage dotenv @nomiclabs/hardhat-ethers

### Storing asset data with NFT.Storage
node scripts/store-asset.mjs

### compile smart contract

### Create the smart contract for minting
npx hardhat run scripts/deploy-contract.mjs --network polytestnet

### Minting the NFT on Polygon
npx hardhat run scripts/mint-nft.mjs --network polytestnet

