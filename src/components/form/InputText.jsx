import React, { forwardRef } from 'react';

const InputText = forwardRef(({ label, alt, error, ...props }, ref) => {
	return (
		<div className={`form-control w-full ${error ? 'has-error' : ''}`}>
			<label className='label'>
				<span className='label-text font-medium'>{label}</span>
				<span className='label-text error-label'>{error}</span>
			</label>
			<input type='text' className='input input-bordered w-full' ref={ref} {...props} />

			{alt && (
				<label className='label'>
					<span className='label-text'>{alt}</span>
				</label>
			)}
		</div>
	);
});

export default InputText;
