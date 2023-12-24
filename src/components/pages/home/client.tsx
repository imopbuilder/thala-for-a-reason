'use client';

import { dispatch, useAppSelector } from '@/client/store';
import { setinput, setopendrawer } from '@/client/store/slices/thala-slice';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { zodResolver } from '@hookform/resolvers/zod';
import { MoveRight, Pause, Play } from 'lucide-react';
import Image from 'next/image';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const formSchema = z.object({
	input: z.string().min(1, { message: 'Value required!' }).max(50),
});

export function ThalaForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			input: '',
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		dispatch(setinput(values.input));
		dispatch(setopendrawer(true));
	}

	return (
		<Fragment>
			<div className='p-6 max-w-[600px] mx-auto'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='flex items-top justify-between gap-4'>
						<FormField
							control={form.control}
							name='input'
							render={({ field }) => (
								<FormItem className='w-full'>
									<FormControl>
										<Input placeholder='Enter anything' autoComplete='off' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='flex items-top justify-between'>
							<Button className='group' type='submit' size='lg'>
								<span className='duration-300 opacity-100 group-hover:translate-x-24 group-hover:opacity-0'>Submit</span>
								<MoveRight
									className='absolute z-10 text-background duration-300 opacity-0 -translate-x-14 group-hover:translate-x-0 group-hover:opacity-100'
									size={18}
								/>
							</Button>
						</div>
					</form>
				</Form>
			</div>
			<OpenThalaDrawer />
		</Fragment>
	);
}

function OpenThalaDrawer() {
	const { input, openDrawer } = useAppSelector((state) => state.clientSlice);

	function isThala() {
		const isNotNumber = Number.isNaN(+input);

		// input is a string
		if (isNotNumber) {
			if (input.length === 7) return true;

			return false;
		}

		// input is a number
		const sum = input.split('').reduce((a, b) => Number(a) + Number(b), 0);
		if (sum === 7) return true;

		return false;
	}

	return (
		<Drawer open={openDrawer} onOpenChange={(open) => dispatch(setopendrawer(open))}>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle className='text-center'>Thala review system</DrawerTitle>
					<DrawerDescription className='text-center'>
						{isThala() ? `${input} is Thala for a reason` : `${input} is not a Thala for a reason`}
					</DrawerDescription>
				</DrawerHeader>
				<div className='text-center'>
					<Image
						className='inline-block max-w-[600px] w-full rounded-xl'
						src={isThala() ? '/assets/thala-true.gif' : '/assets/thala-false.gif'}
						width={100}
						height={100}
						alt={isThala() ? 'thala-true.gif' : 'thala-false.gif'}
						loading='lazy'
						unoptimized={true}
					/>
				</div>
				<div className='text-center mt-5'>
					<PlayMusic isThala={isThala()} />
				</div>
				<DrawerFooter>
					<DrawerClose asChild>
						<Button className='max-w-96 mx-auto w-full' variant='outline'>
							Close
						</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

function PlayMusic({ isThala }: { isThala: boolean }) {
	const [isPlaying, setIsplaying] = useState(true);
	const audioRef = useRef<HTMLAudioElement>(null);
	const [audio, setAudio] = useState<{ currentTime: number; duration: number; volume: number }>({ currentTime: 0, duration: 0, volume: 100 });

	function handleClick() {
		if (isPlaying) {
			audioRef.current?.pause();
		} else {
			audioRef.current?.play();
		}
		setIsplaying((curr) => !curr);
	}

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.play();

			audioRef.current.onended = () => {
				setIsplaying(false);
			};

			audioRef.current.onloadedmetadata = () => {
				if (audioRef.current?.duration)
					setAudio((curr) => ({
						...curr,
						duration: Math.floor(audioRef.current!.duration),
					}));
			};

			audioRef.current.ontimeupdate = () => {
				if (audioRef.current?.currentTime) setAudio((curr) => ({ ...curr, currentTime: Math.floor(audioRef.current!.currentTime) }));
			};

			audioRef.current.onplay = () => {
				setIsplaying(true);
			};

			audioRef.current.onpause = () => {
				setIsplaying(false);
			};
		}
	}, []);

	return (
		<div className='w-full max-w-[600px] mx-auto'>
			<audio ref={audioRef} preload='metadata'>
				<source src={isThala ? '/assets/thala-true.mp3' : '/assets/thala-false.mp3'} />
				<track kind='captions' />
			</audio>
			<div className='bg-muted flex items-center justify-center gap-2 p-2.5 pr-6 rounded-full'>
				<button type='button' className='hover:bg-muted-foreground/10 rounded-full p-2 duration-300' onClick={handleClick}>
					{isPlaying ? <Pause size={16} fill='black' /> : <Play size={16} fill='black' />}
				</button>
				<Slider
					defaultValue={[0]}
					value={[audio.currentTime]}
					step={1}
					max={audio.duration}
					onValueChange={(val) => {
						setAudio((curr) => ({ ...curr, currentTime: val[0] }));
						audioRef.current!.currentTime = val[0];
					}}
				/>
				{/* <div className='group flex w-full items-center justify-center flex-row-reverse gap-2.5 overflow-hidden'>
					<button type='button' className='rounded-full p-2 duration-300 hover:bg-muted-foreground/10'>
						<Volume2 size={16} fill='' />
					</button>
					<div>
						<Slider
							className='w-0 duration-300 group-hover:w-20'
							defaultValue={[0]}
							value={[audio.volume]}
							step={1}
							max={100}
							onValueChange={(val) => {
								setAudio((curr) => ({ ...curr, volume: val[0] }));
								audioRef.current!.volume = val[0] / 100;
							}}
						/>
					</div>
				</div> */}
			</div>
		</div>
	);
}
