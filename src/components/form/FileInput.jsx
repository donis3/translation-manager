import React, { useEffect, useRef, useState } from 'react';
import useFileUpload from '../../hooks/common/useFileUpload';
import HiddenFile from './HiddenFile';
import { FaCloudUploadAlt, FaExclamationTriangle, FaTrashAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export default function FileInput({ setFileState, alt, optional, label, error, accept, children, ...props }) {
	const { t } = useTranslation();

	const fileRef = useRef();

	const { file, error: fileError, isLoaded, reset } = useFileUpload(fileRef, 'application/json');

	if (!children) {
		children = (
			<>
				<FaCloudUploadAlt />
				{t('labels.load')}
			</>
		);
	}
	useEffect(() => {
		if (file && setFileState) {
			setFileState(file);
		}
		if (!file && setFileState) {
			setFileState(null);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [file]);

	return (
		<div className={`form-control w-full ${error ? 'has-error' : ''}`}>
			<label className='label'>
				<span className='label-text font-medium'>
					{label}
					{optional && <span className=' ml-1 text-xs font-light'>{t('labels.optional')}</span>}
				</span>
				<span className='label-text error-label'>{error}</span>
				{fileError?.message && (
					<span className='label-text text-red-600 flex gap-1 items-center'>
						<FaExclamationTriangle />
						{t(`error.${fileError.message}`)}
					</span>
				)}
			</label>
			{/* If file not loaded, show file select button */}
			<div className={isLoaded() ? 'hidden' : ''}>
				<HiddenFile ref={fileRef} className='btn gap-2 btn-md' accept={accept}>
					{children}
				</HiddenFile>
			</div>
			{/* If file is loaded, show filename and delete button */}
			<div className={isLoaded() ? '' : 'hidden'}>
				<div className='flex items-center gap-3'>
					<input type='text' disabled readOnly defaultValue={file?.name} className='input input-bordered flex-1' />
					<button type='button' className='btn btn-ghost btn-md text-red-500' onClick={reset} {...props}>
						<FaTrashAlt />
					</button>
				</div>
			</div>
			{alt && (
				<label className='label'>
					<span className='label-text'>{alt}</span>
				</label>
			)}
		</div>
	);
}
