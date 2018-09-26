class Dice {
	constructor() {
		this.element = null;
		this.sides = 6;
		this.animate = true;
		this.__proto__.CssIds_ = {
			ELEM: 'dice'
		};
		this.__proto__.CssClasses_ = {
			SIDE: 'dice__side',
			DOT: 'dice__dot',
			HIDDEN: 'is-hidden',
			DICE: 'dice',
			AUTO: 'layout__auto',
			ANIMATED: 'animated',
			ROTATEIN: 'rotateIn'
		};
		this.__proto__.Constant_ = {
			ANIM_TIMING: 1000
		};
		this.init();
	}

	makeSides() {
		this.element = document.getElementById( this.CssIds_.ELEM );
		if (this.element) {
			this.dice = document.createElement( 'div' );
			this.dice.className = this.CssClasses_.DICE + ' ' + this.CssClasses_.AUTO + (this.animate ? ' ' + this.CssClasses_.ANIMATED + ' ' + this.CssClasses_.ROTATEIN : '');
			for (let i = 0, j = i + 1; i < this.sides; i++, j++) {
				const side = document.createElement( 'div' );
				side.className = this.CssClasses_.SIDE + ' ' + this.CssClasses_.SIDE + '--' + j + ' ' + this.CssClasses_.HIDDEN;
				if (this.makeDots( side, j )) {
					this.dice.appendChild( side );
					this.element.appendChild( this.dice );
				}
			}
			return true;
		}
		return false;
	}

	makeDots(el,n) {
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

	getRandomInt(min,max) {
		return Math.floor( Math.random() * (max - min) ) + min;
	}

	play() {
		this.element.classList.remove( this.CssClasses_.HIDDEN );
		const n = this.getRandomInt( 0, this.sides );
		this.dice.children[n].classList.remove( this.CssClasses_.HIDDEN );
		this.animateDice();

		return n + 1;
	}

	animateDice() {
		if (this.animate) {
			setTimeout( () => {
				this.dice.classList.add( this.CssClasses_.ROTATEIN );
			}, this.Constant_.ANIM_TIMING );
		}
	}

	init() {
		this.makeSides();
	}

}