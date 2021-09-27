import React from 'react'
import { CardContent, Box, Button } from '@mui/material'
import { WrapperCard, CardHeader, Heading, SwapInput } from './style'

const UserSwap = () => {
  return (
    <WrapperCard>
      <CardHeader component="div">
        <Heading>Swap</Heading>
      </CardHeader>
      <CardContent>
        <SwapInput type="Number" placeholder="Enter ETH" />
        <Button variant="contained">Swap to DAI</Button>
        <Box component="div">
          <Box component="ul">
            <Box component="li">
              <Box component="p">MidPrice : 121542 </Box>
            </Box>
            <Box component="li">
              <Box component="p">Inverted MidPrice : 134512 </Box>
            </Box>
            <Box component="li">
              <Box component="p">Execution Price : 1241243</Box>
            </Box>
            <Box component="li">
              <Box component="p">Next MidPrice : 13554545</Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </WrapperCard>
  )
}

export default UserSwap
