import { useEffect } from 'react'
import { MapContainer, TileLayer, Polyline, CircleMarker, Popup, useMap } from 'react-leaflet'

function buildCenter(polyline) {
  if (!polyline?.length) return [51.5, 10.0]
  const mid = polyline[Math.floor(polyline.length / 2)]
  return [mid[0], mid[1]]
}

function FitBoundsOnLoad({ polyline }) {
  const map = useMap()
  useEffect(() => {
    if (polyline?.length > 1) {
      map.fitBounds(polyline)
    }
  }, [])
  return null
}

export default function RaceMap({ polyline, carPosition, floPosition, tadePosition, checkpoints, onCheckpointToggle }) {
  const center = buildCenter(polyline)

  return (
    <MapContainer center={center} zoom={7} className="h-[50vh] w-full rounded-xl z-0">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <FitBoundsOnLoad polyline={polyline} />

      {polyline?.length > 1 && <Polyline positions={polyline} color="#3b82f6" weight={3} />}

      {carPosition && (
        <CircleMarker center={[carPosition.lat, carPosition.lng]} radius={10} color="#ffffff" fillColor="#6b7280" fillOpacity={1}>
          <Popup>🚗 Support-Auto</Popup>
        </CircleMarker>
      )}

      {floPosition && (
        <CircleMarker center={[floPosition.lat, floPosition.lng]} radius={10} color="#3b82f6" fillColor="#3b82f6" fillOpacity={1}>
          <Popup>🔵 Flo</Popup>
        </CircleMarker>
      )}

      {tadePosition && (
        <CircleMarker center={[tadePosition.lat, tadePosition.lng]} radius={10} color="#f97316" fillColor="#f97316" fillOpacity={1}>
          <Popup>🟠 Tade</Popup>
        </CircleMarker>
      )}

      {checkpoints?.map(cp => (
        <CircleMarker
          key={cp.id}
          center={[cp.lat, cp.lng]}
          radius={8}
          color={cp.reached ? '#4ade80' : '#fbbf24'}
          fillColor={cp.reached ? '#4ade80' : '#fbbf24'}
          fillOpacity={0.9}
          eventHandlers={{ click: () => onCheckpointToggle(cp.id) }}
        >
          <Popup>{cp.reached ? '✅ ' : '🏁 '}{cp.name}</Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  )
}
