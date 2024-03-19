'use client';

import { Card, CardBody } from '@nextui-org/react';

import { toolAndDieDatabase } from '@/database/tool-and-die/tool-and-die.database';
import { useLiveQuery } from 'dexie-react-hooks';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { v4 as uuid } from 'uuid';

function Notifications() {
	const { data: session } = useSession();

	if (!session) redirect('/login');

	const customerNotifications = useLiveQuery(() =>
		toolAndDieDatabase.customerNotifications.toArray()
	);
	const adminNotifications = useLiveQuery(() =>
		toolAndDieDatabase.adminNotifications.toArray()
	);
	const workerNotifications = useLiveQuery(() =>
		toolAndDieDatabase.workerNotifications.toArray()
	);
	const cisNotifications = useLiveQuery(() =>
		toolAndDieDatabase.cisNotifications.toArray()
	);

	return (
		<section className='min-h-screen px-8'>
			<div className='flex flex-col gap-8'>
				<div className='flex flex-col justify-center gap-4'>
					{session.user?.name == 'Customer' &&
						customerNotifications?.map((notification) => {
							if (notification.type == 'add-product-to-cart')
								return (
									<Card key={uuid()} className='bg-white py-4'>
										<CardBody className='px-8'>
											<p className='text-lg sm:text-xl md:text-2xl font-light text-black'>
												<span className='font-bold'>{notification.name}</span>{' '}
												has been successfully added to your cart.
											</p>
										</CardBody>
									</Card>
								);
							if (notification.type == 'remove-product-from-cart')
								return (
									<Card key={uuid()} className='bg-white py-4'>
										<CardBody className='px-8'>
											<p className='text-lg sm:text-xl md:text-2xl font-light text-black'>
												<span className='font-bold'>{notification.name}</span>{' '}
												has been successfully removed from your cart.
											</p>
										</CardBody>
									</Card>
								);
							if (notification.type == 'ordered')
								return (
									<Card key={uuid()} className='bg-white py-4'>
										<CardBody className='px-8'>
											<p className='text-lg sm:text-xl md:text-2xl font-light text-black'>
												<span className='font-bold'>{notification.name}</span>{' '}
												has been successfully ordered.
											</p>
										</CardBody>
									</Card>
								);
						})}

					{session.user?.name == 'Customer' &&
						adminNotifications?.map((notification) => {
							if (notification.type == 'requested')
								return (
									<Card key={uuid()} className='bg-white py-4'>
										<CardBody className='px-8'>
											<p className='text-lg sm:text-xl md:text-2xl font-light text-black'>
												<span className='font-bold'>{notification.name}</span>{' '}
												has been successfully requested.
											</p>
										</CardBody>
									</Card>
								);
						})}

					{session.user?.name == 'Customer' &&
						workerNotifications?.map((notification) => {
							if (notification.type == 'confirmed')
								return (
									<Card key={uuid()} className='bg-white py-4'>
										<CardBody className='px-8'>
											<p className='text-lg sm:text-xl md:text-2xl font-light text-black'>
												<span className='font-bold'>{notification.name}</span>{' '}
												has been successfully confirmed.
											</p>
										</CardBody>
									</Card>
								);
							if (notification.type == 'processing')
								return (
									<Card key={uuid()} className='bg-white py-4'>
										<CardBody className='px-8'>
											<p className='text-lg sm:text-xl md:text-2xl font-light text-black'>
												<span className='font-bold'>{notification.name}</span>{' '}
												has been successfully processing.
											</p>
										</CardBody>
									</Card>
								);
							if (notification.type == 'finalizing')
								return (
									<Card key={uuid()} className='bg-white py-4'>
										<CardBody className='px-8'>
											<p className='text-lg sm:text-xl md:text-2xl font-light text-black'>
												<span className='font-bold'>{notification.name}</span>{' '}
												has been successfully finalizing.
											</p>
										</CardBody>
									</Card>
								);
						})}

					{session.user?.name == 'Customer' &&
						cisNotifications?.map((notification) => {
							if (notification.type == 'approved')
								return (
									<Card key={uuid()} className='bg-white py-4'>
										<CardBody className='px-8'>
											<p className='text-lg sm:text-xl md:text-2xl font-light text-black'>
												<span className='font-bold'>{notification.name}</span>{' '}
												has been successfully approved.
											</p>
										</CardBody>
									</Card>
								);
						})}

					{session.user?.name == 'Admin' &&
						adminNotifications?.map((notification) => {
							if (notification.type == 'requested')
								return (
									<Card key={uuid()} className='bg-white py-4'>
										<CardBody className='px-8'>
											<p className='text-lg sm:text-xl md:text-2xl font-light text-black'>
												<span className='font-bold'>{notification.name}</span>{' '}
												has been successfully requested.
											</p>
										</CardBody>
									</Card>
								);
						})}

					{session.user?.name == 'Admin' &&
						workerNotifications?.map((notification) => {
							if (notification.type == 'confirmed')
								return (
									<Card key={uuid()} className='bg-white py-4'>
										<CardBody className='px-8'>
											<p className='text-lg sm:text-xl md:text-2xl font-light text-black'>
												<span className='font-bold'>{notification.name}</span>{' '}
												has been successfully confirmed.
											</p>
										</CardBody>
									</Card>
								);
							if (notification.type == 'processing')
								return (
									<Card key={uuid()} className='bg-white py-4'>
										<CardBody className='px-8'>
											<p className='text-lg sm:text-xl md:text-2xl font-light text-black'>
												<span className='font-bold'>{notification.name}</span>{' '}
												has been successfully processing.
											</p>
										</CardBody>
									</Card>
								);
							if (notification.type == 'finalizing')
								return (
									<Card key={uuid()} className='bg-white py-4'>
										<CardBody className='px-8'>
											<p className='text-lg sm:text-xl md:text-2xl font-light text-black'>
												<span className='font-bold'>{notification.name}</span>{' '}
												has been successfully finalizing.
											</p>
										</CardBody>
									</Card>
								);
						})}

					{session.user?.name == 'Admin' &&
						cisNotifications?.map((notification) => {
							if (notification.type == 'approved')
								return (
									<Card key={uuid()} className='bg-white py-4'>
										<CardBody className='px-8'>
											<p className='text-lg sm:text-xl md:text-2xl font-light text-black'>
												<span className='font-bold'>{notification.name}</span>{' '}
												has been successfully approved.
											</p>
										</CardBody>
									</Card>
								);
						})}

					{session.user?.name == 'Worker' &&
						workerNotifications?.map((notification) => {
							if (notification.type == 'confirmed')
								return (
									<Card key={uuid()} className='bg-white py-4'>
										<CardBody className='px-8'>
											<p className='text-lg sm:text-xl md:text-2xl font-light text-black'>
												<span className='font-bold'>{notification.name}</span>{' '}
												has been successfully confirmed.
											</p>
										</CardBody>
									</Card>
								);
							if (notification.type == 'processing')
								return (
									<Card key={uuid()} className='bg-white py-4'>
										<CardBody className='px-8'>
											<p className='text-lg sm:text-xl md:text-2xl font-light text-black'>
												<span className='font-bold'>{notification.name}</span>{' '}
												has been successfully processing.
											</p>
										</CardBody>
									</Card>
								);
							if (notification.type == 'finalizing')
								return (
									<Card key={uuid()} className='bg-white py-4'>
										<CardBody className='px-8'>
											<p className='text-lg sm:text-xl md:text-2xl font-light text-black'>
												<span className='font-bold'>{notification.name}</span>{' '}
												has been successfully finalizing.
											</p>
										</CardBody>
									</Card>
								);
						})}

					{session.user?.name == 'Worker' &&
						cisNotifications?.map((notification) => {
							if (notification.type == 'approved')
								return (
									<Card key={uuid()} className='bg-white py-4'>
										<CardBody className='px-8'>
											<p className='text-lg sm:text-xl md:text-2xl font-light text-black'>
												<span className='font-bold'>{notification.name}</span>{' '}
												has been successfully approved.
											</p>
										</CardBody>
									</Card>
								);
						})}

					{session.user?.name == 'CIS' &&
						cisNotifications?.map((notification) => {
							if (notification.type == 'approved')
								return (
									<Card key={uuid()} className='bg-white py-4'>
										<CardBody className='px-8'>
											<p className='text-lg sm:text-xl md:text-2xl font-light text-black'>
												<span className='font-bold'>{notification.name}</span>{' '}
												has been successfully approved.
											</p>
										</CardBody>
									</Card>
								);
						})}
				</div>
			</div>
		</section>
	);
}

export default Notifications;
