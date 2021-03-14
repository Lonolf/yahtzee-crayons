/* eslint-disable react/no-array-index-key */
import React from 'react'

import { useSelector } from 'react-redux'
import { List, Paper, Toolbar } from '@material-ui/core'
import { rowsList } from 'config/gameConfig'
import { useParams } from 'react-router'
import { getCurrentSets } from 'redux/selectors'
import { useResetApp } from 'hooks/routerHooks'
import { Line, Totals } from 'components/ScoreCardLine'
import { useCheckGame } from 'hooks/gameHooks'
import DiceThrower from 'components/DiceThrower'

const ScoreCard = () => {
  const { user, game, loading, gameboard } = useSelector(state => state)
  const playerId = useParams()?.playerId ?? user.userId
  const currentSets = useSelector(getCurrentSets)
  const resetApp = useResetApp()
  const checkGame = useCheckGame()

  React.useEffect(() => {
    if (loading.length === 0 && game.gameId == null)
      resetApp()
    else if (loading.length === 0 && game.gameId != null)
      checkGame()
  }, [game, loading])

  const disabledPlayer = game.status === 'finished' ||
    (game.players?.[playerId]?.loggedPlayer && playerId !== user.userId)

  const currentSetId = currentSets[playerId]

  if (game.gameId == null)
    return null

  return (
    <Paper style={{ padding: 16 }}>
      <Toolbar>
        <DiceThrower />
      </Toolbar>
      <List style={{ border: '0.5px solid black', padding: 0 }}>
        {rowsList.map(row => (
          <Line
            key={row.label}
            game={game}
            row={row}
            playerId={playerId}
            disabledPlayer={disabledPlayer}
            currentSetId={currentSetId}
            gameboard={gameboard}
          />
        ))}
      </List>
      <Totals game={game} playerId={playerId} />
    </Paper>
  )
}

export default ScoreCard
