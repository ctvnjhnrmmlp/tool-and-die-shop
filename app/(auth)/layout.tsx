import Link from 'next/link';
import { FaTools } from 'react-icons/fa';

function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<nav className='fixed p-6 outline outline-1 outline-[#27282D] w-full'>
				<div className='flex justify-center items-center'>
					<Link href='/'>
						<div className='flex justify-center items-center gap-4'>
							<p className='text-center font-medium text-lg'>
								<span className='font-extrabold text-4xl'>
									<FaTools />
								</span>
							</p>
							<p className='text-center font-medium text-lg'>
								<span className='font-extrabold text-4xl'>Tool and Die</span>
							</p>
						</div>
					</Link>
				</div>
			</nav>

			<main className='dark text-foreground bg-background'>{children}</main>
		</>
	);
}

export default AuthLayout;
