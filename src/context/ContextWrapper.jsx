import React from 'react';
import UiContextProvider from './ui/uiContext';

export default function ContextWrapper({ children }) {
	return <UiContextProvider>{children}</UiContextProvider>;
}
