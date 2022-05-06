import * as locales from 'locale-codes';

/**
 * Generate an array of languages for language selection
 */
export default function useLangList() {
	const selectLanguageArray = locales.all.reduce((acc, locale) => {
		const { 'iso639-1': iso6391, name } = locale;

		if (!iso6391) {
			//No iso code, skip
			return acc;
		}
		if (acc.find((item) => item.name === name)) {
			//A variation of this locale already exists, skip this
			return acc;
		} else {
			return [...acc, { name, value: iso6391 }];
		}
	}, []);

	function getLanguage(langCode, local = false) {
		if (!langCode) return;
		const locale = locales.all.find((item) => item['iso639-1'] === langCode);

		if (locale) {
			if (!local) return locale.name;

			return locale.local ? locale.local : locale.name;
		}

		return 'Unknown';
	}

	return { selectLanguageArray, getLanguage };
}
