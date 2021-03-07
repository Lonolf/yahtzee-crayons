import { playerModel } from 'models/playerModel'

const statusesList = ['started', 'finished']

const calcTotalScore = ({ playerScores }) =>
  Object.values(playerScores).reduce((sum, value) => sum + value, 0)

const calcWinner = ({ players }) => Object.values(players)
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
  players = {},
  status = 'started',
  settings = { sets: 3, players: 2 },
}) => ({
  gameId: gameId ? String(gameId) : null,
  players: Object.values(players)
    .reduce((list, player) => {
      const modeledPlayer = playerModel(player)
      return ({ ...list, [modeledPlayer.playerId]: modeledPlayer })
    }, {}),
  settings, // TODO: validate settings
  status: statusesList.includes(status) ? status : statusesList[0],
  winner: calcWinner({ players }),
})
