import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaDownload } from 'react-icons/fa';
import Dropdown from '../../../components/common/Dropdown';

import useLangList from '../../../hooks/app/useLangList';
import useConfirm from '../../../hooks/common/useConfirm';

export default function EditTitle({ percent, actions, language }) {
	const { t } = useTranslation();
	const { getLanguage } = useLangList();
	const ConfirmReset = useConfirm({
		title: t('edit.confirmResetTitle'),
		message: t('edit.confirmResetMessage'),
		callback: actions?.reset,
	});
	const ConfirmDelete = useConfirm({
		title: t('edit.confirmDeleteTitle'),
		message: t('edit.confirmDeleteMessage'),
		callback: actions?.deleteData,
	});

	let progressPercent = 0;
	if (percent && isNaN(parseFloat(percent)) === false) {
		progressPercent = Math.round(percent);
	}
	if (progressPercent > 100) progressPercent = 100;
	if (progressPercent < 0) progressPercent = 0;

	return (
		<div>
			<ConfirmReset.Confirm />
			<ConfirmDelete.Confirm />
			<div className='flex items-end justify-between gap-5'>
				<h1 className='text-3xl font-bold flex-1'>{t('edit.title', { language: getLanguage(language) })}</h1>
				<span>{progressPercent}%</span>
			</div>
			<progress
				className={`progress w-full ${progressPercent > 0 && progressPercent < 25 && 'progress-error'} ${
					progressPercent >= 25 && progressPercent < 75 && 'progress-warning'
				} ${progressPercent >= 75 && 'progress-success'}`}
				value={progressPercent}
				max='100'
			></progress>
			<div className='flex items-center justify-between gap-5'>
				<button type='button' className='btn btn-sm btn-primary gap-2'>
					<FaDownload />
					{t('labels.download')}
				</button>
				<Dropdown text={t('labels.actions')} className='btn btn-sm btn-ghost gap-2'>
					<Dropdown.Button onClick={ConfirmReset.openConfirm}>{t('labels.reset')}</Dropdown.Button>
					<Dropdown.Button onClick={ConfirmDelete.openConfirm}>{t('labels.deleteAll')}</Dropdown.Button>
				</Dropdown>
			</div>
		</div>
	);
}

EditTitle.defaultProps = {
	percent: 50,
	actions: {},
	language: 'en',
};
