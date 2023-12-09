const openStreetMapService = require("./openStreetMapService");
const dbService = require("./dbService");
const typesOfGreenSpaces = [
  ["leisure", "garden"],
  ["leisure", "park"],
  ["natural", "grassland"],
  ["natural", "scrub"],
  ["landuse", "grass"],
];

async function uploadCommunityGreenSpacesAsync(communityName, db) {
  if (await dbService.isCommunityDataUploadedAsync(db, communityName)) {
    return;
  }

  const communityCenter = await openStreetMapService.getCommunityCenterAsync(
    communityName
  );
  await dbService.setCommunityCenterAsync(db, communityName, communityCenter);

  const relationId = await openStreetMapService.getRelationIdAsync(
    communityName
  );

  await Promise.all(
    typesOfGreenSpaces.map(async ([key, value]) => {
      const data =
        await openStreetMapService.getGreenSpacesOfTypeInRelationAsync(
          key,
          value,
          relationId
        );
      await dbService.uploadGreenSpacesAsync(db, communityName, value, data);
    })
  );
}

module.exports = { uploadCommunityGreenSpacesAsync };
