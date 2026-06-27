import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

// IMPORTANT: Replace these placeholder values with your real Firebase project config.
// Get them from: Firebase Console → Project Settings → Your Apps → SDK setup and configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCuFvB5beO9RaF1m3hGt4WLFEUoi1jT20",
  authDomain: "race-app-c5009.firebaseapp.com",
  databaseURL: "https://race-app-c5009-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "race-app-c5009",
  storageBucket: "race-app-c5009.firebasestorage.app",
  messagingSenderId: "365054858511",
  appId: "1:365054858511:web:da3b0dc212798d14535a7a"
}

const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)
