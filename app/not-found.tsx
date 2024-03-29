'use client';

import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { FaTools } from 'react-icons/fa';

function NotFound() {
	return (
		<section className='flex flex-col min-h-screen justify-center items-center duration-300'>
			<div className='flex flex-col gap-16' id='splash-container'>
				<div className='flex justify-center'>
					<p className='text-8xl'>
						<FaTools />
					</p>
				</div>
				<div className='flex flex-col'>
					<h1 className='text-6xl sm:text-7xl md:text-8xl lg:text-heading-one-large text-center leading-none font-extrabold'>
						Not Found
					</h1>
				</div>
				<div className='flex justify-center'>
					<Button
						as={Link}
						href='/'
						variant='bordered'
						className='text-2xl p-8 border-1 dark:border-[#3F3F46] font-extrabold bg-white text-black'
					>
						Go Back Home
					</Button>
				</div>
			</div>
		</section>
	);
}

export default NotFound;
