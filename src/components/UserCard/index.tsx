import React from 'react'
import { CardContent, Button, Box, Avatar } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import EthImg from '../../assets/images/ETH.png'
import DaiImg from '../../assets/images/DAI.png'
import {
  WrapperCard,
  CardHeader,
  HeaderSection,
  BalanceDisplay,
  BalanceDisplayBox,
  Heading,
  UserAddressDisplay,
} from './style'

const UserCard = () => {
  return (
    <WrapperCard>
      <CardHeader>
        <HeaderSection component="div">
          <AccountCircleIcon />
          <Heading component="span">Account Card</Heading>
        </HeaderSection>
        <Box component="div">
          <Button variant="contained" size="small">
            More
          </Button>
        </Box>
      </CardHeader>
      <CardContent>
        <Box component="div">
          <Box component="p">
            <UserAddressDisplay component="span">Address</UserAddressDisplay>
            0xsaasdasd123dsasdfedfasd
          </Box>
          <BalanceDisplayBox component="div">
            <Avatar alt="Eth Image" src={EthImg} />
            <BalanceDisplay component="p">10 ETH</BalanceDisplay>
          </BalanceDisplayBox>
          <BalanceDisplayBox component="div">
            <Avatar alt="Dai Image" src={DaiImg} />
            <BalanceDisplay component="p">20 DAI</BalanceDisplay>
          </BalanceDisplayBox>
        </Box>
      </CardContent>
    </WrapperCard>
  )
}

export default UserCard
