import React from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'

const font = "'Cabin Sketch', sans-serif"

const theme = createMuiTheme({
  overrides: {
    MuiDataGrid: {
      root: {
        border: '1px solid black',
      },
    },
    MuiContainer: {
      root: {
        padding: 8,
      },
    },
    MuiDialog: {
      paper: {
        padding: 24,
      },
      root: {
        backgroundColor: 'rgba(115, 139, 140, 0.1)',
      },
    },
    MuiDivider: {
      root: {
        margin: '15px 5px',
        height: 2,
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: 'white',
      },
    },
    MuiToolbar: {
      root: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        textAlign: 'center',
      },
    },
  },
  props: {
    MuiToolbar: {
      variant: 'dense',
      disableGutters: true,
    },
  },
  palette: {
    primary: { main: '#006064' },
    secondary: { main: '#795548' },
  },
  typography: {
    fontFamily: font,
    button: {
      textTransform: 'none',
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
