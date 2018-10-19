/** Class representing a confetti. */
class Confetti {
	/**
	 * Creates a new Confetti.
	 *
	 * @param  {string} id New item id.
	 * @param  {number} count The amount of confetti displayed.
	 * @return {Element} Confetti instance.
	 */
	constructor(id,count) {
		this.id_ = id;
		this.count_ = count;
		return this.init();
	}

	// Public methods.

	/**
	 * Creates a new copy of confetti.
	 *
	 * @throws Will throw an error if element not found.
	 * @return {Element} Confetti element for append.
	 */
	create() {
		const confetti = document.createElement( 'div' );
		confetti.id = this.id_;
		confetti.className = 'confetti';
		if (confetti) {
			let i = this.count_;
			while (i > -1) {
				const elem = document.createElement( 'div' );
				elem.className = 'confetti__' + i;
				confetti.appendChild( elem );

				i--;
			}

			return confetti;

		} else {
			throw new Error( 'Element confetti not found!' );
		}
	}

	/**
	 * Initialize.
	 *
	 * @return {Element} Confetti.
	 */
	init()  {
		return this.create();
	}
}