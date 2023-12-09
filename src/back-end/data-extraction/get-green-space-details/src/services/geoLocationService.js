function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

function getDistanceBetweenCoordinates(coord1, coord2) {
  const earthRadiusMeters = 6371000; // Earth's radius in meters

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

function calculatePolygonArea(coords) {
  if (coords.length < 3) {
    return 0; // Not a polygon
  }

  const radius = 6371000; // Earth's radius in meters
  let totalAngle = 0;

  for (let i = 0; i < coords.length; i++) {
    const j = (i + 1) % coords.length;
    const k = (i + 2) % coords.length;

    const angle = calculateAngle(coords[i], coords[j], coords[k]);
    totalAngle += angle;
  }

  const sphericalExcess = totalAngle - (coords.length - 2) * Math.PI;
  return sphericalExcess * radius * radius;
}

function getDataInZone(data, edges) {
  return data.filter((x) => isPointInZone(edges, x));
}

module.exports = {
  getCenter,
  getBiggestHalfDiagonal,
  getDataInZone,
  calculatePolygonArea,
};
