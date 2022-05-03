import React from 'react';
import { useTranslation } from 'react-i18next';
import { ImArrowLeft as PreviousIcon, ImArrowRight as NextIcon } from 'react-icons/im';
import Dropdown from '../../../components/common/Dropdown';


export default function SectionNav({ setSectionTo, sectionNav }) {
	const { t } = useTranslation();
	if (!sectionNav || !Array.isArray(sectionNav?.all) || sectionNav.all.length <= 1) return <></>;

	let sectionName = sectionNav.active;
	if (!sectionName || sectionName.length === 0) sectionName = t('edit.mainSectionName');

	return (
		<div className='flex flex-wrap gap-5 items-center'>
			{/* Previous Button */}
			<div className='w-1/4 min-w-fit'>
				{sectionNav.prev !== null && (
					<button
						type='button'
						className='btn btn-ghost btn-sm md:btn-md gap-2'
						title={t('labels.previous')}
						onClick={() => setSectionTo(sectionNav.prev)}
					>
						<PreviousIcon />
						{t('labels.previous')}
					</button>
				)}
			</div>
			{/* Section Selector */}
			<div className='flex-1 '>
				<Dropdown text={sectionName} className='btn btn-primary btn-outline'>
					{sectionNav.all.map((section, i) => {
						let sectionTxt = section ? section : t('edit.mainSectionName');
						let isActive = section === sectionNav.active;
						return (
							<Dropdown.Button onClick={() => setSectionTo(section)} key={i} active={isActive}>
								{sectionTxt}
							</Dropdown.Button>
						);
					})}
				</Dropdown>
			</div>
			{/* Next Button */}
			<div className='w-1/4 min-w-fit'>
				{sectionNav.next !== null && (
					<button
						type='button'
						className='btn btn-ghost btn-sm md:btn-md gap-2'
						title={t('labels.previous')}
						onClick={() => setSectionTo(sectionNav.next)}
					>
						{t('labels.next')}
						<NextIcon />
					</button>
				)}
			</div>
		</div>
	);
}
