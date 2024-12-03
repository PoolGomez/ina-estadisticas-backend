import { auth, credential, firestore } from "firebase-admin";
import { envs } from "../config";
import { initializeApp } from 'firebase-admin/app';

initializeApp({
    credential:  credential.cert(envs.GOOGLE_APLICATION_CREDENTIALS as string)
})
export const db = firestore();
export const authentication = auth();

