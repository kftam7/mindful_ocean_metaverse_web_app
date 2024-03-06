import { useState } from 'react';
import {defaultWagmiConfig } from '@web3modal/wagmi/react'
import { polygon, polygonMumbai } from "viem/chains"

var chains; 

if (process.env.chain == "PolygonMainnet"){
  chains = [polygon];
} else if (process.env.chain == "MumbaiTestnet"){
  chains = [polygonMumbai];
}

const projectId = process.env.WalletconnectProjectId;

const metadata = {
  name: 'MindfulOcean',
  description: 'MindfulOcean Metaverse',
  url: 'www.walletconnect.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

export {
  projectId,
  wagmiConfig
}
