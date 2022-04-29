import React, { createContext } from 'react';
import useStorage from '../../hooks/common/useStorage';
import { uiDefaultState } from './useUi';

export const UiContext = createContext();

export default function UiContextProvider({ children }) {
	const [ui, setUi] = useStorage('ui', uiDefaultState);

	//console.log(window.matchMedia('(prefers-color-scheme: dark)'));
	return <UiContext.Provider value={[ui, setUi]}>{children}</UiContext.Provider>;
}
