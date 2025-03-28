import { EventBridgeEvent, ScheduledHandler } from 'aws-lambda'
import { S3 } from 'aws-sdk'
import axios from 'axios'
import { default as bunyan, default as Logger } from 'bunyan'

const TOKEN_LISTS = [
  'https://raw.githubusercontent.com/The-Blockchain-Association/sec-notice-list/master/ba-sec-list.json',
  'https://tokens.coingecko.com/uniswap/all.json',
  'https://gist.githubusercontent.com/kienvc/7257a6d2d738bfc1a0781f3ee843f991/raw/fa6df17c9628886f99a7dff1671bce5507bfd58c/tokenlists.org',
]

const handler: ScheduledHandler = async (event: EventBridgeEvent<string, void>) => {
  const log: Logger = bunyan.createLogger({
    name: 'TokenListLambda',
    serializers: bunyan.stdSerializers,
    level: 'info',
    requestId: event.id,
  })
  const s3 = new S3()

  for (const tokenListURI of TOKEN_LISTS) {
    log.info(`Getting tokenList from ${tokenListURI}.`)
    try {
      const { data: tokenList } = await axios.get(tokenListURI)
      log.info(`Got tokenList from ${tokenListURI}.`)

      await s3
        .putObject({
          Bucket: process.env.TOKEN_LIST_CACHE_BUCKET!,
          Key: encodeURIComponent(tokenListURI),
          Body: JSON.stringify(tokenList),
        })
        .promise()
    } catch (err) {
      log.error({ err }, `Could not get tokenlist ${tokenListURI}`)
    }
  }
}

module.exports = { handler }
