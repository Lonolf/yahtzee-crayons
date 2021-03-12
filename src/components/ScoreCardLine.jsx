/* eslint-disable react/no-array-index-key */
import React from 'react'

import ScoreCell from 'components/ScoreCardCells'
import EmptyCell from 'styleComponents/EmptyCell'
import { useSelector } from 'react-redux'
import { Toolbar } from '@material-ui/core'
import translator from 'utility/translator'
import { getPlayersTotals } from 'redux/selectors'
import LabelCell from 'components/LabelCell'

export const Line = ({ game, row, playerId, disabledPlayer = false, currentSetId }) => {
  return (
    <Toolbar>
      <LabelCell row={row} />
      {Array.from({ length: game.settings?.sets ?? 1 }, (x, i) => String(i + 1))
        .map(setId => {
          const disabledCell = disabledPlayer ||
            Number(currentSetId) < Number(setId) ||
            game.players[playerId].playerScores[Number(setId) + 1] != null
          return (
            <ScoreCell
              key={row.label + setId}
              playerId={playerId}
              setId={setId}
              row={row}
              value={game?.players?.[playerId]?.playerScores?.[setId]?.[row.label]}
              disabled={disabledCell}
            />
          )
        },
        )}
    </Toolbar>
  )
}

export const Totals = ({ game, playerId }) => {
  const playersTotals = useSelector(getPlayersTotals)
  const totals = playersTotals[playerId]

  return (
    <Toolbar style={{ borderRadius: 5 }}>
      <EmptyCell flexgrow={3} total='total'>{translator.fromLabel('scoreCard_totals_title')}</EmptyCell>
      {Array.from({ length: game.settings?.sets ?? 1 }).map((value, index) =>
        <EmptyCell total='total' key={index}>{totals?.[index + 1] ?? 0}</EmptyCell>)}
    </Toolbar>
  )
}
