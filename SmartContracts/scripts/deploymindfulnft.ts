import { ethers } from "hardhat";

const mintPass = "0x9d7630b5f2ea06fc282ae21e3e3bbfc57ed5ece9";
const loyaltyFee = 100;

async function main() {
  const ContractFactory = await ethers.getContractFactory("contracts/MindfulNFT.sol:MindfulNFT");
  const instance = await ContractFactory.deploy(mintPass, loyaltyFee);
  await instance.deployed();

  console.log(`Contract deployed to ${instance.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
