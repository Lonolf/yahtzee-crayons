export const rows = [
  { label: 'aces' },
  { label: 'twos' },
  { label: 'threes' },
  { label: 'fours' },
  { label: 'fives' },
  { label: 'six' },
  { label: 'threeOf' },
  { label: 'fourOf' },
  { label: 'fullHouse' },
  { label: 'smSt' },
  { label: 'lgSt' },
  { label: 'free' },
  { label: 'yahtzee' },
]

export const rowsNumber = rows.length

export const getSets = game => Object.entries(game?.players || {})
  .reduce((list, [playerId, player]) => ({ ...list, [playerId]: (player.playerScores || {}) }), {})

const nextSetId = (sets = {}) => String(Number(Object.keys(sets).length) + 1)

export const calcCurrentSet = ({ sets = {} } = {}) =>
  Object.entries(sets)
    .sort(([a], [b]) => a > b ? -1 : 1)
    .reduce((currentSetId, [setId, setScores]) =>
      Object.keys(setScores).length < rowsNumber ? setId : currentSetId, nextSetId(sets))

export const calcSetsTotal = ({ sets = {} } = {}) => {
  return Object.entries(sets)
    .map(([setId, setScores]) => ({
      setId,
      score: Object.values(setScores).reduce((sum, value) => sum + value, 0),
    }))
    .reduce((list, { setId, score }) => ({ ...list, [setId]: score }), {})
}

const calcSetsWinners = (playersSetsTotals = {}) =>
  Object.entries(playersSetsTotals)
    .reduce((setsList, [playerId, sets]) => {
      Object.entries(sets).forEach(([setId, total]) => {
        if (setsList[setId] == null) setsList[setId] = {}

        if (setsList[setId]?.playerId == null || setsList[setId]?.total < total)
          setsList[setId] = { playerId, total }
        else if (setsList[setId]?.total === total)
          setsList[setId] = { playerId: 'draw', total }
      })
      return setsList
    }, {})

const calcPlayersTotals = (setsList = {}) =>
  Object.values(setsList)
    .filter(({ playerId }) => playerId !== 'draw')
    .reduce((list, { playerId, total }) => ({
      ...list,
      [playerId]: { sets: (list[playerId]?.sets ?? 0) + 1, total: (list[playerId]?.total ?? 0) + total },
    }), {})

const calcGameWinner = (playersTotals = {}) =>
  Object.entries(playersTotals)
    .reduce((winner, [playerId, { sets, total }]) =>
      winner.playerId == null || sets > winner.sets || (sets === winner.sets && total > winner.total)
        ? ({ playerId, sets, total })
        : sets === winner.sets && total === winner.total
          ? ({ playerId: 'draw', sets, total })
          : winner,
    { playerId: null, sets: 0, total: 0 })

export const calcWinner = ({ playersSets } = {}) =>
  calcGameWinner(calcPlayersTotals(calcSetsWinners(
    Object.entries(playersSets).reduce((list, [playerId, sets]) =>
      ({ ...list, [playerId]: calcSetsTotal({ sets }) }), {}),
  )))

export const checkGameFinished = ({ game = {} } = {}) =>
  !Object.values(getSets(game))
    .some(sets => calcCurrentSet({ sets }) <= game?.settings?.sets)
