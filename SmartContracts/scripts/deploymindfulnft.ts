import { ethers } from "hardhat";

const mintPass = "0x5bB9e97d8C9DD8C7fF02c056D7684Ff3956b9DbF";
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
