import { getDistanceInKm } from "./geo";

// export async function fetchNearbyPharmacies(lat, lng) {
//   const radius = 5000; // 5km search radius
//   const query = `
//       [out:json];
//       node["amenity"="pharmacy"](around:${radius},${lat},${lng});
//       out body;
//     `;

//   const response = await fetch("https://overpass-api.de/api/interpreter", {
//     method: "POST",
//     body: query,
//   });

//   const data = await response.json();

//   const pharmacies = data.elements.map((el) => ({
//     id: el.id,
//     name: el.tags.name || "Unnamed Pharmacy",
//     // address: el.tags["addr:street"] || "Address not available",
//     address: getAddress(el),
//     lat: el.lat,
//     lng: el.lon,
//     distance: getDistanceInKm(lat, lng, el.lat, el.lon).toFixed(1),
//   }));

//   return pharmacies;
// }

export async function fetchNearbyPlaces(lat, lng, amenityTag) {
  const radius = 5000; // 5km search radius
  const query = `
        [out:json];
        node["amenity"~"${amenityTag}"](around:${radius},${lat},${lng});
        out body;
      `;

  const response = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body: query,
  });

  const data = await response.json();

  return data.elements.map((el) => ({
    id: el.id,
    name: el.tags.name || "Unnamed",
    // address: el.tags["addr:street"] || "Address not available",
    address: getAddress(el),
    lat: el.lat,
    lng: el.lon,
    distance: getDistanceInKm(lat, lng, el.lat, el.lon).toFixed(1),
  }));
}

function getAddress(el) {
  const tags = el.tags;

  // Try full address first
  if (tags["addr:full"]) return tags["addr:full"];

  // Try building street + housenumber if both exist
  if (tags["addr:street"] && tags["addr:housenumber"]) {
    return `${tags["addr:housenumber"]} ${tags["addr:street"]}`;
  }

  // Just street, no house number
  if (tags["addr:street"]) return tags["addr:street"];

  // Nothing usable — fall back to coordinates
  return `Near ${el.lat.toFixed(4)}, ${el.lon.toFixed(4)}`;
}
