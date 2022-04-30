import React from 'react';
import { useTranslation } from 'react-i18next';
import useTitle from '../../hooks/common/useTitle';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Menu from '../menu/Menu';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DefaultLayout({ children }) {
	const { t } = useTranslation();
	useTitle(t('app.name'), false);
	return (
		<>
			<ToastContainer
				position='bottom-left'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				limit={4}
			/>
			<div className='flex flex-col justify-between min-h-screen'>
				<Header>
					<Menu />
				</Header>
				<div className='flex-1 flex justify-center p-3'>
					<div className='container flex justify-center'>{children}</div>
				</div>
				<Footer />
			</div>
		</>
	);
}
