import { useTranslation } from 'react-i18next';
import useDownload from '../common/useDownload';
import processTranslation from './processTranslation';
import useApplication from './useApplication';
import { toast } from 'react-toastify';

export default function useDownloadTranslation() {
	const { t } = useTranslation();
	const { app } = useApplication();
	const downloadFile = useDownload();
	const filename = app?.filename ? app.filename + '.json' : 'filename.json';

	function getTranslatedData() {
		const data = app?.translated;
		if (!data) return null;
		const result = processTranslation(data);
		if (!result) return null;
		try {
			const json = JSON.stringify(result, null, '\t');
			return json;
		} catch (error) {
			return null;
		}
	}

	const error = (code = 'InvalidData') => {
		toast.error(t('error.downloadFailed', { code }), { toastId: 'download' });
	};

	const success = () => {
		toast.success(t('success.download', { filename }), { toastId: 'download' });
	};

	function initiateDownload() {
		const data = getTranslatedData();
		if (!data) return error();

		downloadFile({ data: data, fileName: filename, fileType: 'application/json' });
		success();
	}

	return { initiateDownload };
}
