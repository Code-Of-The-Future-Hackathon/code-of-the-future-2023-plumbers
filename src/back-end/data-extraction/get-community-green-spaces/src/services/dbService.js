const greenSpaceService = require("./detailsService/services/greenSpaceService");

async function isCommunityDataUploadedAsync(db, communityName) {
  const doc = await db.collection("towns").doc(communityName).get();

  return doc.exists;
}

function uploadGreenSpacesAsync(db, communityName, type, data) {
  const greenSpacesOfTypeRef = db
    .collection("towns")
    .doc(communityName)
    .collection(type);

  return Promise.all(
    data.map(async (x) => {
      const greenSpaceOfTypeRef = greenSpacesOfTypeRef.doc();
      await greenSpaceOfTypeRef.set(x);
      try {
        await greenSpaceService.getGreenSpaceDetailsAsync(
          db,
          communityName,
          greenSpaceOfTypeRef.id,
          type
        );
      } catch {}
    })
  );
}

function setCommunityCenterAsync(db, communityName, center) {
  const communityRef = db.collection("towns").doc(communityName);

  return communityRef.set({ center });
}

module.exports = {
  isCommunityDataUploadedAsync,
  uploadGreenSpacesAsync,
  setCommunityCenterAsync,
};
