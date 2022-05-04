import React from 'react';
import { FaFolderOpen } from 'react-icons/fa';

export default function Section({ name, children }) {
	return (
		<div className='translate-section'>
			<h2 className='p-1 font-bold text-base flex items-center gap-2'>
				<FaFolderOpen />
				{name}
			</h2>
			<div className='w-full border border-neutral border-opacity-50  rounded-lg bg-base-100'>{children}</div>
		</div>
	);
}
