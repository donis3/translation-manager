import { useEffect, useReducer } from 'react';
import useStorageFns from './useStorageFns';

export default function useStorageReducer(key = '', initialValue = null, reducer = null) {
	if (!key || typeof key !== 'string' || key.length === 0) {
		throw new Error('useStorageReducer: A storage key must be provided.');
	}
	if (!reducer || typeof reducer !== 'function') {
		throw new Error('useStorageReducer: A reducer function must be provided');
	}
	const { getInitialValue, setData, deleteData } = useStorageFns(key);
	const [state, dispatch] = useReducer(reducer, getInitialValue(initialValue));

	//When state changes, sync local storage data aswell
	useEffect(() => {
		if (state) {
			setData(state);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);

	return [state, dispatch, deleteData];
}
