import React from 'react'
import { Dialog, DialogTitle, DialogContentText, DialogActions, Button } from '@material-ui/core'
import { useSelector } from 'react-redux'
import translator from 'utility/translator'
import { getWinner } from 'redux/selectors'
import { useResetApp } from 'hooks/routerHooks'

const Victory = () => {
  const { game } = useSelector(state => state)
  const { playerId, sets, total } = useSelector(getWinner)
  const resetApp = useResetApp()

  React.useEffect(() => {
    if (game.gameId == null)
      resetApp()
  }, [game])

  return (
    <Dialog open>
      <DialogTitle>{translator.fromLabel('victory_title')}</DialogTitle>
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
