/* eslint-disable react/no-array-index-key */
import React from 'react'

import { useSelector } from 'react-redux'
import { List, Paper } from '@material-ui/core'
import { rowsList } from 'config/gameConfig'
import { useParams } from 'react-router'
import { getCurrentSets } from 'redux/selectors'
import { Line, Totals } from 'components/ScoreCardLine'

const ScoreCard = () => {
  const { user, game, gameboard } = useSelector(state => state)
  const visualizedPlayer = useParams()?.playerId ?? user.userId
  const currentSets = useSelector(getCurrentSets)

  const disabledPlayer = game.gameId == null || game.status === 'finished' ||
    game.players[visualizedPlayer].playerPosition !== game.playingPlayer ||
    (game.players?.[visualizedPlayer]?.loggedPlayer && visualizedPlayer !== user.userId)

  const currentSetId = currentSets[visualizedPlayer]

  if (game.gameId == null)
    return null

  return (
    <Paper style={{ padding: 16 }}>
      <List style={{ border: '0.5px solid black', padding: 0 }}>
        {rowsList.map(row => (
          <Line
            key={row.label}
            game={game}
            row={row}
            playerId={visualizedPlayer}
            disabledPlayer={disabledPlayer}
            currentSetId={currentSetId}
            gameboard={gameboard}
          />
        ))}
      </List>
      <Totals game={game} playerId={visualizedPlayer} />
    </Paper>
  )
}

export default ScoreCard
