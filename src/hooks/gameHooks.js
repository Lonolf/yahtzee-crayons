import { playerModel } from 'models/playerModel'
import { createGame, loadGame, watchGame, saveGame, saveScore } from 'sagas/gameSagas'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from 'redux/actions'
import { useHistory, useLocation } from 'react-router-dom'
import { checkGameFinished } from 'config/gameConfig'
import produce from 'immer'

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
  const { user, settings } = useSelector(state => state)
  const watchGameHook = useWatchGame()
  const dispatch = useDispatch()

  return async() => {
    dispatch({ type: actions.START_LOADING, payload: 'createNewGame' })
    const player = playerModel(user)
    const gameId = await createGame({ player, settings })

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

export const useUpdateScore = () => {
  const game = useSelector(state => state.game)
  const dispatch = useDispatch()

  return async({ playerId, setId, label, value, save = false }) => {
    const payload = produce(game, draft => {
      if (draft.players[playerId].playerScores[setId] == null)
        draft.players[playerId].playerScores[setId] = {}

      draft.players[playerId].playerScores[setId][label] = value
    })

    if (save)
      saveScore({ gameId: game.gameId, playerId, playerScores: payload.players[playerId].playerScores })

    dispatch({ type: actions.REDUCE_CREATE_GAME, payload })
  }
}

export const useCheckGame = () => {
  const dispatch = useDispatch()
  const game = useSelector(state => state.game)

  return async() => {
    try {
      if (game.status === 'finished')
        return null

      const finished = checkGameFinished({ game })

      if (finished) {
        const savedGame = await saveGame({
          game: {
            ...game,
            status: 'finished',
          },
        })
        dispatch({ type: actions.REDUCE_CREATE_GAME, payload: savedGame })
      }
    } catch (error) {
      console.error(error)
    }
  }
}
