import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../../context/app/appContext';
import './Edit.css';
import useSectionNav from '../../hooks/edit/useSectionNav';
import EditTitle from './components/EditTitle';
import SectionNav from './components/SectionNav';
import Section from './components/Section';
import SectionItem from './components/SectionItem';

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
	const { sectionNav, changeSection } = useSectionNav({ sections: mockData });

	return (
		<div className='p-2 w-full max-w-2xl mt-5 flex flex-col gap-y-10'>
			<EditTitle />
			<SectionNav setSectionTo={changeSection} sectionNav={sectionNav} />

			<Section name={sectionNav.name}>
				{sectionNav.items.map((item, y) => {
					return <SectionItem title={item.key} text={item.value} key={y} />;
				})}
			</Section>
		</div>
	);
}
