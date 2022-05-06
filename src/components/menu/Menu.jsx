import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaFeather, FaPlay } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import useApplication from '../../hooks/app/useApplication';
import LanguageSelector from '../common/LanguageSelector';
import './Menu.css';

export default function Menu() {
	const { t } = useTranslation();
	const { app } = useApplication();

	return (
		<ul className='flex gap-3 items-center px-3'>
			<li>
				<MenuItem route='/'>
					<FaPlay className='mr-1' />
					{t('routes.home')}
				</MenuItem>
			</li>
			{app.loadedAt && (
				<li>
					<MenuItem route='/edit'>
						<FaFeather className='mr-1' />
						{t('routes.edit')}
					</MenuItem>
				</li>
			)}
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
