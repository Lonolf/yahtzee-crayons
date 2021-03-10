/* eslint-disable react/no-array-index-key */
import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import * as actions from 'redux/actions'
import { List } from '@material-ui/core'
import { useSaveGame, useCheckFinishedGame } from 'hooks/gameHooks'
import { rows } from 'config/gameConfig'
import { useParams } from 'react-router'
import { getCurrentSets } from 'redux/selectors'
import { useResetApp } from 'hooks/routerHooks'
import { Line, Totals } from 'components/ScoreCardLine'

const ScoreCard = () => {
  const { user, game, loading } = useSelector(state => state)
  const dispatch = useDispatch()
  const saveGame = useSaveGame()
  const playerId = useParams()?.playerId ?? user.userId
  const currentSets = useSelector(getCurrentSets)
  const checkFinishedGame = useCheckFinishedGame()
  const resetApp = useResetApp()

  React.useEffect(() => {
    if (loading.length === 0 && game.gameId != null)
      checkFinishedGame()
    else if (loading.length === 0 && game.gameId == null)
      resetApp()
  }, [game, loading])

  const setValue = payload => dispatch({ type: actions.REDUCE_EDIT_SCORE, payload })

  const disabledPlayer = game.players?.[playerId]?.loggedPlayer && playerId !== user.userId

  const currentSetId = currentSets[playerId]

  return (
    <>
      <List style={{ border: '0.5px solid black', padding: 0 }}>
        {rows.map(row => (
          <Line
            key={row.label}
            game={game}
            row={row}
            playerId={playerId}
            setValue={setValue}
            onBlur={saveGame}
            disabled={disabledPlayer}
            currentSetId={currentSetId}
          />
        ))}
      </List>
      <Totals game={game} playerId={playerId} />
    </>
  )
}

export default ScoreCard
