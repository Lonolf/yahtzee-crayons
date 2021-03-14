import React from 'react'

import { FormControlLabel, Switch, Typography, IconButton, Toolbar, Dialog, DialogTitle, Button, DialogContent, Slider } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from 'redux/actions'

import translator from 'utility/translator'
import { Close } from '@material-ui/icons'

const SettingsManager = () => {
  const settings = useSelector(state => state.settings)
  const [open, setOpen] = React.useState(false)
  const dispatch = useDispatch()

  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)

  const onChange = payload =>
    dispatch({ type: actions.REDUCE_EDIT_SETTINGS, payload })

  return (
    <>
      <Button variant='contained' color='secondary' onClick={onOpen}>
        {translator.fromLabel('settings_button')}
      </Button>
      <Dialog onClose={onClose} open={open}>
        <Toolbar>
          <DialogTitle color='secondary'>
            {translator.fromLabel('settings_title')}
          </DialogTitle>
          <div style={{ flexGrow: '1 0 10px' }} />
          <IconButton style={{ marginRight: 24 }} onClick={onClose}><Close /></IconButton>
        </Toolbar>
        <DialogContent>
          <Typography color='primary'>{translator.fromLabel('settings_players')}</Typography>
          <Slider
            defaultValue={settings.players}
            valueLabelDisplay='auto'
            step={1}
            marks
            min={1}
            max={10}
            onChangeCommitted={(event, value) => onChange({ players: value })}
          />
          <Typography color='secondary'>{translator.fromLabel('settings_sets')}</Typography>
          <Slider
            defaultValue={settings.sets}
            valueLabelDisplay='auto'
            step={1}
            marks
            min={1}
            max={10}
            onChangeCommitted={(event, value) => onChange({ sets: value })}
            color='secondary'
          />
          <FormControlLabel
            control={(
              <Switch
                checked={settings.virtualDices}
                onChange={() => onChange({ virtualDices: !settings.virtualDices })}
                name='virtualDices'
                color='secondary'
              />
            )}
            label={translator.fromLabel('settings_virtualDices')}
          />
          <Typography color='secondary'>{translator.fromLabel('settings_maxThrows')}</Typography>
          <Slider
            defaultValue={settings.maxThrows}
            valueLabelDisplay='auto'
            step={1}
            marks
            min={1}
            max={10}
            onChangeCommitted={(event, value) => onChange({ maxThrows: value })}
            color='secondary'
            disabled={!settings.virtualDices}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SettingsManager
