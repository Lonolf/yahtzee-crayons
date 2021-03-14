import { Button, Dialog } from '@material-ui/core'
import { Casino } from '@material-ui/icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from 'redux/actions'
import { useInterval } from 'react-use'
import DiceGraphic from 'styleComponents/DiceGraphic'
import { throwDice } from 'config/gameboardConfig'

const DiceThrower = () => {
  const [open, setOpen] = React.useState(false)
  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)

  return (
    <>
      <Button color='primary' size='large' onClick={onOpen}><Casino /></Button>
      <Dialog onClose={onClose} open={open}>
        <DiceThrowerDialog />
      </Dialog>
    </>
  )
}

const DiceThrowerDialog = () => {
  const { dices = [], throws = 0 } = useSelector(state => state.gameboard ?? {})
  const dispatch = useDispatch()
  const [throwing, setThrowing] = React.useState(0)
  const maxThrows = useSelector(state => state.game?.settings?.maxThrows ?? 3)

  const setGameboard = payload => dispatch({ type: actions.REDUCE_EDIT_GAMEBOARD, payload })

  const throwDices = () => {
    setThrowing(10)
    setGameboard({
      throws: throws + 1,
      dices: dices.map(({ value, fixed, ...dice }) => ({
        ...dice,
        fixed,
        value: fixed ? value : throwDice(),
        blocked: !!fixed,
      })),
    })
  }

  useInterval(() => { setThrowing(value => value - 1) },
    throwing <= 0 ? null : 100,
  )

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
    <>
      {[...dices].sort((a, b) => (a.blocked === b.blocked) ? 0 : a.blocked ? -1 : 1)
        .map(dice =>
          <Dice key={dice.index} throwing={throwing} dice={dice} setFixed={setFixed} />)}
      <Button
        variant='contained'
        color='secondary'
        onClick={() => throwDices()}
        disabled={disabledThrow}
      >
        Throw
      </Button>
    </>
  )
}

const Dice = ({ throwing = 0, dice: { index = 0, value = 1, fixed = false }, setFixed = () => {} }) => {
  let calcValue = (!fixed && throwing) ? throwDice() : value

  return (
    <DiceGraphic value={calcValue} fixed={fixed} onClick={() => setFixed(index)} />
  )
}

export default DiceThrower
