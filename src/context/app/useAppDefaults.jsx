import React from 'react';

export default function useAppDefaults() {
	const files = {
		original: {
			loaded: false,
			name: '',
			language: null,
			contents: null,
		},
		target: { loaded: false, name: '', language: null, contents: null },
	};


	return { files, original: {}, target: {}, language: null, filename: null };
}
