'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react';

function Payments() {
	const { data: session } = useSession();

	if (!session) redirect('/login');

	return (
		<section className='min-h-screen px-8'>
			<div className='flex flex-col gap-8'>
				<div>
					<h1 className='text-white text-center text-5xl md:text-7xl font-bold'>
						Payments
					</h1>
				</div>
			</div>
		</section>
	);
}

export default Payments;
