const CONTRACT_ADDRESS = "0x80941fF016590446587A74F024A9434b950B2baA"
const META_DATA_URL = "ipfs://bafyreiesbkaa4bphh3pb2qemhlupb7si457gjz4octoubqulnvejdugq34/metadata.json"

async function mintNFT(contractAddress, metaDataURL) {
   const ExampleNFT = await ethers.getContractFactory("ExampleNFT")
   const [owner] = await ethers.getSigners()
   //await ExampleNFT.attach(contractAddress).mintNFT(owner.address, metaDataURL)
   await ExampleNFT.attach(contractAddress).mintNFT("0x9B39710bD511bc14Fcb0f64a9D8f8e6F630751Ab", metaDataURL)
   console.log("NFT minted to: ", owner.address)
}

mintNFT(CONTRACT_ADDRESS, META_DATA_URL)
   .then(() => process.exit(0))
   .catch((error) => {
       console.error(error);
       process.exit(1);
   });