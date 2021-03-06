import { useDispatch } from 'react-redux'
import * as actions from 'redux/actions'
import firebase from 'utility/firebase'

export const useAutoLogin = () => {
  const dispatch = useDispatch()

  return async() => {
    const user = await firebase.autoSignIn()

    if (user)
      dispatch({ type: actions.REDUCE_EDIT_USER, payload: user })
  }
}
