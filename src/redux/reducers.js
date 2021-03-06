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
  }
}, {})

const user = produce((draft, { type, payload }) => {
  switch (type) {
    case actions.REDUCE_EDIT_USER:
      return ({ ...draft, ...payload })
  }
}, initialState.user)

const rootReducer = combineReducers({
  game,
  user,
})

export default rootReducer
