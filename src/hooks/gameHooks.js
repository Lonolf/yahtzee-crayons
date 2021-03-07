import { playerModel } from 'models/playerModel'
import { createGame, loadGame, watchGame, saveGame } from 'sagas/gameSagas'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from 'redux/actions'
import { useHistory } from 'react-router-dom'

export const useWatchGame = () => {
  const dispatch = useDispatch()
  const setGame = payload => dispatch({ type: actions.REDUCE_CREATE_GAME, payload })
  const history = useHistory()

  return async({ gameId, user }) => {
    watchGame({ gameId, setGame })
    history.push(`/game/${user.userId}`)
  }
}

export const useCreateNewGame = () => {
  const user = useSelector(state => state.user)
  const watchGameHook = useWatchGame()

  return async() => {
    const player = playerModel(user)
    const gameId = await createGame({ player })

    if (gameId != null)
      watchGameHook({ gameId, user })
  }
}

export const useLoadGame = () => {
  const stateUser = useSelector(state => state.user)
  const watchGameHook = useWatchGame()

  return async({ gameId, user }) => {
    const player = playerModel(user || stateUser)

    await loadGame({ gameId, player })
    if (gameId != null)
      watchGameHook({ gameId, user: user || stateUser })
  }
}

export const useSaveGame = () => {
  const game = useSelector(state => state.game)
  const dispatch = useDispatch()

  return async() => {
    const payload = await saveGame({ game })
    dispatch({ type: actions.REDUCE_CREATE_GAME, payload })
  }
}
