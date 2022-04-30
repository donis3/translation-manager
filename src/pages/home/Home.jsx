import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FaTrashAlt, FaPlay as StartIcon, FaUpload as UploadIcon } from 'react-icons/fa';

import HiddenFile from '../../components/form/HiddenFile';
import useFileUpload from '../../hooks/common/useFileUpload';
import useTextFns from '../../hooks/common/useTextFns';

export default function Home() {
	const { t } = useTranslation();
	const test = useRef();
	const { file, error, reset } = useFileUpload(test, 'application/json');
	const { truncateFilename } = useTextFns();

	return (
		<div className='p-2 w-full max-w-lg'>
			<div>
				<h1 className='text-2xl font-semibold'>{t('home.title')}</h1>
				<p className='leading-relaxed p-1'>{t('home.lead')}</p>
			</div>

			<div className='mt-10 border border-neutral rounded-md shadow-md pb-5'>
				<div className='p-3 border-b border-neutral flex flex-wrap justify-between items-center bg-base-300 rounded-t-md'>
					<h3 className='text-lg font-medium flex-1'>
						{/* Uploader Title */}
						{t('uploader.reference')}
					</h3>
					<span className='font-mono'>
						{/* Uploaded file name */}
						{file && (
							<span className='flex items-center gap-1'>
								{t('uploader.filename', { filename: truncateFilename(file.name, 12, '..') })}
								<button type='button' className='btn btn-xs btn-ghost' onClick={reset}>
									<FaTrashAlt />
								</button>
							</span>
						)}
						{error && <span className='text-red-600'> {t(`uploader.${error.message}`)} </span>}
					</span>
				</div>
				<div className='flex flex-col gap-y-5 p-3'>
					<p className='font-light text-sm'>{t('uploader.referenceText')}</p>

					{/* Show upload button when no file is loaded */}
					<div className='flex justify-center' style={{ display: file ? 'none' : undefined }}>
						<HiddenFile ref={test} accept='.json'>
							<UploadIcon />
							{t('uploader.uploadBtn')}
						</HiddenFile>
					</div>

					{/* Show start button when a json file is loaded */}
					<div className='flex justify-center' style={{ display: file ? undefined : 'none' }}>
						<button type='button' className='btn btn-lg gap-2 btn-primary'>
							<StartIcon />
							{t('uploader.startBtn')}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
