import { useState } from 'react';
import useStorageFns from './useStorageFns';

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
	const { setData, getInitialValue, localStorageKey } = useStorageFns(key);

	//Initialize state with data from storage
	const [state, setState] = useState(getInitialValue(initialValue));

	//setState function that will save state in local storage
	const handleSetState = (newState) => {
		//If a function is passed, pass current state to it and get the result
		if (typeof newState === 'function') {
			newState = newState(state);
		}
		//Save new state to local storage
		setData(newState);
		//Save new state to react state
		setState(newState);
	};

	const deleteStorage = () => {
		localStorage.removeItem(localStorageKey);
	};
	return [state, handleSetState, deleteStorage];
}
