const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback.net = false;
      config.resolve.fallback.tls = false;
    }

    config.plugins.push(new NodePolyfillPlugin());

    return config;
  },
  env: {
    //API_PORT: 'http://127.0.0.1:3001',
    //APIBaseUrl: 'https://api-staging.mindful-ocean.org',
    APIBaseUrl: 'http://127.0.0.1:3001',
    AlchemyProviderKey: '3iqNgDWSBHMkWq9vVT5GwGNuIJ_4vlbQ',
    AuthPrivateKey: '78501fb8da333ed1c8312a2a4138bde909e280519157d5cac7e627222f2886b9',
    BlockchainPlatform: 'polygonMumbai',
    WalletconnectProjectId: 'b66462653b390b41e66f8f03e25cfa0a',
    MintingFee: 100000000000000,
    MintPassContractAddress: '0xfE04faFA55f77325bCaB50a07FDe395E90DA0131',
    MindfulTokenContractAdd: '0xf675567b3de4d05135854320D3aA55978edcCc34',
    openseaLink: 'https://testnets.opensea.io/assets/mumbai/',
    ModelSrc: 'http://127.0.0.1:3001/mindfulapi/app/artworkfile/butterflyfish.glb',
    ModelPoster: 'http://127.0.0.1:3001/mindfulapi/app/artworkfile/butterflyfish.png'
  }
};
