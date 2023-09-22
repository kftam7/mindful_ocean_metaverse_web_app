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
    APIBaseUrl: 'http://127.0.0.1:3001',
    AlchemyProviderKey: '3iqNgDWSBHMkWq9vVT5GwGNuIJ_4vlbQ',
    AuthPrivateKey: '78501fb8da333ed1c8312a2a4138bde909e280519157d5cac7e627222f2886b9',
    BlockchainPlatform: 'polygonMumbai',
    WalletconnectProjectId: 'b66462653b390b41e66f8f03e25cfa0a',
    MintingFee: 100000000000000,
    MintPassContractAddress: '0x695B093CEc34ebe7bD06f606e0764E90f3EF5D90',
    MindfulTokenContractAdd: '0xc5172c8f1De27AD00Cd1ac706C55806A471B79bc',
    openseaLink: 'https://testnets.opensea.io/assets/mumbai/',
    ModelSrc: 'http://127.0.0.1:3001/mindfulapi/app/artworkfile/butterflyfish.glb',
    ModelPoster: 'http://127.0.0.1:3001/mindfulapi/app/artworkfile/butterflyfish.png'
  }
};
