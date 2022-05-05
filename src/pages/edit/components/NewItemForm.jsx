import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCheck, FaQuestionCircle, FaTimes } from 'react-icons/fa';
import Tip from '../../../components/common/Tip';
import useClickOutside from '../../../hooks/common/useClickOutside';

export default function NewItemForm({ path, handleAdd, onCancel }) {
	if (!Array.isArray(path)) path = [];
	const [parsedPath, setParsedPath] = useState([...path]);
	const [error, setError] = useState('');
	const inputRef = useRef();

	const { t } = useTranslation();

    //========// Auto put current section as sectionName. when focused
	const initialValue = path.join('.') + '.';
	const onFocus = () => {
		if (inputRef.current.value === '' && initialValue.length > 1) {
			inputRef.current.value = initialValue;
		}
	};
	const clear = () => {
		if (initialValue.length < 1) return;
		if (inputRef.current.value === initialValue) {
			inputRef.current.value = '';
		}
	};
	useClickOutside(inputRef, clear);

    //========// Show parsed path on Change
	const onChange = () => {
		const val = inputRef.current.value;
		if (!val) return setParsedPath([]);
		setParsedPath(val.split('.'));
	};

    //========// Submit form
	const handleSubmit = () => {
		const value = inputRef.current?.value;
		if (!value || value.split('.').length === 0) {
			setError(t('edit.newItemEmptyError'));
			return;
		}
		setError('');
		handleAdd?.(value.split('.'));
		onCancel();
	};

	return (
		<div className='w-full p-3 bg-base-200 rounded-md'>
			<div className='flex gap-3 items-end'>
				<div className='flex-1'>
					<Tip title={t('edit.newItemExample')}>
						<label className='p-1 text-sm font-medium select-none flex items-center gap-1'>
							{t('edit.newItemLabel')}
							<FaQuestionCircle className='text-blue-800' />
						</label>
					</Tip>
					<input
						ref={inputRef}
						type='text'
						className='input input-bordered input-sm w-full'
						placeholder={[...path, t('edit.newItemDefaultKey')].join('.')}
						onFocus={onFocus}
						onChange={onChange}
					/>
				</div>
				<button type='button' className='btn btn-sm btn-primary gap-1' onClick={handleSubmit}>
					<FaCheck />
					{t('labels.add')}
				</button>
				<button type='button' className='btn btn-sm btn-ghost gap-1' onClick={onCancel}>
					<FaTimes />
					{t('labels.cancel')}
				</button>
			</div>
			<div className='p-1'>
				{error && <p className='font-medium text-sm text-red-500'>{error}</p>}

				{!error && (
					<p className='font-mono text-sm font-thin'>{t('edit.newItemPath', { path: parsedPath.join(' > ') })}</p>
				)}
			</div>
		</div>
	);
}

NewItemForm.defaultProps = {
	path: [],
	onCancel: null,
};
