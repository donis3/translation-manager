import { useContext, useEffect } from 'react';
import config from '../../config/config';
import { UiContext } from './uiContext';
import { useTranslation } from 'react-i18next';
import { languages } from '../../config/i18n';
import * as locale from 'locale-codes';

/**
 * Initial ui state when there is no local storage data
 */
export const uiDefaultState = {
	dark: config.theme.isDark(),
	locale: locale.getByTag('en'),
	validUntil: null,
};

/**
 * Ui toggles hook
 * @returns
 */
export default function useUi() {
	const { i18n } = useTranslation();
	const [ui, setUi] = useContext(UiContext);

	useEffect(() => {
		//On load, change theme to requested theme if its still valid
		if (ui.validUntil && ui.validUntil > Date.now()) {
			setThemeAttribute(ui.dark);
		}
		if (ui.validUntil <= Date.now()) {
			//Ui state is no longer valid, revert state to original
			setUi((state) => ({ ...state, dark: config.theme.isDark(), validUntil: null }));
		}
		if (i18n.language !== ui.locale.tag) {
			//i18next language and ui storage is out of sync
			changeLanguage(i18n.language);
		}
		if (ui.locale) setLangAttribute(ui.locale.tag);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	/**
	 * Set ui language
	 * @param {*} lang
	 * @returns
	 */
	const changeLanguage = (lang = 'en') => {
		if (!languages.includes(lang)) return;
		setLangAttribute(lang);
		let result = false;
		//Set ui state
		if (ui.locale.tag !== lang) {
			setUi((state) => ({ ...state, locale: locale.getByTag(lang) }));
			result = true;
		}
		//Set i18next
		if (i18n.language !== lang) {
			i18n.changeLanguage(lang);
			result = true;
		}
		result && config.log(`Changed language to ${lang}`, 'ui');
	};
	/**
	 * Manually change the theme to dark or light
	 * @param {*} dark
	 */
	const changeTheme = (dark = null) => {
		if (typeof dark !== 'boolean') {
			dark = ui.dark ? false : true;
		}
		setThemeAttribute(dark);
		config.log(
			`Changing theme to ${dark ? 'dark' : 'light'} for ${
				Math.round((config.theme.overrideDuration / (60 * 60 * 1000)) * 10) / 10
			} hours`,
			'ui'
		);
		setUi((state) => ({ ...state, dark, validUntil: Date.now() + config.theme.overrideDuration }));
	};

	return {
		ui,
		changeLanguage,
		changeTheme,
		isDark: () => document.documentElement.getAttribute('data-theme') === 'dark',
		availableLanguages: languages.map((lang) => locale.getByTag(lang)),
		language: ui.locale.tag,
	};
}

//=====================// Ui Helpers //========================//

/**
 * Set the data-theme attribute of <html> if dark theme is requested
 * @param {*} dark
 * @returns
 */
function setThemeAttribute(dark = false) {
	//Get attribute
	if (dark && document.documentElement.getAttribute('data-theme') === 'dark') {
		//No need to change
		return;
	}

	if (dark) {
		document.documentElement.setAttribute('data-theme', 'dark');
	} else {
		document.documentElement.removeAttribute('data-theme');
	}
}

/**
 * Set lang attribute of <html>
 * @param {*} dark
 * @returns
 */
function setLangAttribute(lang = 'en') {
	if (!lang) {
		document.documentElement.removeAttribute('lang');
	} else {
		document.documentElement.setAttribute('lang', lang);
	}
}
