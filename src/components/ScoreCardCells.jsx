import React from 'react'
import { TextField, Checkbox } from '@material-ui/core'
import EmptyCell from 'styleComponents/EmptyCell'
import { useUpdateScore } from 'hooks/gameHooks'

const ScoreCell = ({ playerId, setId, row, value, disabled = false }) => {
  const updateScore = useUpdateScore()

  const onChange = value =>
    updateScore({ playerId, setId, label: row.label, value })

  const onSelect = value => {
    updateScore({ playerId, setId, label: row.label, value, save: true })
  }

  const onBlur = () => updateScore({ playerId, setId, label: row.label, value, save: true })

  const onKeyDown = event => event.keyCode === 13
    ? document.activeElement.blur() : null

  if (row.points == null) {
    return (
      <EmptyCell>
        <TextField
          id={setId + row.label}
          value={String(value ?? '')}
          onChange={event => onChange(Number(event.target.value.replace(/\D/, '') || 0))}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          type='number'
          style={{ width: 50, borderBottom: 0 }}
          inputProps={{ style: { textAlign: 'center' } }}
          disabled={disabled}
          color='secondary'
        />
      </EmptyCell>
    )
  } else {
    const checked = value === row.points
    const throwCell = value === 0
    return (
      <EmptyCell onClick={() => onSelect(value == null ? 0 : throwCell ? row.points : null)}>
        <Checkbox
          checked={checked}
          indeterminate={throwCell}
          name={setId + row.label + row.points}
          color='secondary'
          size='small'
          disabled={disabled}
        />
        <div style={{ flex: 1 }}>
          {value}
        </div>
      </EmptyCell>
    )
  }
}

export default ScoreCell
