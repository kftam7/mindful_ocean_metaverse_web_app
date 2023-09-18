import { useState } from 'react';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { configureChains, createConfig } from 'wagmi'
//import { mainnet, optimism, polygon } from "wagmi/chains"
import { polygonMumbai } from 'wagmi/chains'
//const chains = [mainnet, optimism, polygon]
const chains = [polygonMumbai]
//const projectId = 'b66462653b390b41e66f8f03e25cfa0a'
//const chains = [process.env.BlockchainPlatform];
const projectId = process.env.WalletconnectProjectId;

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ version: 2, chains, projectId }),
  publicClient,
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

export {
  projectId,
  wagmiConfig,
  ethereumClient
}