import { Button, Dialog } from '@material-ui/core'
import { Casino } from '@material-ui/icons'
import React from 'react'
import { useSelector } from 'react-redux'
import { useInterval } from 'react-use'
import DiceGraphic from 'styleComponents/DiceGraphic'

const generateDices = (length = 5) => Array.from({ length }, (x, index) =>
  ({ index, value: 1, fixed: false, blocked: false }))

const throwDice = (max = 6) => Math.floor(Math.random() * max) + 1

const DiceThrower = () => {
  const [open, setOpen] = React.useState(false)
  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)

  return (
    <>
      <Button onClick={onOpen}><Casino /></Button>
      <Dialog onClose={onClose} open={open}>
        <DiceThrowerDialog />
      </Dialog>
    </>
  )
}

const DiceThrowerDialog = () => {
  const [values, setValues] = React.useState([])
  const [throws, setThrows] = React.useState(0)
  const [throwing, setThrowing] = React.useState(0)

  const maxThrows = useSelector(state => state.game?.settings?.maxThrows ?? 3)

  const throwDices = (dices = generateDices(), max = 6) => {
    setThrowing(10)
    setThrows(throws => throws + 1)
    setValues(dices.map(({ value, fixed, ...dice }) => ({
      ...dice,
      fixed,
      value: fixed ? value : throwDice(),
      blocked: !!fixed,
    })))
  }

  React.useEffect(() => { throwDices() }, [])

  useInterval(() => { setThrowing(value => value - 1) },
    throwing <= 0 ? null : 100,
  )

  const setFixed = index => {
    setValues(values => values.map((value) => ({
      ...value,
      fixed: index === value.index && !value.blocked ? !value.fixed : value.fixed,
    })))
  }

  const disabledThrow = throwing > 0 || throws >= maxThrows ||
    values.every(dice => dice.fixed)

  return (
    <>
      {values.sort((a, b) => (a.blocked === b.blocked) ? 0 : a.blocked ? -1 : 1)
        .map(dice =>
          <Dice key={dice.index} throwing={throwing} dice={dice} setFixed={setFixed} />)}
      <Button
        variant='contained'
        color='secondary'
        onClick={() => throwDices(values)}
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
