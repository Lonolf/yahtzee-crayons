import { createSelector } from 'reselect'
import { getSets, calcCurrentSet, calcSetsTotal, calcWinner, checkGameFinished } from 'config/gameConfig'

const getGame = state => state.game
const getPlayersSets = state => getSets(state.game)

export const getCurrentSets = createSelector(
  [getPlayersSets],
  playersSets => Object.entries(playersSets)
    .reduce((list, [playerId, sets]) => ({
      ...list,
      [playerId]: calcCurrentSet({ sets }),
    }), {}),
)

export const getPlayersTotals = createSelector(
  [getPlayersSets],
  playersSets => Object.entries(playersSets)
    .reduce((list, [playerId, sets]) => ({
      ...list,
      [playerId]: calcSetsTotal({ sets }),
    }), {}),
)

export const getGameFinished = createSelector(
  [getGame],
  game => checkGameFinished({ game }),
)

export const getWinner = createSelector(
  [getPlayersSets],
  playersSets => calcWinner({ playersSets }),
)
