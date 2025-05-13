const textarea = document.querySelector('textarea');
const charCount = document.querySelector('.count');
const maxCount = 140;

const onChange = (event) => {
	const characterCount = event.target.value.length;
	const countString = `${characterCount}/${maxCount}`;

	if (characterCount > maxCount) {
		charCount.classList.add('error');
	}
	else {
		charCount.classList.remove('error');
	}

	charCount.textContent = countString;
}

textarea.addEventListener('input', onChange);