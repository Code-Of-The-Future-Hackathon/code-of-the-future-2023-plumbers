const getURL = (queryString) =>
  `https://overpass-api.de/api/interpreter?${queryString}`;

async function getElementsAsync(url) {
  const response = await fetch(url);
  const data = await response.json();

  return data.elements;
}

async function getGreenSpaceObjectsInRangeAsync(center, radius) {
  const url = getURL(
    `data=[out:json];(node(around:${radius}, ${center.lat}, ${center.lon});<;);out body;`
  );
  console.log(url);
  const data = await getElementsAsync(url);
  return data;
}

module.exports = { getGreenSpaceObjectsInRangeAsync };
