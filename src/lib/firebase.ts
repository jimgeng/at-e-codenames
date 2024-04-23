import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCUTxru_NnAtj0QuO_ge6aYlI27qEnY85E',
	authDomain: 'at-everyone-codenames.firebaseapp.com',
	projectId: 'at-everyone-codenames',
	storageBucket: 'at-everyone-codenames.appspot.com',
	messagingSenderId: '532689473884',
	appId: '1:532689473884:web:5a88977afc43ac40faf199'
};

const fireApp = initializeApp(firebaseConfig);

export const db = getFirestore(fireApp);
export const auth = getAuth(fireApp);
