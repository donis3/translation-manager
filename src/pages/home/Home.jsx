import React, { useContext } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { FaFeather, FaPlay } from 'react-icons/fa';
import { AppContext } from '../../context/app/appContext';
import useIntl from '../../hooks/common/useIntl';
import useTextFns from '../../hooks/common/useTextFns';
import { Link } from 'react-router-dom';


export default function Home() {
	const { t } = useTranslation();
	const [app] = useContext(AppContext);
	const { displayDate } = useIntl();
	const { truncateFilename } = useTextFns();
	const showContinue = app?.loadedAt ? true : false;

	return (
		<div className='p-2 w-full max-w-2xl h-full relative'>
			
			{/* Intro Text */}
			<div>
				<h1 className='text-2xl font-semibold'>{t('home.title')}</h1>
				<p className='leading-relaxed p-1'>{t('home.lead')}</p>
			</div>

			{/* Start Button */}
			<div className='flex flex-col items-center gap-y-3 mt-10'>
				<Link to='/start'>
					<button type='button' className='btn btn-lg btn-outline gap-1 min-w-[250px]'>
						<FaPlay />
						{t('labels.start')}
					</button>
				</Link>
				<p className='text-center text-lg'>{t('home.startText')}</p>
			</div>

			{/* Continue Button */}
			{showContinue && (
				<div className='flex flex-col items-center gap-y-3 mt-10'>
					<Link to='/edit'>
						<button type='button' className='btn btn-lg btn-primary gap-1 min-w-[250px]'>
							<FaFeather />
							{t('labels.continue')}
						</button>
					</Link>
					<div className='font-light opacity-70'>
						<p className='text-center  text-sm'>
							<Trans i18nKey='home.continueText'>
								Continue translating
								<span className='font-semibold'>
									{{ filename: truncateFilename(app.files.original.name, 20, '..') }}
								</span>
							</Trans>
						</p>
						<p className='text-center text-sm'>
							<Trans i18nKey='home.loadedOn'>
								Loaded on
								<span className='font-semibold'>{{ date: displayDate(app.loadedAt) }}</span>
							</Trans>
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
