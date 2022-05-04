import React from 'react';
import useProcessTranslationFns from '../../hooks/app/useProcessTranslationFns';
import useTextFns from '../../hooks/common/useTextFns';
import useAppDefaults from './useAppDefaults';

export default function useAppReducer() {
	const { removeExtension } = useTextFns();
	const defaultData = useAppDefaults();
	const { processObject, mergeTranslations } = useProcessTranslationFns();

	function generateReference(originalFileContents) {
		let original = JSON.parse(originalFileContents);
		return processObject(original);
	}
	/**
	 * Generate current translation state for the app.
	 * Will take already translated data from targetFile if possible
	 * @param {*} originalFileContents
	 * @param {*} targetFileContents
	 * @returns
	 */
	function generateTranslated(originalFileContents, targetFileContents) {
		let original = JSON.parse(originalFileContents);
		let target = null;
		//Dont crash app if target failes to parse. Target is optional
		try {
			if (targetFileContents) target = JSON.parse(targetFileContents);
		} catch (error) {}
		//Process json data into translation objects
		const originalTranslationObject = processObject(original);
		const targetTranslationObject = processObject(target);

		//merge both translations together
		return mergeTranslations(originalTranslationObject, targetTranslationObject, true);
	}

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
			case 'initialize': {
				if (!payload) return onError('InvalidData');
				const { original, target, filename, language } = payload || {};
				if (!original) return onError('InvalidData');

				try {
					//Create a new app state with empty data and uploaded file contents
					const newState = {
						...defaultData,
						loadedAt: Date.now(),
						filename: filename ? removeExtension(filename) : removeExtension(original?.name),
						language: language ? language : 'en',
						files: {
							original: original,
							target: target ? target : null,
						},
						reference: generateReference(original?.content),
						translated: generateTranslated(original?.content, target?.content),
					};

					return onSucces(newState);
				} catch (error) {
					return onError('InvalidJsonData');
				}
			}

			case 'handleChange': {
				const { sectionName, key, value } = payload;
				//Find section
				const section = state?.translated?.find((section) => section.name === sectionName);
				if (!section) return onError('InvalidSection');
				
				console.log('TODO: process change')

				return onSucces(state);
			}

			default: {
				throw new Error('appReducer: Invalid Dispatch Type');
			}
		}
	}

	return appReducer;
}
