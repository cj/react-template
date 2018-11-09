import firebase from '.'
import './auth'

require('firebase/firestore')

const firestore = firebase.firestore()

firestore.settings({
  timestampsInSnapshots: true,
})

firebase.auth()

// https://firebase.google.com/docs/firestore/manage-data/enable-offline
firebase
  .firestore()
  .enablePersistence({ experimentalTabSynchronization: true })
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    } else if (err.code === 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
  })

export default firestore
