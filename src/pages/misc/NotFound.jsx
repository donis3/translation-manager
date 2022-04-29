import React from 'react';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
	const { t } = useTranslation();

	return (
		<div className='p-2'>
			<h1 className='text-2xl font-semibold'>{t('notfound.title')}</h1>
			<p className='leading-relaxed p-1'>{t('notfound.lead')}</p>
		</div>
	);
}
