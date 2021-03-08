import React from 'react'
import { styled } from '@material-ui/core/styles'
import { TextField, Box } from '@material-ui/core'

export const EmptyCell = styled(Box)(({ total = false, theme }) => ({
  border: `${total ? '2' : '1'}px solid ${theme.palette.primary.main}`,
  flex: '1 0 50px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: total ? theme.palette.primary.main : 'inherit',
  fontWeight: total ? 'bold' : 'inherit',
}))

export const ScoreCell = ({ playerId, setId, label, value = '', setValue = () => {}, onBlur = () => {}, disabled = false }) => {
  const [focused, setFocused] = React.useState(false)
  const onChange = event =>
    setValue({ playerId, setId, label, value: Number(event.target.value.replace(/\D/, '') || 0) })

  const onKeyDown = event => event.keyCode === 13
    ? document.activeElement.blur() : null

  return (
    <TextField
      id={label}
      value={String(value)}
      onChange={onChange}
      onFocus={() => setFocused(true)}
      onBlur={() => { onBlur(); setFocused(false) }}
      onKeyDown={onKeyDown}
      type='number'
      style={{ width: 50, borderBottom: 0 }}
      inputProps={{ style: { textAlign: 'center' } }}
      disabled={disabled && !focused}
    />
  )
}
