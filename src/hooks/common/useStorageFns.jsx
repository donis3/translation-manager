import config from '../../config/config';

export default function useStorageFns(key, getKeyFromConfig = true) {
	const localStorageKey = config.app.getStorageKey(key);

	/**
	 * Convert data to json string and save to local storage at current storage key
	 * Will not save if data is the same as old data
	 * @param {*} data
	 * @returns {boolean} true if save successful
	 */
	const setData = (data) => {
		if (!localStorageKey) return false;

		try {
			//Convert data
			const jsonData = JSON.stringify(data);
			//compare to current
			const currentData = localStorage.getItem(localStorageKey);
			if (jsonData === currentData) {
				//Both values same, no need to save
				return;
			}
			//Save to storage
			localStorage.setItem(localStorageKey, jsonData);

			return true;
		} catch (error) {
			//Error ocurred
			config.warn(error, 'storage');
			return false;
		}
	};

	/**
	 * Get data from current key and parse as json
	 * @returns {*}
	 */
	const getData = () => {
		try {
			if (!localStorageKey) return;
			const jsonData = localStorage.getItem(localStorageKey);
			const data = JSON.parse(jsonData);
			return data;
		} catch (error) {
			config.warn(error, 'storage');
			return null;
		}
	};

	/**
	 * Get initial value for this key. If there is no value, set it with the data provided
	 * @param {*} initialValue default initial value.
	 * @returns {*} current value
	 */
	const getInitialValue = (initialValue = null) => {
		const data = getData();
		if (data === null) {
			//Key doesnt exist
			//no data found, save initialValue to local storage
			setData(initialValue);
			//Return initial value
			return initialValue;
		} else {
			//Data is found in local storage, return it instead of default initialValue
			return data;
		}
	};

	const deleteData = () => {
		try {
			if (!localStorageKey) return;
			localStorage.removeItem(localStorageKey);
		} catch (error) {
			config.warn(error, 'storage');
			return null;
		}
	};

	return { getData, setData, getInitialValue, localStorageKey, deleteData };
}
