import { utils } from 'ethers'
import { ChainId, Fetcher, Route, TokenAmount, Trade, TradeType, WETH } from '@uniswap/sdk'
import { contractAddresses } from '../config/contractAddress'

const chainId = ChainId.RINKEBY

export const getTradeDetails = async (amount: string) => {
  const dai = await Fetcher.fetchTokenData(chainId, contractAddresses.dai)
  const weth = WETH[chainId]
  const pair = await Fetcher.fetchPairData(weth, dai)
  const route = new Route([pair], weth)
  const trade = new Trade(route, new TokenAmount(weth, utils.parseUnits(amount).toString()), TradeType.EXACT_INPUT)

  const midPrice = await route.midPrice.toSignificant(6)
  const invertedMidPice = await route.midPrice.invert().toSignificant(6)
  const executionPrice = await trade.executionPrice.toSignificant(6)
  const nextMidPrice = await trade.nextMidPrice.toSignificant(6)

  return {
    midPrice,
    invertedMidPice,
    executionPrice,
    nextMidPrice,
    trade,
  }
}
