import { combineReducers } from 'redux'

import produce from 'immer'

import * as actions from './actions'
import * as initialState from './initialState'

import uniqid from 'uniqid'

const error = produce((draft, { type, payload: { errorId, message } = {} }) => {
  switch (type) {
    case actions.REDUCE_CREATE_ERROR:
      const newErrorId = errorId ?? uniqid()
      return { ...draft, [newErrorId]: { message, errorId: newErrorId } }
    case actions.REDUCE_DELETE_ERROR:
      if (draft[errorId] != null)
        delete draft[errorId]
      return draft
    default:
      return draft
  }
}, {})

const game = produce((draft, { type, payload }) => {
  switch (type) {
    case actions.REDUCE_CREATE_GAME:
      return payload
    case actions.REDUCE_EDIT_GAME:
      return ({ ...draft, ...payload })
  }
}, {})

const gameboard = produce((draft, { type, payload }) => {
  switch (type) {
    case actions.REDUCE_EDIT_GAMEBOARD:
      return ({ ...draft, ...payload })
  }
}, initialState.gameboard)

const loading = produce((draft, { type, payload }) => {
  switch (type) {
    case actions.START_LOADING:
      return ([...draft, payload])
    case actions.STOP_LOADING:
      return draft.filter(value => value !== payload)
  }
}, initialState.loading)

const settings = produce((draft, { type, payload }) => {
  switch (type) {
    case actions.REDUCE_EDIT_SETTINGS:
      return ({ ...draft, ...payload })
  }
}, initialState.settings)

const user = produce((draft, { type, payload }) => {
  switch (type) {
    case actions.REDUCE_CREATE_USER:
      return payload
    case actions.REDUCE_EDIT_USER:
      return ({ ...draft, ...payload })
  }
}, initialState.user)

const rootReducer = combineReducers({
  error,
  game,
  gameboard,
  loading,
  settings,
  user,
})

export default rootReducer
