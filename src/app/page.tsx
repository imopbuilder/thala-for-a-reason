import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Fragment } from 'react';

export default function Home() {
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
				<p>hello world</p>
			</main>
		</Fragment>
	);
}
