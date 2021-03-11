import { styled } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

const EmptyCell = styled(Box)(({ flexGrow = 1, padded = false, total = false, theme }) => ({
  border: `${total ? '2' : '1'}px solid ${theme.palette.primary.main}`,
  flex: `${flexGrow} 0 50px`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: total ? theme.palette.primary.main : 'inherit',
  fontWeight: total ? 'bold' : 'inherit',
  padding: padded ? `0px ${theme.spacing(2)}px` : 0,
}))

export default EmptyCell
