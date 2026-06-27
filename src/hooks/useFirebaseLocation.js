import { useState, useEffect } from 'react'
import { ref, onValue } from 'firebase/database'
import { db } from '../firebase'

/**
 * Subscribes to real-time rider positions from Firebase Realtime Database.
 *
 * @returns {{ locations: { flo: { lat, lng, ts } | null, tade: { lat, lng, ts } | null } }}
 */
export default function useFirebaseLocation() {
  const [locations, setLocations] = useState({ flo: null, tade: null })

  useEffect(() => {
    const ridersRef = ref(db, 'riders')
    const unsub = onValue(ridersRef, (snap) => {
      const data = snap.val() ?? {}
      setLocations({
        flo: data.flo ?? null,
        tade: data.tade ?? null,
      })
    })
    return unsub
  }, [])

  return { locations }
}
