import firebase from 'utility/firebase'

export const createGame = async({ game }) => {
  try {
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
