import React from 'react';
import useTextFns from '../../hooks/common/useTextFns';

export default function useAppReducer() {
	const { removeExtension } = useTextFns();

	function appReducer(state, action) {
		const { type, payload, error, success } = action;

		const onSucces = (newState) => {
			success?.();
			return newState;
		};

		const onError = (errCode = '') => {
			error?.(errCode);
			return state;
		};

		switch (type) {
			/**
			 * Load a new translation file
			 */
			case 'LoadOriginalFile': {
				if (!payload || !payload?.content) return onError('InvalidData');
				let fileData = {};
				let data = {};
				let filename = '';

				try {
					fileData = { ...payload, content: JSON.parse(payload.content) };
					data = JSON.parse(payload.content);
					filename = removeExtension(payload.name);
				} catch (error) {
					//Unable to parse file contents
					return onError('InvalidJsonData');
				}
				return onSucces({
					...state,
					data,
					filename,
					files: { ...state.files, original: fileData },
					loadedAt: Date.now(),
				});
			}

			default: {
				throw new Error('appReducer: Invalid Dispatch Type');
			}
		}
	}

	return appReducer;
}
