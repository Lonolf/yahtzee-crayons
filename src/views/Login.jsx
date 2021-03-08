import React from 'react'

import { Button, Dialog } from '@material-ui/core'

import EmailLogin from 'components/EmailLogin'

import { useSelector } from 'react-redux'

import translator from 'utility/translator'
import { useLogin } from 'hooks/userHooks'

const Login = () => {
  const isLoading = (useSelector(state => state.loading)).length > 0

  if (isLoading)
    return null

  return (
    <Dialog open>
      <GoogleLogin />
      <div style={{ height: 25 }} />
      <EmailLogin />
    </Dialog>
  )
}

const GoogleLogin = () => {
  const login = useLogin()
  const signIn = () => login({ type: 'google' })

  return (
    <Button
      data-cy='confirm'
      onClick={signIn}
      variant='contained'
      color='secondary'
    >
      {translator.fromLabel('Google Login')}
    </Button>
  )
}

export default Login
