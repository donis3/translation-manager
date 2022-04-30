import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useFileUpload from '../../hooks/common/useFileUpload';
import useTextFns from '../../hooks/common/useTextFns';
import { FaTrashAlt as DeleteIcon, FaPlay as StartIcon, FaUpload as UploadIcon } from 'react-icons/fa';
import HiddenFile from '../../components/form/HiddenFile';
import { AppContext } from '../../context/app/appContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

/**
 * Component for Home page
 * @returns
 */
export default function Uploader() {
	const { t } = useTranslation();
	const fileRef = useRef();
	const { file, error, reset, setError, setFile } = useFileUpload(fileRef, 'application/json');
	const { truncateFilename } = useTextFns();
	const [app, dispatch] = useContext(AppContext);
	const navigate = useNavigate();

	function handleStart() {
		if (!file || !file?.content) return;
		const action = {
			type: 'LoadOriginalFile',
			payload: { ...file },
			error: (errCode) => toast.error(t(`error.${errCode}`), { toastId: 'uploader' }),
			success: () => {
				toast.success(t(`success.start`), { toastId: 'uploader' });
			},
		};
		dispatch(action);
	}

	useEffect(() => {
		if (app?.files?.original?.content && app.loadedAt && Date.now() - app.loadedAt < 1000) {
			navigate('/target');
		}
	}, [app, navigate]);

	return (
		<div className='mt-10 border border-neutral rounded-md shadow-md pb-5'>
			<div className='p-3 border-b border-neutral flex flex-wrap justify-between items-center bg-base-300 rounded-t-md'>
				<h3 className='text-lg font-medium flex-1'>
					{/* Uploader Title */}
					{t('uploader.reference')}
				</h3>
				<span className='font-mono'>
					{/* Uploaded file name */}
					{file && file.content && (
						<span className='flex items-center gap-1'>
							{t('uploader.filename', { filename: truncateFilename(file.name, 12, '..') })}
							<button type='button' className='btn btn-xs btn-ghost' onClick={reset}>
								<DeleteIcon />
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
					<HiddenFile ref={fileRef} accept='.json'>
						<UploadIcon />
						{t('uploader.uploadBtn')}
					</HiddenFile>
				</div>

				{/* Show start button when a json file is loaded */}
				<div className='flex justify-center' style={{ display: file ? undefined : 'none' }}>
					<button type='button' className='btn btn-lg gap-2 btn-primary' onClick={handleStart}>
						<StartIcon />
						{t('uploader.startBtn')}
					</button>
				</div>
			</div>
		</div>
	);
}
