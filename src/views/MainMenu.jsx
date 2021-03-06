import React from 'react'
import { Button, Dialog, DialogTitle, TextField, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from 'redux/actions'
import translator from 'utility/translator'
import { useCreateNewGame, useLoadGame } from 'hooks/gameHooks'

const MainMenu = () => {
  const user = useSelector(state => state.user)
  const [gameId, setGameId] = React.useState('')
  const dispatch = useDispatch()
  const createNewGame = useCreateNewGame()
  const loadGame = useLoadGame()

  const onChangeName = event => {
    dispatch({ type: actions.REDUCE_EDIT_USER, payload: { userName: event.target.value } })
  }

  return (
    <Dialog open>
      <DialogTitle>{translator.fromLabel('mainMenu_title')}</DialogTitle>
      <Typography>
        {user.userName}
      </Typography>
      <Button
        disabled={!!gameId || !user.userName}
        variant={!gameId ? 'contained' : 'outlined'}
        onClick={createNewGame}
      >
        {translator.fromLabel('New Game')}
      </Button>
      <TextField
        id='gameId'
        value={gameId}
        onChange={event => setGameId(event.target.value)}
        label={translator.fromLabel('mainMenu_gameId_label')}
      />
      <Button
        disabled={!gameId || !user.userName}
        variant={gameId ? 'contained' : 'outlined'}
        onClick={() => loadGame({ gameId })}
      >
        {translator.fromLabel('Load Game')}
      </Button>
    </Dialog>
  )
}

export default MainMenu
