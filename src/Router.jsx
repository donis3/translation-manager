import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import NotFound from './pages/misc/NotFound';

export default function Router() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />

			{/* Catch All */}
			<Route path='*' element={<NotFound />} />
		</Routes>
	);
}
