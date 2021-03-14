const calcSimplePoints = ({ dices = [], value = 1 }) =>
  dices.filter(dice => dice.value === value).length * value

const calcValuesNumber = (dices = []) => dices // return { 1: 0, 2: 0, 3: 0 }
  .reduce((list, dice) => ({ ...list, [dice?.value ?? 0]: (list[dice?.value ?? 0] ?? 0) + 1 }), {})

const calcMinimumDicesNumber = ({ dices = [], number = 1 }) =>
  Object.values(calcValuesNumber(dices)).some(dicesNumber => dicesNumber >= number)

const sumDices = (dices = []) => dices
  .reduce((sum, { value = 0 }) => sum + value, 0)

const calcFullHouse = dices => Object.keys(calcValuesNumber(dices)).length === 2

const calcStraights = (dices = []) =>
  dices.map(({ value }) => value).sort((a, b) => a - b)
    .reduce((straights, value, index, values) => {
      values[index - 1] === (value - 1)
        ? straights[straights.length - 1]++
        : straights.push(1)
      return straights
    }, [0])

const minStraight = ({ dices = [], min = 0 }) =>
  calcStraights(dices).some(number => number >= min)

export const rows = {
  aces: { index: 0, label: 'aces', calcPoints: dices => calcSimplePoints({ dices, value: 1 }) },
  twos: { index: 1, label: 'twos', calcPoints: dices => calcSimplePoints({ dices, value: 2 }) },
  threes: { index: 2, label: 'threes', calcPoints: dices => calcSimplePoints({ dices, value: 3 }) },
  fours: { index: 3, label: 'fours', calcPoints: dices => calcSimplePoints({ dices, value: 4 }) },
  fives: { index: 4, label: 'fives', calcPoints: dices => calcSimplePoints({ dices, value: 5 }) },
  sixes: { index: 5, label: 'sixes', calcPoints: dices => calcSimplePoints({ dices, value: 6 }) },
  threeOf: { index: 6, label: 'threeOf', calcPoints: dices => calcMinimumDicesNumber({ dices, number: 3 }) ? sumDices(dices) : 0 },
  fourOf: { index: 7, label: 'fourOf', calcPoints: dices => calcMinimumDicesNumber({ dices, number: 4 }) ? sumDices(dices) : 0 },
  fullHouse: { index: 8, label: 'fullHouse', points: 25, calcPoints: dices => calcFullHouse(dices) ? 25 : 0 },
  smSt: { index: 9, label: 'smSt', points: 30, calcPoints: dices => minStraight({ dices, min: 4 }) ? 30 : 0 },
  lgSt: { index: 10, label: 'lgSt', points: 40, calcPoints: dices => minStraight({ dices, min: 5 }) ? 40 : 0 },
  free: { index: 11, label: 'free', calcPoints: dices => sumDices(dices) },
  yahtzee: { index: 12, label: 'yahtzee', points: 50, calcPoints: dices => calcMinimumDicesNumber({ dices, number: 5 }) ? 50 : 0 },
}

export const rowsList = Object.values(rows)
  .sort((a, b) => a.index > b.index ? 1 : -1)

export const rowsNumber = rowsList.length

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
