/* eslint-disable react/no-array-index-key */
import React from 'react'

import { EmptyCell, ScoreCell } from 'components/ScoreCardCells'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from 'redux/actions'
import { Toolbar, List } from '@material-ui/core'
import { useSaveGame, useCheckFinishedGame } from 'hooks/gameHooks'
import { rows } from 'config/gameConfig'
import { useParams } from 'react-router'
import translator from 'utility/translator'
import { getCurrentSets, getPlayersTotals } from 'redux/selectors'

const ScoreCard = () => {
  const { user, game } = useSelector(state => state)
  const dispatch = useDispatch()
  const saveGame = useSaveGame()
  const { playerId } = useParams()
  const currentSets = useSelector(getCurrentSets)
  const checkFinishedGame = useCheckFinishedGame()

  React.useEffect(() => {
    checkFinishedGame()
  }, [game])

  const setValue = payload => dispatch({ type: actions.REDUCE_EDIT_SCORE, payload })

  const disabledPlayer = game.players?.[playerId]?.loggedPlayer && playerId !== user.userId

  const currentSetId = currentSets[playerId]

  return (
    <>
      <List style={{ border: '0.5px solid black', padding: 0 }}>
        {rows.map(row => (
          <Line
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

const Line = ({ game, row, playerId, setValue, onBlur, disabled = false, currentSetId }) => {
  return (
    <Toolbar>
      <EmptyCell>{row.label}</EmptyCell>
      {Array.from({ length: game.settings?.sets ?? 1 }, (x, i) => String(i + 1))
        .map(setId => (
          <EmptyCell key={row.label + setId}>
            <ScoreCell
              playerId={playerId}
              setId={setId}
              label={row.label}
              value={game?.players?.[playerId]?.playerScores?.[setId]?.[row.label]}
              setValue={setValue}
              onBlur={onBlur}
              disabled={disabled || currentSetId !== setId}
            />
          </EmptyCell>
        ),
        )}
    </Toolbar>
  )
}

const Totals = ({ game, playerId }) => {
  const playersTotals = useSelector(getPlayersTotals)
  const totals = playersTotals[playerId]

  return (
    <Toolbar style={{ borderRadius: 5 }}>
      <EmptyCell total>{translator.fromLabel('scoreCard_totals_title')}</EmptyCell>
      {Array.from({ length: game.settings?.sets ?? 1 }).map((value, index) =>
        <EmptyCell total key={index}>{totals?.[index + 1] ?? 0}</EmptyCell>)}
    </Toolbar>
  )
}

export default ScoreCard
