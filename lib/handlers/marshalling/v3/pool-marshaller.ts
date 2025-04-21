import { FeeAmount, Pool } from '@tentou-tech/uniswap-v3-sdk'
import { Pool as V3S1Pool } from '@tentou-tech/uniswap-v3s1-sdk'
import { MarshalledCurrency, TokenMarshaller } from '../token-marshaller'
import { Protocol } from '@tentou-tech/uniswap-router-sdk'

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

export interface MarshalledV3S1Pool extends MarshalledPool {}

export class V3S1PoolMarshaller {
  public static marshal(pool: V3S1Pool): MarshalledV3S1Pool {
    return {
      protocol: Protocol.V3S1,
      token0: TokenMarshaller.marshal(pool.token0),
      token1: TokenMarshaller.marshal(pool.token1),
      fee: pool.fee,
      sqrtRatioX96: pool.sqrtRatioX96.toString(),
      liquidity: pool.liquidity.toString(),
      tickCurrent: pool.tickCurrent,
    }
  }

  public static unmarshal(marshalledPool: MarshalledV3S1Pool): V3S1Pool {
    return new V3S1Pool(
      TokenMarshaller.unmarshal(marshalledPool.token0).wrapped,
      TokenMarshaller.unmarshal(marshalledPool.token1).wrapped,
      marshalledPool.fee,
      marshalledPool.sqrtRatioX96,
      marshalledPool.liquidity,
      marshalledPool.tickCurrent
    )
  }
}
