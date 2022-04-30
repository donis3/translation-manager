import { useEffect, useState } from 'react';

export default function useFileUpload(inputRef, allowed = null) {
	const [file, setFile] = useState(null);
	const [error, setError] = useState(false);
	const reader = new FileReader();
	reader.onload = handleFileLoad;

	useEffect(() => {
		const fileInput = inputRef?.current;
		if (fileInput) {
			fileInput.addEventListener('change', handleFileChange, false);
		}
		return () => fileInput?.removeEventListener('change', handleFileChange, false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function handleFileChange(e) {
		if (e.target?.files && e.target.files?.[0]) {
			if (isAllowed(e.target.files[0].type)) {
				reader.readAsText(e.target.files[0]);
				setFile({ name: e.target.files[0].name, type: e.target.files[0].type, content: null });
			} else {
				setFile(null);
				setError({ message: 'InvalidFiletype' });
			}
		}
	}

	function handleFileLoad() {
		if (reader.result) {
			setFile((state) => ({ ...state, content: reader.result }));
			setError(null);
		} else {
			setFile(null);
			setError({ message: 'EmptyFile' });
		}
	}

	/**
	 * Check if a filetype is allowed
	 * @param {string} fileType
	 * @returns {boolean}
	 */
	function isAllowed(fileType) {
		if (!fileType) return false;
		if (!allowed) return true;
		if (Array.isArray(allowed)) {
			return allowed.includes(fileType);
		} else {
			return allowed === fileType;
		}
	}

	function reset() {
		setFile(null);
		setError(false);
	}

	

	return { file, error, reset, setError, setFile };
}
