import { Percent, Trade } from '@uniswap/sdk'
import Web3 from 'web3'
import { contractAddresses } from '../config/contractAddress'

export const swapEthToDai = async (
  web3: Web3 | undefined,
  trade: Trade | undefined,
  address: string,
  fetchUserBalance: () => void,
) => {
  if (!web3 || !trade) return
  const uniswap = new web3.eth.Contract(
    [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'amountOut',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'path',
            type: 'address[]',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'deadline',
            type: 'uint256',
          },
        ],
        name: 'swapETHForExactTokens',
        outputs: [
          {
            internalType: 'uint256[]',
            name: 'amounts',
            type: 'uint256[]',
          },
        ],
        stateMutability: 'payable',
        type: 'function',
      },
    ],
    contractAddresses.uniswapV2Router,
  )
  const slippageTolerance = new Percent('50', '10000')
  const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw.toString()
  const path = [contractAddresses.weth, contractAddresses.dai]
  const to = address
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20
  const value = trade.inputAmount.raw.toString()
  const tx = await uniswap.methods
    .swapETHForExactTokens(amountOutMin, path, to, deadline)
    .send({ from: address, value })
  fetchUserBalance()
  return tx
}
