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

import ApproveModel from '@/database/tool-and-die/models/Approve.model';
import PaymentModel from '@/database/tool-and-die/models/Payment.model';
import { toolAndDieDatabase } from '@/database/tool-and-die/tool-and-die.database';
import { useLiveQuery } from 'dexie-react-hooks';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react';

function Orders() {
	const { data: session } = useSession();

	if (!session) redirect('/login');

	const orderList = useLiveQuery(() => toolAndDieDatabase.orders.toArray());
	const requestList = useLiveQuery(() => toolAndDieDatabase.requests.toArray());
	const confirmList = useLiveQuery(() => toolAndDieDatabase.confirms.toArray());
	const processList = useLiveQuery(() =>
		toolAndDieDatabase.processes.toArray()
	);
	const finalList = useLiveQuery(() => toolAndDieDatabase.finals.toArray());
	const approveList = useLiveQuery(() => toolAndDieDatabase.approves.toArray());

	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [selectedProduct, setSelectedProduct] = React.useState<Product>();

	const handleSelectProduct = (item: Product) => {
		setSelectedProduct(() => item);
	};

	const handleDeleteApprovedProduct = async () => {
		if (selectedProduct) await ApproveModel.deleteProduct(selectedProduct);
	};

	const handleAddPaymentProduct = async () => {
		if (selectedProduct) await PaymentModel.addPayment(selectedProduct);
	};

	return (
		<section className='min-h-screen px-8 md:pl-16'>
			<div className='flex flex-col gap-8'>
				<div className='flex flex-col justify-center'>
					{orderList &&
						requestList &&
						confirmList &&
						processList &&
						finalList &&
						approveList && (
							<Tabs
								aria-label='Address Tabs'
								className='flex justify-center md:justify-start'
								classNames={{
									tabList: 'bg-black',
									tab: 'text-2xl lg:text-3xl p-6 font-extrabold',
								}}
							>
								<Tab title='Pending'>
									<div className='flex flex-row flex-wrap justify-center md:justify-start gap-8 py-8'>
										{orderList
											.filter((order) => order.status == 'pending')
											.map((order) => (
												<Card
													isPressable
													key={order.name}
													radius='lg'
													className='border-none'
													onPress={() => {
														handleSelectProduct(order);
														onOpen();
													}}
												>
													<Image
														alt={order.name}
														className='object-cover'
														src={`/images/${order.src}`}
														width={350}
													/>
												</Card>
											))}
									</div>
								</Tab>
								<Tab title='Requested'>
									<div className='flex flex-row flex-wrap justify-center md:justify-start gap-8 py-8'>
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
								<Tab title='Confirmed'>
									<div className='flex flex-row flex-wrap justify-center md:justify-start gap-8 py-8'>
										{confirmList.map((confirm) => (
											<Card
												isPressable
												key={confirm.name}
												radius='lg'
												className='border-none'
												onPress={() => {
													handleSelectProduct(confirm);
													onOpen();
												}}
											>
												<Image
													alt={confirm.name}
													className='object-cover'
													src={`/images/${confirm.src}`}
													width={350}
												/>
											</Card>
										))}
									</div>
								</Tab>
								<Tab title='Processing'>
									<div className='flex flex-row flex-wrap justify-center md:justify-start gap-8 py-8'>
										{processList.map((process) => (
											<Card
												isPressable
												key={process.name}
												radius='lg'
												className='border-none'
												onPress={() => {
													handleSelectProduct(process);
													onOpen();
												}}
											>
												<Image
													alt={process.name}
													className='object-cover'
													src={`/images/${process.src}`}
													width={350}
												/>
											</Card>
										))}
									</div>
								</Tab>
								<Tab title='Finalizing'>
									<div className='flex flex-row flex-wrap justify-center md:justify-start gap-8 py-8'>
										{finalList.map((final) => (
											<Card
												isPressable
												key={final.name}
												radius='lg'
												className='border-none'
												onPress={() => {
													handleSelectProduct(final);
													onOpen();
												}}
											>
												<Image
													alt={final.name}
													className='object-cover'
													src={`/images/${final.src}`}
													width={350}
												/>
											</Card>
										))}
									</div>
								</Tab>
								<Tab title='Approved'>
									<div className='flex flex-row flex-wrap justify-center md:justify-start gap-8 py-8'>
										{approveList.map((approve) => (
											<Card
												isPressable
												key={approve.name}
												radius='lg'
												className='border-none'
												onPress={() => {
													handleSelectProduct(approve);
													onOpen();
												}}
											>
												<Image
													alt={approve.name}
													className='object-cover'
													src={`/images/${approve.src}`}
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
					{session.user?.name == 'Customer' &&
						approveList &&
						approveList.length >= 1 && (
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
											<ModalBody className='flex gap-4'>
												<div className='flex justify-center'>
													<Image
														alt={selectedProduct?.name}
														className='object-cover'
														src={`/images/${selectedProduct?.src}`}
														width={350}
													/>
												</div>
												{selectedProduct?.type == 'equipment' && (
													<div className='flex flex-col'>
														<div className='flex flex-row items-center space-between justify-between'>
															<p className='text-md sm:text-lg gap-4'>
																<span className='font-bold'>Manufacturer</span>
															</p>
															<p>{selectedProduct.manufacturer}</p>
														</div>
														<div className='flex flex-row items-center space-between justify-between'>
															<p className='text-md sm:text-lg gap-4'>
																<span className='font-bold'>Model</span>
															</p>
															<p>{selectedProduct.modelNumber}</p>
														</div>
														<div className='flex flex-row items-center space-between justify-between'>
															<p className='text-md sm:text-lg gap-4'>
																<span className='font-bold'>Manufactured</span>
															</p>
															<p>{selectedProduct.yearManufactured}</p>
														</div>
														<div className='flex flex-row items-center space-between justify-between'>
															<p className='text-md sm:text-lg gap-4'>
																<span className='font-bold'>Location</span>
															</p>
															<p>{selectedProduct.location}</p>
														</div>
														<div className='flex flex-row items-center space-between justify-between'>
															<p className='text-md sm:text-lg gap-4'>
																<span className='font-bold'>Purchased</span>
															</p>
															<p>{selectedProduct.purchaseDate}</p>
														</div>
														<div className='flex flex-row items-center space-between justify-between'>
															<p className='text-md sm:text-lg gap-4'>
																<span className='font-bold'>Warranty</span>
															</p>
															<p>{selectedProduct.warrantyExpires}</p>
														</div>
														<div className='flex flex-row items-center space-between justify-between'>
															<p className='text-md sm:text-lg gap-4'>
																<span className='font-bold'>Power</span>
															</p>
															<p>{selectedProduct.powerRequirements}</p>
														</div>
														<div className='flex flex-row items-center space-between justify-between'>
															<p className='text-md sm:text-lg gap-4'>
																<span className='font-bold'>Weight</span>
															</p>
															<p>{selectedProduct.weight}</p>
														</div>
														<div className='flex flex-row items-center space-between justify-between'>
															<p className='text-md sm:text-lg gap-4'>
																<span className='font-bold'>Usage</span>
															</p>
															<p>{selectedProduct.usageHours}</p>
														</div>
														<div className='flex flex-row items-center space-between justify-between'>
															<p className='text-md sm:text-lg gap-4'>
																<span className='font-bold'>Price</span>
															</p>
															<p>${selectedProduct.purchasePrice}</p>
														</div>
														<div className='flex flex-row items-center space-between justify-between'>
															<p className='text-md sm:text-lg gap-4'>
																<span className='font-bold'>Duration</span>
															</p>
															<p>
																{selectedProduct.processStart} to{' '}
																{selectedProduct.processEnd}
															</p>
														</div>
														<div className='flex flex-row items-center space-between justify-between'>
															<p className='text-md sm:text-lg gap-4'>
																<span className='font-bold'>Delivery</span>
															</p>
															<p>{selectedProduct.delivery}</p>
														</div>
													</div>
												)}
												{selectedProduct?.type == 'tool' && (
													<div className='flex flex-col'>
														<div className='flex flex-row items-center space-between justify-between'>
															<p className='text-md sm:text-lg gap-4'>
																<span className='font-bold'>Brand</span>
															</p>
															<p>{selectedProduct.brand}</p>
														</div>
														<div className='flex flex-row items-center space-between justify-between'>
															<p className='text-md sm:text-lg gap-4'>
																<span className='font-bold'>Material</span>
															</p>
															<p>{selectedProduct.material}</p>
														</div>
														<div className='flex flex-row items-center space-between justify-between'>
															<p className='text-md sm:text-lg gap-4'>
																<span className='font-bold'>Quantity</span>
															</p>
															<p>{selectedProduct.quantity}</p>
														</div>
														<div className='flex flex-row items-center space-between justify-between'>
															<p className='text-md sm:text-lg gap-4'>
																<span className='font-bold'>Price</span>
															</p>
															<p>${selectedProduct.price}</p>
														</div>
														<div className='flex flex-row items-center space-between justify-between'>
															<p className='text-md sm:text-lg gap-4'>
																<span className='font-bold'>Duration</span>
															</p>
															<p>
																{selectedProduct.processStart} to{' '}
																{selectedProduct.processEnd}
															</p>
														</div>
														<div className='flex flex-row items-center space-between justify-between'>
															<p className='text-md sm:text-lg gap-4'>
																<span className='font-bold'>Delivery</span>
															</p>
															<p>{selectedProduct.delivery}</p>
														</div>
													</div>
												)}
											</ModalBody>
											<ModalFooter>
												<Button
													className='bg-white text-black'
													onPress={onClose}
												>
													Close
												</Button>
												<Button
													onPress={() => {
														handleAddPaymentProduct();
														handleDeleteApprovedProduct();
														onClose();
													}}
													className='bg-white text-black'
												>
													Pay Product
												</Button>
											</ModalFooter>
										</>
									)}
								</ModalContent>
							</Modal>
						)}
				</div>
			</div>
		</section>
	);
}

export default Orders;
