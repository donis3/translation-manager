import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { AppContext } from '../../context/app/appContext';

export default function useApplication() {
	const { t } = useTranslation();
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

	/**
	 * Change a value for an item in the app.translated sections
	 * @param {*} sectionName
	 * @param {*} key key value of the item
	 * @param {*} value new value for the item
	 * @returns void
	 */
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

	/**
	 * Find total item count in the sectionsArray.
	 * Find how many of them have a value with length > 0
	 * Calc percentage
	 */
	function calculateStats(sectionsArray) {
		let result = { total: 0, translated: 0, percentage: 0, completedSections: [] };
		if (!Array.isArray(sectionsArray)) return result;

		//Calculate total & translated
		const translationStats = sectionsArray.reduce(
			(acc, section) => {
				if (!Array.isArray(section?.data) || section.data.length === 0) return acc;
				const itemsInSection = section.data.length;
				//Translated item count in section
				const translatedCount = section.data.reduce((total, item) => {
					if ('value' in item && item.value?.length > 0) return total + 1;
					return total;
				}, 0);

				const newAcc = {
					...acc,
					total: acc.total + itemsInSection,
					translated: acc.translated + translatedCount,
				};
				if (translatedCount >= itemsInSection) {
					newAcc.completedSections.push(section.name);
				}
				return newAcc;
			},
			{ total: 0, translated: 0, completedSections: [] }
		);
		result = { ...result, ...translationStats };

		//Calc percentage
		if (result.total > 0 && result.translated > 0) {
			result.percentage = Math.ceil((result.translated / result.total) * 100 * 100) / 100;
		}
		return result;
	}
	const stats = useMemo(() => calculateStats(app.translated), [app.translated]);

	function resetData() {
		const success = () => toast.success(t('success.reset'), { toastId: 'resetData' });
		dispatch({ type: 'resetData', payload: null, success });
	}

	function deleteData() {
		const success = () => toast.success(t('success.deleteAll'), { toastId: 'deleteAll' });
		dispatch({ type: 'deleteAll', payload: null, success });
	}

	function deleteItem(section, key) {
		const success = () => toast.success(t('success.deleteItem', { item: key }), { toastId: 'deleteItem' });
		const error = () => toast.error(t('error.deleteItem', { item: key }), { toastId: 'deleteItem' });
		dispatch({ type: 'deleteItem', payload: { section, key }, success, error });
	}

	function resetItem(section, key) {
		const error = () => toast.error(t('error.resetItem', { item: key }), { toastId: 'resetItem' });
		dispatch({ type: 'resetItem', payload: { section, key }, error });
	}

	function addItem(path) {
		if (!path || !Array.isArray(path)) return;
		const action = {
			type: 'addItem',
			payload: path,
			success: () => toast.success(t('success.addItem', { item: path.join('.') }), { toastId: 'addItem' }),
			error: () => toast.error(t('error.addItem', { item: path.join('.') }), { toastId: 'addItem' }),
		};
		dispatch(action);
	}

	//=========================// Export //=========================//
	return {
		app,
		sectionNames,
		getSectionItems,
		handleChange,
		stats,
		actions: { reset: resetData, deleteData, deleteItem, resetItem, addItem },
	};
}
