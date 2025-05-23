import { ChainId, TradeType } from '@tentou-tech/uniswap-sdk-core'

export const PAIRS_TO_TRACK: Map<ChainId, Map<TradeType, string[]>> = new Map([
  [
    ChainId.STORY,
    new Map([
      [
        TradeType.EXACT_INPUT,
        ['IP/USDC.e','USDC.e/IP'],
      ]
    ]),
  ],
])
