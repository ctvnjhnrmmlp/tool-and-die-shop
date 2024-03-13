import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';

const config: Config = {
	darkMode: 'class',
	content: [
		'./(app|components|containers|layouts)/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	plugins: [
		nextui({
			themes: {
				dark: {
					colors: {
						primary: {
							DEFAULT: '#FFFFFF',
							foreground: '#000000',
						},
						default: {
							DEFAULT: '#FFFFFF',
							foreground: '#000000',
						},
						focus: '#FFFFFF',
					},
				},
			},
		}),
	],
};
export default config;
