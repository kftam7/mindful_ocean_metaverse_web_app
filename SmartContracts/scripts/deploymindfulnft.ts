import { ethers } from "hardhat";

async function main() {
  const ContractFactory = await ethers.getContractFactory("MindfulNFT");

  const instance = await ContractFactory.deploy("0x4BCC679c78E2C6D724E49B2F59f0F3B0565854D9", "0x3Cd660AB23B44Ae7E99DC5e7d9a7dC38a341c30a");
  await instance.deployed();

  console.log(`Contract deployed to ${instance.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
