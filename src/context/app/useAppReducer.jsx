import React from 'react';
import useTextFns from '../../hooks/common/useTextFns';
import useAppDefaults from './useAppDefaults';

export default function useAppReducer() {
	const { removeExtension } = useTextFns();
	const defaultData = useAppDefaults();

	function appReducer(state, action) {
		const { type, payload, error, success } = action;

		const onSucces = (newState) => {
			success?.();
			return newState;
		};

		const onError = (errCode = 'fail') => {
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

			case 'initialize': {
				if (!payload) return onError('InvalidData');
				const { original, target, filename, language } = payload || {};
				if (!original) return onError('InvalidData');

				try {
					const newState = {
						...defaultData,
						loadedAt: Date.now(),
						filename: filename ? removeExtension(filename) : removeExtension(original?.name),
						language: language ? language : 'en',
						files: {
							original: original,
							target: target ? target : null,
						},
						data: JSON.parse(original?.content),
					};

					return onSucces(newState);
				} catch (error) {
					return onError('InvalidJsonData');
				}
			}

			default: {
				throw new Error('appReducer: Invalid Dispatch Type');
			}
		}
	}

	return appReducer;
}
