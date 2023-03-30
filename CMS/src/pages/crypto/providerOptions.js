import WalletConnect from "@walletconnect/web3-provider";
//import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

export const providerOptions = {

/*
  walletlink: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: "Web 3 Modal Demo", // Required
      infuraId: "460f40a260564ac4a4f4b3fffb032dad" //process.env.INFURA_KEY // Required unless you provide a JSON RPC url; see `rpc` below
    }
  },
*/
  walletconnect: {
    package: WalletConnect, // required
    options: {
      rpc: {
        137: "https://matic-mainnet.chainstacklabs.com",
        56: "https://bsc-dataseed.binance.org",
        97: "https://data-seed-prebsc-1-s3.binance.org:8545",
        80001: "https://rpc-mumbai.maticvigil.com"       
      },
      infuraId: "460f40a260564ac4a4f4b3fffb032dad" //process.env.INFURA_KEY // required
    }
  }
};
