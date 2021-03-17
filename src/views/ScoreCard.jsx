/* eslint-disable react/no-array-index-key */
import React from 'react'

import { useSelector } from 'react-redux'
import { Paper } from '@material-ui/core'
import { rowsList } from 'config/gameConfig'
import { useParams } from 'react-router'
import { getCurrentSets } from 'redux/selectors'
import { DataGrid } from '@material-ui/data-grid'
import translator from 'utility/translator'
import ScoreCell from 'components/ScoreCell'
import VirtualScoreCell from 'components/VirtualScoreCell'
import LabelCell from 'components/LabelCell'

const ScoreCard = () => {
  const { user, game, gameboard } = useSelector(state => state)
  const playerId = useParams()?.playerId ?? user.userId
  const currentSets = useSelector(getCurrentSets)

  const disabledPlayer = game.gameId == null || game.status === 'finished' ||
    game.players[playerId].playerPosition !== game.playingPlayer ||
    (game.players?.[playerId]?.loggedPlayer && playerId !== user.userId)

  const currentSetId = currentSets[playerId]

  const rows = rowsList.map(row => ({ ...row, id: row.index }))

  const labelColumns = [
    {
      field: 'label',
      headerName: ' ',
      valueGetter: params => translator.fromLabel(`labelCell_${params.row.label}_label`),
      disableClickEventBubbling: true,
      sortable: false,
      width: 95,
      renderCell: ({ row }) => <LabelCell row={row} />,
    },
  ]
  const setsColumns = Array.from({ length: game.settings?.sets ?? 1 }, (x, i) => {
    const setId = String(i + 1)
    const disabled = disabledPlayer ||
      Number(currentSetId) < Number(setId) ||
      game.players[playerId].playerScores[Number(setId) + 1] != null

    return ({
      field: `set${setId}`,
      headerName: translator.fromLabel('scoreCard_set_title', { setId }),
      disableClickEventBubbling: true,
      sortable: false,
      width: 75,
      renderCell: ({ row, value }) =>
        game?.settings?.virtualDices
          ? <VirtualScoreCell {...{ disabled, gameboard, playerId, setId, currentSetId, row, value: game?.players?.[playerId]?.playerScores?.[setId]?.[row.label] }} />
          : <ScoreCell {...{ disabled, gameboard, playerId, setId, currentSetId, row, value: game?.players?.[playerId]?.playerScores?.[setId]?.[row.label] }} />,
    })
  })

  if (game.gameId == null)
    return null

  return (
    <Paper style={{ padding: 16, display: 'flex' }}>
      <div style={{ flex: '0 0 100px', border: '1px solid lightgrey' }}>
        <DataGrid
          rows={rows}
          columns={labelColumns}
          autoHeight
          hideFooter
        />
      </div>
      <div style={{ flex: '1 0 100px', border: '1px solid lightgrey', borderLeft: '0px' }}>
        <DataGrid
          rows={rows}
          columns={setsColumns}
          autoHeight
          hideFooter
        />
      </div>
    </Paper>
  )
}

export default ScoreCard
