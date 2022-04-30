import React from 'react';

export default function useAppDefaults() {
	const files = {
		original: null,
		target: null,
	};

	return { files, data: {}, language: null, filename: null, loadedAt: null };
}
