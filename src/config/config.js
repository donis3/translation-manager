const prefixAllowedTypes = ['string', 'number'];

const config = {
	env: 'dev',
	app: {
		name: 'Translation Manager',
		git: 'https://github.com/donis3',
		author: 'Deniz Özkan',
		authorUrl: 'https://github.com/donis3',

		/**
		 * Get local storage identifier for this key
		 * Adds a prefix to the requested key.
		 * Example theme will be prefix.theme
		 * @param {string} key local storage key
		 * @returns {string} local storage key with prefix
		 */
		getStorageKey: function (key) {
			if (!key) throw new Error('Invalid key received for local storage');
			return `tm.${key}`;
		},
	},
	parts: {
		common: { debug: true, name: 'Common' },
		storage: { debug: true, name: 'Local Storage' },
		ui: { debug: true, name: 'Interface' },
	},
	//Custom loggers
	log: (msg, part = null) => logMsg(msg, part, 'log'),
	warn: (msg, part = null) => logMsg(msg, part, 'warn'),
	error: (msg, part = null) => logMsg(msg, part, 'error'),
	table: (msg, part = null) => logMsg(msg, part, 'table'),

	//Theme helpers
	theme: {
		overrideDuration: 60 * 60 * 24 * 1000,
		isDark: function () {
			try {
				return window.matchMedia('(prefers-color-scheme: dark)').matches;
			} catch (error) {
				return false;
			}
		},
	},
};

export default config;

function logMsg(msg, part = '', type = 'log') {
	if (!msg) return;
	if (config.env !== 'dev') return;
	let prefix = '';
	if (part && part in config.parts) {
		if (config.parts[part].debug === false) return;
		prefix = config.parts[part].name;
	}
	if (prefix && prefixAllowedTypes.includes(typeof msg)) {
		msg = `${prefix}: ${msg}`;
	}
	if (type in console) {
		console[type](msg);
	} else {
		console.log(msg);
	}
}
