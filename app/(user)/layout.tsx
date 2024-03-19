import Nav from '@/layouts/Nav/Nav';
import Sidenav from '@/layouts/Sidenav/Sidenav';

function CustomersLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Nav />
			<Sidenav />

			<main className='dark text-foreground bg-background flex flex-col gap-6 py-12 w-full pl-0 lg:pl-72 no-scrollbar'>
				{children}
			</main>
		</>
	);
}

export default CustomersLayout;
