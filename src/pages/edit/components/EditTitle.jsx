import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaDownload } from 'react-icons/fa';
import Dropdown from '../../../components/common/Dropdown';
import useUi from '../../../context/ui/useUi';

import useLangList from '../../../hooks/app/useLangList';
import useConfirm from '../../../hooks/common/useConfirm';

export default function EditTitle({ percent, actions, language, onDownload, filename }) {
	const { t } = useTranslation();
	const { getLanguage } = useLangList();
	const { language: uiLanguage } = useUi();
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

	//Show translation language name in native or english depending on Ui language
	const titleLangText = uiLanguage === 'en' ? getLanguage(language, false) : getLanguage(language, true);

	return (
		<div>
			<ConfirmReset.Confirm />
			<ConfirmDelete.Confirm />
			{filename && (
				<div className='w-full'>
					<p className='text-xs opacity-70'>{filename}.json</p>
				</div>
			)}
			<div className='flex items-end justify-between gap-5'>
				<h1 className='text-3xl font-bold flex-1'>{t('edit.title', { language: titleLangText })}</h1>
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
				<button type='button' className='btn btn-sm btn-primary gap-2' onClick={onDownload}>
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
	filename: '',
	onDownload: () => console.log('Missing download handler'),
};
