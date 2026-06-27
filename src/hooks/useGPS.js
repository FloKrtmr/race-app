import { useState, useEffect } from 'react'

/**
 * Watches the device's GPS position via the browser Geolocation API.
 * Intended for the support car view.
 *
 * @returns {{ position: { lat: number, lng: number, speed: number | null } | null, error: string | null }}
 */
export default function useGPS() {
  const [position, setPosition] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('GPS nicht verfügbar')
      return
    }
    const id = navigator.geolocation.watchPosition(
      (pos) => setPosition({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        speed: pos.coords.speed,
      }),
      (err) => setError(err.message),
      { enableHighAccuracy: true }
    )
    return () => navigator.geolocation.clearWatch(id)
  }, [])

  return { position, error }
}
