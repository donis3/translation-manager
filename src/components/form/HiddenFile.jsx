import React, { forwardRef, useImperativeHandle, useRef } from 'react';

const HiddenFile = forwardRef(({ children, onClick, accept, ...props }, ref) => {
	const fileRef = useRef();
	// Expose reference to forwardRef
	useImperativeHandle(ref, () => fileRef.current);

	/**
	 * Trigger file select window when clicked on the button
	 * Also call the onClick callback if provided
	 * @param {*} e
	 */
	const handleButtonClick = (e) => {
		fileRef?.current?.click?.();
		onClick?.(e);
	};

	return (
		<>
			<input type='file' ref={fileRef} style={{ display: 'none' }} accept={accept} />
			<button type='button' className='btn gap-2 btn-lg' {...props} onClick={handleButtonClick}>
				{children}
			</button>
		</>
	);
});

export default HiddenFile;
