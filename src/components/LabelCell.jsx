/* eslint-disable react/no-array-index-key */
import React from 'react'

import EmptyCell from 'styleComponents/EmptyCell'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core'
import translator from 'utility/translator'
import { Close } from '@material-ui/icons'

const LabelCell = ({ row }) => {
  const [open, setOpen] = React.useState(false)
  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)

  return (
    <>
      <EmptyCell padded flexgrow={3} onClick={onOpen}>
        <Typography variant='h6' style={{ textDecoration: 'underline', fontWeight: 700 }}>{translator.fromLabel(`labelCell_${row.label}_label`)}</Typography>
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
