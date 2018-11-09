import { GoogleAuthProvider } from '@firebase/auth-types'
import firebase from '.'

require('firebase/auth')

type ProviderType = 'google'

interface Provider {
  google: GoogleAuthProvider
}

export const provider = {} as Provider

provider.google = new firebase.auth.GoogleAuthProvider()

export const signIn = (providerType: ProviderType) => {
  firebase
    .auth()
    .signInWithPopup(provider[providerType])
    .then((result) => {
      console.log(result)
    })
    .catch((error) => {
      console.log(error)
    })
}
