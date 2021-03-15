import { Typography } from '@material-ui/core'
import { useChangePlayer } from 'hooks/playersHooks'
import React from 'react'
import { useSelector } from 'react-redux'
import translator from 'utility/translator'

const PlayingPlayer = ({ visualizedPlayer }) => {
  const { user, game } = useSelector(state => state)
  const changePlayer = useChangePlayer()

  const playingPlayer = Object.values(game?.players ?? {})
    .find(player => player.playerPosition === game.playingPlayer)

  const goToPlayingPlayer = () => changePlayer({ playerId: playingPlayer.playerId })

  if (game.status === 'finished')
    return <Typography variant='h6'>{translator.fromLabel('gameMessage_gameEnded')}</Typography>

  else if (playingPlayer == null)
    return <Typography variant='h6'>{translator.fromLabel('gameMessage_waitingNewPlayer')}</Typography>

  else if (visualizedPlayer !== playingPlayer.playerId)
    return (
      <div onClick={goToPlayingPlayer}>
        <Typography style={{ textDecoration: 'underline' }} variant='h6'>
          {playingPlayer.playerId === user.userId
            ? translator.fromLabel('gameMessage_yourTurn')
            : translator.fromLabel('gameMessage_goToPlayingPlayer')}
        </Typography>
      </div>
    )

  else if (game.players?.[visualizedPlayer]?.loggedPlayer && visualizedPlayer !== user.userId)
    return <Typography variant='h6'>{translator.fromLabel('gameMessage_playingPlayer')}</Typography>
}

export default PlayingPlayer
