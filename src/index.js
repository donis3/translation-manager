import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './config/i18n.js';
import Loading from './pages/misc/Loading';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './pages/misc/ErrorBoundary';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<ErrorBoundary>
		<Suspense fallback={<Loading />}>
			<React.StrictMode>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</React.StrictMode>
		</Suspense>
	</ErrorBoundary>
);
