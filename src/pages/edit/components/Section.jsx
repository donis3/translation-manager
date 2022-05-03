import React from 'react';

export default function Section({ name, children }) {
	return (
		<div className='translate-section'>
			<h2 className='px-1 font-bold text-lg'>{name}</h2>
			<div className='w-full border-2 border-neutral border-opacity-50 hover:border-opacity-100  rounded-lg bg-base-100'>
				{children}
			</div>
		</div>
	);
}
