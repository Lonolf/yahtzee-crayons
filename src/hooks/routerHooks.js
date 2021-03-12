import { useDispatch } from 'react-redux'
import * as actions from 'redux/actions'
import { useHistory, useLocation } from 'react-router'
import { useLoadGame } from './gameHooks'

export const useParseUrl = () => {
  const history = useHistory()
  const location = useLocation()
  const loadGame = useLoadGame()
  const dispatch = useDispatch()

  return async({ user = {} } = {}) => {
    if (user.userId != null && location.search.includes('gameId=')) {
      history.replace('/')
      let gameId = new URLSearchParams(location.search).get('gameId')
      loadGame({ gameId, user })
    }

    dispatch({ type: actions.STOP_LOADING, payload: 'autoLogin' })
  }
}

export const useResetApp = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  return () => {
    dispatch({ type: actions.REDUCE_CREATE_GAME, payload: {} })
    history.replace('/')
  }
}
