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
import OrderModel from '@/database/tool-and-die/models/Order.model';
import { toolAndDieDatabase } from '@/database/tool-and-die/tool-and-die.database';
import { useLiveQuery } from 'dexie-react-hooks';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react';

function Cart() {
	const { data: session } = useSession();

	if (!session) redirect('/login');

	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [selectedProduct, setSelectedProduct] = React.useState<Product>();

	const cartList = useLiveQuery(() => toolAndDieDatabase.cart.toArray());

	const handleSelectProduct = (item: Product) => {
		setSelectedProduct(() => item);
	};

	const handleAddProduct = async () => {
		if (selectedProduct)
			OrderModel.addProduct({
				...selectedProduct,
				status: 'pending',
			});
	};

	const handleDeleteProduct = async () => {
		if (selectedProduct) CartModel.deleteProduct(selectedProduct);
	};

	// const addProductToOrder = React.useCallback(async () => {
	// 	if (selectedProduct) {
	// 		await toolAndDieDatabase.orders.add({
	// 			...selectedProduct,
	// 			status: 'pending',
	// 		});
	// 	}
	// }, [selectedProduct]);

	// const removeProduct = React.useCallback(async () => {
	// 	if (selectedProduct)
	// 		await toolAndDieDatabase.cart.delete(selectedProduct.id);
	// }, [selectedProduct]);

	return (
		<section className='min-h-screen px-8'>
			<div className='flex flex-col gap-8'>
				<div>
					<h1 className='text-white text-center text-5xl md:text-7xl font-bold'>
						Cart
					</h1>
				</div>
				<div className='flex flex-col justify-center'>
					{cartList && (
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
									{cartList.map((product) => (
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
									{cartList
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
									{cartList
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
											Order Product
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

export default Cart;
