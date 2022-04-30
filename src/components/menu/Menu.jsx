import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import LanguageSelector from '../common/LanguageSelector';
import './Menu.css';

export default function Menu() {
	const { t } = useTranslation();

	return (
		<ul className='flex gap-3 items-center px-3'>
			<li>
				<MenuItem route='/'>{t('routes.home')}</MenuItem>
			</li>
			<li>
				<MenuItem route='/target'>{t('routes.target')}</MenuItem>
			</li>
			<li>
				<MenuItem route='/edit'>{t('routes.edit')}</MenuItem>
			</li>
			<li className='ml-2 pl-2 border-l border-neutral-content'>
				<LanguageSelector className='btn btn-xs font-light' />
			</li>
		</ul>
	);
}

function MenuItem({ route = '', children, ...props }) {
	const itemClass = 'btn btn-sm btn-ghost text-neutral-content';
	return (
		<NavLink to={route} className={({ isActive }) => (isActive ? `${itemClass} btn-active` : itemClass)} {...props}>
			{children}
		</NavLink>
	);
}
