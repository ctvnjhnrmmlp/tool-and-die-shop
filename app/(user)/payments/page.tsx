'use client';

import {
	Button,
	Card,
	Chip,
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
import { Form, Formik } from 'formik';
import { ZodError, z } from 'zod';

import PaymentModel from '@/database/tool-and-die/models/Payment.model';
import ReceiptModel from '@/database/tool-and-die/models/Receipt.model';
import { toolAndDieDatabase } from '@/database/tool-and-die/tool-and-die.database';
import { Input } from '@nextui-org/react';
import { useLiveQuery } from 'dexie-react-hooks';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react';

function Payments() {
	const { data: session } = useSession();

	if (!session) redirect('/login');

	const [paymentEnough, setPaymentEnough] = React.useState(false);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [selectedProduct, setSelectedProduct] = React.useState<Product>();

	const paymentList = useLiveQuery(() => toolAndDieDatabase.payments.toArray());

	const handleSelectProduct = (item: Product) => {
		setSelectedProduct(() => item);
	};

	const handleSetPaymentEnough = (enough: boolean) => {
		setPaymentEnough(() => enough);
	};

	const handleAddReceiptProduct = async () => {
		if (selectedProduct) await ReceiptModel.addReceipt(selectedProduct);
	};

	const handleDeletePaymentProduct = async () => {
		if (selectedProduct) await PaymentModel.deletePayment(selectedProduct);
	};

	return (
		<section className='min-h-screen px-8 md:pl-16'>
			<div className='flex flex-col gap-8'>
				<div className='flex flex-col justify-center'>
					{paymentList && (
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
									{paymentList.map((product) => (
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
									{paymentList
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
									{paymentList
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
				</div>
				<div>
					{
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
													<div className='flex flex-row items-center space-between justify-between'>
														<p className='text-md sm:text-lg gap-4'>
															<span className='font-bold'>Payment</span>
														</p>
														<p>
															<Formik
																initialValues={{
																	payment: 0,
																}}
																validate={(values) => {
																	const schema = z.object({
																		payment: z.number(),
																	});

																	try {
																		schema.parse(values);
																	} catch (error) {
																		handleSetPaymentEnough(false);

																		if (error instanceof ZodError) {
																			return error.formErrors.fieldErrors;
																		}
																	}
																}}
																onSubmit={(values) => {
																	if (
																		values.payment >=
																		selectedProduct.purchasePrice
																	) {
																		handleSetPaymentEnough(true);
																		return;
																	}

																	handleSetPaymentEnough(false);
																}}
															>
																{(formik) => (
																	<Form>
																		<div className='flex flex-col gap-2'>
																			<Input
																				isRequired
																				type='number'
																				id='payment'
																				placeholder='0.00'
																				classNames={{
																					input: 'font-extrabold',
																				}}
																				startContent={
																					<span className='text-black'>$</span>
																				}
																				{...formik.getFieldProps('payment')}
																			/>
																			{formik.touched.payment &&
																			formik.errors.payment ? (
																				<Chip color='danger' radius='sm'>
																					{formik.errors.payment}
																				</Chip>
																			) : null}
																		</div>
																	</Form>
																)}
															</Formik>
														</p>
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
													<div className='flex flex-row items-center space-between justify-between'>
														<p className='text-md sm:text-lg gap-4'>
															<span className='font-bold'>Payment</span>
														</p>
														<p>
															<Formik
																initialValues={{
																	payment: 0,
																}}
																validate={(values) => {
																	const schema = z.object({
																		payment: z.number(),
																	});

																	try {
																		schema.parse(values);
																	} catch (error) {
																		handleSetPaymentEnough(false);

																		if (error instanceof ZodError) {
																			return error.formErrors.fieldErrors;
																		}
																	}
																}}
																onSubmit={(values) => {
																	if (
																		values.payment >=
																		selectedProduct.purchasePrice
																	) {
																		handleSetPaymentEnough(true);
																		return;
																	}

																	handleSetPaymentEnough(false);
																}}
															>
																{(formik) => (
																	<Form>
																		<div className='flex flex-col gap-2'>
																			<Input
																				isRequired
																				type='number'
																				id='payment'
																				placeholder='0.00'
																				classNames={{
																					input: 'font-extrabold',
																				}}
																				startContent={
																					<span className='text-black'>$</span>
																				}
																				{...formik.getFieldProps('payment')}
																			/>
																			{formik.touched.payment &&
																			formik.errors.payment ? (
																				<Chip color='danger' radius='sm'>
																					{formik.errors.payment}
																				</Chip>
																			) : null}
																		</div>
																	</Form>
																)}
															</Formik>
														</p>
													</div>
												</div>
											)}
										</ModalBody>
										<ModalFooter>
											<Button className='bg-white text-black' onPress={onClose}>
												Close
											</Button>
											{paymentEnough && (
												<Button
													onPress={() => {
														handleAddReceiptProduct();
														handleDeletePaymentProduct();
														onClose();
													}}
													className='bg-white text-black'
												>
													Release Product
												</Button>
											)}
										</ModalFooter>
									</>
								)}
							</ModalContent>
						</Modal>
					}
				</div>
			</div>
		</section>
	);
}

export default Payments;
