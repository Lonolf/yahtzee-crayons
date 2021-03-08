import React from 'react'
import { Button, Dialog, DialogTitle, TextField, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import translator from 'utility/translator'
import { useCreateNewGame, useLoadGame } from 'hooks/gameHooks'
import { useLogout } from 'hooks/userHooks'

const MainMenu = () => {
  const user = useSelector(state => state.user)
  const [gameId, setGameId] = React.useState('')
  const createNewGame = useCreateNewGame()
  const loadGame = useLoadGame()
  const logout = useLogout()

  return (
    <Dialog open>
      <DialogTitle>{translator.fromLabel('mainMenu_title')}</DialogTitle>
      <Typography>
        {user.userName ?? user.userEmail}
      </Typography>
      <div style={{ height: 25 }} />
      <Button
        disabled={!!gameId || !user.userId}
        variant={!gameId ? 'contained' : 'outlined'}
        onClick={createNewGame}
      >
        {translator.fromLabel('mainMenu_newGame')}
      </Button>
      <div style={{ height: 25 }} />
      <TextField
        id='gameId'
        value={gameId}
        onChange={event => setGameId(event.target.value)}
        label={translator.fromLabel('mainMenu_gameId_label')}
      />
      <div style={{ height: 25 }} />
      <Button
        disabled={!gameId || !user.userId}
        variant={gameId ? 'contained' : 'outlined'}
        onClick={() => loadGame({ gameId })}
      >
        {translator.fromLabel('mainMenu_loadGame')}
      </Button>
      <div style={{ height: 25 }} />
      <Button
        variant='contained'
        onClick={logout}
      >
        {translator.fromLabel('mainMenu_logout')}
      </Button>
    </Dialog>
  )
}

export default MainMenu
