import React from 'react'
import { Button, Dialog, DialogTitle, TextField } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from 'redux/actions'
import translator from 'utility/translator'
import { useCreateNewGame } from 'hooks/gameHooks'

const MainMenu = () => {
  const user = useSelector(state => state.user)
  const [gameId, setGameId] = React.useState('')
  const dispatch = useDispatch()
  const createNewGame = useCreateNewGame()

  const onChangeName = event => {
    dispatch({ type: actions.REDUCE_EDIT_USER, payload: { userName: event.target.value } })
  }

  return (
    <Dialog open>
      <DialogTitle>{translator.fromLabel('mainMenu_title')}</DialogTitle>
      <TextField
        id='userName'
        value={user.userName ?? ''}
        onChange={onChangeName}
        label={translator.fromLabel('mainMenu_userName_label')}
      />
      <Button
        disabled={gameId || !user.userName}
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
      <Button disabled={!gameId || !user.userName} variant={gameId ? 'contained' : 'outlined'}>
        {translator.fromLabel('Load Game')}
      </Button>
    </Dialog>
  )
}

export default MainMenu
