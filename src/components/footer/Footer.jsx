import React from 'react';
import { Trans } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import { GiHearts } from 'react-icons/gi';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import config from '../../config/config';
import useUi from '../../context/ui/useUi';

export default function Footer() {
	const { t } = useTranslation();
	const footerData = {
		year: new Date().getFullYear(),
		app: t('app.name'),
		version: config.app.version,
	};

	return (
		<div className='bg-neutral p-2 flex flex-wrap items-center justify-between mt-10 gap-y-3'>
			{/* Left Part */}
			<div className='text-neutral-content  min-w-fit'>
				<p className='  text-sm text-neutral-content'>
					<a href={config.app.git}>{t('footer.copyright', footerData)}</a>
				</p>
			</div>
			{/* Middle */}
			<div className='flex-1 flex justify-center min-w-fit'>
				<ThemeToggle />
			</div>
			{/* Right Part */}
			<div className=' min-w-fit'>
				<MadeWithLove />
			</div>
		</div>
	);
}

function MadeWithLove({ owner, href }) {
	const { t } = useTranslation();
	return (
		<a href={config.app.authorUrl}>
			<p className='text-xs text-neutral-content flex gap-x-1 items-center'>
				<Trans i18nKey='footer.madeWithLove'>
					Made with <GiHearts className='text-red-600' /> by {{ author: t('app.author') }}
				</Trans>
			</p>
		</a>
	);
}
MadeWithLove.defaultProps = {
	owner: 'App Author',
	href: null,
};

function ThemeToggle() {
	const { t } = useTranslation();
	const { ui, changeTheme } = useUi();
	return (
		<button
			type='button'
			className='btn btn-xs btn-ghost text-neutral-content gap-1 font-thin hover:font-semibold'
			onClick={changeTheme}
		>
			{ui?.dark ? (
				<>
					{t('footer.themeDark')} <MdDarkMode />
				</>
			) : (
				<>
					{t('footer.themeLight')} <MdLightMode />
				</>
			)}
		</button>
	);
}
