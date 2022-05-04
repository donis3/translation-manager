import { useTranslation } from 'react-i18next';

const defaultTranslationData = [{ name: '', data: [] }];

/**
 * Recursive functions to process translation objects into sections
 * Merging 2 translation objects is done via mergeTranslations
 * @returns {Object} {processObject, mergeTranslations}
 */
export default function useProcessTranslationFns() {
	const { t } = useTranslation();
	const maxDepth = 50;

	/**
	 * Take an object, go through each key,
	 * first level of keys with string values will be main section,
	 * rest are other sections
	 * @param {*} data
	 */
	function generateSections(obj) {
		if (!obj || Object.keys(obj).length === 0) return [];
		const sections = Object.keys(obj).reduce((acc, key) => {
			//Take the data for this key, check if its a sub-section or string.
			const data = obj[key];

			//Subsection
			if (isValueSubsection(data)) {
				return [...acc, { name: key, data: data }];
			}

			//String
			if (isValueStr(data)) {
				//This key holds a string value which means its a base level
				//Get current base level items from accumulator
				let baseLevel = acc.find((item) => item.name === '');
				if (baseLevel) {
					//This is not the first time we found a base level item
					baseLevel = { ...baseLevel, data: { ...baseLevel.data, [key]: data } };
					return acc.map((item) => {
						if (item.name === '') {
							return baseLevel;
						} else {
							return item;
						}
					});
				} else {
					//This is the first base level item we encounter, create a baseLevel section in accumulator
					baseLevel = { name: '', data: { [key]: data } };
					return [baseLevel, ...acc];
				}
			}

			return acc;
		}, []);

		return sections;
	}

	/**
	 * Recursively traverse an object,
	 * create an array of key,value pair items for each sub-item
	 * @param {*} sectionData object with key-value pairs
	 * @param {*} sectionKeys current path in the main object.
	 * @returns array of objects
	 */
	function processSectionData(sectionData, sectionKeys = []) {
		//Validate section data
		if (!isValueStr(sectionData) && !isValueSubsection(sectionData)) return []; //Invalid subsection
		//Validate section keys & check depth
		if (!Array.isArray(sectionKeys)) sectionKeys = [];
		const currentDepth = sectionKeys.length;
		if (currentDepth > maxDepth) {
			throw new Error(t('process.recursionLimit', { limit: maxDepth }));
		}

		//If provided section data is string, return it
		if (isValueStr(sectionData)) {
			const itemKey = sectionKeys.join('.');
			return [{ key: itemKey, value: sectionData, path: sectionKeys }];
		}

		//Go through each key-value pair in this section. If another subsection is found, recursively call self
		const data = Object.keys(sectionData).reduce((acc, key) => {
			const val = sectionData[key];
			let result = [];
			if (isValueStr(val)) {
				//This is not a subsection, just normal key: 'string'
				const itemKey = [...sectionKeys, key].join('.');
				result.push({ key: itemKey, value: sectionData[key], path: [...sectionKeys, key] });
			}
			if (isValueSubsection(val)) {
				//This is also a sub section, parse each item in this object and return as key value pairs
				const subSectionKeys = [...sectionKeys, key];
				result = processSectionData(val, subSectionKeys);
			}
			return [...acc, ...result];
		}, []);
		return data;
	}

	/**
	 * Create sections and process each section's data recursively using previous functions
	 * @param {*} obj
	 * @returns Translation Object (An array of sections)
	 */
	function processObject(obj) {
		if (!obj) return defaultTranslationData;
		const objWithSections = generateSections(obj);
		if (!objWithSections || objWithSections.length === 0) return defaultTranslationData;
		const processedSections = objWithSections.reduce((acc, section) => {
			//For base section, pass empty array
			const sectionKeys = section.name === '' ? [] : [section.name];
			const sectionData = processSectionData(section.data, sectionKeys);
			const newSection = { name: section.name, data: sectionData };
			return [...acc, newSection];
		}, []);
		return processedSections;
	}

	/**
	 * Merge a target translation object with original.
	 * If target is not provided, returns original untouched
	 * Only translation keys in original are kept.
	 * @param {*} original translation object of the original file
	 * @param {*} target translation object of the target file
	 * @returns translation object merged
	 */
	function mergeTranslations(original = [], target = [], keepOnlyTargetData = false) {
		if (!Array.isArray(original)) return [];
		if (!Array.isArray(target)) return original;

		//Go through eac original section, check if target has corresponding value
		const result = original.reduce((acc, section) => {
			//If section is empty, continue
			if (!Array.isArray(section.data) || section.data.length === 0) return [...acc, section];
			//Create section placeholder and check each item in the section for a target value to replace with
			const newSection = { ...section, data: [] };

			//Go through each item in this section, merge original and target values
			section.data.forEach((item) => {
				//Path is an array that shows the path in the object to get to this value
				const { key, path } = item;
				const mergedItem = { ...item };
				if (!Array.isArray(path)) return;
				//Find this section in target
				const targetSection = target.find((sec) => sec.name === section.name);
				//If target section is found, find the item with the same key name
				let targetItem = null;
				if (targetSection && Array.isArray(targetSection?.data)) {
					targetItem = targetSection.data.find((itm) => itm.key === key);
				}
				if (targetItem && 'value' in targetItem) {
					//Target item is found, replace this item in new section
					mergedItem.value = targetItem.value;
				}
				//Remove value if keep only target value is true
				if (keepOnlyTargetData && !targetItem) {
					mergedItem.value = '';
				}
				newSection.data.push(mergedItem);
			});
			return [...acc, newSection];
		}, []);

		return result;
	}

	return { processObject, mergeTranslations };
}

/**
 * Returns true if value is string or a number
 * @param {*} val
 * @returns
 */
function isValueStr(val) {
	if (typeof val === 'string') return true;
	if (typeof val === 'number') return true;
	return false;
}

/**
 * Returns true if this is an object with key-value pairs
 * @param {*} val
 * @returns
 */
function isValueSubsection(val) {
	if (isValueStr(val)) return false;
	if (val && Object.keys(val).length > 0) return true;
	return false;
}

// const testOriginal = {
// 	locale: 'en-US',
// 	app: {
// 		name: 'Translation Manager',
// 	},
// 	routes: {
// 		home: 'Homepage',
// 		trans: 'Translate',
// 	},
// };

// const testTarget = {
// 	locale: 'tr-TR',
// 	routes: {
// 		home: 'ANASAYFA',
// 	},
// };
// //Test
// const orig = processObject(testOriginal);
// const targ = processObject(testTarget);
// //console.log(mergeTranslations(orig, targ, true));
