/** Class representing library animate.css */
class Animation {
	/**
	 * Creates animation.
	 */
	constructor() {
		this.on = true;
		this.timing = 1000;
		/**
		 * Store strings for class names defined by this component that are used in JavaScript.
		 *
		 * @enum {(string | array)}
		 * @private
		*/
		this.__proto__.CssClasses_ = {
			ANIMATED: 'animated',
			HIDDEN: 'is-hidden',
			ATTENTION_SEEKERS: ['bounce', 'flash', 'headShake', 'headBeat', 'jello', 'pulse', 'rubberBand', 'shake', 'swing', 'tada', 'wobble', 'shakeHard'],
			BOUNCING_ENTRANCES: ['bounceIn', 'bounceInDown', 'bounceInLeft', 'bounceInRight', 'bounceInUp' ],
			BOUCING_EXITS: ['bounceOut', 'bounceOutDown', 'bounceOutLeft', 'bounceOutRight', 'bounceOutUp' ],
			FADING_ENTRANCES: ['fadeIn', 'fadeInDown', 'fadeInDownBig', 'fadeInLeft', 'fadeInLeftBig', 'fadeInRight', 'fadeInRightBig', 'fadeInUp', 'fadeInUpBig', 'fadeInScale'],
			FADING_EXITS: ['fadeOut', 'fadeOutDown', 'fadeOutDownBig', 'fadeOutLeft', 'fadeOutLeftBig', 'fadeOutRight', 'fadeOutRightBig', 'fadeOutUp', 'fadeOutUpBig', 'fadeOutScale', 'fadeOutScaleBig'],
			FLIPPERS: ['flip', 'flipInX', 'flipInY', 'flipOutX', 'flipOutY'],
			LIGHTSPEED: ['lightSpeedIn', 'lightSpeedOut'],
			ROTATING_ENTRANCES: ['rotateIn', 'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft', 'rotateInUpRight'],
			ROTATING_EXITS: ['rotateOut', 'rotateOutDownLeft', 'rotateOutDownRight', 'rotateOutUpLeft', 'rotateOutUpRight'],
			SLIDING_ENTRANCES: ['slideInDown', 'slideInLeft', 'slideInRight', 'slideInUp'],
			SLIDING_EXITS: ['slideOutDown', 'slideOutLeft', 'slideOutRight', 'slideOutUp'],
			SPECIALS: ['hinge', 'jackInTheBox', 'rollin', 'rollOut', 'lock'],
			ZOOMING_ENTRANCES: ['zoomIn', 'zoomInDown', 'zoomInLeft', 'zoomInRight', 'zoomInUp']
		}
	}

	/**
	 * Gets section name.
	 *
	 * @param  {string} target Place which stores the animation.
	 * @return {(string|boolean)} Found section.
	 * @private
	 */
	getSection_(target) {
		const match = /^.+(?=_\d+$)/.exec( target );
		if (match) {
			return match[0].toUpperCase();
		}
		return false;
	}

	/**
	 * Gets the position of the class.
	 *
	 * @param  {string} target Place wich stores the animation.
	 * @return {number} Class index.
	 * @private
	 */
	getClassPosition_(target) {
		return /\d+$/.exec( target )[0];
	}

	// Public methods.

	/**
	 * Animates of the element.

	 * @param  {Element}  el     Animated element.
	 * @param  {string}  target  Place which stores the animation.
	 * @param  {boolean} del     Indicates whether the class to remove.
	 * @param  {number}  timing  Timeout when animation end.
	 * @param  {boolean} willBeHidden  Specifies whether to remove the class is-hidden after animation end.
	 * @return {Promise} Promise, when the animation is finished.
	 * @public
	 */
	animate(el,target,del = true,timing = this.timing,willBeHidden) {
		return new Promise( (resolve,reject) => {
			if (target == '') resolve();
			const section = this.getSection_( target );
			const n = this.getClassPosition_( target );
			if (el) {
				if (el.classList.contains( this.CssClasses_.HIDDEN )) {
					el.classList.remove( this.CssClasses_.HIDDEN );
				}
				el.classList.add( this.CssClasses_.ANIMATED );
				el.classList.add( this.CssClasses_[section][n] );
					setTimeout( () => {
						if (del) {
							el.classList.remove( this.CssClasses_.ANIMATED );
							el.classList.remove( this.CssClasses_[section][n] );
							if (willBeHidden) {
								el.classList.add( this.CssClasses_.HIDDEN );
							}
							if (window.savedAnimatesСlass) {
								el.classList.remove( window.savedAnimatesСlass );
							}
						} else {
							window.savedAnimatesСlass = this.CssClasses_[section][n];
						}
						resolve();
					}, this.on && timing );
			}
		} );
	}

	/**
	 * Finds the class name or the name of the section and the index class.
	 *
	 * @param  {string} criterion Target or class name.
	 * @throws If class is invalid.
	 * @return {(string|Object)} Class name or section name, class index.
	 * @public
	 */
	find(criterion) {
		const section = this.getSection_( criterion );
		if (section) {
			const n = this.getClassPosition_( criterion );
			return this.CssClasses_[section][n];
		} else {
			for (let prop in this.CssClasses_) {
				const value = this.CssClasses_[prop];
				if (Array.isArray( value )) {
					const foundIndex = value.findIndex( v => v === criterion );
					if (~foundIndex) {
						const o = {
							section: prop.toLowerCase(),
							index: foundIndex,
						};
						o.copy = o.section + '_' + o.index;
						return o;
					}
				}
			}
			throw new Error( `Class ${criterion} not found!` );
		}
	}

}