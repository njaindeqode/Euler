import React from 'react'
import UserCard from './components/UserCard'
import UserSwap from './components/UserSwap'
import { Grid } from '@mui/material'
import { WalletProvider } from './Context/WalletProviderContext'
import { CustomPaper, ComponentSwapContainer, ComponentUserContainer, DivContainer } from './AppStyle'

const App = () => {
  return (
    <WalletProvider>
      <CustomPaper>
        <DivContainer component="div">
          <Grid container>
            <Grid item md={6} xs={12}>
              <ComponentUserContainer>
                <UserCard />
              </ComponentUserContainer>
            </Grid>
            <Grid item md={6} xs={12}>
              <ComponentSwapContainer>
                <UserSwap />
              </ComponentSwapContainer>
            </Grid>
          </Grid>
        </DivContainer>
      </CustomPaper>
    </WalletProvider>
  )
}

export default App
