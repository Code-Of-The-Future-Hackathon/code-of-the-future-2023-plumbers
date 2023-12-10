async function doesGreenSpaceExistAsync(db, communityName, id, type) {
  const greenSpaceRef = db
    .collection("towns")
    .doc(communityName)
    .collection(type)
    .doc(id);

  const snapshot = await greenSpaceRef.get();

  return snapshot.data();
}

async function storeGreenSpaceObjectsAsync(
  db,
  communityName,
  id,
  type,
  details
) {
  const greenSpaceObjectsRef = db
    .collection("towns")
    .doc(communityName)
    .collection(type)
    .doc(id);

  return greenSpaceObjectsRef.set({ details }, { merge: true });
}

module.exports = {
  doesGreenSpaceExistAsync,
  storeGreenSpaceObjectsAsync,
};
