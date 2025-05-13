import { notify } from '../notify.js';

const textarea = document.querySelector('textarea');
const charCount = document.querySelector('.count');
const maxCount = 140;
let timeoutId;

const notificationMessage = (count) => {
	if (count > maxCount) {
		return `You have exceeded the max amount of characters, ${maxCount}.`;
	}
	else if (maxCount - count === 1) {
		return '1 character remaining.';
	}
	else if (maxCount - count <= 20) {
		return `${maxCount - count} characters remaining.`;
	}
	else {
		return false;
	}
}

const onChange = (event) => {
	clearTimeout(timeoutId);
	const characterCount = event.target.value.length;
	const countString = `${characterCount}/${maxCount}`;

	if (characterCount > maxCount) {
		charCount.classList.add('error');
	}
	else {
		charCount.classList.remove('error');
	}

	timeoutId = setTimeout(() => {
		const message = notificationMessage(textarea.value.length);
		if (message) {
			notify(message);
		}
	}, 500);

	charCount.textContent = countString;
}

textarea.addEventListener('input', onChange);