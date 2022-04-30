export default function useTextFns() {
	/**
	 * Truncate a string if needed
	 * @param {string} text original text
	 * @param {number} maxLength remove excess text after this length
	 * @param {boolean | string} suffix if text is truncated, display this string (default false, ... if true)
	 * @returns truncated text
	 */
	function truncate(text, maxLength = 0, suffix = false) {
		if (!text || typeof text !== 'string' || maxLength < 1) return text;
		if (suffix === true) suffix = '...';
		if (text.length <= maxLength) return text;
		return suffix ? text.substring(0, maxLength) + suffix : text.substring(0, maxLength);
	}

	/**
	 * Truncate a filename but keep the extension
	 * @param {*} filename
	 * @param {*} maxLength
	 * @param {*} suffix
	 * @returns
	 */
	function truncateFilename(filename, maxLength = 0, suffix = true) {
		if (!filename || typeof filename !== 'string' || maxLength < 1) return filename;
		let ext = '';
		const parts = filename.split('.');
		if (parts.length > 1) {
			ext = parts.pop();
		}
		const fileBaseName = parts.join('.');

		return ext ? truncate(fileBaseName, maxLength, suffix) + '.' + ext : truncate(fileBaseName, maxLength, suffix);
	}

	return { truncate, truncateFilename };
}
