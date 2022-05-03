import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function useSectionNav({ sections }) {
	const { t } = useTranslation();
	const initialSection = sections[0]?.name || '';
	const [currentSection, setCurrentSection] = useState(initialSection);
	const sectionNav = sectionNavState(sections, currentSection);

	/**
	 * Helper function to determine next/previous buttons for sections
	 * @param {*} allSections
	 * @param {*} activeSectionName
	 * @returns
	 */
	function sectionNavState(allSections = [], activeSectionName = null) {
		//Default return object
		const result = { active: '', name: '', prev: null, next: null, all: [], items: [] };
		//Validate
		if (!Array.isArray(allSections)) return result;
		const sectionsArray = allSections.map((sect) => sect.name);
		result.all = sectionsArray;
		//Find active section's data
		if (sectionsArray.includes(activeSectionName)) {
			result.active = activeSectionName;
			//Append active section items
			result.items = allSections.find((item) => item.name === activeSectionName).data;
			//Get section name
			result.name = activeSectionName === '' ? t('edit.mainSectionName') : activeSectionName;
		}
		const currentIndex = sectionsArray.indexOf(result.active);
		const maxIndex = sectionsArray.length - 1;
		if (currentIndex < 0) return result;
		if (maxIndex <= 0) return result;

		if (currentIndex > 0) {
			result.prev = sectionsArray[currentIndex - 1];
		}
		if (currentIndex < maxIndex) {
			result.next = sectionsArray[currentIndex + 1];
		}

		return result;
	}

	const changeSection = (sectionName) => {
		if (typeof sectionName === 'string') setCurrentSection(() => sectionName);
	};

	return { sectionNav, changeSection };
}
