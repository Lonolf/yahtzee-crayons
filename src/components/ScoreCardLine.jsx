/* eslint-disable react/no-array-index-key */
import React from 'react'

import { EmptyCell, ScoreCell } from 'components/ScoreCardCells'
import { useSelector } from 'react-redux'
import { Toolbar } from '@material-ui/core'
import translator from 'utility/translator'
import { getPlayersTotals } from 'redux/selectors'

export const Line = ({ game, row, playerId, setValue, onBlur, disabled = false, currentSetId }) => {
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

export const Totals = ({ game, playerId }) => {
  const playersTotals = useSelector(getPlayersTotals)
  const totals = playersTotals[playerId]

  return (
    <Toolbar style={{ borderRadius: 5 }}>
      <EmptyCell total='total'>{translator.fromLabel('scoreCard_totals_title')}</EmptyCell>
      {Array.from({ length: game.settings?.sets ?? 1 }).map((value, index) =>
        <EmptyCell total='total' key={index}>{totals?.[index + 1] ?? 0}</EmptyCell>)}
    </Toolbar>
  )
}
