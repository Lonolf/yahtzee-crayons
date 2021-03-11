import React from 'react'
import { styled } from '@material-ui/core/styles'
import { TextField, Box, FormControlLabel, Checkbox, Toolbar } from '@material-ui/core'

export const EmptyCell = styled(Box)(({ total = false, theme }) => ({
  border: `${total ? '2' : '1'}px solid ${theme.palette.primary.main}`,
  flex: '1 0 50px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: total ? theme.palette.primary.main : 'inherit',
  fontWeight: total ? 'bold' : 'inherit',
}))

export const ScoreCell = ({ playerId, setId, row, value = '', setValue = () => {}, onBlur = () => {}, disabled = false }) => {
  const [focused, setFocused] = React.useState(false)
  const onChange = value =>
    setValue({ playerId, setId, label: row.label, value })

  const onKeyDown = event => event.keyCode === 13
    ? document.activeElement.blur() : null

  if (row.points == null) {
    return (
      <TextField
        id={setId + row.label}
        value={String(value)}
        onChange={event => onChange(Number(event.target.value.replace(/\D/, '') || 0))}
        onFocus={() => setFocused(true)}
        onBlur={() => { onBlur(); setFocused(false) }}
        onKeyDown={onKeyDown}
        type='number'
        style={{ width: 50, borderBottom: 0 }}
        inputProps={{ style: { textAlign: 'center' } }}
        disabled={disabled && !focused}
      />
    )
  } else {
    const checked = value === row.points
    const throwCell = value === 0
    return (
      <Toolbar disableGutters style={{ justifyContent: 'flex-start', paddingLeft: 16 }}>
        <FormControlLabel
          control={(
            <Checkbox
              checked={checked}
              indeterminate={throwCell}
              onChange={() => onChange(value == null ? 0 : throwCell ? row.points : null)}
              name={setId + row.label + row.points}
              color='primary'
            />
          )}
          label={value}
          disabled={disabled}
        />
      </Toolbar>
    )
  }
}
