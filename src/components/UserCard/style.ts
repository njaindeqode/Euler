import { Card, Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const WrapperCard = styled(Card)({ minWidth: 400, border: '1px solid white' })

export const CardHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  borderBottom: '1px solid white',
  padding: '24px 8px 24px 5px',
})

export const HeaderSection = styled(Box)({ flexGrow: 1, display: 'flex', alignItems: 'center' })

export const Heading = styled(Box)({ fontSize: '20px', marginLeft: '4px' })

export const UserAddressDisplay = styled(Box)(({ theme }) => ({
  display: 'block',
  color: theme.palette.primary.main,
  fontSize: 18,
}))

export const BalanceDisplayBox = styled(Box)({ display: 'flex', alignItems: 'center' })

export const BalanceDisplay = styled(Box)({ fontSize: '25px', marginLeft: '8px' })
