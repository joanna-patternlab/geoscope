let map;
let marker;

export function initMap() {
  if (map) return;
  map = L.map('map').setView([-9.467, 147.196], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    referrerPolicy: 'strict-origin-when-cross-origin'
  }).addTo(map);
}

export function showMapLocation(lat, lon, label) {
  if (!map) return;
  map.setView([lat, lon], 10);

  if (marker) {
    marker.setLatLng([lat, lon]).bindPopup(label);
  } else {
    marker = L.marker([lat, lon]).addTo(map).bindPopup(label);
  }

  marker.openPopup();
}