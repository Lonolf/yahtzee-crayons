import { styled } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

const EmptyCell = styled(Button)(({ flexGrow = 1, padded = false, total = false, theme }) => ({
  border: `${total ? '2' : '1'}px solid ${theme.palette.primary.main}`,
  borderRadius: 0,
  flex: `${flexGrow} 0 50px`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: total ? 'bolder' : 'inherit',
  fontSize: total ? 'larger' : 'inherit',
  padding: padded ? `0 ${theme.spacing(2)}px` : 0,
  color: theme.palette.secondary.main,
}))

export default EmptyCell
