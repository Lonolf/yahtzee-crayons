import React from 'react'
import { Modal, TextField } from '@material-ui/core'
import { useSelector } from 'react-redux'
import translator from 'utility/translator'

const Victory = () => {
  const { game, players } = useSelector(state => state)
  const winnerId = game?.winner?.playerId
  const winnerPlayer = players[winnerId]

  return (
    <Modal>
      {winnerId === 'draw'
        ? <TextField>{translator.fromLabel('victory_draw_text')}</TextField>
        : <TextField>{translator.fromLabel('victory_winner_text', winnerPlayer?.playerName)}</TextField>}
    </Modal>
  )
}

export default Victory
