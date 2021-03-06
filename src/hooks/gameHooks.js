import { gameModel } from 'models/gameModel'
import { playerModel } from 'models/playerModel'
import { createGame, loadGame } from 'sagas/gameSagas'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from 'redux/actions'

export const useCreateNewGame = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  return async() => {
    const firstPlayer = playerModel(user)
    // La creazione del game potrebbe andare nella createGame
    const game = gameModel({ players: { [firstPlayer.playerId]: firstPlayer } })
    const gameId = await createGame({ game })

    if (gameId != null)
      dispatch({ type: actions.REDUCE_CREATE_GAME, payload: { gameId, ...game } })
  }
}

export const useLoadGame = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  return async({ gameId }) => {
    const player = playerModel(user)
    const game = await loadGame({ gameId, player })
    dispatch({ type: actions.REDUCE_CREATE_GAME, payload: game })
  }
}
