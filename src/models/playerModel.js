import uniqid from 'uniqid'

export const playerModel = ({
  playerId = null,
  userId = null,
  playerName = null,
  userName = null,
  playerEmail = null,
  userEmail = null,
  playerScores = {},
  loggedPlayer = false,
  playerPosition = 0,
}) => ({
  playerId: String(playerId ?? userId ?? uniqid()),
  playerName: String(playerName ?? userName ?? ''),
  playerEmail: String(playerEmail ?? userEmail ?? ''),
  playerScores: playerScores ?? {},
  loggedPlayer: Boolean(loggedPlayer || userId != null),
  playerPosition: Number(playerPosition),
})
