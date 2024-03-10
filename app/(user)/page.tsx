'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react';

function User() {
	const { data: session } = useSession();

	if (!session) redirect('/login');

	return <section className='min-h-screen px-8'></section>;
}

export default User;
