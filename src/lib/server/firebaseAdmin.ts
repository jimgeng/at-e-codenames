import { env } from '$env/dynamic/private';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

if (env.SERVICE_ACCOUNT_SECRET === undefined) {
	throw new Error('SERVICE_ACCOUNT_SECRET is undefined');
}
const servAccDetails = JSON.parse(env.SERVICE_ACCOUNT_SECRET);
const servAccCert = cert(servAccDetails);

const apps = getApps();
let app;
if (!apps.length) {
	app = initializeApp({ credential: servAccCert }, 'admin');
} else {
	app = apps[0];
}

export const adminDb = getFirestore(app);
export const adminAuth = getAuth(app);
