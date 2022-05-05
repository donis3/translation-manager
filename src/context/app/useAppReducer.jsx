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
		//Dont crash app if target fails to parse. Target is optional
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

			case 'resetData': {
				try {
					//Reset data back to initial state when files were first loaded
					const newState = {
						...state,
						reference: generateReference(state?.files?.original?.content),
						translated: generateTranslated(state?.files?.original?.content, state?.files?.target?.content),
					};
					return onSucces(newState);
				} catch (error) {
					return onError('InvalidJsonData');
				}
			}

			case 'deleteAll': {
				//Revert state back to default
				return onSucces(defaultData);
			}

			/**
			 * Takes section and key params in payload
			 * Resets the given item back to its initial value
			 */
			case 'resetItem': {
				//Validate
				const { section: sectionName, key } = payload;
				const { original, target } = state?.files || {};
				if (!original?.content || !target?.content) return onError('MissingData');
				if (!key) return onError('InvalidData');
				//Find requested section
				const section = state?.translated?.find((s) => s.name === sectionName);
				if (!section) return onError('InvalidSection');
				//Generate original translated data
				const initialSections = generateTranslated(original.content, target.content);
				if (!initialSections) return onError('MissingData');
				//Find original section
				const originalSection = initialSections?.find((s) => s.name === sectionName);
				if (!originalSection) return onError('MissingData');
				//Find requested key's original value
				const originalItem = originalSection.data?.find((item) => item.key === key);
				if (!originalItem) return onError('MissingData');

				//Create new section but get original data for this key
				const newSection = {
					...section,
					data: section.data.map((item) => {
						if (item.key !== key) return item;
						return originalItem;
					}),
				};

				//create new state with modified section
				return onSucces({
					...state,
					translated: state.translated.map((s) => (s.name === sectionName ? newSection : s)),
				});
			}

			/**
			 * Add a new empty key at given section
			 * takes a key (string)
			 */
			case 'addItem': {
				//Get the new item key
				if (!Array.isArray(payload) || payload.length === 0) return onError('InvalidData');
				const key = payload.join('.'); //Full path with dots home.title
				let sectionName = '';
				if (payload.length > 1) {
					sectionName = payload[0];
				}
				//Find this section in reference data
				let newState = { ...state };
				if (!Array.isArray(newState?.translated)) newState.translated = [];
				if (!Array.isArray(newState?.reference)) newState.reference = [];

				let newItem = { key, value: '', path: [...payload] };
				let section = { name: sectionName, data: [] }; //section data if not exists
				//Check if requested section exists in state, if not , create it
				if (newState.reference?.find((s) => s.name === sectionName)) {
					section = newState.reference.find((s) => s.name === sectionName);
				} else {
					//this is a new section, add this to state
					newState.reference = [...newState.reference, section];
					newState.translated = [...newState.translated, section];
				}
				//Check if this key already exists
				const existingItem = section.data.find((item) => item.key === key);
				if (existingItem) return onError('DuplicateItem');
				//Add to state
				newState.reference = newState.reference.map((s) => {
					if (s.name !== sectionName) return s;
					return { ...s, data: [...s.data, newItem] };
				});
				newState.translated = newState.translated.map((s) => {
					if (s.name !== sectionName) return s;
					return { ...s, data: [...s.data, newItem] };
				});

				return onSucces(newState);
			}

			case 'deleteItem': {
				//Remove an item from translated array section
				const { section, key } = payload;
				if (!key) return onError();
				//find sections
				const refSection = state?.reference?.find((sct) => sct.name === section);
				const targetSection = state?.translated?.find((sct) => sct.name === section);

				//Default values for sections
				const newTargetSection = { name: section, data: [] };
				const newRefSection = { name: section, data: [] };
				//Check if target and ref sections exist in state
				if (targetSection) {
					newTargetSection.data = targetSection.data.filter((item) => item.key !== key);
				}
				if (refSection) {
					newRefSection.data = refSection.data.filter((item) => item.key !== key);
				}
				//Create new states for reference and translated arrays
				let newReferenceArray = [newRefSection];
				if (refSection) {
					newReferenceArray = state.reference.map((sct) => {
						if (sct.name !== section) return sct;
						return newRefSection;
					});
				}
				let newTranslatedArray = [newTargetSection];
				if (targetSection) {
					newTranslatedArray = state.translated.map((sct) => {
						if (sct.name !== section) return sct;
						return newTargetSection;
					});
				}
				//Check data length and if no items left in section, remove section
				if (newRefSection.data.length === 0) {
					newReferenceArray = newReferenceArray.filter((sct) => sct.name !== section);
				}
				if (newTargetSection.data.length === 0) {
					newTranslatedArray = newTranslatedArray.filter((sct) => sct.name !== section);
				}

				//generate new state
				const newState = {
					...state,
					reference: newReferenceArray,
					translated: newTranslatedArray,
				};

				return onSucces(newState);
			}

			case 'handleChange': {
				const { sectionName, key, value } = payload;
				//Find section
				const section = state?.translated?.find((section) => section.name === sectionName);
				if (!section || !section?.data || !Array.isArray(section.data)) return onError('InvalidSection');

				//Find the item with the same key
				const targetItem = section.data.find((item) => item.key === key);
				if (!targetItem) return onError('InvalidKey');

				//create new section with changed value
				const newSection = {
					...section,
					data: section.data.map((item) => {
						if (item.key === key) {
							//This item is the one that needs changing
							return { ...item, value: value };
						} else {
							return item;
						}
					}),
				};

				//Change section in state
				const newState = {
					...state,
					translated: state.translated.map((sect) => {
						if (sect.name !== sectionName) return sect;
						return newSection;
					}),
				};

				return onSucces(newState);
			}

			default: {
				throw new Error('appReducer: Invalid Dispatch Type');
			}
		}
	}

	return appReducer;
}
