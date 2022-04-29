import React from 'react';
import useUi from '../../context/ui/useUi';
import Dropdown from './Dropdown';

export default function LanguageSelector({ ...props }) {
	const { ui, changeLanguage, availableLanguages = [], language } = useUi();

	//IF no languages are available
	if (!Array.isArray(availableLanguages) || availableLanguages.length === 0) return <></>;
	return (
		<Dropdown text={ui.locale.local} className='btn btn-sm btn-ghost' {...props}>
			{availableLanguages.map((locale, i) => {
				let isActive = locale.tag === language;
				return (
					<li key={i}>
						<button
							type='button'
							className={`btn btn-xs ${isActive ? 'btn-outline' : 'btn-ghost'}`}
							onClick={() => changeLanguage(locale.tag)}
						>
							{locale.local}
						</button>
					</li>
				);
			})}
		</Dropdown>
	);
}
