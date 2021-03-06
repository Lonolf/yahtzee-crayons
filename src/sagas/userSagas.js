import firebase from 'utility/firebase'

export const login = async() => {
  try {
    await firebase.googleSignIn()
  } catch (error) {
    console.error(error)
  }
}
