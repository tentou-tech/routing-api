import { describe, expect, it } from '@jest/globals'
import { TokenMarshaller } from '../../../../../../../lib/handlers/router-entities/route-caching'
import { ChainId } from '@tentou-tech/uniswap-sdk-core'
import { nativeOnChain, WETH9 } from '@tentou-tech/smart-order-router'

describe('TokenMarshaller', () => {
  it('returns native currency', () => {
    const marshalledCurrency = TokenMarshaller.marshal(nativeOnChain(ChainId.MAINNET))
    const currency = TokenMarshaller.unmarshal(marshalledCurrency)
    expect(currency).toEqual(nativeOnChain(ChainId.MAINNET))
  })

  it('returns token currency', () => {
    const marshalledCurrency = TokenMarshaller.marshal(WETH9[ChainId.MAINNET])
    const currency = TokenMarshaller.unmarshal(marshalledCurrency)
    expect(currency).toEqual(WETH9[ChainId.MAINNET])
  })
})
