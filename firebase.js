import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyD1uta2DsPP_cMRIE62OZeQ-zG_QkyStY8',
  authDomain: 'expo-firebase-107bf.firebaseapp.com',
  databaseURL: 'https://expo-firebase-107bf.firebaseio.com',
  projectId: 'expo-firebase-107bf',
  storageBucket: 'expo-firebase-107bf.appspot.com',
  messagingSenderId: '282802366388',
  appId: '1:282802366388:web:f55516fe77e7417ec274e1',
  measurementId: 'G-Y30CT4Q334',
}
try {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }
} catch (error) {
  console.log(error.message)
}

export default firebase
