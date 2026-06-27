export function parseGpx(xmlString) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xmlString, 'application/xml')
  const points = doc.querySelectorAll('trkpt')
  return Array.from(points).map((pt) => [
    parseFloat(pt.getAttribute('lat')),
    parseFloat(pt.getAttribute('lon')),
  ])
}

export function downsample(points, maxPoints) {
  if (points.length <= maxPoints) return points
  const step = (points.length - 1) / (maxPoints - 1)
  const result = []
  for (let i = 0; i < maxPoints; i++) {
    result.push(points[Math.round(i * step)])
  }
  result[result.length - 1] = points[points.length - 1]
  return result
}
