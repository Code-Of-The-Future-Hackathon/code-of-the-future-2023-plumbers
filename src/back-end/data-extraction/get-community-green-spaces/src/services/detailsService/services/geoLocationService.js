function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function getDistanceBetweenCoordinates(coord1, coord2) {
  if (!coord1 || !coord2) {
    return 0;
  }

  const earthRadiusMeters = 6378000; // Earth's radius in meters

  const dLat = degreesToRadians(coord2.lat - coord1.lat);
  const dLon = degreesToRadians(coord2.lon - coord1.lon);

  const lat1 = degreesToRadians(coord1.lat);
  const lat2 = degreesToRadians(coord2.lat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusMeters * c; // Distance in meters
}

function getCenter(coords) {
  let latSum = 0;
  let lonSum = 0;

  coords.forEach((coord) => {
    latSum += coord.lat;
    lonSum += coord.lon;
  });

  const avgLat = latSum / coords.length;
  const avglon = lonSum / coords.length;

  return { lat: avgLat, lon: avglon };
}

function getBiggestHalfDiagonal(edges, center) {
  return Math.max(
    ...edges.map((x) => getDistanceBetweenCoordinates(x, center))
  );
}

function isPointInZone(coordinates, point) {
  let crossings = 0;

  for (let i = 0; i < coordinates.length; i++) {
    let j = (i + 1) % coordinates.length;

    if (
      (coordinates[i].lat <= point.lat && coordinates[j].lat > point.lat) ||
      (coordinates[j].lat <= point.lat && coordinates[i].lat > point.lat)
    ) {
      let intersectLon =
        ((coordinates[j].lon - coordinates[i].lon) *
          (point.lat - coordinates[i].lat)) /
          (coordinates[j].lat - coordinates[i].lat) +
        coordinates[i].lon;

      if (intersectLon > point.lon) {
        crossings++;
      }
    }
  }

  return crossings % 2 != 0;
}

function getDataInZone(data, edges) {
  return data.filter((x) => isPointInZone(edges, x));
}

function calculatePolylineArea(coords) {
  let area = 0;
  const n = coords.length;
  const earthRadius = 6371;

  if (n < 3) return 0; // Not a polygon

  for (let i = 0; i < n; i++) {
    let j = (i + 1) % n;

    let x1 =
      degreesToRadians(coords[i].lon) *
      earthRadius *
      Math.cos(degreesToRadians(coords[i].lat));
    let y1 = degreesToRadians(coords[i].lat) * earthRadius;
    let x2 =
      degreesToRadians(coords[j].lon) *
      earthRadius *
      Math.cos(degreesToRadians(coords[j].lat));
    let y2 = degreesToRadians(coords[j].lat) * earthRadius;

    area += x1 * y2 - x2 * y1;
  }

  return Math.abs(area / 2);
}

module.exports = {
  getCenter,
  getBiggestHalfDiagonal,
  getDataInZone,
  calculatePolylineArea,
  getDistanceBetweenCoordinates,
};
