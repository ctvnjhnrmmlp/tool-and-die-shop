import { Spinner } from '@nextui-org/react';
import anime from 'animejs';
import React from 'react';
import { FaTools } from 'react-icons/fa';

const Splash = ({ finishLoading }: { finishLoading: () => void }) => {
	const [mounted, setMounted] = React.useState(false);

	const handleAnimate = () => {
		const loader = anime.timeline({
			complete: () => finishLoading(),
		});

		loader.add({
			targets: '#splash-container',
			delay: 0,
			scale: 1,
			duration: 3000,
			easing: 'easeInOutExpo',
		});
	};

	React.useEffect(() => {
		const timeout = setTimeout(() => setMounted(true), 3000);
		handleAnimate();
		return () => clearTimeout(timeout);
	});

	return (
		<div className='flex flex-col min-h-screen justify-center items-center duration-300'>
			<div className='flex flex-col gap-16' id='splash-container'>
				<div className='flex justify-center'>
					<p className='text-8xl'>
						<FaTools />
					</p>
				</div>
				<div className='flex flex-col'>
					<h1 className='text-6xl sm:text-7xl md:text-8xl lg:text-heading-one-large text-center leading-none font-extrabold'>
						Tool and Die
					</h1>
				</div>
				<div className='flex justify-center'>
					<Spinner
						size='lg'
						color='default'
						className='text-white'
						classNames={{
							base: 'text-white',
							circle1: 'text-white',
							circle2: 'text-white',
							label: 'text-white',
							wrapper: 'text-white',
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default Splash;
