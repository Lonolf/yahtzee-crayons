import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'

export const useNextPlayer = () => {
  const userId = useSelector(state => state.user?.userId)
  const playerId = useParams().playerId ?? userId
  const history = useHistory()
  const playersIdsList = useSelector(state => Object.keys(state.game?.players ?? {}).sort())

  return async() => {
    const oldPlayerIndex = playersIdsList.indexOf(playerId)
    const newPlayerId = playersIdsList[oldPlayerIndex + 1] ?? playersIdsList[0]

    if (newPlayerId != null)
      history.push(`/game/${newPlayerId}`)
  }
}

export const useChangePlayer = () => {
  const players = useSelector(state => state.game?.players ?? {})
  const history = useHistory()

  return async({ playerId }) => {
    if (players[playerId] != null)
      history.push(`/game/${playerId}`)
  }
}
