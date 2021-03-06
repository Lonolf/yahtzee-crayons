import { playerModel } from 'models/playerModel'

const statusesList = ['started', 'finished']

const calcTotalScore = ({ playerScores }) =>
  Object.values()

const calcWinner = ({ gameScores }) => Object.values(gameScores)
  .map(({ playerId, playerScores }) => ({ playerId, playerTotalScore: calcTotalScore({ playerScores }) }))
  .reduce((winner, { playerId, playerTotalScore }) =>
    playerTotalScore > winner.playerTotalScore
      ? ({ playerId, playerTotalScore })
      : playerTotalScore > winner.playerTotalScore
        ? ({ playerId: 'draw', playerTotalScore })
        : winner,
  ({ playerId: null, playerTotalScore: 0 }))

export const gameModel = ({
  gameId = null,
  gameScores = {},
  players = {},
  status = 'started',
}) => ({
  gameId: gameId ? String(gameId) : null,
  gameScores: { ...(gameScores ?? {}) },
  players: Object.values(players)
    .reduce((list, player) => {
      const modeledPlayer = playerModel(player)
      return ({ ...list, [modeledPlayer.playerId]: modeledPlayer })
    }, {}),
  status: statusesList.includes(status) ? status : statusesList[0],
  winner: calcWinner({ gameScores }),
})
