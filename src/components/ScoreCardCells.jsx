import React from 'react'
import { styled } from '@material-ui/core/styles'
import { TextField, Box } from '@material-ui/core'

export const EmptyCell = styled(Box)({
  border: '1px solid black',
  flex: '1 0 50px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const ScoreCell = ({ playerId, setId, label, value = 0, setValue = () => {}, onBlur = () => {}, disabled = false }) => {
  const onChange = event =>
    setValue({ playerId, setId, label, value: Number(event.target.value.replace(/\D/, '') || 0) })

  return (
    <TextField
      id={label}
      value={String(value)}
      onChange={onChange}
      onBlur={onBlur}
      type='number'
      style={{ width: 50, borderBottom: 0 }}
      inputProps={{ style: { textAlign: 'center' } }}
      disabled={disabled}
    />
  )
}
