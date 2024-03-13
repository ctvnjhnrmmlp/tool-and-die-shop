'use client';

import { Button, Chip, Input } from '@nextui-org/react';
import { Form, Formik } from 'formik';
import { signIn, useSession } from 'next-auth/react';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { ZodError, z } from 'zod';

import { FaPerson } from 'react-icons/fa6';
import { MdOutlinePassword } from 'react-icons/md';

function Login() {
	const { data: session } = useSession();

	if (session) redirect('/');

	const searchParams = useSearchParams();
	const router = useRouter();

	const ValidationSchema = z.object({
		username: z
			.string()
			.min(3, 'Username is too short')
			.max(8, 'Username is too long'),
		password: z
			.string()
			.min(3, 'Password is too short')
			.max(8, 'Password is too long'),
	});

	const initialValues = {
		username: '',
		password: '',
	};

	const handleValidate = (values: z.infer<typeof ValidationSchema>) => {
		try {
			ValidationSchema.parse(values);
		} catch (error) {
			if (error instanceof ZodError) {
				return error.formErrors.fieldErrors;
			}
		}
	};

	return (
		<section className='flex h-screen flex-col items-center justify-center'>
			<Formik
				className='flex flex-col rounded px-8 pb-8 pt-6 shadow-md gap-7'
				initialValues={initialValues}
				validate={(values) => handleValidate(values)}
				onSubmit={async (values) => {
					try {
						const callbackUrl = searchParams.get('callbackUrl') || '/';

						const res = await signIn('credentials', {
							redirect: true,
							username: values.username,
							password: values.password,
							callbackUrl,
						});

						if (!res?.error) router.push(callbackUrl);
					} catch (error) {
						console.log('Error: ', error);
					}
				}}
			>
				{(formik) => (
					<Form
						onSubmit={formik.handleSubmit}
						className='flex flex-col gap-9 py-12 px-8 sm:p-16 border border-[#3F3F46] rounded-3xl'
					>
						<div>
							<h1 className='text-center text-7xl sm:text-8xl font-bold text-white'>
								Login
							</h1>
						</div>
						<div className='flex flex-col gap-4'>
							<div className='flex flex-col gap-2'>
								<Input
									isRequired
									isClearable
									type='text'
									id='username'
									placeholder='Username'
									variant='bordered'
									className='mx-auto'
									classNames={{
										input: 'font-extrabold text-2xl py-4',
										inputWrapper: 'py-8 border border-[#3F3F46]',
									}}
									startContent={
										<p className='text-2xl'>
											<FaPerson />
										</p>
									}
									{...formik.getFieldProps('username')}
								/>
								{formik.touched.username && formik.errors.username ? (
									<Chip color='danger' radius='sm'>
										{formik.errors.username}
									</Chip>
								) : null}
							</div>
							<div className='flex flex-col gap-2'>
								<Input
									isRequired
									isClearable
									type='password'
									id='password'
									placeholder='Password'
									variant='bordered'
									className='mx-auto'
									classNames={{
										input: 'font-extrabold text-2xl py-4',
										inputWrapper: 'py-8 border border-[#3F3F46]',
									}}
									startContent={
										<p className='text-2xl'>
											<MdOutlinePassword />
										</p>
									}
									{...formik.getFieldProps('password')}
								/>
								{formik.touched.password && formik.errors.password ? (
									<Chip color='danger' radius='sm'>
										{formik.errors.password}
									</Chip>
								) : null}
							</div>
						</div>
						<div className='flex w-full items-center justify-between'>
							<Button
								type='submit'
								className='bg-white text-black px-8 py-8 text-3xl font-bold w-full'
							>
								Submit
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</section>
	);
}

export default Login;
