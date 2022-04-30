import React from 'react';
import AppContextProvider from './app/appContext';
import UiContextProvider from './ui/uiContext';

export default function ContextWrapper({ children }) {
	return (
		<UiContextProvider>
			<AppContextProvider>
				{/* Wrapped Content */}
				{children}
			</AppContextProvider>
		</UiContextProvider>
	);
}
