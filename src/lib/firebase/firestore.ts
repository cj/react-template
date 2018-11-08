import firebase from '.'

require('firebase/firestore')

const firestore = firebase.firestore()

const settings = {
  timestampsInSnapshots: true,
}

firestore.settings(settings)

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
