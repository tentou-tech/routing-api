import { ChainId } from '@tentou-tech/uniswap-sdk-core'
import { ADDRESS_ZERO } from '@uniswap/router-sdk'
import { nativeOnChain } from '@tentou-tech/smart-order-router/build/main/util/chains'
export function getSymbolOrAddress(address: string, chainId: ChainId): string {
  if (address === ADDRESS_ZERO) {
    return nativeOnChain(chainId)?.symbol ?? 'ETH'
  } else {
    return address
  }
}
