import React from 'react'
import { Toolbar, IconButton, Dialog, DialogTitle, DialogContentText, DialogActions, Button } from '@material-ui/core'
import { useSelector } from 'react-redux'
import translator from 'utility/translator'
import { getWinner } from 'redux/selectors'
import { useResetApp } from 'hooks/routerHooks'
import { Close } from '@material-ui/icons'

const Victory = () => {
  const [open, setOpen] = React.useState(false)
  const { game } = useSelector(state => state)
  const { playerId, sets, total } = useSelector(getWinner)
  const resetApp = useResetApp()

  React.useEffect(() => {
    if (game.status === 'finished')
      setOpen(true)
  }, [game.status])

  return (
    <Dialog open={open}>
      <Toolbar>
        <DialogTitle color='secondary'>
          {translator.fromLabel('victory_title')}
        </DialogTitle>
        <div style={{ flexGrow: '1 0 10px' }} />
        <IconButton style={{ paddingRight: 24 }} onClick={() => setOpen(false)}><Close /></IconButton>
      </Toolbar>
      <DialogContentText>
        {playerId === 'draw'
          ? translator.fromLabel('victory_draw_text')
          : translator.fromLabel(
            'victory_winner_text',
            { playerName: game?.players?.[playerId]?.playerName, sets, total },
          )}
      </DialogContentText>
      <DialogActions>
        <Button variant='contained' color='primary' onClick={resetApp}>
          {translator.fromLabel('victory_mainMenu')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Victory
