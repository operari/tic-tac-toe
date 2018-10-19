/** Class representing a dice. */
class Dice {
	/**
	 * Creates a new dice.
	 *
	 * @param  {Element} container Container for new dice.
	 * @return {Object} New dice instance.
	 */
	constructor(container) {
		this.container_ = container;
		this.sides_ = 6;
		this.dice_ = null;
		this.animate_ = true;
		/**
		 * Store strings for class names defined by this component that are used in JavaScript.
		 *
		 * @enum {string}
		 * @private
		*/
		this.__proto__.CssClasses_ = {
			SIDE: 'dice__side',
			DOT: 'dice__dot',
			HIDDEN: 'is-hidden',
			DICE: 'dice',
			AUTO: 'layout__auto',
			ANIMATED: 'animated'
		};
		/**
		 * Store constants in one place so they can be updated easily.
		 *
		 * @enum {(string | number)}
		 * @private
		*/
		this.__proto__.Constant_ = {
			ANIM_TIMING: 1000
		};
		this.init();
	}

	/**
	 * Fill side with dotes.
	 *
	 * @param  {Element} el New side of the dice.
	 * @param  {Number} n Quantity dotes on the side.
	 * @return {Boolean} Is filled side.
	 * @private
	 */
	makeDots_(el,n) {
		if (el) {
			for (let i = 0; i < n; i++) {
				const dot = document.createElement( 'div' );
				dot.className = this.CssClasses_.DOT;
				el.appendChild( dot );
			}
			return true;
		}
		return false;
	}

	// Public methods.

	/**
	 * Creates a new dice element.
	 *
	 * @return {Element} New dice element.
	 * @public
	 */
	create() {
		this.dice_ = document.createElement( 'div' );
		this.dice_.className = this.CssClasses_.DICE + ' ' + this.CssClasses_.AUTO + (this.animate_ ? ' ' + this.CssClasses_.ANIMATED + ' ' + this.CssClasses_.ROTATEIN : '');
		for (let i = 0, j = i + 1; i < this.sides_; i++, j++) {
			const side = document.createElement( 'div' );
			side.className = this.CssClasses_.SIDE + ' ' + this.CssClasses_.SIDE + '--' + j + ' ' + this.CssClasses_.HIDDEN;
			if (this.makeDots_( side, j )) {
				this.dice_.appendChild( side );
			}
		}
		if (this.container_) {
			this.container_.appendChild( this.dice_ );
		} else {
			return this.dice_;
		}
	}

	/**
	 * Throw the dice.
	 *
	 * @return {Number} Number of displayed side ot the dice.
	 * @public
	 */
	play() {
		if (this.container_) {
			this.container_.classList.remove( this.CssClasses_.HIDDEN );
		}
		const n = getRandomInt( 0, this.sides_ );
		this.dice_.children[n].classList.remove( this.CssClasses_.HIDDEN );
		if (this.animate_) {
			const anim = new Animation();
			anim.animate( this.dice_, 'rotating_entrances_0', true, this.Constant_.ANIM_TIMING );
		}

		return n + 1;
	}

	/**
	 * Initialize.
	 */
	init() {
		if (this.container_) {
			this.create();
		}
	}

}