import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Button, Paper, TextField } from '@material-ui/core'

import { useDispatch } from 'react-redux'
import * as actions from 'redux/actions'
import translator from 'utility/translator'

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  paper: {
    padding: 25,
    display: 'flex',
    flexDirection: 'column',
  },
}))

const EmailLogin = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [values, setValues] = React.useState({ email: '', password: '' })

  const onConfirm = () => dispatch({
    type: actions.LOGIN,
    payload: { ...values, type: 'email' },
  })

  const recoverPassword = () => dispatch({
    type: actions.RECOVER_PASSWORD,
    payload: { ...values },
  })

  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <TextField
          data-cy='email'
          value={values.email}
          onChange={(event) =>
            setValues({ ...values, email: event.target.value })
          }
          variant='outlined'
          label={translator.fromLabel('login_email_label')}
        />
        <div style={{ height: 25 }} />
        <TextField
          data-cy='password'
          value={values.password}
          onChange={(event) =>
            setValues({ ...values, password: event.target.value })
          }
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
      </Paper>
    </div>
  )
}

export default EmailLogin
