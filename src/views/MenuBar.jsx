import React from 'react'

import { AppBar, Button, Typography, Toolbar } from '@material-ui/core'

import { useSelector } from 'react-redux'
import { SwapHoriz } from '@material-ui/icons'
import { useNextPlayer } from 'hooks/playersHooks'
import { useParams } from 'react-router'
import GameMenu from 'components/GameMenu'

const MenuBar = () => {
  const { user, game } = useSelector(state => state)
  const playerId = useParams()?.playerId ?? user.userId
  const nextPlayer = useNextPlayer()

  const disabledButton = Object.keys(game.players ?? {}).length < 2
  const playingPlayerId = Object.values(game?.players ?? {})
    .find(player => player.playerPosition === game.playingPlayer)?.playerId

  return (
    <>
      <AppBar>
        <Toolbar style={{ alignItems: 'center', justifyContent: 'space-evenly' }}>
          <GameMenu />
          <Typography
            style={{ textDecoration: playingPlayerId === playerId ? 'underline' : null }}
            variant='h6'
          >
            {game.players?.[playerId]?.playerName ?? ''}
            {playerId === user.userId ? '*' : ''}
          </Typography>
          <Button variant='contained' color='secondary' disabled={disabledButton} onClick={nextPlayer}>
            <SwapHoriz />
          </Button>
        </Toolbar>
      </AppBar>
      <div style={{ height: 35 }} />
    </>
  )
}

export default MenuBar
