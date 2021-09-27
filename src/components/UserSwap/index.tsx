import React, { useState } from 'react'
import { CardContent, Box, Button } from '@mui/material'
import { getTradeDetails } from '../../utils/tradeDetails'
import { swapEthToDai } from '../../utils/swapEthToDai'
import { Trade } from '@uniswap/sdk'
import useWallet from '../../hooks/useWallet'
import { WrapperCard, CardHeader, Heading, SwapInput } from './style'

interface SwapDetailsInterface {
  midPrice: string
  invertedMidPice: string
  executionPrice: string
  nextMidPrice: string
  trade: Trade | undefined
}

const UserSwap = () => {
  const { connectedAddress, userBalanceEth, web3, handleConnect, fetchUserBalance } = useWallet()
  const [ethToSwap, setEthToSwap] = useState(0)
  const [swapDetail, setSwapDetail] = useState<SwapDetailsInterface>({
    midPrice: '',
    invertedMidPice: '',
    executionPrice: '',
    nextMidPrice: '',
    trade: undefined,
  })
  const [toggle, setToggle] = useState(false)

  const SwapChange = async (amount: string) => {
    setEthToSwap(Number(amount))
    if (Number(amount) > 0 && amount.length > 0) {
      setToggle(true)
      setSwapDetail(await getTradeDetails(amount))
    } else {
      setToggle(false)
    }
  }

  return (
    <WrapperCard>
      <CardHeader component="div">
        <Heading>Swap</Heading>
      </CardHeader>
      <CardContent>
        <SwapInput
          type="Number"
          placeholder="Enter ETH"
          onChange={(e) => {
            SwapChange(e.target.value)
          }}
        />
        {connectedAddress === '' ? (
          <Button variant="contained" onClick={handleConnect}>
            {'Connect wallet'}
          </Button>
        ) : (
          <Button
            variant="contained"
            disabled={Number(userBalanceEth) < ethToSwap || ethToSwap <= 0}
            onClick={() => swapEthToDai(web3, swapDetail.trade, connectedAddress, fetchUserBalance)}
          >
            {'Swap to DAI'}
          </Button>
        )}
        {toggle && (
          <Box component="div">
            <Box component="ul">
              <Box component="li">
                <Box component="p">MidPrice : {swapDetail.midPrice} </Box>
              </Box>
              <Box component="li">
                <Box component="p">Inverted MidPrice : {swapDetail.invertedMidPice} </Box>
              </Box>
              <Box component="li">
                <Box component="p">Execution Price : {swapDetail.executionPrice}</Box>
              </Box>
              <Box component="li">
                <Box component="p">Next MidPrice : {swapDetail.nextMidPrice}</Box>
              </Box>
            </Box>
          </Box>
        )}
      </CardContent>
    </WrapperCard>
  )
}

export default UserSwap
