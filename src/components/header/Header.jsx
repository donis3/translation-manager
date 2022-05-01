import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { GiFeather } from 'react-icons/gi';
import { AppContext } from '../../context/app/appContext';

export default function Header({ children }) {
	const { t } = useTranslation();
	const [app] = useContext(AppContext);

	let appLogoTarget = '/';
	if (app && app.data && app.filename) {
		appLogoTarget = '/edit';
	}

	return (
		<div className='navbar bg-neutral items-end flex-wrap'>
			<div className='flex-1'>
				<Link to={appLogoTarget} className='btn btn-ghost text-neutral-content normal-case text-2xl font-title gap-2'>
					<GiFeather />
					{t('app.name')}
				</Link>
			</div>
			<div className='flex-none'>{children}</div>
		</div>
	);
}
