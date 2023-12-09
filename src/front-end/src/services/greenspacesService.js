import { collection, getDocs, getFirestore } from "firebase/firestore";

import { app } from "../../firebaseConfig";
import { GREEN_SPACES_COLORS } from "../constants";

const dbCloudFirestore = getFirestore(app);

export const getGreenspaces = async () => {
  try {
    let allAreas = [];

    for (const collectionName of Object.keys(GREEN_SPACES_COLORS)) {
      const querySnapshot = await getDocs(
        collection(dbCloudFirestore, `towns/Burgas/${collectionName}`)
      );

      if (querySnapshot.empty) {
        console.log(`No areas available in ${collectionName}`);
        continue;
      }

      const collectionAreas = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const cleaning = await getCleaningTypes(doc.ref);
          const data = doc.data();

          const newGeometry = data.geometry.map(({ lat, lon }) => ({
            lat,
            lng: lon,
          }));

          return {
            ...data,
            id: doc.id,
            type: collectionName,
            geometry: newGeometry,
            cleaning,
          };
        })
      );

      allAreas = allAreas.concat(collectionAreas);
    }

    return allAreas;
  } catch (error) {
    console.error("Error getting areas: ", error);
    return error;
  }
};

const getCleaningTypes = async (docRef) => {
  const cleaningSnapshot = await getDocs(collection(docRef, "cleaning"));

  const cleaning = [];

  cleaningSnapshot.docs.forEach((doc) => {
    cleaning.push(doc.data());
  });

  return cleaning;
};
