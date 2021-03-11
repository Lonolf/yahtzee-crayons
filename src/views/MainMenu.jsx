import React from 'react'
import { Button, Dialog, Divider, TextField, Typography } from '@material-ui/core'
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
      <Typography variant='h5' color='primary'>
        {user.userName ?? user.userEmail}
      </Typography>
      <Divider />
      <Button
        disabled={!!gameId || !user.userId}
        variant={!gameId ? 'contained' : 'outlined'}
        onClick={createNewGame}
        color='primary'
      >
        {translator.fromLabel('mainMenu_newGame')}
      </Button>
      <Divider />
      <TextField
        id='gameId'
        value={gameId}
        onChange={event => setGameId(event.target.value)}
        label={translator.fromLabel('mainMenu_gameId_label')}
        variant='outlined'
        color='primary'
      />
      <div style={{ height: 16 }} />
      <Button
        disabled={!gameId || !user.userId}
        variant={gameId ? 'contained' : 'outlined'}
        onClick={() => loadGame({ gameId })}
        color='primary'
      >
        {translator.fromLabel('mainMenu_loadGame')}
      </Button>
      <Divider />
      <Button
        variant='contained'
        onClick={logout}
        color='secondary'
      >
        {translator.fromLabel('mainMenu_logout')}
      </Button>
    </Dialog>
  )
}

export default MainMenu
