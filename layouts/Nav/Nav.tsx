'use client';

import {
	Avatar,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
	useDisclosure,
} from '@nextui-org/react';
import { signOut, useSession } from 'next-auth/react';
import { redirect, usePathname } from 'next/navigation';
import { FaBox, FaHome, FaShoppingCart, FaTools } from 'react-icons/fa';
import { MdLogout, MdSunny } from 'react-icons/md';

import Link from 'next/link';
import React from 'react';
import { BsTools } from 'react-icons/bs';

function Nav() {
	const { data: session } = useSession();

	if (!session) redirect('/login');

	const pathname = usePathname();
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [menuOpen, setMenuOpen] = React.useState(false);

	return (
		<Navbar
			isBordered
			isMenuOpen={menuOpen}
			className='flex flex-row bg-black py-2'
			onMenuOpenChange={setMenuOpen}
		>
			<NavbarContent justify='start'>
				<NavbarMenuToggle className='block lg:hidden' />
				<NavbarBrand
					className='hidden lg:block'
					onClick={() => setMenuOpen(() => false)}
				>
					<Link href='/'>
						<div className='flex gap-4 justify-center items-center'>
							<p className='text-center font-extrabold text-2xl md:text-3xl lg:text-4xl'>
								<FaTools />
							</p>
							<p className='text-center font-extrabold text-2xl md:text-3xl lg:text-4xl'>
								Tool and Die
							</p>
						</div>
					</Link>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent className='pr-3' justify='start'>
				<NavbarBrand
					className='block lg:hidden'
					onClick={() => setMenuOpen(() => false)}
				>
					<Link href='/'>
						<div className='flex gap-4 justify-center items-center'>
							<p className='text-center font-extrabold text-2xl md:text-3xl lg:text-4xl'>
								<FaTools />
							</p>
							<p className='text-center font-extrabold text-2xl md:text-3xl lg:text-4xl'>
								Tool and Die
							</p>
						</div>
					</Link>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent justify='end'>
				{/* <NavbarItem>
					<h1 className='text-white text-center hidden sm:block text-xl md:text-2xl font-bold'>
						{session.user?.name}
					</h1>
				</NavbarItem> */}
				<NavbarItem className='flex'>
					<Dropdown placement='bottom-end' className='bg-black'>
						<DropdownTrigger>
							<Avatar
								className='transition-transform'
								as='button'
								color='secondary'
								size='md'
								src='https://i.pravatar.cc/300'
								radius='sm'
							/>
						</DropdownTrigger>
						<DropdownMenu aria-label='Account Actions' variant='flat'>
							<DropdownItem key='theme' onClick={() => signOut()}>
								<div className='flex items-center gap-1'>
									<p>
										<MdSunny />
									</p>
									<p>Change Theme</p>
								</div>
							</DropdownItem>
							<DropdownItem
								key='logout'
								color='danger'
								onClick={() => signOut()}
							>
								<div className='flex items-center gap-1'>
									<p>
										<MdLogout />
									</p>
									<p>Log Out</p>
								</div>
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</NavbarItem>
			</NavbarContent>

			<NavbarMenu className='flex flex-col bg-black pt-8 gap-4'>
				{session.user?.name == 'Customer' && (
					<>
						<NavbarMenuItem
							className='bg-black'
							onClick={() => setMenuOpen(() => false)}
						>
							<Link href={'/'}>
								<div
									className='flex gap-4 w-100 min-h-[44px] h-full items-center px-4 py-4 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98] hover:bg-white hover:text-black'
									style={{
										background: pathname == '/' ? '#ffffff' : '#000000',
										color: pathname == '/' ? '#000000' : '#ffffff',
									}}
								>
									<p className='text-2xl'>
										<FaHome />
									</p>
									<p className='font-light w-full text-xl text-left'>
										Overview
									</p>
								</div>
							</Link>
						</NavbarMenuItem>
						<NavbarMenuItem
							className='bg-black'
							onClick={() => setMenuOpen(() => false)}
						>
							<Link href={'/products'}>
								<div
									className='flex gap-4 w-100 min-h-[44px] h-full items-center px-4 py-4 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98] hover:bg-white hover:text-black'
									style={{
										background: pathname == '/products' ? '#ffffff' : '#000000',
										color: pathname == '/products' ? '#000000' : '#ffffff',
									}}
								>
									<p className='text-2xl'>
										<BsTools />
									</p>
									<p className='font-light w-full text-xl text-left'>
										Products
									</p>
								</div>
								cart
							</Link>
						</NavbarMenuItem>
						<NavbarMenuItem
							className='bg-black'
							onClick={() => setMenuOpen(() => false)}
						>
							<Link href={'/cart'}>
								<div
									className='flex gap-4 w-100 min-h-[44px] h-full items-center px-4 py-4 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98] hover:bg-white hover:text-black'
									style={{
										background: pathname == '/cart' ? '#ffffff' : '#000000',
										color: pathname == '/cart' ? '#000000' : '#ffffff',
									}}
								>
									<p className='text-2xl'>
										<FaShoppingCart />
									</p>
									<p className='font-light w-full text-xl text-left'>Cart</p>
								</div>
							</Link>
						</NavbarMenuItem>
						<NavbarMenuItem
							className='bg-black'
							onClick={() => setMenuOpen(() => false)}
						>
							<Link href={'/orders'}>
								<div
									className='flex gap-4 w-100 min-h-[44px] h-full items-center px-4 py-4 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98] hover:bg-white hover:text-black'
									style={{
										background: pathname == '/orders' ? '#ffffff' : '#000000',
										color: pathname == '/orders' ? '#000000' : '#ffffff',
									}}
								>
									<p className='text-2xl'>
										<FaBox />
									</p>
									<p className='font-light w-full text-xl text-left'>Orders</p>
								</div>
							</Link>
						</NavbarMenuItem>
					</>
				)}

				{session?.user?.name == 'Admin' && (
					<>
						<NavbarMenuItem
							className='bg-black'
							onClick={() => setMenuOpen(() => false)}
						>
							<Link href={'/'}>
								<div
									className='flex gap-4 w-100 min-h-[44px] h-full items-center px-4 py-4 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98] hover:bg-white hover:text-black'
									style={{
										background: pathname == '/' ? '#ffffff' : '#000000',
										color: pathname == '/' ? '#000000' : '#ffffff',
									}}
								>
									<p className='text-2xl'>
										<FaHome />
									</p>
									<p className='font-light w-full text-xl text-left'>
										Overview
									</p>
								</div>
							</Link>
						</NavbarMenuItem>
						<NavbarMenuItem
							className='bg-black'
							onClick={() => setMenuOpen(() => false)}
						>
							<Link href={'/orders'}>
								<div
									className='flex gap-4 w-100 min-h-[44px] h-full items-center px-4 py-4 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98] hover:bg-white hover:text-black'
									style={{
										background: pathname == '/orders' ? '#ffffff' : '#000000',
										color: pathname == '/orders' ? '#000000' : '#ffffff',
									}}
								>
									<p className='text-2xl'>
										<FaBox />
									</p>
									<p className='font-light w-full text-xl text-left'>Orders</p>
								</div>
							</Link>
						</NavbarMenuItem>
					</>
				)}

				{session?.user?.name == 'Worker' && (
					<>
						<NavbarMenuItem
							className='bg-black'
							onClick={() => setMenuOpen(() => false)}
						>
							<Link href={'/orders'}>
								<div
									className='flex gap-4 w-100 min-h-[44px] h-full items-center px-4 py-4 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98] hover:bg-white hover:text-black'
									style={{
										background: pathname == '/orders' ? '#ffffff' : '#000000',
										color: pathname == '/orders' ? '#000000' : '#ffffff',
									}}
								>
									<p className='text-2xl'>
										<FaBox />
									</p>
									<p className='font-light w-full text-xl text-left'>Orders</p>
								</div>
							</Link>
						</NavbarMenuItem>
						<NavbarMenuItem
							className='bg-black'
							onClick={() => setMenuOpen(() => false)}
						>
							<Link href={'/requests'}>
								<div
									className='flex gap-4 w-100 min-h-[44px] h-full items-center px-4 py-4 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98] hover:bg-white hover:text-black'
									style={{
										background: pathname == '/requests' ? '#ffffff' : '#000000',
										color: pathname == '/requests' ? '#000000' : '#ffffff',
									}}
								>
									<p className='text-2xl'>
										<FaBox />
									</p>
									<p className='font-light w-full text-xl text-left'>
										Requests
									</p>
								</div>
							</Link>
						</NavbarMenuItem>
					</>
				)}

				{session?.user?.name == 'CIS' && (
					<>
						<NavbarMenuItem
							className='bg-black'
							onClick={() => setMenuOpen(() => false)}
						>
							<Link href={'/orders'}>
								<div
									className='flex gap-4 w-100 min-h-[44px] h-full items-center px-4 py-4 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98] hover:bg-white hover:text-black'
									style={{
										background: pathname == '/orders' ? '#ffffff' : '#000000',
										color: pathname == '/orders' ? '#000000' : '#ffffff',
									}}
								>
									<p className='text-2xl'>
										<FaBox />
									</p>
									<p className='font-light w-full text-xl text-left'>Orders</p>
								</div>
							</Link>
						</NavbarMenuItem>
					</>
				)}
			</NavbarMenu>
		</Navbar>
	);
}

export default Nav;
