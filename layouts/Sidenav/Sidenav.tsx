'use client';

import { FaBox, FaHome, FaShoppingCart } from 'react-icons/fa';

import { ScrollShadow } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BsTools } from 'react-icons/bs';
import { FaSackDollar } from 'react-icons/fa6';
import { HiNewspaper } from 'react-icons/hi';
import { IoTime } from 'react-icons/io5';

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
										<div
											className='flex gap-4 w-full min-h-[44px] h-full items-center px-4 py-4 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98] hover:bg-white hover:text-black'
											style={{
												background: pathname == '/' ? '#ffffff' : '#000000',
												color: pathname == '/' ? '#000000' : '#ffffff',
											}}
										>
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
										<div
											className='flex gap-4 w-full min-h-[44px] h-full items-center px-4 py-4 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98] hover:bg-white hover:text-black'
											style={{
												background: pathname == '/cart' ? '#ffffff' : '#000000',
												color: pathname == '/cart' ? '#000000' : '#ffffff',
											}}
										>
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
										<div
											className='flex gap-4 w-full min-h-[44px] h-full items-center px-4 py-4 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98] hover:bg-white hover:text-black'
											style={{
												background:
													pathname == '/orders' ? '#ffffff' : '#000000',
												color: pathname == '/orders' ? '#000000' : '#ffffff',
											}}
										>
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
										<div
											className='flex gap-4 w-full min-h-[44px] h-full items-center px-4 py-4 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98] hover:bg-white hover:text-black'
											style={{
												background:
													pathname == '/payments' ? '#ffffff' : '#000000',
												color: pathname == '/payments' ? '#000000' : '#ffffff',
											}}
										>
											<p className='text-2xl'>
												<FaSackDollar />
											</p>
											<p className='font-light w-full text-xl text-left'>
												Payments
											</p>
										</div>
									</Link>
								</div>
								<div>
									<Link href={'/receipts'}>
										<div
											className='flex gap-4 w-full min-h-[44px] h-full items-center px-4 py-4 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98] hover:bg-white hover:text-black'
											style={{
												background:
													pathname == '/receipts' ? '#ffffff' : '#000000',
												color: pathname == '/receipts' ? '#000000' : '#ffffff',
											}}
										>
											<p className='text-2xl'>
												<HiNewspaper />
											</p>
											<p className='font-light w-full text-xl text-left'>
												Receipts
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
										<div
											className='flex gap-4 w-full min-h-[44px] h-full items-center px-4 py-4 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98] hover:bg-white hover:text-black'
											style={{
												background: pathname == '/' ? '#ffffff' : '#000000',
												color: pathname == '/' ? '#000000' : '#ffffff',
											}}
										>
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
									<Link href={'/timecards'}>
										<div
											className='flex gap-4 w-full min-h-[44px] h-full items-center px-4 py-4 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98] hover:bg-white hover:text-black'
											style={{
												background:
													pathname == '/timecards' ? '#ffffff' : '#000000',
												color: pathname == '/timecards' ? '#000000' : '#ffffff',
											}}
										>
											<p className='text-2xl'>
												<IoTime />
											</p>
											<p className='font-light w-full text-xl text-left'>
												Time Cards
											</p>
										</div>
									</Link>
								</div>
							</>
						)}

						{session?.user?.name == 'Worker' && (
							<div>
								<Link href={'/'}>
									<div
										className='flex gap-4 w-full min-h-[44px] h-full items-center px-4 py-4 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98] hover:bg-white hover:text-black'
										style={{
											background: pathname == '/' ? '#ffffff' : '#000000',
											color: pathname == '/' ? '#000000' : '#ffffff',
										}}
									>
										<p className='text-2xl'>
											<FaBox />
										</p>
										<p className='font-light w-full text-xl text-left'>
											Orders
										</p>
									</div>
								</Link>
							</div>
						)}

						{session?.user?.name == 'CIS' && (
							<>
								<div>
									<Link href={'/'}>
										<div
											className='flex gap-4 w-full min-h-[44px] h-full items-center px-4 py-4 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98] hover:bg-white hover:text-black'
											style={{
												background: pathname == '/' ? '#ffffff' : '#000000',
												color: pathname == '/' ? '#000000' : '#ffffff',
											}}
										>
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
					</div>
				</nav>
			</ScrollShadow>
		</aside>
	);
}

export default Sidenav;
