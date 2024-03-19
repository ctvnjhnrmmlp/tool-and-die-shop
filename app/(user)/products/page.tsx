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

import CartModel from '@/database/tool-and-die/models/Cart.model';
import CustomerNotificationModel from '@/database/tool-and-die/models/CustomerNotification.model';
import ProductModel from '@/database/tool-and-die/models/Product.model';
import { toolAndDieDatabase } from '@/database/tool-and-die/tool-and-die.database';
import { useLiveQuery } from 'dexie-react-hooks';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react';

function Products() {
	const { data: session } = useSession();

	if (!session) redirect('/login');

	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [selectedProduct, setSelectedProduct] = React.useState<Product>();

	const productList = useLiveQuery(() => toolAndDieDatabase.products.toArray());

	const handleSelectProduct = (item: Product) => {
		setSelectedProduct(() => item);
	};

	const handleAddToCartProduct = async () => {
		if (selectedProduct) await CartModel.addProduct(selectedProduct);
	};

	const handleAddToCartNotification = async () => {
		if (selectedProduct)
			await CustomerNotificationModel.addNotification({
				name: selectedProduct.name,
				type: 'add-product-to-cart',
			});
	};

	const handleDeleteProduct = async () => {
		if (selectedProduct) await ProductModel.deleteProduct(selectedProduct);
	};

	return (
		<section className='min-h-screen pl-16'>
			<div className='flex flex-col gap-8'>
				<div className='flex flex-col justify-center'>
					{productList && (
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
					</div>
				</div>
			</div>
		</section>
	);
}

export default Products;
