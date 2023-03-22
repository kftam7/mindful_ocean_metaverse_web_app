const CONTRACT_ADDRESS = "0x1fba8BD1a5037B34347463A6938a829212a90c1b"
const META_DATA_URL = "ipfs://bafyreiesbkaa4bphh3pb2qemhlupb7si457gjz4octoubqulnvejdugq34/metadata.json"

async function mintNFT(contractAddress, metaDataURL) {
   const ExampleNFT = await ethers.getContractFactory("ExampleNFT")
   const [owner] = await ethers.getSigners()
   //await ExampleNFT.attach(contractAddress).mintNFT(owner.address, metaDataURL)
   await ExampleNFT.attach(contractAddress).mintNFT("0x4BCC679c78E2C6D724E49B2F59f0F3B0565854D9", metaDataURL)
   console.log("NFT minted to: ", owner.address)
}

mintNFT(CONTRACT_ADDRESS, META_DATA_URL)
   .then(() => process.exit(0))
   .catch((error) => {
       console.error(error);
       process.exit(1);
   });