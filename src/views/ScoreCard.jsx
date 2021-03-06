import React from 'react'

import { ScoreCell } from 'components/ScoreCardCells'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from 'redux/actions'
import { Toolbar, List } from '@material-ui/core'
import { useSaveGame } from 'hooks/gameHooks'

const rows = [
  { label: 'aces' },
  { label: 'twos' },
  { label: 'threes' },
  { label: 'fours' },
  { label: 'fives' },
  { label: 'six' },
  { label: 'threeOf' },
  { label: 'fourOf' },
  { label: 'fullHouse' },
  { label: 'smSt' },
  { label: 'lgSt' },
  { label: 'yahtzee' },
]

const ScoreCard = () => {
  const { user, game } = useSelector(state => state)
  const dispatch = useDispatch()
  const saveGame = useSaveGame()

  const setValue = payload => dispatch({ type: actions.REDUCE_EDIT_SCORE, payload })

  return (
    <List>
      {user.userName}
      {rows.map(row => <Line game={game} row={row} user={user} setValue={setValue} onBlur={saveGame} />)}
      <Totals game={game} user={user} />
    </List>
  )
}

const Line = ({ game, row, user, setValue, onBlur }) => {
  return (
    <Toolbar style={{ padding: 10 }}>
      <div style={{ width: 50 }}>{row.label}</div>
      {Array.from({ length: game.settings.sets }, (x, i) => i + 1)
        .map(setId => (
          <ScoreCell
            key={row.label + setId}
            playerId={user.userId}
            setId={setId}
            label={row.label}
            value={game?.players?.[user.userId]?.playerScores?.[setId]?.[row.label]}
            setValue={setValue}
            onBlur={onBlur}
          />
        ),
        )}
    </Toolbar>
  )
}

const Totals = ({ game, user }) => {
  const totals = Object.entries(game?.players?.[user.userId]?.playerScores ?? {})
    .map(([setId, setScores]) => ({ setId, score: Object.values(setScores).reduce((sum, value) => sum + value, 0) }))
    .reduce((list, { setId, score }) => ({ ...list, [setId]: score }), {})

  return (
    <Toolbar style={{ border: '1px solid black', borderRadius: 5, padding: 10 }}>
      <div style={{ width: 50 }}>Total</div>
      {Array.from({ length: game.settings.sets }).map((value, index) => <div style={{ width: 50, textAlign: 'center' }}>{totals[index + 1] ?? 0}</div>)}
    </Toolbar>
  )
}

export default ScoreCard
