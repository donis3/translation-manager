import React, { createContext } from 'react';
import useStorageReducer from '../../hooks/common/useStorageReducer';
import useAppDefaults from './useAppDefaults';
import useAppReducer from './useAppReducer';

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
	const defaults = useAppDefaults();
	const reducer = useAppReducer();
	const appRepo = useStorageReducer('app', defaults, reducer);

	return <AppContext.Provider value={appRepo}>{children}</AppContext.Provider>;
}
