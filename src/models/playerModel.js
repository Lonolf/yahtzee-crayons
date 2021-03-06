import uniqid from 'uniqid'

export const playerModel = ({
  playerId = null,
  userId = null,
  playerName = null,
  userName = null,
  playerEmail = null,
  userEmail = null,
}) => ({
  playerId: String(playerId ?? userId ?? uniqid()),
  playerName: String(playerName ?? userName ?? ''),
  playerEmail: String(playerEmail ?? userEmail ?? ''),
})
