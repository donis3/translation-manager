import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import config from './config';

export const languages = ['en', 'tr'];

i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next) // bind react-i18next to the instance
	.init({
		backend: {
			loadPath: './locales/{{lng}}/{{ns}}.json',
		},
		fallbackLng: 'en',
		supportedLngs: languages,
		debug: false,
		saveMissingTo: 'current',
		interpolation: {
			escapeValue: false, // not needed for react!!
		},

		// react i18next special options (optional)
		// override if needed - omit if ok with default
		detection: {
			// cache user language on
			caches: ['localStorage'],
			lookupLocalStorage: config.app.getStorageKey('language'),
		},
		react: {
			bindI18n: 'languageChanged',
			bindI18nStore: '',
			transEmptyNodeValue: '',
			transSupportBasicHtmlNodes: true,
			transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
			useSuspense: true,
		},
	});

export default i18n;
