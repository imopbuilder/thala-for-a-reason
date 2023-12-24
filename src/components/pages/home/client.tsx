'use client';

import { dispatch, useAppSelector } from '@/client/store';
import { setinput, setopendrawer } from '@/client/store/slices/thala-slice';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import styles from '@/styles/styles.module.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import { MoveRight } from 'lucide-react';
import Image from 'next/image';
import { Fragment } from 'react';
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
			<div className='p-5 max-w-[600px] mx-auto'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
						<FormField
							control={form.control}
							name='input'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder='Enter anything' autoComplete='off' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='flex items-center justify-between'>
							<Button className={styles['submit-btn']} type='submit'>
								Submit
							</Button>
							<MoveRight className='text-muted-foreground duration-300 opacity-0 -translate-x-14' size={18} />
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
