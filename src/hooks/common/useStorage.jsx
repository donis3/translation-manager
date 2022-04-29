import { useState } from 'react';
import config from '../../config/config';

/**
 * An alternative to useState with data persistance
 * Wİll store state data in the given localStorage key
 * @param {*} key A local storage key
 * @param {*} initialValue initial value of state
 * @returns {array} [state, setState, deleteStorage]
 */
export default function useStorage(key = '', initialValue = null) {
	if (!key || typeof key !== 'string' || key.length === 0) {
		throw new Error('useStorage: A storage key must be provided.');
	}
	const localStorageKey = config.app.getStorageKey(key);
	//Initialize state
	const [state, setState] = useState(getInitialValue(localStorageKey, initialValue));

	//setState function that will save state in local storage
	const handleSetState = (newState) => {
		//If a function is passed, pass current state to it and get the result
		if (typeof newState === 'function') {
			newState = newState(state);
		}
		//Save new state to local storage
		setData(localStorageKey, newState);
		//Save new state to react state
		setState(newState);
	};

	const deleteStorage = () => {
		localStorage.removeItem(localStorageKey);
	};
	return [state, handleSetState, deleteStorage];
}

const setData = (key = null, data) => {
	if (!key) return false;

	try {
		//Convert data
		const jsonData = JSON.stringify(data);
		//compare to current
		const currentData = localStorage.getItem(key);
		if (jsonData === currentData) {
			//Both values same, no need to save
			return;
		}
		//Save to storage
		localStorage.setItem(key, jsonData);

		return true;
	} catch (error) {
		//Error ocurred
		config.warn(error, 'storage');
		return false;
	}
};

const getData = (key = null) => {
	try {
		const jsonData = localStorage.getItem(key);
		const data = JSON.parse(jsonData);
		return data;
	} catch (error) {
		config.warn(error, 'storage');
		return null;
	}
};

const getInitialValue = (key = null, initialValue = null) => {
	const data = getData(key);
	if (data === null) {
		//Key doesnt exist
		//no data found, save initialValue to local storage
		setData(key, initialValue);
		//Return initial value
		return initialValue;
	} else {
		//Data is found in local storage, return it instead of default initialValue
		return data;
	}
};
