import firebase from 'utility/firebase'

export const login = async({ type, email, password, name }) => {
  try {
    switch (type) {
      case 'google':
        return firebase.googleSignIn()
      case 'email':
        return firebase.emailSignIn({ email, password })
      case 'emailRegister':
        return firebase.emailSignUp({ email, password, name })
      default:
        throw new Error('Login type not found')
    }
  } catch (error) {
    console.error(error)
    return false
  }
}
