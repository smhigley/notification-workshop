import { notify } from '../notify.js';

const maxCount = 42;
let fileCount = 0
let loadingTimeout = null;
let loading = false;
let timeoutId;

const progressWrapper = document.querySelector('.progress');
const progressIndicator = document.querySelector('.indicator');
const progressText = document.querySelector('.progress-text');
const downloadButton = document.querySelector('.download');

const announceLoading = () => {
	// check for the announcement when this function runs as well
	if (loading) {
		notify(`${fileCount} files downloaded`);
	}

	timeoutId = setTimeout(() => {
		announceLoading();
	}, 5000);
};

const updateFiles = (numFiles) => {
	fileCount = numFiles;
	updateLoader(numFiles);

	if (numFiles < maxCount) {
		loadingTimeout = setTimeout(() => {
			updateFiles(numFiles + 1);
		}, 100);
	} else {
		clearTimeout(loadingTimeout);
		loadingTimeout = null;
		removeLoader();
	}
};

const updateLoader = (numFiles) => {
	// if this is the beginning of loading, begin announcing updates
	if (!loading) {
		loading = true;
		announceLoading();
	}

	progressIndicator.style.width = `${numFiles * 100 / maxCount}%`;
	progressText.innerText = `There have been ${numFiles} files downloaded`;
	progressWrapper.classList.add('loading');
}

const removeLoader = () => {
	if (loading) {
		// was loading and now finished, so announce success
		notify('Success! All files have been downloaded.');
	}

	clearTimeout(loadingTimeout);
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