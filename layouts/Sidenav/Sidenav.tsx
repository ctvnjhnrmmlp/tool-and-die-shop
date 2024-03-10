'use client';

import { Button, Navbar, ScrollShadow, Tab, Tabs } from '@nextui-org/react';
import {
	FaAddressCard,
	FaBox,
	FaCheckCircle,
	FaFileInvoice,
	FaHome,
	FaInbox,
	FaMoneyBillAlt,
	FaShoppingCart,
	FaStore,
} from 'react-icons/fa';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BiSolidFactory } from 'react-icons/bi';
import { BsTools } from 'react-icons/bs';
import { FaSackDollar } from 'react-icons/fa6';
import { MdFactory } from 'react-icons/md';

function Sidenav() {
	const { data: session } = useSession();
	const pathname = usePathname();

	return (
		<aside className='fixed hidden lg:block h-screen bg-black outline outline-1 outline-[#27282D] overflow-y-scroll no-scrollbar w-72'>
			<ScrollShadow className='h-screen overflow-y-scroll no-scrollbar'>
				<nav className='p-4 w-full flex flex-col flex-wrap justify-between h-1/6'>
					<div className='flex flex-col gap-4'>
						{session?.user?.name == 'Customer' && (
							<>
								<div>
									<Link href={'/'}>
										<div className='flex gap-4 w-full min-h-[44px] h-full items-center px-4 py-4 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98] hover:bg-white hover:text-black'>
											<p className='text-2xl'>
												<FaHome />
											</p>
											<p className='font-light w-full text-xl text-left'>
												Overview
											</p>
										</div>
									</Link>
								</div>

								<div>
									<Link href={'/products'}>
										<div className='flex gap-4 w-full min-h-[44px] h-full items-center px-4 py-4 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98] hover:bg-white hover:text-black'>
											<p className='text-2xl'>
												<BsTools />
											</p>
											<p className='font-light w-full text-xl text-left'>
												Products
											</p>
										</div>
									</Link>
								</div>

								<div>
									<Link href={'/cart'}>
										<div className='flex gap-4 w-full min-h-[44px] h-full items-center px-4 py-4 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98] hover:bg-white hover:text-black'>
											<p className='text-2xl'>
												<FaShoppingCart />
											</p>
											<p className='font-light w-full text-xl text-left'>
												Cart
											</p>
										</div>
									</Link>
								</div>

								<div>
									<Link href={'/orders'}>
										<div className='flex gap-4 w-full min-h-[44px] h-full items-center px-4 py-4 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98] hover:bg-white hover:text-black'>
											<p className='text-2xl'>
												<FaBox />
											</p>
											<p className='font-light w-full text-xl text-left'>
												Orders
											</p>
										</div>
									</Link>
								</div>

								<div>
									<Link href={'/payments'}>
										<div className='flex gap-4 w-full min-h-[44px] h-full items-center px-4 py-4 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98] hover:bg-white hover:text-black'>
											<p className='text-2xl'>
												<FaSackDollar />
											</p>
											<p className='font-light w-full text-xl text-left'>
												Payments
											</p>
										</div>
									</Link>
								</div>
							</>
						)}

						{session?.user?.name == 'Admin' && (
							<>
								<div>
									<Link href={'/'}>
										<div className='flex gap-4 w-full min-h-[44px] h-full items-center px-4 py-4 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98] hover:bg-white hover:text-black'>
											<p className='text-2xl'>
												<FaHome />
											</p>
											<p className='font-light w-full text-xl text-left'>
												Overview
											</p>
										</div>
									</Link>
								</div>

								<div>
									<Link href={'/orders'}>
										<div className='flex gap-4 w-full min-h-[44px] h-full items-center px-4 py-4 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98] hover:bg-white hover:text-black'>
											<p className='text-2xl'>
												<FaSackDollar />
											</p>
											<p className='font-light w-full text-xl text-left'>
												Orders
											</p>
										</div>
									</Link>
								</div>
							</>
						)}

						{session?.user?.name == 'Worker' && (
							<>
								<div>
									<Link href={'/orders'}>
										<div className='flex gap-4 w-full min-h-[44px] h-full items-center px-4 py-4 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98] hover:bg-white hover:text-black'>
											<p className='text-2xl'>
												<FaBox />
											</p>
											<p className='font-light w-full text-xl text-left'>
												Orders
											</p>
										</div>
									</Link>
								</div>

								<div>
									<Link href={'/requests'}>
										<div className='flex gap-4 w-full min-h-[44px] h-full items-center px-4 py-4 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98] hover:bg-white hover:text-black'>
											<p className='text-2xl'>
												<FaHome />
											</p>
											<p className='font-light w-full text-xl text-left'>
												Requests
											</p>
										</div>
									</Link>
								</div>
							</>
						)}

						{session?.user?.name == 'CIS' && (
							<>
								<div>
									<Link href={'/orders'}>
										<div className='flex gap-4 w-full min-h-[44px] h-full items-center px-4 py-4 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98] hover:bg-white hover:text-black'>
											<p className='text-2xl'>
												<FaBox />
											</p>
											<p className='font-light w-full text-xl text-left'>
												Orders
											</p>
										</div>
									</Link>
								</div>
							</>
						)}

						{/* <div>
							<Link href={'/overview/'}>
								<div className='flex gap-4 w-full min-h-[44px] h-full items-center px-4 py-4 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98] hover:bg-white hover:text-black'>
									<p className='text-2xl'>
										<FaHome />
									</p>
									<p className='font-light w-full text-xl text-left'>
										Overview
									</p>
								</div>
							</Link>
						</div>

						<div>
							<Link href={'/orders/'}>
								<div className='flex gap-4 w-full min-h-[44px] h-full items-center px-4 py-4 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98] hover:bg-white hover:text-black'>
									<p className='text-2xl'>
										<FaFileInvoice />
									</p>
									<p className='font-light w-full text-xl text-left'>Orders</p>
								</div>
							</Link>
						</div>

						<div>
							<Link href={'/jobs/'}>
								<div className='flex gap-4 w-full min-h-[44px] h-full items-center px-4 py-4 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98] hover:bg-white hover:text-black'>
									<p className='text-2xl'>
										<FaBox />
									</p>
									<p className='font-light w-full text-xl text-left'>Jobs</p>
								</div>
							</Link>
						</div>

						<div>
							<Link href={'/jobs/'}>
								<div className='flex gap-4 w-full min-h-[44px] h-full items-center px-4 py-4 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98] hover:bg-white hover:text-black'>
									<p className='text-2xl'>
										<FaAddressCard />
									</p>
									<p className='font-light w-full text-xl text-left'>
										Time Cards
									</p>
								</div>
							</Link>
						</div>

						<div>
							<Link href={'/inventory/'}>
								<div className='flex gap-4 w-full min-h-[44px] h-full items-center px-4 py-4 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98] hover:bg-white hover:text-black'>
									<p className='text-2xl'>
										<FaStore />
									</p>
									<p className='font-light w-full text-xl text-left'>
										Inventory
									</p>
								</div>
							</Link>
						</div>

						<div>
							<Link href={'/validate/'}>
								<div className='flex gap-4 w-full min-h-[44px] h-full items-center px-4 py-4 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98] hover:bg-white hover:text-black'>
									<p className='text-2xl'>
										<FaCheckCircle />
									</p>
									<p className='font-light w-full text-xl text-left'>
										Validate
									</p>
								</div>
							</Link>
						</div>

						<div>
							<Link href={'/bill/'}>
								<div className='flex gap-4 w-full min-h-[44px] h-full items-center px-4 py-4 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98] hover:bg-white hover:text-black'>
									<p className='text-2xl'>
										<FaMoneyBillAlt />
									</p>
									<p className='font-light w-full text-xl text-left'>Bill</p>
								</div>
							</Link>
						</div> */}
					</div>
				</nav>
			</ScrollShadow>
		</aside>
	);
}

export default Sidenav;
