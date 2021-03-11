import { playerModel } from 'models/playerModel'
import { createGame, loadGame, watchGame, saveGame } from 'sagas/gameSagas'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from 'redux/actions'
import { useHistory, useLocation } from 'react-router-dom'
import { checkGameFinished } from 'config/gameConfig'

export const useWatchGame = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  const setGame = payload => {
    dispatch({ type: actions.REDUCE_CREATE_GAME, payload })
    if (!location.pathname.match('/game'))
      history.push('/game')
  }

  return async({ gameId, user }) => {
    await watchGame({ gameId, setGame })
  }
}

export const useCreateNewGame = () => {
  const user = useSelector(state => state.user)
  const watchGameHook = useWatchGame()
  const dispatch = useDispatch()

  return async() => {
    dispatch({ type: actions.START_LOADING, payload: 'createNewGame' })
    const player = playerModel(user)
    const gameId = await createGame({ player })

    if (gameId != null)
      watchGameHook({ gameId, user })

    dispatch({ type: actions.STOP_LOADING, payload: 'createNewGame' })
  }
}

export const useLoadGame = () => {
  const stateUser = useSelector(state => state.user)
  const watchGameHook = useWatchGame()
  const dispatch = useDispatch()

  return async({ gameId, user } = {}) => {
    dispatch({ type: actions.START_LOADING, payload: 'loadGame' })
    try {
      const player = playerModel(user || stateUser)

      const loaded = await loadGame({ gameId, player })

      if (loaded)
        watchGameHook({ gameId, user: user || stateUser })
    } catch (error) {
      dispatch({ type: actions.REDUCE_CREATE_ERROR, payload: error })
    }

    dispatch({ type: actions.STOP_LOADING, payload: 'loadGame' })
  }
}

export const useSaveGame = () => {
  const game = useSelector(state => state.game)
  const dispatch = useDispatch()

  return async() => {
    const savedGame = await saveGame({ game })
    dispatch({ type: actions.REDUCE_CREATE_GAME, payload: savedGame })
  }
}

export const useCheckFinishedGame = () => {
  const stateGame = useSelector(state => state.game)
  const history = useHistory()
  const dispatch = useDispatch()

  return async({ game } = {}) => {
    const finished = (game ?? stateGame).status === 'finished' || checkGameFinished({ game: game ?? stateGame })

    if (finished) {
      const savedGame = await saveGame({
        game: {
          ...(game ?? stateGame),
          status: 'finished',
        },
      })
      dispatch({ type: actions.REDUCE_CREATE_GAME, payload: savedGame })
      history.push('/victory')
    }
  }
}
