import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyALf4x071zb0Iy4jN_RcRaa_MJuQDKGOCw',
  authDomain: 'devlink-938fe.firebaseapp.com',
  projectId: 'devlink-938fe',
  storageBucket: 'devlink-938fe.appspot.com',
  messagingSenderId: '155832229569',
  appId: '1:155832229569:web:88c210b167cedee0d37e40',
  measurementId: 'G-THTV6D5T8M'
}

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

export { db, auth }
