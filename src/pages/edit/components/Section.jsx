import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsFolder2Open as IncompleteIcon, BsFolderCheck as CompleteIcon } from 'react-icons/bs';
import { FaTimes, FaPlus } from 'react-icons/fa';

export default function Section({ name, isComplete, handleShowNewForm, children }) {
	const { t } = useTranslation();

	return (
		<div className='translate-section'>
			<div className='flex gap-2 pb-1 items-center'>
				<h2 className={`flex-1 p-1 font-mono flex items-center gap-2 ${isComplete && 'text-green-600'}`}>
					{isComplete ? <CompleteIcon /> : <IncompleteIcon />}
					{name}
				</h2>
				{handleShowNewForm && (
					<button type='button' className='btn btn-sm btn-ghost gap-1 text-primary' onClick={handleShowNewForm}>
						<FaPlus />
						{t('labels.new')}
					</button>
				)}
			</div>
			<div className='w-full border border-neutral border-opacity-50  rounded-lg bg-base-100'>{children}</div>
		</div>
	);
}
Section.defaultProps = {
	name: 'Undefined',
	isComplete: false,
	handleShowNewForm: null,
};
