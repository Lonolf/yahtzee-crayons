import { playerModel } from 'models/playerModel'
import { createGame, loadGame, watchGame, saveGame } from 'sagas/gameSagas'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from 'redux/actions'
import { useHistory, useLocation } from 'react-router-dom'
import { checkGameFinished } from 'config/gameConfig'
import produce from 'immer'
import { generateDices } from 'config/gameboardConfig'

export const useWatchGame = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  const setGame = payload => {
    dispatch({ type: actions.REDUCE_CREATE_GAME, payload })
    dispatch({
      type: actions.REDUCE_EDIT_GAMEBOARD,
      payload: { throws: 0, dices: generateDices() },
    })
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

export const useEndTurn = () => {
  const stateGame = useSelector(state => state.game)
  const dispatch = useDispatch()

  return async({ game }) => {
    const newGame = produce((game ?? stateGame), draft => {
      draft.playingPlayer++
      if (draft.playingPlayer >= draft.settings.players)
        draft.playingPlayer = 0
    })

    await saveGame({ game: newGame })
    dispatch({ type: actions.REDUCE_CREATE_GAME, payload: newGame })
  }
}

export const useUpdateScore = () => {
  const game = useSelector(state => state.game)
  const dispatch = useDispatch()
  const endTurn = useEndTurn()

  return async({ playerId, setId, label, value, endingTurn = false }) => {
    const newGame = produce(game, draft => {
      if (draft.players[playerId].playerScores[setId] == null)
        draft.players[playerId].playerScores[setId] = {}

      draft.players[playerId].playerScores[setId][label] = value
    })

    if (endingTurn)
      endTurn({ game: newGame })
    else
      dispatch({ type: actions.REDUCE_CREATE_GAME, payload: newGame })
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
