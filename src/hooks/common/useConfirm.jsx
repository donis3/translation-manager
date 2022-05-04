import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCheck, FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import useClickOutside from './useClickOutside';

export default function useConfirm({ message, title, callback } = {}) {
	const [isOpen, setOpen] = useState(false);

	const openConfirm = () => setOpen(true);
	const closeConfirm = () => setOpen(false);
	const { t } = useTranslation();

	function Confirm() {
		const dialogReference = useRef();
		useClickOutside(dialogReference, () => setOpen(false));

		const onConfirm = () => {
			callback?.();
			closeConfirm();
		};

		if (isOpen) {
			return (
				<div className='absolute top-0 left-0 w-screen h-screen z-[60] bg-black bg-opacity-50 flex justify-center items-center overflow-hidden'>
					<div ref={dialogReference} className='w-3/4 md:w-1/2  bg-base-100 shadow-lg rounded-md'>
						{title && (
							<h3 className='p-3 w-full bg-base-300 font-semibold text-lg flex justify-between items-center rounded-t-md'>
								{title}
								<FaExclamationTriangle className='text-secondary' />
							</h3>
						)}
						<div className='bg-base-100 min-h-16'>
							<p className='p-3 text-base leading-relaxed'>{message}</p>
						</div>
						<div className='flex w-full items-center gap-3 p-3'>
							<button type='button' className='btn btn-primary gap-2' onClick={onConfirm}>
								<FaCheck />
								{t('labels.confirm')}
							</button>
							<button type='button' className='btn btn-ghost gap-2' onClick={closeConfirm}>
								<FaTimes />
								{t('labels.cancel')}
							</button>
						</div>
					</div>
				</div>
			);
		} else {
			return <></>;
		}
	}

	return { Confirm, openConfirm, closeConfirm };
}
