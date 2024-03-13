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
import ConfirmModel from '@/database/tool-and-die/models/Confirm.model';
import FinalModel from '@/database/tool-and-die/models/Final.model';
import OrderModel from '@/database/tool-and-die/models/Order.model';
import ProcessModel from '@/database/tool-and-die/models/Process.model';
import RequestModel from '@/database/tool-and-die/models/Request.model';
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

	return (
		<section className='min-h-screen px-8'>
			<div className='flex flex-col gap-8'>
				<div>
					<h1 className='text-white text-center text-5xl md:text-7xl font-bold'>
						Orders
					</h1>
				</div>
				<div className='flex flex-col justify-center'>
					{orderList &&
						requestList &&
						confirmList &&
						processList &&
						finalList &&
						approveList && (
							<Tabs
								aria-label='Address Tabs'
								className='flex justify-center'
								classNames={{
									tabList: 'bg-black',
									tab: 'text-2xl lg:text-3xl p-6 font-extrabold',
								}}
							>
								<Tab title='Pending'>
									<div className='flex flex-row flex-wrap justify-center gap-8 py-8'>
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
								<Tab title='Confirmed'>
									<div className='flex flex-row flex-wrap justify-center gap-8 py-8'>
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
									<div className='flex flex-row flex-wrap justify-center gap-8 py-8'>
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
									<div className='flex flex-row flex-wrap justify-center gap-8 py-8'>
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
									<div className='flex flex-row flex-wrap justify-center gap-8 py-8'>
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
											<ModalBody className='flex items-center'>
												<Image
													alt={selectedProduct?.name}
													className='object-cover'
													src={`/images/${selectedProduct?.src}`}
													width={350}
												/>
											</ModalBody>
											<ModalFooter>
												<Button
													color='danger'
													variant='light'
													onPress={onClose}
												>
													Close
												</Button>
												<Button
													onPress={() => {
														handleRequestProduct();
														handleDeletePendingProduct();
														setSelectedProduct({
															id: 0,
															name: '',
															src: '',
															status: '',
															type: '',
														});
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
				</div>

				<div>
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
											<ModalBody className='flex items-center'>
												<Image
													alt={selectedProduct?.name}
													className='object-cover'
													src={`/images/${selectedProduct?.src}`}
													width={350}
												/>
											</ModalBody>
											<ModalFooter>
												<Button
													color='danger'
													variant='light'
													onPress={onClose}
												>
													Close
												</Button>
												<Button
													onPress={() => {
														handleConfirmProduct();
														handleDeleteRequestedProduct();
														setSelectedProduct({
															id: 0,
															name: '',
															src: '',
															status: '',
															type: '',
														});
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
				</div>

				<div>
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
											<ModalBody className='flex items-center'>
												<Image
													alt={selectedProduct?.name}
													className='object-cover'
													src={`/images/${selectedProduct?.src}`}
													width={350}
												/>
											</ModalBody>
											<ModalFooter>
												<Button
													color='danger'
													variant='light'
													onPress={onClose}
												>
													Close
												</Button>
												<Button
													onPress={() => {
														handleProcessProduct();
														handleDeleteConfirmedProduct();
														setSelectedProduct({
															id: 0,
															name: '',
															src: '',
															status: '',
															type: '',
														});
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
				</div>

				<div>
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
											<ModalBody className='flex items-center'>
												<Image
													alt={selectedProduct?.name}
													className='object-cover'
													src={`/images/${selectedProduct?.src}`}
													width={350}
												/>
											</ModalBody>
											<ModalFooter>
												<Button
													color='danger'
													variant='light'
													onPress={onClose}
												>
													Close
												</Button>
												<Button
													onPress={() => {
														handleFinalizeProduct();
														handleDeleteProcessedProduct();
														setSelectedProduct({
															id: 0,
															name: '',
															src: '',
															status: '',
															type: '',
														});
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
				</div>

				<div>
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
											<ModalBody className='flex items-center'>
												<Image
													alt={selectedProduct?.name}
													className='object-cover'
													src={`/images/${selectedProduct?.src}`}
													width={350}
												/>
											</ModalBody>
											<ModalFooter>
												<Button
													color='danger'
													variant='light'
													onPress={onClose}
												>
													Close
												</Button>
												<Button
													onPress={() => {
														handleApproveProduct();
														handleDeleteFinalizedProduct();
														setSelectedProduct({
															id: 0,
															name: '',
															src: '',
															status: '',
															type: '',
														});
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

export default Orders;
