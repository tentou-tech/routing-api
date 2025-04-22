import { Protocol } from '@tentou-tech/uniswap-router-sdk'
import { ChainId } from '@tentou-tech/uniswap-sdk-core'

export const S3_POOL_CACHE_KEY = (baseKey: string, chain: ChainId, protocol: Protocol) =>
  `${baseKey}-${chain}-${protocol}`
