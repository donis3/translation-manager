import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Target() {
	const { t } = useTranslation();
	return (
		<div className='p-2 w-full max-w-lg'>
			<div>
				<h1 className='text-2xl font-semibold'>{t('target.title')}</h1>
				<p className='leading-relaxed p-1'>{t('target.lead')}</p>
			</div>
			<div className='border mt-10'>
				<label>Filename</label>
			</div>
		</div>
	);
}
