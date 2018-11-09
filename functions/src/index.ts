/* eslint-disable import/no-extraneous-dependencies */
import * as functions from 'firebase-functions'

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!')
})

export const newUser = functions.auth.user().onCreate((userRecord, context) => {
  console.log(userRecord)
  console.log(context)

  return true
})
