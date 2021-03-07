import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'

export const useChangePlayer = () => {
  const { playerId } = useParams()
  const history = useHistory()
  const playersIdsList = useSelector(state => Object.keys(state.game?.players ?? {}))

  return async() => {
    const newPlayerId = playersIdsList.filter(id => id !== playerId)[0]

    if (newPlayerId != null)
      history.push(`/game/${newPlayerId}`)
  }
}