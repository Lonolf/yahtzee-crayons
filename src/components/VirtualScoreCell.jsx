import React from 'react'
import EmptyCell from 'styleComponents/EmptyCell'
import { useUpdateScore } from 'hooks/gameHooks'
import { rows } from 'config/gameConfig'
import { Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from 'redux/actions'
import { generateDices } from 'config/gameboardConfig'

const VirtualScoreCell = ({ gameboard: { dices, throws, throwing = false } = {}, playerId, setId, currentSetId, row, value, disabled = false }) => {
  const userId = useSelector(state => state.user?.userId)
  const updateScore = useUpdateScore()
  const dispatch = useDispatch()

  const onClick = () => {
    updateScore({ playerId, setId, label: row.label, value: rows[row.label].calcPoints(dices), endingTurn: true })
    dispatch({
      type: actions.REDUCE_EDIT_GAMEBOARD,
      payload: { throws: 0, dices: generateDices() },
    })
  }

  const tempValue = value ??
    ((playerId === userId && !throwing && throws > 0 && currentSetId === setId)
      ? rows[row.label].calcPoints(dices) : '')

  return (
    <EmptyCell onClick={onClick} disabled={disabled || value != null}>
      <Typography variant={value != null ? 'h5' : 'h4'} color={value != null ? 'secondary' : 'primary'}>
        {tempValue}
      </Typography>
    </EmptyCell>
  )
}

export default VirtualScoreCell
