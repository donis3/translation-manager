import React from 'react';

export default function useAppReducer() {
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
			case 'loadFile': {
				console.log(payload);

				return onError();
			}

			default: {
				throw new Error('appReducer: Invalid Dispatch Type');
			}
		}
	}

	return appReducer;
}
