/* eslint-disable react/no-array-index-key */
import React from 'react'

import { useSelector } from 'react-redux'
import { Button, List, Paper, Toolbar } from '@material-ui/core'
import { rowsList } from 'config/gameConfig'
import { useParams } from 'react-router'
import { getCurrentSets } from 'redux/selectors'
import { useResetApp } from 'hooks/routerHooks'
import { Line, Totals } from 'components/ScoreCardLine'
import { useCheckGame, useEndTurn } from 'hooks/gameHooks'
import DiceThrower from 'components/DiceThrower'
import PlayingPlayer from 'components/PlayingPlayer'

const ScoreCard = () => {
  const { user, game, loading, gameboard } = useSelector(state => state)
  const visualizedPlayer = useParams()?.playerId ?? user.userId
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
    game.players[visualizedPlayer].playerPosition !== game.playingPlayer ||
    (game.players?.[visualizedPlayer]?.loggedPlayer && visualizedPlayer !== user.userId)

  const currentSetId = currentSets[visualizedPlayer]

  if (game.gameId == null)
    return null

  return (
    <Paper style={{ padding: 16 }}>
      {disabledPlayer
        ? <PlayingPlayer visualizedPlayer={visualizedPlayer} />
        : game.settings.virtualDices
          ? <DiceThrower />
          : <PassTurn />}
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

const PassTurn = () => {
  const endTurn = useEndTurn()
  return (
    <Toolbar style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
      <Button variant='contained' color='primary' onClick={endTurn}>
        Pass
      </Button>
    </Toolbar>
  )
}

export default ScoreCard
