import { useContext, useEffect } from 'react';
import config from '../../config/config';
import { UiContext } from './uiContext';
import { useTranslation } from 'react-i18next';
import { languages } from '../../config/i18n';
import localeCodes from 'locale-codes';

/**
 * Initial ui state when there is no local storage data
 */
export const uiDefaultState = {
	dark: config.theme.isDark(),
	locale: localeCodes.getByTag('en'),
	validUntil: null,
};

/**
 * Ui toggles hook
 * @returns
 */
export default function useUi() {
	const { i18n } = useTranslation();
	const [ui, setUi] = useContext(UiContext);

	/**
	 * Get locale details for 2 letter lang code
	 * @param {*} iso639 2 letter language code
	 * @returns {object || null}
	 */
	function getLocaleData(iso639) {
		if (!iso639) return null;

		const result = localeCodes.all.find((item) => item?.['iso639-1']?.toLowerCase() === iso639.toLowerCase());
		if (!result) {
			throw new Error(`Locale for ${iso639} cant be found!`);
		}
		//Default locale code for INTL
		let localeCode = 'en-US';
		try {
			//Find locale code for this language
			const intlCode = Intl.getCanonicalLocales(iso639);
			if (intlCode.length > 0) localeCode = intlCode[0];
		} catch (error) {
			//No locale coded were found for this language iso
		}
		return {
			...result,
			code: localeCode,
		};
	}

	useEffect(() => {
		//On load, change theme to requested theme if its still valid
		if (ui.validUntil && ui.validUntil > Date.now()) {
			setThemeAttribute(ui.dark);
		}
		if (ui.validUntil <= Date.now()) {
			//Ui state is no longer valid, revert state to original
			setUi((state) => ({ ...state, dark: config.theme.isDark(), validUntil: null }));
		}
		if (i18n.language !== ui.locale?.['iso639-1']) {
			//i18next language and ui storage is out of sync
			changeLanguage(i18n.language);
		}
		if (ui.locale) setLangAttribute(ui.locale?.['iso639-1']);
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
		if (ui.locale?.['iso639-1'] !== lang) {
			//Get locale code
			const localeData = getLocaleData(lang);
			if (localeData) {
				setUi((state) => ({ ...state, locale: localeData }));
				result = true;
			}
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
		availableLanguages: languages.map((iso) => getLocaleData(iso)),
		language: ui.locale?.['iso639-1'],
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
