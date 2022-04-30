import React, { useState, useRef, useEffect } from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import useClickOutside from '../../hooks/common/useClickOutside';

export default function Dropdown({ text, children, timeout, ...props }) {
	const [isActive, setActive] = useState(false);
	const toggleDropdown = () => setActive((state) => !state);
	const wrapperRef = useRef();
	useClickOutside(wrapperRef, () => setActive(false));

	useEffect(() => {
		let timer;
		if (isActive && timeout && isNaN(parseInt(timeout)) === false && parseInt(timeout) > 0) {
			timer = setTimeout(() => setActive(false), parseInt(timeout));
		}
		return () => timer && clearTimeout(timer);
	}, [isActive, timeout]);

	return (
		<div ref={wrapperRef}>
			<div className='flex justify-center'>
				<button type='button' className='btn btn-ghost gap-1' onClick={toggleDropdown} {...props}>
					{text}
					{isActive ? <FaCaretUp /> : <FaCaretDown />}
				</button>
			</div>
			<div className='flex justify-center relative'>
				<ul
					className={`absolute transition-transform origin-top p-1 border flex flex-col items-center gap-1  bg-base-100 z-50 shadow-md rounded-md ${
						isActive ? 'scale-y-100' : 'scale-y-0'
					}`}
				>
					{children}
				</ul>
			</div>
		</div>
	);
}

Dropdown.defaultProps = {
	text: 'TEXT',
	timeout: 7000,
};
