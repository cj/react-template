import firebase from 'firebase/app'

const config = {
  apiKey: 'AIzaSyDIsLAc5wDbtUhuSoz13b7ZEHLKONC_4kc',
  authDomain: 'vodr-local-cj.firebaseapp.com',
  databaseURL: 'https://vodr-local-cj.firebaseio.com',
  projectId: 'vodr-local-cj',
  storageBucket: 'vodr-local-cj.appspot.com',
  messagingSenderId: '49942236630',
}

firebase.initializeApp(config)

export default firebase
