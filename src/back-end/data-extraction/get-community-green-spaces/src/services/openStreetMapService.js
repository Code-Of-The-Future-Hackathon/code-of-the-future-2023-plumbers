const getURL = (queryString) =>
  `https://overpass-api.de/api/interpreter?${queryString}`;

async function getElementsAsync(url) {
  const response = await fetch(url);
  const data = await response.json();

  return data.elements;
}

async function getRelationIdAsync(name) {
  const url = getURL(
    `data=[out:json];(relation["type"="boundary"]["boundary"="administrative"]["admin_level"=7]["name:en"=${name}];);out ids;`
  );
  const data = await getElementsAsync(url);
  return data[0].id;
}

async function getGreenSpacesOfTypeInRelationAsync(
  tagName,
  tagValue,
  relationId
) {
  const url = getURL(
    `data=[out:json];rel(${Number(
      relationId
    )});map_to_area->.a;(way(area.a)[${tagName}=${tagValue}];);out geom;`
  );

  const elements = await getElementsAsync(url);
  return elements.map((x) => {
    return { id: x.id, type: x.type, geometry: x.geometry };
  });
}

module.exports = { getRelationIdAsync, getGreenSpacesOfTypeInRelationAsync };
