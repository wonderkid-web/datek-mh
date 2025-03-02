import { SvelteKitAuth } from '@auth/sveltekit';
import Credentials from '@auth/sveltekit/providers/credentials';
// Your own logic for dealing with plaintext password strings; be careful!

export const { signIn, signOut, handle } = SvelteKitAuth({
	providers: [
		Credentials({
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			credentials: {
				email: {},
				password: {}
			},
			//@ts-ignore
			authorize: async (credentials) => {
				let user = null;

				// logic to verify if user exists
				user = credentials.email === 'test@test.com' && credentials.password === 'test123';

				if (!user) {
					// No user found, so this is their first attempt to login
					// Optionally, this is also the place you could do a user registration
					throw new Error('Invalid credentials.');
				}

				// return JSON object with the user data
				return user;
			}
		})
	]
});
