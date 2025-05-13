let idSuffix = 0;

const createError = (message, fieldEl) => {
	if (fieldEl.parentNode.querySelector('.error')) {
		return;
	}

	const errorId = `error-${idSuffix++}`;

	const el = document.createElement('div');
	el.classList.add('error');
	el.setAttribute('role', 'alert');
	el.id = errorId;
	el.innerText = message;

	fieldEl.setAttribute('aria-invalid', 'true');
	fieldEl.setAttribute('aria-describedby', errorId);
	fieldEl.parentNode.appendChild(el);
}

const validate = (field) => {
	const value = field.value.trim();
	
	if (value.length < 1) {
		createError('This field is required.', field);
	}
	else if (field.hasAttribute('aria-invalid')) {
		field.removeAttribute('aria-invalid');
		field.removeAttribute('aria-describedby');
		const error = field.parentNode.querySelector('.error');
		if (error) {
			error.remove();
		}
	}
}

const onBlur = (event) => {
	validate(event.target);
}

const fields = document.querySelectorAll('input');
fields.forEach((field) => {
	field.addEventListener('blur', onBlur);
});