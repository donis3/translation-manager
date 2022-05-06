export default function processTranslation(translationArray) {
	if (!Array.isArray(translationArray) || translationArray.length === 0) return {};

	return translationArray.reduce((acc, section) => {
		const sectionObject = processSection(section);
		return { ...acc, ...sectionObject };
	}, {});
}

/**
 * Takes a section object, converts it to nested obj
 * @param {*} section
 * @returns {Object} an deep nesting allowed obj
 */
function processSection(section) {
	const { data } = section || {};
	if (!Array.isArray(data) || data.length === 0) return {};

	const result = {};
	data.forEach((item) => {
		const { path, value } = item || {};
		if (!Array.isArray(path) || path.length === 0) return;
		setDeepValue(result, path, value);
	});
	return result;
}

/**
 * Sets a deep value using a path array
 * Works as reference, doesn't return anything
 * @param {Object} obj reference of object to set value in
 * @param {Array} path path to target example [ 'category', 'subcategory', 'title']
 * @param {*} value value to set at the requested path
 * @returns void
 */
function setDeepValue(obj, path, value) {
	if (!Array.isArray(path) || path.length === 0) return obj;
	if (!obj || typeof obj !== 'object' || typeof obj === 'string') return obj;

	const maxIndex = path.length - 1;

	/**
	 * Go through path array in reducer.
	 * Set the obj as the initial value of the reducer,
	 * Check if current key exists in the current level of the obj. IF not create it
	 * return the next level to the reducer in each iteration
	 * Since we passed the obj as initial value, any changes made to the next level also affects obj
	 *
	 */
	path.reduce((acc, currentKey, i) => {
		if (currentKey in acc === false) {
			if (i === maxIndex) {
				acc[currentKey] = value;
			} else {
				acc[currentKey] = {};
			}
		} else {
			//This key already exits
			if (i === maxIndex) {
				acc[currentKey] = value;
			} else {
				//Dont return primitive to the next path
				if (typeof acc[currentKey] === 'string') acc[currentKey] = {};
			}
		}
		return acc[currentKey];
	}, obj);
}

// Example Objext
// const translated = [
// 	{ name: '', data: [{ key: 'locale', value: 'en-US', path: ['locale'] }] },
// 	{
// 		name: 'app',
// 		data: [
// 			{ key: 'app.name', value: 'trans-man', path: ['app', 'name'] },
// 			{ key: 'app.author', value: 'Donis', path: ['app', 'author'] },
// 		],
// 	},
// 	{
// 		name: 'home',
// 		data: [
// 			{ key: 'home.title', value: 'Homepage', path: ['home', 'title'] },
// 			{ key: 'home.buttons.new.item', value: 'New Item', path: ['home', 'buttons', 'new', 'item'] },
// 		],
// 	},
// ];
