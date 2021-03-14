import { IconButton, Toolbar } from '@material-ui/core'
import { Replay } from '@material-ui/icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from 'redux/actions'
import { useInterval } from 'react-use'
import DiceGraphic from 'styleComponents/DiceGraphic'
import { throwDice } from 'config/gameboardConfig'

const DiceThrower = () => {
  const { dices = [], throws = 0 } = useSelector(state => state.gameboard ?? {})
  const dispatch = useDispatch()
  const [throwing, setThrowing] = React.useState(0)
  const maxThrows = useSelector(state => state.game?.settings?.maxThrows ?? 3)

  const setGameboard = payload => dispatch({ type: actions.REDUCE_EDIT_GAMEBOARD, payload })

  const throwDices = () => {
    setThrowing(10)
    setGameboard({
      throwing: true,
      throws: throws + 1,
      dices: dices.map(({ value, fixed, ...dice }) => ({
        ...dice,
        fixed,
        value: fixed ? value : throwDice(),
        blocked: !!fixed,
      })),
    })
  }

  useInterval(() => {
    setThrowing(value => value - 1)
    if (throwing <= 1)
      setGameboard({ throwing: false })
  }, throwing <= 0 ? null : 100)

  const setFixed = index => {
    setGameboard({
      dices: dices.map((dice) => ({
        ...dice,
        fixed: dice.value > 0 && index === dice.index && !dice.blocked ? !dice.fixed : dice.fixed,
      })),
    })
  }

  const disabledThrow = throwing > 0 || throws >= maxThrows ||
    (dices.length > 0 && dices.every(dice => dice.fixed))

  return (
    <Toolbar style={{ alignItems: 'center' }}>
      {[...dices].sort((a, b) => a.value - b.value)
        .map(dice => <Dice key={dice.index} throwing={throwing} dice={dice} setFixed={setFixed} />)}
      <IconButton
        color='primary'
        onClick={() => throwDices()}
        disabled={disabledThrow}
        size='small'
        style={{ flex: '1 1 25px' }}
      >
        <Replay />
      </IconButton>
    </Toolbar>
  )
}

const Dice = ({ throwing = 0, dice: { index = 0, value = 1, fixed = false }, setFixed = () => {} }) => {
  let calcValue = (!fixed && throwing) ? throwDice() : value

  return (
    <DiceGraphic value={calcValue} fixed={fixed} onClick={() => setFixed(index)} />
  )
}

export default DiceThrower
