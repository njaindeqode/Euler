import React from 'react'
import { CardContent, Button, Box, Avatar } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import useWallet from '../../hooks/useWallet'
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
  const { userBalanceEth, connectedAddress, userBalanceDai, handleConnect, handleDisconnect } = useWallet()

  return (
    <WrapperCard>
      <CardHeader>
        <HeaderSection component="div">
          <AccountCircleIcon />
          <Heading component="span">Account Card</Heading>
        </HeaderSection>
        <Box component="div">
          {connectedAddress !== '' && (
            <Button variant="contained" size="small" onClick={handleDisconnect}>
              Logout
            </Button>
          )}
        </Box>
      </CardHeader>
      <CardContent>
        {connectedAddress === '' ? (
          <Box component="div">
            <Box component="p">Not Connected To Wallet, Click On Below Button To Connect </Box>
            <Button variant="contained" onClick={handleConnect}>
              Select a Wallet
            </Button>
          </Box>
        ) : (
          <Box component="div">
            <Box component="p">
              <UserAddressDisplay component="span">Address</UserAddressDisplay>
              {connectedAddress}
            </Box>
            <BalanceDisplayBox component="div">
              <Avatar alt="Eth Image" src={EthImg} />
              <BalanceDisplay component="p">{userBalanceEth} ETH</BalanceDisplay>
            </BalanceDisplayBox>
            <BalanceDisplayBox component="div">
              <Avatar alt="Dai Image" src={DaiImg} />
              <BalanceDisplay component="p">{userBalanceDai} DAI</BalanceDisplay>
            </BalanceDisplayBox>
          </Box>
        )}
      </CardContent>
    </WrapperCard>
  )
}

export default UserCard
