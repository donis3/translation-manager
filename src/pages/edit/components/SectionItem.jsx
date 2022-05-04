import React from 'react';

export default function SectionItem({ sectionName, item, handleChange, ...props }) {
	if (!item || !handleChange) return <></>;
	const { translated, key, value } = item;
	const isLargeText = value.length > 50;

	const onChange = (e) => {
		handleChange(sectionName, key, e.target.value);
	};
	return (
		<div className='flex flex-col translate-item '>
			<div className={`badge ${translated ? 'badge-primary' : 'badge-ghost'}`}>{key}</div>
			{value && <label className='text-base leading-relaxed px-1 font-light'>{value}</label>}
			{isLargeText ? (
				<textarea
					rows={3}
					onChange={onChange}
					className='textarea textarea-bordered w-full mt-1'
					{...props}
					defaultValue={translated}
				/>
			) : (
				<input
					type='text'
					onChange={onChange}
					className='input input-bordered  w-full mt-1'
					{...props}
					defaultValue={translated}
				/>
			)}
		</div>
	);
}

SectionItem.defaultProps = {
	sectionName: '',
	item: null,
	handleChange: null,
};
