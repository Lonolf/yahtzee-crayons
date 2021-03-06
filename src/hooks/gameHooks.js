import { playerModel } from 'models/playerModel'
import { createGame, loadGame, watchGame } from 'sagas/gameSagas'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from 'redux/actions'

export const useWatchGame = () => {
  const dispatch = useDispatch()
  const setGame = payload => dispatch({ type: actions.REDUCE_CREATE_GAME, payload })

  return async({ gameId }) => {
    watchGame({ gameId, setGame })
  }
}

export const useCreateNewGame = () => {
  const user = useSelector(state => state.user)
  const watchGameHook = useWatchGame()

  return async() => {
    const player = playerModel(user)
    const gameId = await createGame({ player })

    if (gameId != null)
      watchGameHook({ gameId })
  }
}

export const useLoadGame = () => {
  const user = useSelector(state => state.user)
  const watchGameHook = useWatchGame()

  return async({ gameId }) => {
    const player = playerModel(user)
    await loadGame({ gameId, player })
    if (gameId != null)
      watchGameHook({ gameId })
  }
}
