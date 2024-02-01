import { useState } from 'react';
import {defaultWagmiConfig } from '@web3modal/wagmi/react'
import { polygonMumbai } from "viem/chains"

const chains = [polygonMumbai]
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