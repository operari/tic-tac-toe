/** Class representing toggle screen of element. */
class ToggleScreen {
	/**
	 * Creates a new toggle.
	 * @param  {Element} elem Element for toggle.
	 */
	constructor(elem) {
		this.elem = elem || document.documentElement;
	}

	// Public methods.

	/**
	 * Open item in full screen
	 *
	 * @public
	 */
	open() {
		if (this.elem.requestFullscreen) {
			this.elem.requestFullscreen();
		} else if (this.elem.mozRequestFullScreen) {
			this.elem.mozRequestFullScreen();
		} else if (this.elem.webkitRequestFullscreen) {
			this.elem.webkitRequestFullscreen();
		} else if (this.elem.msRequestFullscreen) {
			this.elem.msRequestFullscreen();
		}

	}

	/**
	 * Exit full screen
	 *
	 * @public
	 */
	close() {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		}
	}

}