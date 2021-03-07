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
    const player = playerModel(user || stateUser)

    await loadGame({ gameId, player })
    if (gameId != null)
      watchGameHook({ gameId, user: user || stateUser })

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

  return async({ game } = {}) => {
    const finished = checkGameFinished({ game: game ?? stateGame })

    if (finished)
      history.push('/victory')
  }
}
