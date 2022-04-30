import { useEffect } from 'react';

export default function useTitle(title = '', revert = true) {
	useEffect(() => {
		if (revert) {
			const prevTitle = document.title;
			if (title) document.title = title;
			return () => {
				document.title = prevTitle;
			};
		} else {
			if (title) document.title = title;
		}
	});
}
