import React, { useEffect, useState } from 'react';
import './Edit.css';
import EditTitle from './components/EditTitle';
import SectionNav from './components/SectionNav';
import Section from './components/Section';
import SectionItem from './components/SectionItem';
import EditError from './components/EditError';
import useArrayPagination from '../../hooks/app/useArrayPagination';
import useApplication from '../../hooks/app/useApplication';
import { useNavigate } from 'react-router-dom';

import NewItemForm from './components/NewItemForm';

export default function Edit() {
	const [showNewForm, setShowNewForm] = useState(false);

	const { app, sectionNames, getSectionItems, handleChange, stats, actions } = useApplication();
	const { pagination, changePage } = useArrayPagination({ name: 'translationSections', pages: sectionNames });
	const items = getSectionItems(pagination.active);
	const navigate = useNavigate();
	const isSectionComplete = stats?.completedSections?.includes(pagination.name);
	const newItemPath = pagination.active.length > 0 ? [pagination.active] : [];

	useEffect(() => {
		if (!app.loadedAt) {
			navigate('/');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [app.loadedAt]);

	useEffect(() => {
		if (showNewForm) {
			setShowNewForm(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pagination.active]);

	//If error
	if (pagination.all.length === 0) return <EditError />;
	//No Error
	return (
		<div className='p-2 w-full max-w-2xl mt-5 flex flex-col gap-y-10'>
			<EditTitle percent={stats.percentage} actions={actions} language={app?.language} />
			<SectionNav setSectionTo={changePage} sectionNav={pagination} />

			{/* Show new item form */}
			{showNewForm && (
				<NewItemForm path={newItemPath} onCancel={() => setShowNewForm(false)} handleAdd={actions?.addItem} />
			)}

			<Section name={pagination.name} isComplete={isSectionComplete} handleShowNewForm={() => setShowNewForm(true)}>
				{items &&
					items.map((item, i) => {
						return (
							<SectionItem
								key={item.path.join('.')}
								sectionName={pagination.active}
								handleDelete={actions.deleteItem}
								handleReset={actions.resetItem}
								item={item}
								handleChange={handleChange}
							/>
						);
					})}
			</Section>
		</div>
	);
}
