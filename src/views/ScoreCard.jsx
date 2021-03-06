import React from 'react'
import { DataGrid } from '@material-ui/data-grid'

const columns = [
  { field: 'label', width: 140 },
  { field: 'explanation', width: 210 },
  { field: 'game01', width: 70 },
]

const rows = [
  { id: 0, label: 'aces', getScore: dices => dices.filter(dice => dice.value === 1).length },
]

const ScoreCard = () => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
    />
  )
}

export default ScoreCard
