import React from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'

const theme = createMuiTheme({
  overrides: {
    MuiDataGrid: {
      root: {
        border: '1px solid black',
      },
    },
    MuiContainer: {
      root: {
        padding: 24,
      },
    },
    MuiDialog: {
      paper: {
        padding: 24,
      },
    },
  },
})

const ThemeSelector = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default ThemeSelector
