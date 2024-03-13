import Link from 'next/link';
import { FaTools } from 'react-icons/fa';

function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<nav className='fixed pt-4 w-full'>
				<div className='flex justify-center items-center border border-[#3F3F46] rounded-3xl w-[90%] mx-auto p-6'>
					<Link href='/'>
						<div className='flex justify-center items-center gap-4 '>
							<p className='text-center font-extrabold text-3xl sm:text-4xl'>
								<FaTools />
							</p>
							<p className='text-center font-extrabold text-3xl sm:text-4xl'>
								Tool and Die
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
