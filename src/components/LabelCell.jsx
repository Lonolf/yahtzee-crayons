/* eslint-disable react/no-array-index-key */
import React from 'react'

import EmptyCell from 'styleComponents/EmptyCell'
import { IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core'
import translator from 'utility/translator'
import { Close, OpenInNew } from '@material-ui/icons'

const LabelCell = ({ row }) => {
  const [open, setOpen] = React.useState(false)
  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)

  return (
    <>
      <EmptyCell padded flexGrow={3} onClick={onOpen}>
        {translator.fromLabel(`labelCell_${row.label}_label`)}
        <div style={{ flex: '1 1 10px' }} />
        <IconButton size='small'><OpenInNew color='disabled' /></IconButton>
      </EmptyCell>
      {open ? <RuleDialog row={row} onClose={onClose} /> : null}
    </>
  )
}

const RuleDialog = ({ row = {}, onClose = () => {} }) => {
  return (
    <Dialog open>
      <DialogTitle>{translator.fromLabel(`labelCell_${row.label}_label`)}</DialogTitle>
      <DialogContent>
        <Typography variant='h6'>{translator.fromLabel(`labelCell_${row.label}_rule`)}</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={onClose}><Close /></Button>
      </DialogActions>
    </Dialog>
  )
}

export default LabelCell
