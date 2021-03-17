import { styled } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

const EmptyCell = styled(Button)(({ flexgrow = 1, padded = false, total = false, theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: total ? 'bolder' : 'inherit',
  fontSize: total ? 'larger' : 'inherit',
  padding: padded ? `0 ${theme.spacing(2)}px` : 0,
  color: theme.palette.secondary.main,
  height: '100%',
  width: '100%',
}))

export default EmptyCell
