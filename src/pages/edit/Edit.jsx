import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../../context/app/appContext';
import { FaDownload, FaCog } from 'react-icons/fa';
import Dropdown from '../../components/common/Dropdown';
import EditTitle from './Edit.Title';
import useLangList from '../../hooks/app/useLangList';
import useConfirm from '../../hooks/common/useConfirm';

export default function Edit() {
	const { t } = useTranslation();
	const [app] = useContext(AppContext);

	return (
		<div className='p-2 w-full max-w-2xl mt-5'>
			<EditTitle />
		</div>
	);
}
