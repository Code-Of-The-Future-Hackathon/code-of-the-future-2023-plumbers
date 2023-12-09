import { collection, getDocs } from "firebase/firestore";
import { app } from "../../firebaseConfig";
const dbCloudFirestore = getFirestore(app);

export const getAreasOfPublicUse = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(dbCloudFirestore, "towns/Burgas/park ")
    );

    if (querySnapshot.empty) {
      console.log("No areas available");
      return null;
    }

    const areas = {};

    await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const characteristics = await getCharacteristics(doc.ref);
        const cleaning = await getCleaning(doc.ref);

        areas[doc.id] = {
          ...doc.data(),
          characteristics,
          cleaning,
        };
      })
    );

    return areas;
  } catch (error) {
    console.error("Error getting areas: ", error);
    return error;
  }
};
