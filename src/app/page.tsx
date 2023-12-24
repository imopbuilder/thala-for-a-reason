import { ThalaForm } from '@/components/pages/home/client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Fragment } from 'react';

export default function page() {
	return (
		<Fragment>
			<header className='border-b'>
				<div className='h-14 flex items-center justify-between max-w-maxi mx-auto'>
					<div>
						<Link href={'/'} className='font-medium'>
							Thala for a reason
						</Link>
					</div>
					<div>
						<Button size='sm' asChild>
							<Link href='/'>Support Project</Link>
						</Button>
					</div>
				</div>
			</header>
			<main>
				<section className='mx-auto max-w-maxi py-5'>
					<div className='py-14'>
						<h2 className='text-center text-5xl font-extrabold bg-gradient-to-b from-foreground to-muted-foreground text-transparent bg-clip-text opacity-90'>
							Thala for a reason
						</h2>
						<ThalaForm />
					</div>
				</section>
			</main>
		</Fragment>
	);
}
