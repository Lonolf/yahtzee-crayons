import React from 'react'
import { Dialog, DialogTitle, DialogContentText } from '@material-ui/core'
import { useSelector } from 'react-redux'
import translator from 'utility/translator'
import { getWinner } from 'redux/selectors'

const Victory = () => {
  const { game } = useSelector(state => state)
  const { playerId, sets, total } = useSelector(getWinner)

  return (
    <Dialog open>
      <DialogTitle>{translator.fromLabel('victory_title')}</DialogTitle>
      <DialogContentText>
        {playerId === 'draw'
          ? translator.fromLabel('victory_draw_text')
          : translator.fromLabel('victory_winner_text', game.players[playerId]?.playerName, sets, total)}
      </DialogContentText>
    </Dialog>
  )
}

export default Victory
