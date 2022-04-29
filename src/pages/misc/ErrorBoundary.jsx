import React from 'react';
import { withTranslation } from 'react-i18next';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';

class ErrorBoundary extends React.Component {
	state = { hasError: false };

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		console.log(errorInfo);
	}

	render() {
		const { t } = this.props;

		if (this.state.hasError) {
			return (
				<div className='flex flex-col gap-5 p-10 items-center bg-base-200 h-screen leading-snug'>
					<h1 className='font-bold text-3xl flex gap-2 items-end'>
						<FaExclamationTriangle className='text-error-content text-5xl' />
						{t('applicationError.title')}
					</h1>
					<p className='text-lg mb-5 max-w-xl'>{t('applicationError.message')}</p>

					<button
						type='button'
						className='btn btn-primary btn-md text-white font-bold'
						onClick={() => {
							this.setState({ hasError: false });
							window.location.href = window.location.origin;
						}}
					>
						<FaHome className='mr-2' />
						{t('applicationError.button')}
					</button>
				</div>
			);
		}

		return this.props.children;
	}
}

export default withTranslation()(ErrorBoundary);
