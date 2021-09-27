import { Wallet } from 'bnc-onboard/dist/src/interfaces'
import React, { createContext, useCallback, useEffect, useState } from 'react'
import { useMemo } from 'react'
import Web3 from 'web3'
import useOnboard from '../hooks/useOnboard'
import { getDisplayBalance, getTokenBalanceDai } from '../utils/tokenBalance'

interface WalletContext {
  connectedAddress: string
  userBalanceEth: string
  userBalanceDai: string
  handleConnect: () => void
  handleDisconnect: () => void
  fetchUserBalance: () => void
  wallet: Wallet | undefined
  web3: Web3 | undefined
}

export const Context = createContext<WalletContext>({
  connectedAddress: '',
  userBalanceEth: '',
  userBalanceDai: '',
  handleConnect: () => {},
  handleDisconnect: () => {},
  fetchUserBalance: () => {},
  wallet: undefined,
  web3: undefined,
})

interface WalletProviderProps {
  children: React.ReactNode
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const { onboard } = useOnboard()
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [wallet, setWallet] = useState<Wallet | undefined>(undefined)
  const [daiBalance, setDaiBalance] = useState<string>('')
  const [ethBalance, setEthBalance] = useState<string>('')
  const web3 = useMemo(() => new Web3(wallet?.provider), [wallet])

  const fetchUserBalance = useCallback(
    async (connectedAddress?: string, wallet?: Wallet) => {
      const web3Instance = wallet ? new Web3(wallet.provider) : web3
      const userAddress = connectedAddress ? connectedAddress : walletAddress
      if (userAddress && userAddress !== '') {
        const EthBalance = await web3Instance.eth.getBalance(userAddress)
        setEthBalance(getDisplayBalance(EthBalance))
        const DaiBalance = await getTokenBalanceDai(web3Instance, userAddress)
        setDaiBalance(DaiBalance.toString())
      }
    },
    [walletAddress, web3],
  )

  useEffect(() => {
    const previouslySelectedWallet = window.localStorage.getItem('selectedWallet')

    const connect = async (name: string) => {
      const walletSelected = await onboard.walletSelect(name)
      if (!walletSelected) return
      const walletCheck = await onboard.walletCheck()
      if (!walletCheck) return
      const status = onboard.getState()
      setWallet(status.wallet)
      setWalletAddress(status.address)
      fetchUserBalance(status.address, status.wallet)
    }

    if (previouslySelectedWallet && onboard) {
      connect(previouslySelectedWallet)
    }
  }, [onboard, fetchUserBalance])

  const handleConnect = async () => {
    const walletSelected = await onboard.walletSelect()
    if (!walletSelected) return
    const walletCheck = await onboard.walletCheck()
    if (!walletCheck) return
    const status = onboard.getState()
    setWalletAddress(status.address)
    fetchUserBalance(status.address)
  }

  const handleDisconnect = async () => {
    await onboard.walletReset()
    window.localStorage.removeItem('selectedWallet')
    setWalletAddress('')
    setDaiBalance('0')
  }
  return (
    <Context.Provider
      value={{
        connectedAddress: walletAddress,
        userBalanceEth: ethBalance,
        userBalanceDai: daiBalance,
        wallet,
        handleConnect,
        handleDisconnect,
        fetchUserBalance,
        web3,
      }}
    >
      {children}
    </Context.Provider>
  )
}
