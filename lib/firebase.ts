import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDemoKeyForDevelopment12345678901234',
  authDomain: 'temp-email-app.firebaseapp.com',
  projectId: 'temp-email-app-demo',
  storageBucket: 'temp-email-app-demo.appspot.com',
  messagingSenderId: '123456789012',
  appId: '1:123456789012:web:abcdef123456789012',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// For development, you can use the emulator
// const host = process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_HOST;
// if (host) {
//   connectFirestoreEmulator(db, 'localhost', 8080);
// }
