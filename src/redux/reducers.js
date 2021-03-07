import { combineReducers } from 'redux'

import produce from 'immer'

import * as actions from './actions'
import * as initialState from './initialState'

const game = produce((draft, { type, payload }) => {
  switch (type) {
    case actions.REDUCE_CREATE_GAME:
      return payload
    case actions.REDUCE_EDIT_GAME:
      return ({ ...draft, ...payload })
    case actions.REDUCE_EDIT_SCORE:
      if (draft.players[payload.playerId].playerScores[payload.setId] == null)
        draft.players[payload.playerId].playerScores[payload.setId] = {}

      draft.players[payload.playerId].playerScores[payload.setId][payload.label] = payload.value
      return draft
  }
}, {})

const loading = produce((draft, { type, payload }) => {
  switch (type) {
    case actions.START_LOADING:
      return ([...draft, payload])
    case actions.STOP_LOADING:
      return draft.filter(value => value !== payload)
  }
}, [])

const user = produce((draft, { type, payload }) => {
  switch (type) {
    case actions.REDUCE_EDIT_USER:
      return ({ ...draft, ...payload })
  }
}, initialState.user)

const rootReducer = combineReducers({
  game,
  loading,
  user,
})

export default rootReducer
