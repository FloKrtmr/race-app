import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

// IMPORTANT: Replace these placeholder values with your real Firebase project config.
// Get them from: Firebase Console → Project Settings → Your Apps → SDK setup and configuration
const firebaseConfig = {
  apiKey: 'REPLACE_WITH_FIREBASE_API_KEY',
  authDomain: 'REPLACE_WITH_PROJECT_ID.firebaseapp.com',
  databaseURL: 'REPLACE_WITH_DATABASE_URL',
  projectId: 'REPLACE_WITH_PROJECT_ID',
  storageBucket: 'REPLACE_WITH_PROJECT_ID.appspot.com',
  messagingSenderId: 'REPLACE_WITH_SENDER_ID',
  appId: 'REPLACE_WITH_APP_ID',
}

const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)
