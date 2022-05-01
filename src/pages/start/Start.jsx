import React, { useContext, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaPlay } from 'react-icons/fa';
import FileInput from '../../components/form/FileInput';
import InputText from '../../components/form/InputText';
import Select from '../../components/form/Select';
import { AppContext } from '../../context/app/appContext';
import useLangList from '../../hooks/app/useLangList';
import useTextFns from '../../hooks/common/useTextFns';

export default function Start() {
	const [app, dispatch] = useContext(AppContext);
	const { t } = useTranslation();
	const { removeExtension } = useTextFns();
	const languages = useLangList();
	const [formState, setFormState] = useState({ original: null, target: null });
	const [formErrors, setFormErrors] = useState({});
	const inputRef = useRef({});
	const formDefaults = { filename: '', language: 'en' };

	/**
	 * Call when original file load event triggered
	 */
	const loadOriginal = (file) => {
		//If file is empty, and filename is the same as the last filename, remove filename
		if (!file) {
			if (getRefValue('filename') === removeExtension(formState.original?.name)) {
				setRefValue('filename', formDefaults.filename);
			}
			setFormState((state) => ({ ...state, original: null }));
			return;
		}
		setFormState((state) => ({ ...state, original: file }));
		if (getRefValue('filename') === formDefaults.filename) {
			setRefValue('filename', removeExtension(file.name));
		}
	};
	/**
	 * Call when target file load event triggered
	 */
	const loadTarget = (file) => setFormState((state) => ({ ...state, target: file }));

	/**
	 * Form submit handler
	 */
	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = validate({
			...formState,
			filename: getRefValue('filename'),
			language: getRefValue('language'),
		});
		if (!formData) return;
		//No errors continue,
		console.log(
			'TODO: send data to dispatch, navigate to edit page if successfull. We can use useEffect on app.loadedAt data to navigate if loadedAt was within 1 second'
		);
	};

	/**
	 * Set referenced inputs value
	 */
	function setRefValue(field = null, value = '') {
		if (!field) return;
		if (inputRef.current?.[field]) {
			inputRef.current[field].value = value;
		}
	}
	/**
	 * Get referenced inputs value
	 */
	function getRefValue(field = null) {
		if (inputRef.current?.[field]) {
			return inputRef.current[field].value;
		} else {
			return '';
		}
	}

	/**
	 * Validate the form data and set form errors state for detected errors.
	 * Return formData back if no errors were found
	 * @param {*} formData
	 * @returns {Object | null} if all is valid, returns form data
	 */
	function validate(formData) {
		if (!formData) return;
		setFormErrors((state) => {});
		let errors = 0;
		Object.keys(formData).forEach((key) => {
			switch (key) {
				case 'filename': {
					if (!formData[key] || formData[key].length < 2) {
						errors++;
						setFormErrors((state) => ({ ...state, [key]: t('error.minLength', { length: 2 }) }));
					}
					break;
				}
				case 'language': {
					if (!formData[key] || formData[key].length === 0) {
						errors++;
						setFormErrors((state) => ({ ...state, [key]: t('error.required') }));
					}
					break;
				}
				case 'original': {
					if (!formData[key] || !formData[key]?.content) {
						errors++;
						setFormErrors((state) => ({ ...state, [key]: t('error.fileRequired') }));
					}
					break;
				}
				default:
					break;
			}
		});
		return errors === 0 ? formData : null;
	}

	return (
		<div className='p-2 w-full max-w-2xl'>
			<div>
				<h1 className='text-2xl font-semibold'>{t('start.title')}</h1>
				<p className='leading-relaxed p-1'>{t('start.lead')}</p>
			</div>
			<div className='mt-10 border border-neutral rounded-md shadow-md pb-5'>
				<div className='p-3 border-b border-neutral   bg-base-300 rounded-t-md'>
					<h3 className='text-lg font-medium'>
						{/* Uploader Title */}
						{t('start.formTitle')}
					</h3>
				</div>
				<div>
					<form onSubmit={handleSubmit}>
						<div className='w-full p-5 flex flex-col gap-y-3'>
							<FileInput
								label={t('start.originalFile')}
								error={formErrors?.original}
								setFileState={loadOriginal}
								alt={t('start.originalFileAlt')}
								accept='.json'
							/>
							<div className='divider' />
							<FileInput
								label={t('start.targetFile')}
								error={formErrors?.target}
								setFileState={loadTarget}
								alt={t('start.targetFileAlt')}
								accept='.json'
								optional
							/>
							<div className='divider' />
							<InputText
								ref={(el) => (inputRef.current['filename'] = el)}
								label={t('start.filename')}
								error={formErrors?.filename}
								alt={t('start.filenameAlt')}
								defaultValue={formDefaults.filename}
							/>

							<Select
								ref={(el) => (inputRef.current['language'] = el)}
								label={t('start.language')}
								error={formErrors?.language}
								options={languages}
								alt={t('start.languageAlt')}
								defaultValue='en'
							/>

							<button type='submit' className='btn btn-lg mt-5 btn-block btn-primary gap-2'>
								<FaPlay />
								{t('labels.continue')}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
