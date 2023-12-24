import ReduxProvider from '@/client/provider/redux-provider';
import '@/styles/main.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Thala for a reason',
	description: 'A next.js app that checks if the word is a thala for a reason',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<ReduxProvider>{children}</ReduxProvider>
			</body>
		</html>
	);
}
