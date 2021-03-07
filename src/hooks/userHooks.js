import { useDispatch } from 'react-redux'
import * as actions from 'redux/actions'
import firebase from 'utility/firebase'
import { useParseUrl } from 'hooks/routerHooks'

export const useAutoLogin = () => {
  const dispatch = useDispatch()
  const parseUrl = useParseUrl()

  return async() => {
    const user = await firebase.autoSignIn()

    if (user)
      await dispatch({ type: actions.REDUCE_EDIT_USER, payload: user })

    parseUrl({ user })
  }
}
