import React, { useState } from 'react';
import { FaUndo as ResetIcon, FaCopy, FaTrashAlt } from 'react-icons/fa';
import { BsSquare as KeyInProgress, BsCheck2Square as KeyComplete } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import Tip from '../../../components/common/Tip';

export default function SectionItem({ sectionName, item, handleChange, handleDelete, handleReset, lang, ...props }) {
	const [showDelete, setShowDelete] = useState(false);
	const { t } = useTranslation();

	if (!item || !handleChange) return <></>;
	const { translated, key, value, path } = item;
	const isLargeText = value.length > 50;

	//Dont show first path
	let keyText = path.join(' › ');

	const onChange = (e) => {
		handleChange(sectionName, key, e.target.value);
	};

	const handleDeleteConfirm = () => {
		setShowDelete(false);
		handleDelete?.(sectionName, key);
	};

	const handleCopy = () => {
		handleChange(sectionName, key, value);
	};

	const onResetItem = () => {
		handleReset?.(sectionName, key);
	};

	return (
		<div className='flex flex-col translate-item relative'>
			<DeleteConfirm show={showDelete} callback={handleDeleteConfirm} cancel={() => setShowDelete(false)} />
			<div className='flex justify-between items-center'>
				{/* Key Text Display */}
				<div
					className={`badge capitalize gap-2 z-10 font-mono text-xs ${
						translated ? 'badge-success bg-opacity-50' : 'badge-ghost'
					}`}
				>
					{translated ? <KeyComplete /> : <KeyInProgress />}
					{keyText}
				</div>
				{/* Actions */}
				<div>
					{/* Copy Button */}
					<Tip title={t('edit.copyText')}>
						<button type='button' className='btn btn-xs btn-ghost' onClick={handleCopy}>
							<FaCopy />
						</button>
					</Tip>

					{/* Reset Button */}
					<Tip title={t('edit.resetText')}>
						<button type='button' className='btn btn-xs btn-ghost' onClick={onResetItem}>
							<ResetIcon />
						</button>
					</Tip>
					{/* Delete Button */}
					<Tip title={t('edit.deleteKey')}>
						<button type='button' className='btn btn-xs btn-ghost' onClick={() => setShowDelete(true)}>
							<FaTrashAlt />
						</button>
					</Tip>
				</div>
			</div>
			{value && <label className='text-xs rounded-md leading-relaxed  p-2 font-medium indent-3'>{value}</label>}
			{isLargeText ? (
				<textarea
					rows={3}
					onChange={onChange}
					className='textarea textarea-bordered w-full mt-2'
					value={translated}
					lang={lang}
					{...props}
				/>
			) : (
				<input
					type='text'
					onChange={onChange}
					value={translated}
					className='input input-bordered  w-full mt-2'
					lang={lang}
					{...props}
				/>
			)}
		</div>
	);
}

SectionItem.defaultProps = {
	sectionName: '',
	item: null,
	handleChange: null,
	handleDelete: null,
	handleReset: null,
	lang: 'en',
};

function DeleteConfirm({ callback = null, show = false, cancel = null }) {
	const { t } = useTranslation();

	if (!show) return <></>;
	return (
		<div className='flex gap-2 flex-col p-2 items-center justify-center absolute bg-base-100 border border-opacity-50  z-30 right-0 top-0 shadow-sm w-full h-full'>
			<p className='font-semibold'>{t('labels.deleteConfirm')}</p>
			<div className='flex gap-2'>
				<button type='button' className='btn btn-xs bg-red-500' onClick={callback}>
					{t('labels.yes')}
				</button>
				<button type='button' className='btn btn-xs bg-blue-600' onClick={cancel}>
					{t('labels.no')}
				</button>
			</div>
		</div>
	);
}
