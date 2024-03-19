import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const AuthOptions: NextAuthOptions = {
	providers: [
		Credentials({
			name: 'Tool and Die',
			credentials: {
				username: { label: 'Username', placeholder: 'Username', type: 'text' },
				password: {
					label: 'Password',
					placeholder: 'Password',
					type: 'password',
				},
			},
			// @ts-ignore
			async authorize(credentials, req) {
				if (
					credentials?.username === 'admin' &&
					credentials?.password === 'admin'
				)
					return Promise.resolve({ id: 1, name: 'Admin' });

				if (credentials?.username === 'cis' && credentials?.password === 'cis')
					return Promise.resolve({ id: 1, name: 'CIS' });

				if (
					credentials?.username === 'customer' &&
					credentials?.password === 'customer'
				)
					return Promise.resolve({ id: 1, name: 'Customer' });

				if (
					credentials?.username === 'worker' &&
					credentials?.password === 'worker'
				)
					return Promise.resolve({ id: 1, name: 'Worker' });

				return Promise.resolve(null);
			},
		}),
	],
	pages: { signIn: '/login' },
	secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
	session: {
		strategy: 'jwt',
		maxAge: 3600,
		updateAge: 3600,
	},
	callbacks: {
		async session({ session, user, token }) {
			// @ts-ignore
			session.user.id = token.sub;
			return session;
		},
	},
};
