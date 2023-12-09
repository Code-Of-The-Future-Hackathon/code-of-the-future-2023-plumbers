import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../../firebaseConfig";
const dbCloudFirestore = getFirestore(app);

export const getGreenspaces = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(dbCloudFirestore, "towns/Burgas/park")
    );

    if (querySnapshot.empty) {
      console.log("No areas available");
      return null;
    }

    const areas = {};

    await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const cleaning = await getCleaningTypes(doc.ref);

        areas[doc.id] = {
          ...doc.data(),
          cleaning,
        };
      })
    );

    return Object.entries(areas).map(([id, value]) => {
      const newGeometry = value.geometry.map((coords) => ({
        lat: coords.lat,
        lng: coords.lon,
      }));

      return { ...value, id, geometry: newGeometry };
    });
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
