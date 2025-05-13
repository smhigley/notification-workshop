let liveRegionElement;

function createLiveRegion() {
  const liveRegion = document.createElement('div');
	liveRegion.setAttribute('aria-live', 'assertive');
	liveRegion.style.position = 'absolute';
	liveRegion.style.width = '1px';
	liveRegion.style.height = '1px';
	liveRegion.style.margin = '-1px';
	liveRegion.style.clip = 'rect(0, 0, 0, 0)';
	liveRegion.style.overflow = 'hidden';
	liveRegion.style.textWrap = 'nowrap';
	document.body.appendChild(liveRegion);
	liveRegionElement = liveRegion;
}

// Extremely simple version of a live region announcer.
// A more sophisticated version would allow for multiple messages to be queued and announced in order,
// Or overridden with more recent messages with the same id.
export function notify(message) {
	if (!liveRegionElement) {
		createLiveRegion();
	}

	liveRegionElement.textContent = message;

	// Set a timeout to clear the message after a short delay
	setTimeout(() => {
		liveRegionElement.textContent = '';
	}, 500);
}