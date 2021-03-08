import React from 'react'

import { Button, TextField } from '@material-ui/core'

import translator from 'utility/translator'
import { useLogin } from 'hooks/userHooks'

const EmailLogin = () => {
  const [values, setValues] = React.useState({ email: '', password: '' })
  const login = useLogin()
  const onConfirm = () => login({ ...values, type: 'email' })

  const recoverPassword = () => {}

  return (
    <>
      <TextField
        data-cy='email'
        value={values.email}
        onChange={(event) => setValues({ ...values, email: event.target.value })}
        variant='outlined'
        label={translator.fromLabel('login_email_label')}
      />
      <div style={{ height: 25 }} />
      <TextField
        data-cy='password'
        value={values.password}
        onChange={(event) => setValues({ ...values, password: event.target.value })}
        type='password'
        variant='outlined'
        label={translator.fromLabel('login_password_label')}
      />
      <div style={{ height: 25 }} />
      <Button
        data-cy='confirm'
        onClick={recoverPassword}
        variant='outlined'
        disabled={values.email === ''}
      >
        {translator.fromLabel('login_recoverPassword_button')}
      </Button>
      <div style={{ height: 25 }} />
      <Button
        data-cy='confirm'
        onClick={onConfirm}
        variant='contained'
        color='primary'
        disabled={values.email === '' || values.password === ''}
      >
        {translator.fromLabel('generic_confirm_button')}
      </Button>
    </>
  )
}

export default EmailLogin
