'use client';

import {
	Button,
	Card,
	Image,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Tab,
	Tabs,
	useDisclosure,
} from '@nextui-org/react';

import { toolAndDieDatabase } from '@/database/tool-and-die/tool-and-die.database';
import { useLiveQuery } from 'dexie-react-hooks';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react';

function Requests() {
	const { data: session } = useSession();

	if (!session) redirect('/login');

	const requestList = useLiveQuery(() => toolAndDieDatabase.requests.toArray());

	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [selectedProduct, setSelectedProduct] = React.useState<Product>();

	const handleSelectProduct = (item: Product) => {
		setSelectedProduct(() => item);
	};

	return (
		<section className='min-h-screen px-8 md:pl-16'>
			<div className='flex flex-col gap-8'>
				<div className='flex flex-col justify-center'>
					{requestList && (
						<Tabs
							aria-label='Address Tabs'
							className='flex justify-center'
							classNames={{
								tabList: 'bg-black',
								tab: 'text-2xl lg:text-3xl p-6 font-extrabold',
							}}
						>
							<Tab title='All'>
								<div className='flex flex-row flex-wrap justify-center gap-8 py-8'>
									{requestList.map((request) => (
										<Card
											isPressable
											key={request.name}
											radius='lg'
											className='border-none'
											onPress={() => {
												handleSelectProduct(request);
												onOpen();
											}}
										>
											<Image
												alt={request.name}
												className='object-cover'
												src={`/images/${request.src}`}
												width={350}
											/>
										</Card>
									))}
								</div>
							</Tab>
							<Tab title='Equipments'>
								<div className='flex flex-row flex-wrap justify-center gap-8 py-8'>
									{requestList
										.filter((product) => product.type == 'equipment')
										.map((request) => (
											<Card
												isPressable
												key={request.name}
												radius='lg'
												className='border-none'
												onPress={() => {
													handleSelectProduct(request);
													onOpen();
												}}
											>
												<Image
													alt={request.name}
													className='object-cover'
													src={`/images/${request.src}`}
													width={350}
												/>
											</Card>
										))}
								</div>
							</Tab>
							<Tab title='Tools'>
								<div className='flex flex-row flex-wrap justify-center gap-8 py-8'>
									{requestList
										.filter((product) => product.type == 'tool')
										.map((request) => (
											<Card
												isPressable
												key={request.name}
												radius='lg'
												className='border-none'
												onPress={() => {
													handleSelectProduct(request);
													onOpen();
												}}
											>
												<Image
													alt={request.name}
													className='object-cover'
													src={`/images/${request.src}`}
													width={350}
												/>
											</Card>
										))}
								</div>
							</Tab>
						</Tabs>
					)}
				</div>
				<div>
					<Modal
						isDismissable={false}
						hideCloseButton={true}
						isOpen={isOpen}
						onOpenChange={() => onOpenChange()}
						backdrop='blur'
						className='bg-black'
					>
						<ModalContent>
							{(onClose) => (
								<>
									<ModalHeader className='flex justify-center items-center'>
										<p className='text-2xl font-bold text-center'>
											{selectedProduct?.name}
										</p>
									</ModalHeader>
									<ModalBody className='flex items-center'>
										<Image
											alt={selectedProduct?.name}
											className='object-cover'
											src={`/images/${selectedProduct?.src}`}
											width={350}
										/>
									</ModalBody>
									<ModalFooter>
										<Button color='danger' variant='light' onPress={onClose}>
											Close
										</Button>
										<Button
											onPress={() => {
												// addProductToRequest();
												onClose();
											}}
											className='bg-white text-black'
										>
											Confirm Product
										</Button>
									</ModalFooter>
								</>
							)}
						</ModalContent>
					</Modal>
				</div>
			</div>
		</section>
	);
}

export default Requests;
