import React from 'react';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Menu from '../menu/Menu';

export default function DefaultLayout({ children }) {
	return (
		<div className='flex flex-col justify-between min-h-screen'>
			<Header>
				<Menu />
			</Header>
			<div className='flex-1 flex justify-center p-3'>
				<div className='container'>{children}</div>
			</div>
			<Footer />
		</div>
	);
}
