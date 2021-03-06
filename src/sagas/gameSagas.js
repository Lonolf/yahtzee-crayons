import firebase from 'utility/firebase'
import { gameModel } from 'models/gameModel'

export const watchGame = async({ gameId, setGame = () => {} }) => {
  try {
    firebase.setWatchDocument({
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
  try {
    const game = await firebase.getCollectionDoc({
      collectionId: 'games',
      docId: gameId,
    })

    // TODO: check valid game

    if (game?.players?.[player.playerId] != null)
      return gameId

    // TODO: check maxNumber

    const newGame = gameModel({ ...game, players: { ...game.players, [player.playerId]: player } })

    await firebase.setCollectionDoc({
      collectionId: 'games',
      docId: gameId,
      data: newGame,
    })

    return gameId
  } catch (error) {
    console.error(error)
    return null
  }
}
