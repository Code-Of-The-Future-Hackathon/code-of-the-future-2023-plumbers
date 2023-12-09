async function isCommunityDataUploadedAsync(db, communityName) {
  const doc = await db.collection("towns").doc(communityName).get();

  return doc.exists;
}

function uploadGreenSpacesAsync(db, communityName, type, data) {
  const greenSpaceOfTypeRef = db
    .collection("towns")
    .doc(communityName)
    .collection(type);

  return Promise.all(data.map((x) => greenSpaceOfTypeRef.doc().set(x)));
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
