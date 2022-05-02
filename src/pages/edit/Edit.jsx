import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InputText from '../../components/form/InputText';
import { AppContext } from '../../context/app/appContext';
import EditTitle from './Edit.Title';
import './Edit.css';
import { ImArrowLeft as PreviousIcon, ImArrowRight as NextIcon } from 'react-icons/im';
import Dropdown from '../../components/common/Dropdown';

const mockData = [
	{
		name: '',
		data: [
			{ key: 'title', value: 'About Us' },
			{ key: 'message', value: 'Welcome to about us page' },
		],
	},
	{
		name: 'labels',
		data: [
			{ key: 'confirmYes', value: 'Yes I confirm' },
			{ key: 'confirmNo', value: 'No, I Decline' },
		],
	},
	{
		name: 'success',
		data: [
			{ key: 'add', value: 'Added {{item}} to database' },
			{ key: 'delete', value: 'Removed {{item}} from database' },
		],
	},
];

export default function Edit() {
	const { t } = useTranslation();
	const [app] = useContext(AppContext);
	const sectionsData = mockData;
	const [currentSection, setCurrentSection] = useState('');
	const sectionNav = sectionNavState(sectionsData, currentSection);

	const goTo = (sectionName) => {
		if (typeof sectionName === 'string') setCurrentSection(() => sectionName);
	};
	const sectionItems = sectionsData.find((item) => item.name === currentSection)?.data || [];

	return (
		<div className='p-2 w-full max-w-2xl mt-5 flex flex-col gap-y-10'>
			<EditTitle />
			<SectionSelector setSectionTo={goTo} sectionNav={sectionNav} />

			<TranslateSection name={currentSection || t('edit.mainSectionName')}>
				{sectionItems.map((item, y) => {
					return <TranslateSection.Item title={item.key} text={item.value} key={y} />;
				})}
			</TranslateSection>
		</div>
	);
}

function SectionSelector({ setSectionTo, sectionNav }) {
	const { t } = useTranslation();
	if (!sectionNav) return <></>;

	let sectionName = sectionNav.active;
	if (!sectionName || sectionName.length === 0) sectionName = t('edit.mainSectionName');

	return (
		<div className='flex flex-col md:flex-row gap-5 items-center'>
			<div className='w-full md:w-1/4 flex justify-center md:justify-start'>
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
			<div className='flex-1'>
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
			<div className='w-full md:w-1/4 flex justify-center md:justify-end'>
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

function TranslateSection({ name, children }) {
	return (
		<div className='translate-section'>
			<h2 className='px-1 font-bold text-lg'>{name}</h2>
			<div className='w-full border-2 border-neutral border-opacity-50 hover:border-opacity-100  rounded-lg bg-base-100'>
				{children}
			</div>
		</div>
	);
}

TranslateSection.Item = ({ title, text, ...props }) => {
	if (!title) return <></>;
	return (
		<div className='flex flex-col translate-item '>
			<h3 className='text-sm font-semibold px-1'>{title}</h3>
			{text && <label className='text-base leading-relaxed px-1 font-light'>{text}</label>}
			<input type='text' className='input input-bordered input-sm w-full mt-1' {...props} />
		</div>
	);
};

/**
 * Helper function to determine next/previous buttons for sections
 * @param {*} allSections
 * @param {*} activeSectionName
 * @returns
 */
function sectionNavState(allSections, activeSectionName = null) {
	const result = { active: '', prev: null, next: null, all: [] };
	const sectionsArray = allSections.map((sect) => sect.name);
	result.all = sectionsArray;
	if (sectionsArray.includes(activeSectionName)) {
		result.active = activeSectionName;
	}
	const currentIndex = sectionsArray.indexOf(result.active);
	const maxIndex = sectionsArray.length - 1;
	if (currentIndex < 0) return result;
	if (maxIndex <= 0) return result;

	if (currentIndex > 0) {
		result.prev = sectionsArray[currentIndex - 1];
	}
	if (currentIndex < maxIndex) {
		result.next = sectionsArray[currentIndex + 1];
	}

	return result;
}
