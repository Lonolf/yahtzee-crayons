import React from 'react'
import EmptyCell from 'styleComponents/EmptyCell'
import { useUpdateScore } from 'hooks/gameHooks'
import { rows } from 'config/gameConfig'
import { Typography } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import * as actions from 'redux/actions'
import { generateDices } from 'config/gameboardConfig'

const VirtualScoreCell = ({ gameboard: { dices, throws } = {}, playerId, setId, currentSetId, row, value, disabled = false }) => {
  const updateScore = useUpdateScore()
  const dispatch = useDispatch()

  const onClick = () => {
    updateScore({ playerId, setId, label: row.label, value: rows[row.label].calcPoints(dices), save: true })
    dispatch({
      type: actions.REDUCE_EDIT_GAMEBOARD,
      payload: { throws: 0, dices: generateDices() },
    })
  }

  const tempValue = value ??
    ((throws > 0 && currentSetId === setId) ? rows[row.label].calcPoints(dices) : '')

  return (
    <EmptyCell onClick={onClick} disabled={disabled || value != null}>
      <Typography variant='h4' color={value != null ? 'primary' : 'secondary'}>
        {tempValue}
      </Typography>
    </EmptyCell>
  )
}

export default VirtualScoreCell
