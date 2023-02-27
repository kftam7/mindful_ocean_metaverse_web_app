import { Alchemy, Network } from 'alchemy-sdk';

// Optional config object, but defaults to the API key 'demo' and Network 'eth-mainnet'.
const settings = {
  apiKey: '3iqNgDWSBHMkWq9vVT5GwGNuIJ_4vlbQ', // Replace with your Alchemy API key.
  network: Network.MATIC_MUMBAI // Replace with your network.
};

const alchemy = new Alchemy(settings);

// Bored Ape Yacht Club contract address.
const MintPassAddress = '0x80941fF016590446587A74F024A9434b950B2baA';

async function main() {
  for await (const nft of alchemy.nft.getNftsForContractIterator(MintPassAddress, {
    // Omit the NFT metadata for smaller payloads.
    omitMetadata: false
  })) {
    await alchemy.nft
      .getOwnersForNft(nft.contract.address, nft.tokenId)
      .then(response =>
        console.log('owners:', response.owners, ', tokenId:', nft.tokenId)
      );
  }
}

main();