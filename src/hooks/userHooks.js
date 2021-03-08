import React from 'react'
import { useDispatch } from 'react-redux'
import * as actions from 'redux/actions'
import firebase from 'utility/firebase'
import { useParseUrl } from 'hooks/routerHooks'
import { login } from 'sagas/userSagas.js'
import { useHistory } from 'react-router'

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

export const useLogin = () => {
  const dispatch = useDispatch()
  const parseUrl = useParseUrl()

  return async(props) => {
    try {
      const user = await login(props)

      if (user)
        await dispatch({ type: actions.REDUCE_EDIT_USER, payload: user })

      parseUrl({ user })
    } catch (error) {
      dispatch({ type: actions.REDUCE_CREATE_ERROR, payload: error })
    }
  }
}

export const useLogout = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  return async() => {
    await firebase.signOut()

    await dispatch({ type: actions.REDUCE_CREATE_USER, payload: {} })

    history.replace('/')
  }
}

export const useRecoverPassword = () => {
  const [passwordRequested, setPasswordRequested] = React.useState(false)

  const recoverPassword = async({ email }) => {
    await firebase.sendPasswordResetEmail({ email })
    setPasswordRequested(true)
    setTimeout(() => setPasswordRequested(false), 5000)
  }

  const resetRequest = () => setPasswordRequested(false)

  return ({ passwordRequested, recoverPassword, resetRequest })
}
