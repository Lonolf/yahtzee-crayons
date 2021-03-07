import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import ErrorIcon from '@material-ui/icons/Error'

const useStyle = makeStyles(theme => ({
  toolbar: { minHeight: 0 },
  errorIcon: { marginRight: 15 },
  contentProps: { backgroundColor: theme.palette.error.main },
}))

const ErrorBar = ({
  props: { error: { message = '', errorId } = {}, onClose = () => {} },
}) => {
  const classes = useStyle()

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      style={{ zIndex: 20000 }}
      open={errorId != null}
      onClose={onClose}
      autoHideDuration={5000}
      message={(
        <Toolbar className={classes.toolbar} disableGutters>
          <ErrorIcon className={classes.errorIcon} />
          <span id='message-id'>
            {String(message)}
          </span>
        </Toolbar>
        )}
      ContentProps={{
        'aria-describedby': 'message-id',
        className: classes.contentProps,
      }}
      action={[
        <Button
          key='close'
          aria-label='Close'
          color='inherit'
          onClick={onClose}
        >
          <CloseIcon />
        </Button>,
      ]}
    />
  )
}

export default ErrorBar
