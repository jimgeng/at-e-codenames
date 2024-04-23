export const load = async ({ cookies }) => {
	const firebaseAuth = cookies.get('FirebaseToken');
	cookies.delete('FirebaseToken', { path: '/' });
	return { firebaseAuth };
};
