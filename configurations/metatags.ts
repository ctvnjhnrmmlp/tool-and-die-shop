import { Metadata } from 'next';

export const metatags: Metadata = {
	metadataBase: new URL('https://ctvnjhnrmmlp.vercel.app'),
	title: 'Tool and Die',
	description: '',
	applicationName: 'tool-and-die',
	generator: 'typescript, react, nextjs, tailwindcss',
	keywords: `tool-and-die`,
	referrer: 'origin',
	themeColor: 'dark',
	colorScheme: 'dark',
	creator: 'Octaviano, Yocor, Escobañas',
	publisher: 'Octaviano, Yocor, Escobañas',
	robots: 'index, follow',
	alternates: {
		canonical: 'https://ctvnjhnrmmlp.vercel.app',
	},
	icons: '/images/tools.png',
	openGraph: {
		type: 'website',
		url: 'https://ctvnjhnrmmlp.vercel.app',
		title: 'Tool and Die',
		description: '',
		siteName: 'tool-and-die',
		images: [
			{
				url: '/images/tools.png',
			},
		],
	},
	twitter: {
		site: 'tool-and-die',
		siteId: '',
		creator: 'Octaviano, Yocor, Escobañas',
		creatorId: '',
		description: '',
		title: 'Tool and Die',
		images: [
			{
				url: '/images/tools.png',
			},
		],
	},
	appleWebApp: {
		capable: true,
		title: 'Tool and Die',
		statusBarStyle: 'black-translucent',
	},
	formatDetection: {
		telephone: false,
	},
	abstract: '',
	category: '',
	classification: '',
};

export default metatags;
