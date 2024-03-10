'use client';

import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import React from 'react';

function Providers({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<NextUIProvider>
				<NextThemesProvider attribute='class' defaultTheme='dark'>
					{children}
				</NextThemesProvider>
			</NextUIProvider>
		</SessionProvider>
	);
}

export default Providers;
