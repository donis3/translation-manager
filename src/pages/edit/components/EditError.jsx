import { useTranslation } from 'react-i18next';
import { FaUndoAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function EditError() {
	const { t } = useTranslation();
	return (
		<div className='mt-10 p-3'>
			<div className='text-center'>
				<div className='max-w-md'>
					<h1 className='text-5xl font-bold'>{t('edit.loadErrorTitle')}</h1>
					<p className='py-6'>{t('edit.loadErrorText')}</p>
					<Link to='/start' className='btn btn-primary gap-2'>
						<FaUndoAlt />
						{t('edit.loadErrorBtn')}
					</Link>
				</div>
			</div>
		</div>
	);
}
