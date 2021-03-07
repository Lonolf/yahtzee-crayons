import { createSelector } from 'reselect'
import { rowsNumber } from 'config/gameConfig'

const getPlayersSets = state => Object.entries(state.game?.players || {})
  .reduce((list, [playerId, player]) => ({ ...list, [playerId]: (player.playerScores || {}) }), {})

export const getCurrentSets = createSelector(
  [getPlayersSets],
  playersSets => Object.entries(playersSets)
    .reduce((list, [playerId, sets]) => ({
      ...list,
      [playerId]: Object.entries(sets)
        .sort(([a], [b]) => a > b ? -1 : 1)
        .reduce((currentSetId, [setId, setScores]) =>
          Object.keys(setScores).length < rowsNumber ? setId : currentSetId, String(Number(Object.keys(sets).length) + 1)),
    }), {}),
)

export const getPlayersTotals = createSelector(
  [getPlayersSets],
  playersSets => Object.entries(playersSets)
    .reduce((list, [playerId, sets]) => ({
      ...list,
      [playerId]: Object.entries(sets)
        .map(([setId, setScores]) => ({ setId, score: Object.values(setScores).reduce((sum, value) => sum + value, 0) }))
        .reduce((list, { setId, score }) => ({ ...list, [setId]: score }), {}),
    }), {}),
)
