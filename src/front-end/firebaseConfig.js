import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "plumbers-7f4b1.firebaseapp.com",
  projectId: "plumbers-7f4b1",
  storageBucket: "plumbers-7f4b1.appspot.com",
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
