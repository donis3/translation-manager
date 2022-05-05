import React from 'react';

export default function Tip({ title, children }) {
	if (!title) {
		return children;
	}
	return (
		<div className='tooltip' data-tip={title}>
			{children}
		</div>
	);
}

Tip.defaultProps = {
	title: '',
};
