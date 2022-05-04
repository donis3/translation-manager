import React, { useContext } from 'react';
import { AppContext } from '../../context/app/appContext';

export default function useApplication() {
	const [app, dispatch] = useContext(AppContext);
	const sectionNames = getSections(app?.reference);

	//=========================// Read Translation Methods //=========================//

	/**
	 * Get an array of section names from the given translation data
	 * @param {*} referenceSections
	 * @returns {Array}
	 */
	function getSections(referenceSections = []) {
		if (Array.isArray(referenceSections) && referenceSections.length > 0) {
			return referenceSections.reduce((acc, section) => {
				if ('name' in section) {
					return [...acc, section.name];
				} else {
					return acc;
				}
			}, []);
		}
		return [''];
	}

	/**
	 * Get all key-value pairs from a section
	 * @param {String} sectionName name of the requested section
	 * @param {Object} allSections Translation Object Data (provide app.reference or app.translated)
	 * @returns {Array} array of translation items
	 */
	function getSectionItems(sectionName) {
		//Checks
		if (!Array.isArray(app?.reference) || app.reference.length === 0) return [];
		//Get reference items for this section
		const refItems = app.reference.find((section) => section.name === sectionName)?.data;
		if (!Array.isArray(refItems) || refItems.length === 0) return [];
		//Get translated items for this section
		let transItems = [];
		if (Array.isArray(app?.translated) && app.translated.length > 0) {
			const translatedData = app.translated.find((section) => section.name === sectionName)?.data;
			if (Array.isArray(translatedData) && translatedData.length > 0) transItems = translatedData;
		}
		//Check transItems for any merge opportunities
		const merged = refItems.map((item) => {
			const newItem = { ...item, translated: '' };
			const transItem = transItems.find((itm) => itm.key === item.key);
			//Found corresponding translated item
			newItem.translated = transItem ? transItem.value : '';
			return newItem;
		});

		return merged;
	}

	function handleChange(sectionName, key, value) {
        if (!key) return;
		if (typeof value !== 'string' && typeof value !== 'number') return;
		const payload = {
			sectionName,
			key,
			value,
		};
        

		dispatch({ type: 'handleChange', payload });
	}

	//=========================// Export //=========================//
	return { app, sectionNames, getSectionItems, handleChange };
}
