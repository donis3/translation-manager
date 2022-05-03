import React from 'react';

export default function SectionItem({ title, text, ...props }) {
	if (!title) return <></>;
	return (
		<div className='flex flex-col translate-item '>
			<h3 className='text-sm font-semibold px-1'>{title}</h3>
			{text && <label className='text-base leading-relaxed px-1 font-light'>{text}</label>}
			<input type='text' className='input input-bordered input-sm w-full mt-1' {...props} />
		</div>
	);
}
