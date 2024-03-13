'use client';

import './globals.css';

import Splash from '@/components/Splash/Splash';
import Nav from '@/layouts/Nav/Nav';
import Sidenav from '@/layouts/Sidenav/Sidenav';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
// 	metadataBase: new URL('https://ctvnjhnrmmlp.vercel.app'),
// 	title: 'Tool and Die',
// 	description: '',
// 	applicationName: 'tool-and-die',
// 	generator: 'typescript, react, nextjs, tailwindcss',
// 	keywords: `tool-and-die`,
// 	referrer: 'origin',
// 	themeColor: 'dark',
// 	colorScheme: 'dark',
// 	creator: 'Octaviano, Yocor, Escobañas',
// 	publisher: 'Octaviano, Yocor, Escobañas',
// 	robots: 'index, follow',
// 	alternates: {
// 		canonical: 'https://ctvnjhnrmmlp.vercel.app',
// 	},
// 	icons: '/images/tools.png',
// 	openGraph: {
// 		type: 'website',
// 		url: 'https://ctvnjhnrmmlp.vercel.app',
// 		title: 'Tool and Die',
// 		description: '',
// 		siteName: 'tool-and-die',
// 		images: [
// 			{
// 				url: '/images/tools.png',
// 			},
// 		],
// 	},
// 	twitter: {
// 		site: 'tool-and-die',
// 		siteId: '',
// 		creator: 'Octaviano, Yocor, Escobañas',
// 		creatorId: '',
// 		description: '',
// 		title: 'Tool and Die',
// 		images: [
// 			{
// 				url: '/images/tools.png',
// 			},
// 		],
// 	},
// 	appleWebApp: {
// 		capable: true,
// 		title: 'Tool and Die',
// 		statusBarStyle: 'black-translucent',
// 	},
// 	formatDetection: {
// 		telephone: false,
// 	},
// 	abstract: '',
// 	category: '',
// 	classification: '',
// };

function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [loading, setLoading] = React.useState(true);

	return (
		<html lang='en' className='select-none dark text-foreground bg-background'>
			<head></head>
			<body className={`${inter.className} no-scrollbar`}>
				<Providers>
					{loading && <Splash finishLoading={() => setLoading(false)} />}

					{!loading && <>{children}</>}
				</Providers>
			</body>
		</html>
	);
}

export default RootLayout;
