import { useEffect } from 'react';

/**
 * Will call callback when mouse click is outside the reference element
 * @param {Object} elementReference ref
 * @param {Function} callback callback function
 */
export default function useClickOutside(elementReference, callback = null) {
	useEffect(() => {
		function handleClickOutside(e) {
			if (elementReference.current && !elementReference.current.contains(e.target)) {
				callback?.();
			}
		}
		// Bind
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			// dispose
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [elementReference, callback]);
}
