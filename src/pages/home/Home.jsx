import React from 'react';
import { useTranslation } from 'react-i18next';
import Uploader from './Uploader';

export default function Home() {
	const { t } = useTranslation();
	return (
		<div className='p-2 w-full max-w-lg'>
			<div>
				<h1 className='text-2xl font-semibold'>{t('home.title')}</h1>
				<p className='leading-relaxed p-1'>{t('home.lead')}</p>
			</div>
			<Uploader />
		</div>
	);
}
