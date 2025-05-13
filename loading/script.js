import { notify } from '../notify.js';

const maxCount = 42;
let fileCount = 0
let loadingTimeout = null;
let loading = false;

const progressWrapper = document.querySelector('.progress');
const progressIndicator = document.querySelector('.indicator');
const progressText = document.querySelector('.progress-text');
const downloadButton = document.querySelector('.download');

const updateFiles = (numFiles) => {
	fileCount = numFiles;
	updateLoader(numFiles);
	notify(`There have been ${numFiles} files downloaded`);

	if (numFiles < maxCount) {
		loadingTimeout = setTimeout(() => {
			updateFiles(numFiles + 1);
		}, 100);
	} else {
		clearTimeout(loadingTimeout);
		loadingTimeout = null;
		notify('All files have been downloaded');
		removeLoader();
	}
};

const updateLoader = (numFiles) => {
	loading = true;
	progressIndicator.style.width = `${numFiles * 100 / maxCount}%`;
	progressText.innerText = `There have been ${numFiles} files downloaded`;
	progressWrapper.classList.add('loading');
}

const removeLoader = () => {
	loading = false;
	progressWrapper.classList.remove('loading');
}

const onDownloadClick = () => {
	if (loading) {
		return;
	}

	updateFiles(1);
};

downloadButton.addEventListener('click', onDownloadClick);