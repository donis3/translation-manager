import config from '../../config/config';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import { dark as highlightStyle } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { demoOriginal } from '../../config/demo';
import { FaGithub } from 'react-icons/fa';
SyntaxHighlighter.registerLanguage('json', json);

export default function About() {
	const { t } = useTranslation();
	const codeString = JSON.stringify(demoOriginal, null, '\t');
	return (
		<div className='mt-20 w-full '>
			<div className='divider mb-10'></div>
			<AboutItem title={t('about.appDetailsTitle', { appname: t('app.name') })}>{t('about.appDetails')}</AboutItem>

			<AboutItem title={t('about.exampleTitle')}>{t('about.exampleText')}</AboutItem>
			<SyntaxHighlighter language='json' style={highlightStyle} className='mt-3'>
				{codeString}
			</SyntaxHighlighter>

			<AboutItem title={t('about.githubTitle')}>
				<p className=''>
					<Trans i18nKey='about.githubText'>
						Visit
						<a href={config.app.git} className='link-primary'>
							linktext
						</a>
						for more
					</Trans>
				</p>
			</AboutItem>
		</div>
	);
}

function AboutItem({ title, children }) {
	return (
		<div className='mt-5'>
			<h1 className='text-2xl font-semibold py-1'>{title}</h1>
			{typeof children === 'string' ? <p className='leading-relaxed'>{children}</p> : children}
		</div>
	);
}
