import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../../context/app/appContext';
import './Edit.css';
import EditTitle from './components/EditTitle';
import SectionNav from './components/SectionNav';
import Section from './components/Section';
import SectionItem from './components/SectionItem';
import EditError from './components/EditError';
import useArrayPagination from '../../hooks/app/useArrayPagination';
import useApplication from '../../hooks/app/useApplication';
import { useNavigate } from 'react-router-dom';

export default function Edit() {
	const { t } = useTranslation();
	const [app] = useContext(AppContext);
	const { sectionNames, getSectionItems, handleChange, stats, actions } = useApplication();
	const { pagination, changePage } = useArrayPagination({ name: 'translationSections', pages: sectionNames });
	const items = getSectionItems(pagination.active);
	const navigate = useNavigate();

	useEffect(() => {
		if (!app.loadedAt) {
			navigate('/');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [app.loadedAt]);

	//If error
	if (pagination.all.length === 0) return <EditError />;
	//No Error
	return (
		<div className='p-2 w-full max-w-2xl mt-5 flex flex-col gap-y-10'>
			<EditTitle percent={stats.percentage} actions={actions} language={app?.language} />
			<SectionNav setSectionTo={changePage} sectionNav={pagination} />

			<Section name={pagination.name}>
				{items &&
					items.map((item, i) => {
						return (
							<SectionItem
								key={item.path.join('.')}
								sectionName={pagination.active}
								handleDelete={actions.deleteItem}
								item={item}
								handleChange={handleChange}
							/>
						);
					})}
			</Section>
		</div>
	);
}
