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
import ProductModel from '@/database/tool-and-die/models/Product.model';
import { toolAndDieDatabase } from '@/database/tool-and-die/tool-and-die.database';
import products from '@/sources/products';
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

	React.useEffect(() => {
		if (productList?.length == 0)
			toolAndDieDatabase.products
				.bulkPut(products)
				.then(function () {
					console.log('Data added successfully!');
				})
				.catch(function (error) {
					console.error('Error adding data: ' + error);
				});
	}, [productList]);

	const handleSelectProduct = (item: Product) => {
		setSelectedProduct(() => item);
	};

	const handleAddProduct = async () => {
		if (selectedProduct) await CartModel.addProduct(selectedProduct);
	};

	const handleDeleteProduct = async () => {
		if (selectedProduct) await ProductModel.deleteProduct(selectedProduct);
	};

	// const addProductToCart = React.useCallback(async () => {
	// 	if (selectedProduct) await toolAndDieDatabase.cart.add(selectedProduct);
	// }, [selectedProduct]);

	// const removeProduct = React.useCallback(async () => {
	// 	if (selectedProduct)
	// 		await toolAndDieDatabase.products.delete(selectedProduct.id);
	// }, [selectedProduct]);

	return (
		<section className='min-h-screen px-8'>
			<div className='flex flex-col gap-8'>
				<div>
					<h1 className='text-white text-center text-5xl md:text-7xl font-bold'>
						Products
					</h1>
				</div>
				<div className='flex flex-col justify-center'>
					{productList && (
						<Tabs
							aria-label='Products Tabs'
							className='flex justify-center'
							classNames={{
								tabList: 'bg-black',
								tab: 'text-2xl lg:text-3xl p-6 font-extrabold',
							}}
						>
							<Tab title='All'>
								<div className='flex flex-row flex-wrap justify-center gap-8 py-8'>
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
								<div className='flex flex-row flex-wrap justify-center gap-8 py-8'>
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
								<div className='flex flex-row flex-wrap justify-center gap-8 py-8'>
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
													handleAddProduct();
													handleDeleteProduct();
													onClose();
												}}
												className='bg-white text-black'
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
