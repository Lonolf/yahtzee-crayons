import React from 'react'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Toolbar, Typography } from '@material-ui/core'
import { Assignment, Close, Menu, MenuOpen, Share } from '@material-ui/icons'

import { useSelector } from 'react-redux'
import translator from 'utility/translator'
import { useResetApp } from 'hooks/routerHooks'

const GameMenu = () => {
  const { game } = useSelector(state => state)
  const [open, setOpen] = React.useState(false)
  const resetApp = useResetApp()

  const title = translator.fromLabel('gameMenu_share_title')
  const text = translator.fromLabel('gameMenu_share_text')
  const url = `${window.location.href.split('/game')[0]}?gameId=${game.gameId}`

  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)

  const onCopy = () => {
    navigator?.clipboard?.writeText?.(url) ??
      alert(translator.fromLabel('gameMenu_copy_error'))
  }

  const onShare = () => {
    navigator?.share?.({ title, url, text }) ??
      alert(translator.fromLabel('gameMenu_share_error'))
  }

  return (
    <>
      <Button variant='contained' color='secondary' onClick={onOpen}><Menu /></Button>
      <Dialog PaperProps={{ style: { padding: '16px 0px' } }} open={open}>
        <DialogTitle>{translator.fromLabel('gameMenu_title')}</DialogTitle>
        <DialogContent>
          <Toolbar>
            <Typography variant='subtitle1'>{translator.fromLabel('gameMenu_gameId') + game.gameId}</Typography>
          </Toolbar>
          <Toolbar>
            <Button variant='outlined' onClick={onCopy}><Assignment /></Button>
            <div style={{ width: 16 }} />
            <Button variant='outlined' onClick={onShare}><Share /></Button>
          </Toolbar>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={resetApp}><MenuOpen /></Button>
          <Button variant='contained' onClick={onClose}><Close /></Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default GameMenu
