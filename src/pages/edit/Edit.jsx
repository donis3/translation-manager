import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Edit() {
	const { t } = useTranslation();
	return (
		<div className='p-2 w-full max-w-lg'>
			<div>
				<h1 className='text-2xl font-semibold'>{t('edit.title')}</h1>
				<p className='leading-relaxed p-1'>{t('edit.lead')}</p>
			</div>
		</div>
	);
}
