const getURL = (queryString) =>
  `https://overpass-api.de/api/interpreter?${queryString}`;

async function getData(url) {
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

async function getRelationAsync(name) {
  const url = getURL(`[out:json];
        (
            relation["type"="boundary"]["boundary"="administrative"]["admin_level"=7]["name:en"="${name}"];
            >;
        );
        out;`);

  return getData(url);
}

async function getLeisureInRelationAsync(leisure, relation) {
  const url = getURL(`[out:json];
                        rel(${relation});
                        map_to_area->.a;
                        (
                        way(area.a)["leisure"="${leisure}"];
                        node(area.a)["leisure"="${leisure}"];
                        );
                        out geom;`);

  return getData(url);
}

module.exports = { getRelationAsync, getLeisureInRelationAsync };
