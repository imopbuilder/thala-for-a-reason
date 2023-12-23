'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import styles from '@/styles/styles.module.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import { MoveRight } from 'lucide-react';
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
		console.log(values);
	}

	return (
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
	);
}
