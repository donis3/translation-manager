import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Edit from './pages/edit/Edit';
import Home from './pages/home/Home';
import NotFound from './pages/misc/NotFound';
import Start from './pages/start/Start';


export default function Router() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/start' element={<Start />} />
			<Route path='/edit' element={<Edit />} />

			{/* Catch All */}
			<Route path='*' element={<NotFound />} />
		</Routes>
	);
}
