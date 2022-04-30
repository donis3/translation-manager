import React, { useEffect, useState } from 'react';

export default function useFileUpload(inputRef, allowed = null) {
	const [file, setFile] = useState(null);
	const [error, setError] = useState(false);

	useEffect(() => {
		const fileInput = inputRef?.current;
		if (fileInput) {
			fileInput.addEventListener('change', handleFileChange, false);
		}
		return () => fileInput?.removeEventListener('change', handleFileChange, false);
	}, []);

	function handleFileChange(e) {
		if (e.target?.files && e.target.files?.[0]) {
			if (isAllowed(e.target.files[0].type)) {
				setFile(e.target.files[0]);
				setError(false);
			} else {
				setFile(null);
				setError({ message: 'InvalidFiletype', data: e.target.files[0].type });
			}
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

	return { file, error, reset };
}
