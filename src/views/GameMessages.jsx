/* eslint-disable react/no-array-index-key */
import React from 'react'

import { useSelector } from 'react-redux'
import { Button, Paper, Toolbar } from '@material-ui/core'
import { useParams } from 'react-router'
import { useResetApp } from 'hooks/routerHooks'
import { useCheckGame, useEndTurn } from 'hooks/gameHooks'
import DiceThrower from 'components/DiceThrower'
import PlayingPlayer from 'components/PlayingPlayer'

const ScoreCard = () => {
  const { user, game, loading } = useSelector(state => state)
  const visualizedPlayer = useParams()?.playerId ?? user.userId
  const resetApp = useResetApp()
  const checkGame = useCheckGame()

  React.useEffect(() => {
    if (loading.length === 0 && game.gameId == null)
      resetApp()
    else if (loading.length === 0 && game.gameId != null)
      checkGame()
  }, [game, loading])

  const disabledPlayer = game.gameId == null || game.status === 'finished' ||
    game.players[visualizedPlayer].playerPosition !== game.playingPlayer ||
    (game.players?.[visualizedPlayer]?.loggedPlayer && visualizedPlayer !== user.userId)

  if (game.gameId == null)
    return null

  return (
    <>
      <Paper style={{ padding: 16, position: 'fixed' }}>
        {disabledPlayer
          ? <PlayingPlayer visualizedPlayer={visualizedPlayer} />
          : game.settings.virtualDices
            ? <DiceThrower />
            : <PassTurn />}
      </Paper>
      <div style={{ height: 90 }} />
    </>
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
