import useUi from '../../context/ui/useUi';

export default function useIntl() {
	const defaultCurrency = 'USD';
	const { ui } = useUi();
	const locale = ui.locale.code;

	/**
	 * Return string with intl formatted number
	 * @param {*} amount
	 * @param {*} currency
	 */
	const displayMoney = (amount = 0, currency = defaultCurrency) => {
		try {
			return new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(amount);
		} catch (error) {
			return `${amount.toFixed(2)} ${currency}`;
		}
	};

	/**
	 * Return string with intl formatted number
	 * @param {*} amount
	 */
	const displayNumber = (amount = 0, digits = null) => {
		try {
			if (digits !== null && digits > 0) {
				return new Intl.NumberFormat(locale, {
					minimumFractionDigits: digits,
					maximumFractionDigits: digits,
				}).format(amount);
			}
			return Intl.NumberFormat(locale).format(amount);
		} catch (error) {
			return amount;
		}
	};

	const displayDate = (timestamp = null, options = null) => {
		if (!timestamp) return null;
		if (!options || typeof options !== 'object') {
			options = {
				year: 'numeric',
				month: 'numeric',
				day: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
				second: undefined,
				hour12: false,
			};
		}
		try {
			const date = new Date(timestamp);
			return new Intl.DateTimeFormat(locale, options).format(date);
		} catch (error) {
			return null;
		}
	};

	return { displayMoney, displayNumber, displayDate };
}
