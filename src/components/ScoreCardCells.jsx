import React from 'react'
import { TextField } from '@material-ui/core'

export const ScoreCell = ({ playerId, setId, label, value = 0, setValue = () => {}, onBlur = () => {} }) => {
  const onChange = event =>
    setValue({ playerId, setId, label, value: Number(event.target.value.replace(/\D/, '') || 0) })

  return (
    <TextField
      id={label}
      value={String(value)}
      onChange={onChange}
      onBlur={onBlur}
      type='number'
      style={{ width: 50 }}
    />
  )
}
