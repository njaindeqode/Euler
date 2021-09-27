import Onboard from 'bnc-onboard'
import { Wallet } from 'bnc-onboard/dist/src/interfaces'

const apiKey = process.env.REACT_APP_BLOCKNATIVE_API_KEY
const networkId = 4 //Rinkby Testnet

export const MyOnboard = Onboard({
  dappId: apiKey,
  darkMode: true,
  networkId: networkId,
  subscriptions: {
    wallet: (wallet: Wallet) => {
      const walletName = wallet.name ? wallet.name : null
      if (walletName) {
        window.localStorage.setItem('selectedWallet', walletName)
      }
    },
  },
})
