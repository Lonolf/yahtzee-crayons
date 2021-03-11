import firebase from 'utility/firebase'
import { gameModel } from 'models/gameModel'

export const watchGame = async({ gameId, setGame = () => {} }) => {
  try {
    await firebase.setWatchDocument({
      collectionId: 'games',
      docId: gameId,
      setChanges: ({ data }) => setGame(data),
    })
  } catch (error) {
    console.error(error)
    return null
  }
}

export const createGame = async({ player }) => {
  try {
    const game = gameModel({ players: { [player.playerId]: player } })
    const gameId = await firebase.addCollectionDoc({
      collectionId: 'games',
      idName: 'gameId',
      data: game,
    })

    return gameId
  } catch (error) {
    console.error(error)
    return null
  }
}

export const loadGame = async({ gameId, player }) => {
  const game = await firebase.getCollectionDoc({
    collectionId: 'games',
    docId: gameId,
  })

  if (game?.players?.[player.playerId] != null)
    return true

  if (game.status === 'finished')
    throw new Error('This game is already finished and you weren\'t a player')

  if (Object.keys(game.players ?? {}).length >= game.settings?.players)
    throw new Error('Players limit reached')

  const newGame = gameModel({
    ...game,
    players: { ...game.players, [player.playerId]: player },
  })

  await firebase.setCollectionDoc({
    collectionId: 'games',
    docId: gameId,
    data: newGame,
  })

  return true
}

export const saveGame = async({ game }) => {
  try {
    const newGame = gameModel(game)
    await firebase.setCollectionDoc({
      collectionId: 'games',
      docId: game.gameId,
      data: newGame,
    })

    return newGame
  } catch (error) {
    console.error(error)
    return false
  }
}
