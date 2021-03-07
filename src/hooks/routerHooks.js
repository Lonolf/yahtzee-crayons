import { useHistory, useLocation } from 'react-router'
import { useLoadGame } from './gameHooks'

export const useParseUrl = () => {
  const history = useHistory()
  const location = useLocation()
  const loadGame = useLoadGame()

  return async({ user = {} } = {}) => {
    history.replace('/')

    if (user.userId != null && location.search.includes('gameId=')) {
      let gameId = new URLSearchParams(location.search).get('gameId')
      loadGame({ gameId, user })
    }
  }
}