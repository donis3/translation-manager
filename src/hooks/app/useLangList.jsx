import * as locales from 'locale-codes';

/**
 * Generate an array of languages for language selection
 */
export default function useLangList() {
	const list = locales.all.reduce((acc, locale) => {
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

	return list;
}
