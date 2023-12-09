const openStreetMapService = require("./openStreetMapService");

async function sendCommunityGreenSpacesAsync(communityName, db, res) {
  const relationId = openStreetMapService.getRelationIdAsync(communityName);
  await sendCommunityGreenSpacesAsync(relationId);
}

module.exports = { sendCommunityGreenSpacesAsync };
