const getURL = (queryString) =>
  `https://overpass-api.de/api/interpreter?${queryString}`;

async function getLeisureInRelationAsync(leisure, relation) {
  const url = getURL(`[out:json];
                        rel(${relation});
                        map_to_area->.a;
                        (
                        way(area.a)["leisure"="${leisure}"];
                        node(area.a)["leisure"="${leisure}"];
                        );
                        out geom;`);

  const response = await fetch(url);
  const data = await response.json();

  return data;
}

module.exports = { getLeisureInRelationAsync };
