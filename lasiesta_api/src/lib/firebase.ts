import "dotenv/config";
import admin from "firebase-admin";

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT as string
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: `gs://${serviceAccount.project_id}.firebasestorage.app`
  });
}

export const bucket = admin.storage().bucket();
