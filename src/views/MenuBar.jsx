import React from 'react'

import { AppBar, Button, Typography, Toolbar } from '@material-ui/core'

import { useSelector } from 'react-redux'
import { SwapHoriz } from '@material-ui/icons'
import { useChangePlayer } from 'hooks/playersHooks'
import { useParams } from 'react-router'
import GameMenu from 'components/GameMenu'

const MenuBar = () => {
  const { user, game } = useSelector(state => state)
  const playerId = useParams()?.playerId ?? user.userId
  const changePlayer = useChangePlayer()

  const disabledButton = Object.keys(game.players ?? {}).length < 2

  return (
    <>
      <AppBar>
        <Toolbar style={{ alignItems: 'center', justifyContent: 'space-evenly' }}>
          <GameMenu />
          <Typography variant='h6'>
            {game.players?.[playerId]?.playerName ?? ''}
            {playerId === user.userId ? '*' : ''}
          </Typography>
          <Button variant='contained' color='secondary' disabled={disabledButton} onClick={changePlayer}>
            <SwapHoriz />
          </Button>
        </Toolbar>
      </AppBar>
      <div style={{ height: 50 }} />
    </>
  )
}

export default MenuBar
