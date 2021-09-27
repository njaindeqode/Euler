import { useContext } from 'react'
import { Context } from '../Context/WalletProviderContext'

const useWallet = () => {
  const walletInfo = useContext(Context)
  return walletInfo
}

export default useWallet
