import './globals.css';

import { primaryFont } from '@/configurations/fonts';
import metatags from '@/configurations/metatags';
import Content from '@/containers/Content/Content';
import React from 'react';
import Providers from './providers';

export const metadata = metatags;

function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang='en'
			className='select-none dark text-foreground bg-background no-scrollbar'
		>
			<body className={`${primaryFont.className} no-scrollbar`}>
				<Providers>
					<Content>{children}</Content>
				</Providers>
			</body>
		</html>
	);
}

export default RootLayout;
