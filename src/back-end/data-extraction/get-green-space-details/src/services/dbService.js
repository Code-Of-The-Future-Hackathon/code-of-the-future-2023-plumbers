async function doesGreenSpaceExistAsync(db, communityName, id, type) {
  const greenSpaceRef = db
    .collection("towns")
    .doc(communityName)
    .collection(type)
    .doc(id);

  const snapshot = await greenSpaceRef.get();

  return snapshot;
}

async function getGreenSpaceEdgesAsync(db, communityName, id, type) {
  const greenSpaceRef = db
    .collection("towns")
    .doc(communityName)
    .collection(type)
    .doc(id);

  const snapshot = await greenSpaceRef.get();

  if (snapshot.empty) {
    return null;
  }

  return snapshot.data().geometry;
}

async function storeGreenSpaceObjectsAsync(db, communityName, id, type, data) {
  const greenSpaceObjectsRef = db
    .collection("towns")
    .doc(communityName)
    .collection(type)
    .doc(id);

  return greenSpaceObjectsRef.set({ data }, { merge: true });
}

module.exports = {
  doesGreenSpaceExistAsync,
  getGreenSpaceEdgesAsync,
  storeGreenSpaceObjectsAsync,
};
