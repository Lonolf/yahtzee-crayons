import { playerModel } from 'models/playerModel'

const statusesList = ['started', 'finished']

export const gameModel = ({
  gameId = null,
  players = {},
  status = 'started',
  settings = { sets: 3, players: 2 },
  winner = null,
  startDate = null,
  endDate = null,
}) => ({
  gameId: gameId ? String(gameId) : null,
  players: Object.values(players)
    .reduce((list, player) => {
      const modeledPlayer = playerModel(player)
      return ({ ...list, [modeledPlayer.playerId]: modeledPlayer })
    }, {}),
  settings, // TODO: validate settings
  status: statusesList.includes(status) ? status : statusesList[0],
  winner: players[winner] != null ? winner : null,
  startDate: startDate || new Date(),
  endDate: endDate || (status === 'finished' ? new Date() : null),
})
