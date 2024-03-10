'use client';

import { Button } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';

function GlobalError() {
	return (
		<section className='flex flex-col gap-6 px-4 h-screen justify-center items-center'>
			<div className='flex flex-col gap-16'>
				<div className='flex justify-center'>
					<Image
						className='w-72'
						src='/images/rekt.png '
						alt='REKT logo'
						width={40}
						height={40}
						unoptimized
					/>
				</div>
				<div className='flex flex-col'>
					<h1 className='text-6xl sm:text-7xl md:text-8xl lg:text-heading-one-large uppercase text-center leading-none font-extrabold'>
						ERROR
					</h1>
				</div>
				<div className='flex justify-center'>
					<Button
						as={Link}
						href='/'
						variant='bordered'
						className='text-2xl p-8 border-1 dark:border-[#3F3F46] font-extrabold bg-[#ED8AB8] text-black'
					>
						Go Back Home
					</Button>
				</div>
			</div>
		</section>
	);
}

export default GlobalError;
