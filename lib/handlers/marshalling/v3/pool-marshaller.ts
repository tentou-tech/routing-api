import { FeeAmount, Pool } from '@uniswap/v3-sdk'
import { MarshalledCurrency, TokenMarshaller } from '../token-marshaller'
import { Protocol } from '@uniswap/router-sdk'

export interface MarshalledPool {
  protocol: Protocol
  token0: MarshalledCurrency
  token1: MarshalledCurrency
  fee: FeeAmount
  sqrtRatioX96: string
  liquidity: string
  tickCurrent: number
}

export class PoolMarshaller {
  public static marshal(pool: Pool): MarshalledPool {
    return {
      protocol: Protocol.V3,
      token0: TokenMarshaller.marshal(pool.token0),
      token1: TokenMarshaller.marshal(pool.token1),
      fee: pool.fee,
      sqrtRatioX96: pool.sqrtRatioX96.toString(),
      liquidity: pool.liquidity.toString(),
      tickCurrent: pool.tickCurrent,
    }
  }

  public static unmarshal(marshalledPool: MarshalledPool): Pool {
    return new Pool(
      TokenMarshaller.unmarshal(marshalledPool.token0).wrapped,
      TokenMarshaller.unmarshal(marshalledPool.token1).wrapped,
      marshalledPool.fee,
      marshalledPool.sqrtRatioX96,
      marshalledPool.liquidity,
      marshalledPool.tickCurrent
    )
  }
}
