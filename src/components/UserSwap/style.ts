import { Card, Box, Input } from '@mui/material'
import { styled } from '@mui/material/styles'

export const WrapperCard = styled(Card)({ minWidth: 400, border: '1px solid white' })

export const CardHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  borderBottom: '1px solid white',
  padding: '25px 8px 25px 5px',
})

export const Heading = styled(Box)({ fontSize: '20px', marginLeft: '5px' })

export const SwapInput = styled(Input)({ width: '80%', marginBottom: '8px' })
