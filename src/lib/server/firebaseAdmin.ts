import { env } from '$env/dynamic/private';
import { applicationDefault, cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const servAccDetails = await import(/* @vite-ignore */ env.SERVICE_APP_PATH); // dev path
const appCert = servAccDetails ? cert(servAccDetails) : applicationDefault();

const apps = getApps();
let app;
if (!apps.length) {
	app = initializeApp({ credential: appCert }, 'admin');
} else {
	app = apps[0];
}

export const adminDb = getFirestore(app);
export const adminAuth = getAuth(app);
