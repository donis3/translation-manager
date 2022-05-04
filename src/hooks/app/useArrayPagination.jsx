import { useTranslation } from 'react-i18next';
import useStorage from '../common/useStorage';

export default function useArrayPagination({ name = '', pages = [] } = {}) {
	if (!name) throw new Error('useArrayPagination requires a name provided');
	if (!Array.isArray(pages) || pages.length === 0) pages = [''];

	const { t } = useTranslation();
	const initialPage = pages[0];
	const [currentPage, setCurrentPage] = useStorage(name, initialPage);
	const navigationObject = generateNavState(pages, currentPage);

	/**
	 * Helper function to determine next/previous buttons for sections
	 * @param {*} allPages
	 * @param {*} activePage
	 * @returns
	 */
	function generateNavState(allPages = [], activePage = null) {
		//Default return object
		const result = { active: '', name: '', prev: null, next: null, all: allPages };

		//Check if activePage is in pages Array, If so, process it
		if (allPages.includes(activePage)) {
			result.active = activePage;
			result.name = activePage === '' ? t('edit.mainSectionName') : activePage;
		}
		const currentIndex = allPages.indexOf(result.active);
		const maxIndex = allPages.length - 1;
		if (currentIndex < 0) return result;
		if (maxIndex <= 0) return result;

		if (currentIndex > 0) {
			result.prev = allPages[currentIndex - 1];
		}
		if (currentIndex < maxIndex) {
			result.next = allPages[currentIndex + 1];
		}

		return result;
	}

	const changePage = (pageName) => {
		if (typeof pageName === 'string' && pages.includes(pageName)) {
			setCurrentPage(() => pageName);
		} else {
			console.log(`Invalid page name received for pageNavigation`, pageName);
		}
	};

	return { pagination: navigationObject, changePage };
}
