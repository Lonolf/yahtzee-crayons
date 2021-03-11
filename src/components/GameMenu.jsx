import React from 'react'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Toolbar, Typography, useTheme } from '@material-ui/core'
import { FileCopy, Close, Menu, MenuOpen, Share } from '@material-ui/icons'

import { useSelector } from 'react-redux'
import translator from 'utility/translator'
import { useResetApp } from 'hooks/routerHooks'

const GameMenu = () => {
  const { game } = useSelector(state => state)
  const [open, setOpen] = React.useState(false)
  const [urlCopied, setUrlCopied] = React.useState(false)
  const resetApp = useResetApp()
  const theme = useTheme()
  const height = theme.spacing(4)

  const title = translator.fromLabel('gameMenu_share_title')
  const text = translator.fromLabel('gameMenu_share_text')
  const url = `${window.location.href.split('/game')[0]}?gameId=${game.gameId}`

  const onOpen = () => setOpen(true)
  const onClose = () => { setOpen(false); setUrlCopied(false) }

  const onCopy = () => {
    try {
      navigator.clipboard.writeText(url)
      setUrlCopied(true)
    } catch (error) {
      console.error(error)
      alert(translator.fromLabel('gameMenu_copy_error'))
    }
  }

  const onShare = () => {
    try {
      navigator.share({ title, url, text })
    } catch (error) {
      console.error(error)
      alert(translator.fromLabel('gameMenu_copy_error'))
    }
  }

  return (
    <>
      <Button variant='contained' color='secondary' onClick={onOpen}><Menu /></Button>
      <Dialog PaperProps={{ style: { padding: '16px 0px' } }} open={open}>
        <DialogTitle color='secondary'>{translator.fromLabel('gameMenu_title')}</DialogTitle>
        <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography color='secondary' variant='subtitle1'>{translator.fromLabel('gameMenu_gameId') + game.gameId}</Typography>
          <div style={{ height }}>
            {urlCopied
              ? <Typography color='error' variant='subtitle1'>{translator.fromLabel('gameMenu_gameId_alert')}</Typography>
              : null}
          </div>
          <Toolbar>
            <Button color='secondary' variant='contained' onClick={onCopy}>
              {translator.fromLabel('gameMenu_copyId_button')}
            </Button>
            <Button color='secondary' variant='contained' onClick={onShare}>
              {translator.fromLabel('gameMenu_shareId_button')}
            </Button>
          </Toolbar>
          <div style={{ height }} />
          <Button color='secondary' variant='contained' onClick={resetApp}>
            {translator.fromLabel('gameMenu_backToMenu_button')}
          </Button>
        </DialogContent>
        <div style={{ height }} />
        <DialogActions style={{ justifyContent: 'space-evenly' }}>
          <Button color='primary' variant='contained' onClick={onClose}><Close /></Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default GameMenu
