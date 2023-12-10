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

  let elements = await getElementsAsync(url);

  const ids = {};
  let copyElements = [];
  await Promise.all(
    elements.map(async (x) => {
      if (ids[x.id]) {
        return;
      }
      ids[x.id] = true;
      x.name = await getGreenSpaceName(x.id);
      if (!x.name) {
        x.name = "";
      }
      copyElements.push(x);
    })
  );

  return copyElements.map((x) => {
    return { id: x.id, name: x.name, type: x.type, geometry: x.geometry };
  });
}

async function getCommunityCenterAsync(communityName) {
  const url = getURL(
    `data=[out:json];area["name:en"=${communityName}]->.searchArea;(node(area.searchArea)["place"="city"];);out;`
  );

  const elements = await getElementsAsync(url);
  const community = elements[0];
  return { lat: community.lat, lng: community.lon };
}

async function getGreenSpaceName(id) {
  const url = getURL(`data=[out:json];way(${id});out;`);
  try {
    const elements = await getElementsAsync(url);
    return elements[0].tags.name;
  } catch (e) {
    return "";
  }
}

module.exports = {
  getRelationIdAsync,
  getGreenSpacesOfTypeInRelationAsync,
  getCommunityCenterAsync,
};
