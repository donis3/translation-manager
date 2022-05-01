import React, { forwardRef } from 'react';

const Select = forwardRef(({ label, error, alt, options, ...props }, ref) => {
	if (!options) options = [];

	return (
		<div className={`form-control w-full ${error ? 'has-error' : ''}`}>
			<label className='label'>
				<span className='label-text font-medium'>{label}</span>
				<span className='label-text error-label'>{error}</span>
			</label>
			<select className='select select-bordered w-full' ref={ref} {...props}>
				{options.map((item, i) => {
					const [name, value] = Object.values(item);
					return (
						<option value={value} key={i}>
							{name}
						</option>
					);
				})}
			</select>
			{alt && (
				<label className='label'>
					<span className='label-text'>{alt}</span>
				</label>
			)}
		</div>
	);
});

export default Select;
