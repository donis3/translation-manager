import React from 'react';
import { BsFolder2Open as IncompleteIcon, BsFolderCheck as CompleteIcon } from 'react-icons/bs';

export default function Section({ name, isComplete, children }) {
	return (
		<div className='translate-section'>
			<h2 className={`p-1 font-mono flex items-center gap-2 ${isComplete && 'text-green-600'}`}>
				{isComplete ? <CompleteIcon /> : <IncompleteIcon />}
				{name}
			</h2>
			<div className='w-full border border-neutral border-opacity-50  rounded-lg bg-base-100'>{children}</div>
		</div>
	);
}
Section.defaultProps = {
	name: 'Undefined',
	isComplete: false,
};
