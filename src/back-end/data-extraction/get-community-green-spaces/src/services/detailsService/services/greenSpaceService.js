const openStreetMapService = require("./openStreetMapService");
const dbService = require("./dbService");
const geoLocationService = require("./geoLocationService");

function prepareData(edges, data) {
  function getBenches(data) {
    return data.filter((x) => {
      return x.tags && x.tags.amenity == "bench";
    });
  }

  function getAlleys(data) {
    return data.filter((x) => {
      return Object.entries(x).length == 4 && x.type && x.id && x.lat && x.lon;
    });
  }

  function getFacilities(data) {
    return data.filter((x) => {
      return (
        x.tags &&
        (x.tags.leisure == "playground" ||
          x.tags.shop == "convenience" ||
          x.tags.amenity == "cafe" ||
          x.tags.leisure == "dog_park")
      );
    });
  }

  const areaInSquareKms = geoLocationService.calculatePolylineArea(edges);
  const alleys = getAlleys(data);
  const alleysLengthInMeters = alleys.reduce(
    (accumulator, x, i) =>
      accumulator +
      geoLocationService.getDistanceBetweenCoordinates(x, alleys[i + 1]),
    0
  );
  const alleysAreaInSquareKms = alleysLengthInMeters * 1.8 * 1e-6;
  const greenSpacesAreaInSquareKms = areaInSquareKms - alleysAreaInSquareKms;

  return {
    benches: getBenches(data),
    facilities: getFacilities(data),
    areaInSquareKms,
    alleys,
    alleysLengthInMeters,
    alleysAreaInSquareKms,
    greenSpacesAreaInSquareKms,
  };
}

async function getGreenSpaceDetailsAsync(
  db,
  communityName,
  greenSpaceId,
  greenSpaceType
) {
  let greenSpace = await dbService.doesGreenSpaceExistAsync(
    db,
    communityName,
    greenSpaceId,
    greenSpaceType
  );

  if (!greenSpace) {
    return null;
  }

  if (greenSpace.details) {
    return greenSpace;
  }

  const edges = greenSpace.geometry;
  const center = geoLocationService.getCenter(edges);
  const radius = geoLocationService.getBiggestHalfDiagonal(edges, center);
  let data = await openStreetMapService.getGreenSpaceObjectsInRangeAsync(
    center,
    radius
  );
  data = geoLocationService.getDataInZone(data, edges);

  data = prepareData(edges, data);
  data.center = center;

  await dbService.storeGreenSpaceObjectsAsync(
    db,
    communityName,
    greenSpaceId,
    greenSpaceType,
    data
  );

  return data;
}

module.exports = { getGreenSpaceDetailsAsync };
