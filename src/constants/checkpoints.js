// Official Race Across Germany 2026 — North-South route checkpoints
// Coordinates verified via geographic databases; confirm against official GPX when released ~1 week before race
export const CHECKPOINTS = [
  { id: 'cp1', name: 'CP1 – Lauenburg', lat: 53.3689, lng: 10.5594 },           // Lauenburg/Elbe, Schleswig-Holstein
  { id: 'cp2', name: 'CP2 – Bilderlahe', lat: 51.8906, lng: 10.1258 },          // Bilderlahe, Seesen, Goslar, Lower Saxony (verified via mapcarta/geonames ~km 476)
  { id: 'cp3', name: 'CP3 – Berka', lat: 50.9394, lng: 10.0700 },               // Berka/Werra, Wartburgkreis, Thuringia (verified via Wikipedia ~km 623)
  { id: 'cp4', name: 'CP4 – Kitzingen', lat: 49.7432, lng: 10.1639 },           // Kitzingen, Bavaria, Main river (~km 791)
  { id: 'cp5', name: 'CP5 – Mauren', lat: 48.7564, lng: 10.6694 },              // Mauren, Harburg, Donau-Ries, Bavaria (~km 933) — confirm exact checkpoint venue vs GPX
  { id: 'cp6', name: 'CP6 – Moorenweis', lat: 48.1667, lng: 11.0667 },          // Moorenweis, near Fürstenfeldbruck, Bavaria (~km 1026)
]

export const START = { name: 'Flensburg', lat: 54.7833, lng: 9.4333 }
export const FINISH = { name: 'Garmisch-Partenkirchen', lat: 47.4979, lng: 11.0939 }
