const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { credential } = require("firebase-admin");
var serviceAccount = require("./../serviceAccountKey.json");

function getDb() {
  const app = initializeApp(
    {
      credential: credential.cert(serviceAccount),
      databaseURL: process.env.DATABASE_URL,
    },
    "firestoreDbApp"
  );

  return getFirestore(app);
}

module.exports = { getDb };
