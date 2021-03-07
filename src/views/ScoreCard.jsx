/* eslint-disable react/no-array-index-key */
import React from 'react'

import { EmptyCell, ScoreCell } from 'components/ScoreCardCells'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from 'redux/actions'
import { Toolbar, List } from '@material-ui/core'
import { useSaveGame } from 'hooks/gameHooks'
import { rows } from 'config/gameConfig'
import { useParams } from 'react-router'

const ScoreCard = () => {
  const { user, game } = useSelector(state => state)
  const dispatch = useDispatch()
  const saveGame = useSaveGame()
  const { playerId } = useParams()

  const setValue = payload => dispatch({ type: actions.REDUCE_EDIT_SCORE, payload })

  const disabled = game.players?.[playerId]?.loggedPlayer && playerId !== user.userId

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
            disabled={disabled}
          />
        ))}
      </List>
      <Totals game={game} playerId={playerId} />
    </>
  )
}

const Line = ({ game, row, playerId, setValue, onBlur, disabled = false }) => {
  return (
    <Toolbar>
      <EmptyCell>{row.label}</EmptyCell>
      {Array.from({ length: game.settings?.sets ?? 1 }, (x, i) => i + 1)
        .map(setId => (
          <EmptyCell key={row.label + setId}>
            <ScoreCell
              playerId={playerId}
              setId={setId}
              label={row.label}
              value={game?.players?.[playerId]?.playerScores?.[setId]?.[row.label]}
              setValue={setValue}
              onBlur={onBlur}
              disabled={disabled}
            />
          </EmptyCell>
        ),
        )}
    </Toolbar>
  )
}

const Totals = ({ game, playerId }) => {
  const totals = Object.entries(game?.players?.[playerId]?.playerScores ?? {})
    .map(([setId, setScores]) => ({ setId, score: Object.values(setScores).reduce((sum, value) => sum + value, 0) }))
    .reduce((list, { setId, score }) => ({ ...list, [setId]: score }), {})

  return (
    <Toolbar style={{ borderRadius: 5, padding: 10 }}>
      <EmptyCell>Total</EmptyCell>
      {Array.from({ length: game.settings?.sets ?? 1 }).map((value, index) => <EmptyCell key={index}>{totals[index + 1] ?? 0}</EmptyCell>)}
    </Toolbar>
  )
}

export default ScoreCard
