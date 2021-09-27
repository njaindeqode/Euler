import BigNumber from 'bignumber.js'
import { contractAddresses } from '../config/contractAddress'
import Web3 from 'web3'

export const getDisplayBalance = (balance: any, decimals = 18) => {
  const divideBy = new BigNumber(10).pow(decimals)
  return new BigNumber(balance).div(divideBy).toFormat(4).toString()
}

function tokenBalance({ tokenAddress }: { tokenAddress: string }) {
  return async (web3: Web3, address: string) => {
    const tokenContract = new web3.eth.Contract(
      [
        {
          inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
          name: 'balanceOf',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'decimals',
          outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
          stateMutability: 'view',
          type: 'function',
        },
      ],
      tokenAddress,
    )

    const tokenDecimals = await tokenContract.methods.decimals().call()
    const daiBalance = await tokenContract.methods.balanceOf(address).call()
    return getDisplayBalance(daiBalance, tokenDecimals)
  }
}

export const getTokenBalanceDai = tokenBalance({
  tokenAddress: contractAddresses.dai,
})
