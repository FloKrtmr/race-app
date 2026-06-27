import { useState, useEffect, useRef } from 'react'
import { ref, set } from 'firebase/database'
import { db } from '../firebase'

/**
 * Writes the rider's GPS position to Firebase Realtime Database on a live watch.
 *
 * @param {'flo' | 'tade'} rider - Which rider's node to write to.
 * @returns {{ sharing: boolean, error: string | null, startSharing: () => void }}
 */
export default function useShareLocation(rider) {
  const [sharing, setSharing] = useState(false)
  const [error, setError] = useState(null)
  const watchId = useRef(null)

  function startSharing() {
    if (!navigator.geolocation) {
      setError('GPS nicht verfügbar')
      return
    }
    setSharing(true)
    setError(null)
    watchId.current = navigator.geolocation.watchPosition(
      (pos) => {
        set(ref(db, `riders/${rider}`), {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          ts: Date.now(),
        })
      },
      (err) => setError(err.message),
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  useEffect(() => {
    return () => {
      if (watchId.current != null) {
        navigator.geolocation.clearWatch(watchId.current)
      }
    }
  }, [])

  return { sharing, error, startSharing }
}
