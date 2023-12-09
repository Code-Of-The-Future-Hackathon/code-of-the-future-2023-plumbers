const openStreetMapService = require("./openStreetMapService");
const dbService = require("./dbService");
const geoLocationService = require("./geoLocationService");

function prepareData(edges, data) {
  function getBenches(data) {
    return data.filter((x) => {
      return x.tags.amenity == "bench";
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
        x.tags.leisure == "playground" ||
        x.tags.shop == "convenience" ||
        x.tags.amenity == "cafe" ||
        x.tags.leisure == "dog_park"
      );
    });
  }

  return {
    area: geoLocationService.calculatePolygonArea(edges),
    benches: getBenches(data),
    alleys: getAlleys(data),
    facilities: getFacilities(data),
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
    return greenSpace.data();
  }

  const edges = await dbService.getGreenSpaceEdgesAsync(
    db,
    communityName,
    greenSpaceId,
    greenSpaceType
  );
  const center = geoLocationService.getCenter(edges);
  const radius = geoLocationService.getBiggestHalfDiagonal(edges, center);
  let data = await openStreetMapService.getGreenSpaceObjectsInRangeAsync(
    center,
    radius
  );
  data = geoLocationService.getDataInZone(data, edges);

  data = prepareData(edges, data);

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
