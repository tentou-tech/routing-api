import { ChainId } from '@tentou-tech/uniswap-sdk-core'
import dotenv from 'dotenv'

dotenv.config()

export function chainIdToNetworkName(networkId: ChainId): string {
  switch (networkId) {
    case ChainId.MAINNET:
      return 'ethereum'
    case ChainId.ARBITRUM_ONE:
      return 'arbitrum'
    case ChainId.OPTIMISM:
      return 'optimism'
    case ChainId.POLYGON:
      return 'polygon'
    case ChainId.BNB:
      return 'smartchain'
    case ChainId.CELO:
      return 'celo'
    case ChainId.AVALANCHE:
      return 'avalanchec'
    case ChainId.BASE:
      return 'base'
    case ChainId.WORLDCHAIN:
      return 'worldchain'
    case ChainId.UNICHAIN_SEPOLIA:
      return 'unichain-sepolia'
    case ChainId.MONAD_TESTNET:
      return 'monad-testnet'
    case ChainId.BASE_SEPOLIA:
      return 'base-sepolia'
    case ChainId.UNICHAIN:
      return 'unichain'
    case ChainId.SONEIUM:
      return 'soneium'
    case ChainId.STORY_AENEID:
      return 'story-aeneid'
    case ChainId.STORY:
      return 'story'
    default:
      return 'ethereum'
  }
}

export function generateProviderUrl(key: string, value: string, chainId: number): string {
  if (key === 'UNIRPC_0') {
    // UNIRPC_0 is a special case for the Uniswap RPC
    // - env value will contain the generic unirpc endpoint - no trailing '/'
    return `${value}/rpc/${chainId}`
  }

  const tokens = value.split(',')
  switch (key) {
    // Infura
    case 'DEFAULT_1315': {
      return `${process.env.WEB3_RPC_1315}`
    }
    case 'DEFAULT_1514': {
      return `${process.env.WEB3_RPC_1514}`
    }
    case 'STORY_1315': {
      return `https://aeneid.storyrpc.io`
    }
    case 'STORY_1514': {
      return `https://mainnet.storyrpc.io`
    }
    case 'ANKR_1514': {
      return `https://rpc.ankr.com/story_mainnet`
    }    
  }
  throw new Error(`Unknown provider-chainId pair: ${key}`)
}

export function getProviderId(chainId: ChainId, providerName: string): string {
  return `${chainId.toString()}_${providerName}`
}
