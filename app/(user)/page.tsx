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

import AdminNotificationModel from '@/database/tool-and-die/models/AdminNotification.model';
import ApproveModel from '@/database/tool-and-die/models/Approve.model';
import CISNotificationModel from '@/database/tool-and-die/models/CISNotification.model';
import CartModel from '@/database/tool-and-die/models/Cart.model';
import ConfirmModel from '@/database/tool-and-die/models/Confirm.model';
import CustomerNotificationModel from '@/database/tool-and-die/models/CustomerNotification.model';
import FinalModel from '@/database/tool-and-die/models/Final.model';
import OrderModel from '@/database/tool-and-die/models/Order.model';
import ProcessModel from '@/database/tool-and-die/models/Process.model';
import ProductModel from '@/database/tool-and-die/models/Product.model';
import RequestModel from '@/database/tool-and-die/models/Request.model';
import WorkerNotificationModel from '@/database/tool-and-die/models/WorkerNotification.model';
import { toolAndDieDatabase } from '@/database/tool-and-die/tool-and-die.database';
import { useLiveQuery } from 'dexie-react-hooks';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react';
import Datepicker from 'react-tailwindcss-datepicker';

function Home() {
	const { data: session } = useSession();

	if (!session) redirect('/login');

	const [selectedProduct, setSelectedProduct] = React.useState<Product>();
	const [duration, setDuration] = React.useState<{
		startDate: string;
		endDate: string;
	}>({
		startDate: '',
		endDate: '',
	});
	const [delivery, setDelivery] = React.useState<{
		startDate: string;
		endDate: string;
	}>({
		startDate: '',
		endDate: '',
	});
	const orderList = useLiveQuery(() => toolAndDieDatabase.orders.toArray());
	const requestList = useLiveQuery(() => toolAndDieDatabase.requests.toArray());
	const confirmList = useLiveQuery(() => toolAndDieDatabase.confirms.toArray());
	const processList = useLiveQuery(() =>
		toolAndDieDatabase.processes.toArray()
	);
	const finalList = useLiveQuery(() => toolAndDieDatabase.finals.toArray());
	const approveList = useLiveQuery(() => toolAndDieDatabase.approves.toArray());
	const productList = useLiveQuery(() => toolAndDieDatabase.products.toArray());

	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const handleSelectProduct = (item: Product) => {
		setSelectedProduct(() => item);
	};

	// @ts-ignore
	const handleDateChange = (date) => {
		setDuration(date);
	};

	// @ts-ignore
	const handleDeliveryDateChange = (date) => {
		setDelivery(() => date);
	};

	// @ts-ignore
	const handleChangeDurationProduct = (date) => {
		// @ts-ignore
		setSelectedProduct(() => ({
			...selectedProduct,
			processStart: date.startDate,
			processEnd: date.endDate,
		}));
	};

	// @ts-ignore
	const handleChangeDeliveryProduct = (date) => {
		// @ts-ignore
		setSelectedProduct(() => ({
			...selectedProduct,
			delivery: date.endDate,
		}));
	};

	const handleAddToCartProduct = async () => {
		if (selectedProduct) await CartModel.addProduct(selectedProduct);
	};

	const handleDeleteProduct = async () => {
		if (selectedProduct) await ProductModel.deleteProduct(selectedProduct);
	};

	const handleRequestProduct = async () => {
		if (selectedProduct) await RequestModel.addProduct(selectedProduct);
	};

	const handleDeleteRequestedProduct = async () => {
		if (selectedProduct) await RequestModel.deleteProduct(selectedProduct);
	};

	const handleDeletePendingProduct = async () => {
		if (selectedProduct) await OrderModel.deleteProduct(selectedProduct);
	};

	const handleConfirmProduct = async () => {
		if (selectedProduct) await ConfirmModel.addProduct(selectedProduct);
	};

	const handleDeleteConfirmedProduct = async () => {
		if (selectedProduct) await ConfirmModel.deleteProduct(selectedProduct);
	};

	const handleProcessProduct = async () => {
		if (selectedProduct) await ProcessModel.addProduct(selectedProduct);
	};

	const handleDeleteProcessedProduct = async () => {
		if (selectedProduct) await ProcessModel.deleteProduct(selectedProduct);
	};

	const handleFinalizeProduct = async () => {
		if (selectedProduct) await FinalModel.addProduct(selectedProduct);
	};

	const handleDeleteFinalizedProduct = async () => {
		if (selectedProduct) await FinalModel.deleteProduct(selectedProduct);
	};

	const handleApproveProduct = async () => {
		if (selectedProduct) await ApproveModel.addProduct(selectedProduct);
	};

	const handleDeleteApprovedProduct = async () => {
		if (selectedProduct) await ApproveModel.deleteProduct(selectedProduct);
	};

	const handleAddToCartNotification = async () => {
		if (selectedProduct)
			await CustomerNotificationModel.addNotification({
				name: selectedProduct.name,
				type: 'add-product-to-cart',
			});
	};

	const handleAddRequestedNotification = async () => {
		if (selectedProduct)
			await AdminNotificationModel.addNotification({
				name: selectedProduct.name,
				type: 'requested',
			});
	};

	const handleAddConfirmedNotification = async () => {
		if (selectedProduct)
			await WorkerNotificationModel.addNotification({
				name: selectedProduct.name,
				type: 'confirmed',
			});
	};

	const handleAddProcessingNotification = async () => {
		if (selectedProduct)
			await WorkerNotificationModel.addNotification({
				name: selectedProduct.name,
				type: 'processing',
			});
	};

	const handleAddFinalizingNotification = async () => {
		if (selectedProduct)
			await WorkerNotificationModel.addNotification({
				name: selectedProduct.name,
				type: 'finalizing',
			});
	};

	const handleAddApprovedNotification = async () => {
		if (selectedProduct)
			await CISNotificationModel.addNotification({
				name: selectedProduct.name,
				type: 'approved',
			});
	};

	React.useEffect(() => {
		console.log(duration);
		console.log(delivery);
	}, [duration, delivery]);

	return (
		<section className='min-h-screen px-8 md:pl-16'>
			<div className='flex flex-col gap-8'>
				<div className='flex flex-col justify-center'>
					{session.user?.name != 'Customer' &&
						orderList &&
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

					{session.user?.name == 'Customer' && productList && (
						<Tabs
							aria-label='Products Tabs'
							className='flex justify-center md:justify-start'
							classNames={{
								tabList: 'bg-black',
								tab: 'text-2xl lg:text-3xl p-6 font-extrabold',
							}}
						>
							<Tab title='All'>
								<div className='flex flex-row flex-wrap justify-center md:justify-start gap-8 py-8'>
									{productList.map((product) => (
										<Card
											isPressable
											key={product.name}
											radius='lg'
											className='border-none'
											onPress={() => {
												handleSelectProduct(product);
												onOpen();
											}}
										>
											<Image
												alt={product.name}
												className='object-cover'
												src={`/images/${product.src}`}
												width={350}
											/>
										</Card>
									))}
								</div>
							</Tab>
							<Tab title='Equipments'>
								<div className='flex flex-row flex-wrap justify-center md:justify-start gap-8 py-8'>
									{productList
										.filter((product) => product.type == 'equipment')
										.map((product) => (
											<Card
												isPressable
												key={product.name}
												radius='lg'
												className='border-none'
												onPress={() => {
													handleSelectProduct(product);
													onOpen();
												}}
											>
												<Image
													alt={product.name}
													className='object-cover'
													src={`/images/${product.src}`}
													width={350}
												/>
											</Card>
										))}
								</div>
							</Tab>
							<Tab title='Tools'>
								<div className='flex flex-row flex-wrap justify-center md:justify-start gap-8 py-8'>
									{productList
										.filter((product) => product.type == 'tool')
										.map((product) => (
											<Card
												isPressable
												key={product.name}
												radius='lg'
												className='border-none'
												onPress={() => {
													handleSelectProduct(product);
													onOpen();
												}}
											>
												<Image
													alt={product.name}
													className='object-cover'
													src={`/images/${product.src}`}
													width={350}
												/>
											</Card>
										))}
								</div>
							</Tab>
						</Tabs>
					)}

					{session.user?.name == 'Customer' && productList && (
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
															<span className='font-bold'>Price</span>
														</p>
														<p>{selectedProduct.purchasePrice}</p>
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
												</div>
											)}
										</ModalBody>
										<ModalFooter>
											<Button className='bg-white text-black' onPress={onClose}>
												Close
											</Button>
											<Button
												className='bg-white text-black'
												onPress={() => {
													handleAddToCartProduct();
													handleAddToCartNotification();
													handleDeleteProduct();
													onClose();
												}}
											>
												Add To Cart
											</Button>
										</ModalFooter>
									</>
								)}
							</ModalContent>
						</Modal>
					)}

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
																<span className='font-bold'>Price</span>
															</p>
															<p>{selectedProduct.purchasePrice}</p>
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

					{session.user?.name == 'Admin' &&
						orderList &&
						orderList?.length >= 1 && (
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
													<div className='flex flex-col gap-4'>
														<div className='flex flex-col'>
															<div className='flex flex-row items-center space-between justify-between'>
																<p className='text-md sm:text-lg gap-4'>
																	<span className='font-bold'>
																		Manufacturer
																	</span>
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
																	<span className='font-bold'>
																		Manufactured
																	</span>
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
																	<span className='font-bold'>Price</span>
																</p>
																<p>{selectedProduct.purchasePrice}</p>
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
														</div>
														<div className='flex flex-row items-center space-between justify-between'>
															<p className='text-md sm:text-lg gap-4'>
																<span className='font-bold'>Duration</span>
															</p>
															<p>
																<Datepicker
																	useRange={false}
																	primaryColor='blue'
																	value={duration}
																	onChange={(event) => {
																		handleDateChange({
																			startDate: event?.startDate,
																			endDate: event?.endDate,
																		});
																		handleChangeDurationProduct({
																			startDate: event?.startDate,
																			endDate: event?.endDate,
																		});
																	}}
																/>
															</p>
														</div>
													</div>
												)}
												{selectedProduct?.type == 'tool' && (
													<div className='flex flex-col gap-4'>
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
														</div>
														<div className='flex flex-row items-center space-between justify-between'>
															<p className='text-md sm:text-lg gap-4'>
																<span className='font-bold'>Duration</span>
															</p>
															<p>
																<Datepicker
																	useRange={false}
																	primaryColor='blue'
																	value={duration}
																	onChange={(event) => {
																		handleDateChange({
																			startDate: event?.startDate,
																			endDate: event?.endDate,
																		});
																		handleChangeDurationProduct({
																			startDate: event?.startDate,
																			endDate: event?.endDate,
																		});
																	}}
																/>
															</p>
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
														handleRequestProduct();
														handleDeletePendingProduct();
														handleAddRequestedNotification();
														onClose();
													}}
													className='bg-white text-black'
												>
													Request Product
												</Button>
											</ModalFooter>
										</>
									)}
								</ModalContent>
							</Modal>
						)}

					{session.user?.name == 'Worker' &&
						requestList &&
						requestList.length >= 1 && (
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
													<div className='flex flex-col gap-4'>
														<div className='flex flex-col'>
															<div className='flex flex-row items-center space-between justify-between'>
																<p className='text-md sm:text-lg gap-4'>
																	<span className='font-bold'>
																		Manufacturer
																	</span>
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
																	<span className='font-bold'>
																		Manufactured
																	</span>
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
																	<span className='font-bold'>Price</span>
																</p>
																<p>{selectedProduct.purchasePrice}</p>
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
																	<span className='font-bold'>Duration</span>
																</p>
																<p>
																	{selectedProduct.processStart} to{' '}
																	{selectedProduct.processEnd}
																</p>
															</div>
														</div>
													</div>
												)}
												{selectedProduct?.type == 'tool' && (
													<div className='flex flex-col gap-4'>
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
														handleConfirmProduct();
														handleDeleteRequestedProduct();
														handleAddConfirmedNotification();
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
						)}

					{session.user?.name == 'Worker' &&
						confirmList &&
						confirmList.length >= 1 && (
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
													<div className='flex flex-col gap-4'>
														<div className='flex flex-col'>
															<div className='flex flex-row items-center space-between justify-between'>
																<p className='text-md sm:text-lg gap-4'>
																	<span className='font-bold'>
																		Manufacturer
																	</span>
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
																	<span className='font-bold'>
																		Manufactured
																	</span>
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
																	<span className='font-bold'>Price</span>
																</p>
																<p>{selectedProduct.purchasePrice}</p>
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
																	<span className='font-bold'>Duration</span>
																</p>
																<p>
																	{selectedProduct.processStart} to{' '}
																	{selectedProduct.processEnd}
																</p>
															</div>
														</div>
													</div>
												)}
												{selectedProduct?.type == 'tool' && (
													<div className='flex flex-col gap-4'>
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
														handleProcessProduct();
														handleDeleteConfirmedProduct();
														handleAddProcessingNotification();
														onClose();
													}}
													className='bg-white text-black'
												>
													Process Product
												</Button>
											</ModalFooter>
										</>
									)}
								</ModalContent>
							</Modal>
						)}

					{session.user?.name == 'Worker' &&
						processList &&
						processList.length >= 1 && (
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
													<div className='flex flex-col gap-4'>
														<div className='flex flex-col'>
															<div className='flex flex-row items-center space-between justify-between'>
																<p className='text-md sm:text-lg gap-4'>
																	<span className='font-bold'>
																		Manufacturer
																	</span>
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
																	<span className='font-bold'>
																		Manufactured
																	</span>
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
																	<span className='font-bold'>Price</span>
																</p>
																<p>{selectedProduct.purchasePrice}</p>
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
																	<span className='font-bold'>Duration</span>
																</p>
																<p>
																	{selectedProduct.processStart} to{' '}
																	{selectedProduct.processEnd}
																</p>
															</div>
														</div>
														<div className='flex flex-row items-center space-between justify-between'>
															<p className='text-md sm:text-lg gap-4'>
																<span className='font-bold'>Delivery</span>
															</p>
															<p>
																<Datepicker
																	useRange={false}
																	primaryColor='blue'
																	value={delivery}
																	onChange={(event) => {
																		handleDeliveryDateChange({
																			startDate: event?.startDate,
																			endDate: event?.endDate,
																		});
																		handleChangeDeliveryProduct({
																			startDate: event?.startDate,
																			endDate: event?.endDate,
																		});
																	}}
																/>
															</p>
														</div>
													</div>
												)}
												{selectedProduct?.type == 'tool' && (
													<div className='flex flex-col gap-4'>
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
																	<span className='font-bold'>Duration</span>
																</p>
																<p>
																	{selectedProduct.processStart} to{' '}
																	{selectedProduct.processEnd}
																</p>
															</div>
														</div>
														<div className='flex flex-row items-center space-between justify-between'>
															<p className='text-md sm:text-lg gap-4'>
																<span className='font-bold'>Duration</span>
															</p>
															<p>
																<Datepicker
																	useRange={false}
																	primaryColor='blue'
																	value={delivery}
																	onChange={(event) => {
																		handleDeliveryDateChange({
																			startDate: event?.startDate,
																			endDate: event?.endDate,
																		});
																		handleChangeDeliveryProduct({
																			startDate: event?.startDate,
																			endDate: event?.endDate,
																		});
																	}}
																/>
															</p>
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
														handleFinalizeProduct();
														handleDeleteProcessedProduct();
														handleAddFinalizingNotification();
														onClose();
													}}
													className='bg-white text-black'
												>
													Finalize Product
												</Button>
											</ModalFooter>
										</>
									)}
								</ModalContent>
							</Modal>
						)}

					{session.user?.name == 'CIS' &&
						finalList &&
						finalList.length >= 1 && (
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
																<span className='font-bold'>Price</span>
															</p>
															<p>{selectedProduct.purchasePrice}</p>
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
														handleApproveProduct();
														handleDeleteFinalizedProduct();
														handleAddApprovedNotification();
														onClose();
													}}
													className='bg-white text-black'
												>
													Approve Product
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

export default Home;
