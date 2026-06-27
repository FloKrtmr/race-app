export function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export function projectOnPolyline(lat, lng, polyline) {
  let minDist = Infinity
  let totalKm = 0
  let bestKmAlong = 0
  let segStart = 0

  for (let i = 0; i < polyline.length - 1; i++) {
    const [aLat, aLng] = polyline[i]
    const [bLat, bLng] = polyline[i + 1]
    const segLen = haversineKm(aLat, aLng, bLat, bLng)

    const t = Math.max(
      0,
      Math.min(
        1,
        ((lat - aLat) * (bLat - aLat) + (lng - aLng) * (bLng - aLng)) /
          ((bLat - aLat) ** 2 + (bLng - aLng) ** 2 || 1)
      )
    )
    const closeLat = aLat + t * (bLat - aLat)
    const closeLng = aLng + t * (bLng - aLng)
    const d = haversineKm(lat, lng, closeLat, closeLng)

    if (d < minDist) {
      minDist = d
      bestKmAlong = segStart + t * segLen
    }
    segStart += segLen
    totalKm += segLen
  }

  return {
    distanceKm: bestKmAlong,
    fraction: totalKm > 0 ? bestKmAlong / totalKm : 0,
    totalKm,
  }
}
