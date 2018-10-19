/** Class representing a coins */
class Coins {
	/**
	 * Creates a new coins.
	 *
 	 * @param  {Object} options Rewrite options.
	 */
	constructor(options) {
		this.coinsData = {
			coins: 0,
			getExpInterval: 500,
			getCoins: 1,
			thresholdExp: 0
		};
		Object.defineProperty( this.coinsData, 'needExp', {
			value: this.coinsData.getExpInterval,
			writable: true
		} );
		this.randomCoinData = {
			chancePercent: 30,
			added: false,
			index: -1
		};
		/**
		 * Store string for class name defined by this compontent that are used in JavaScript.
		 *
		 * @enum {string}
		 * @private
		 */
		this.__proto__.CssClasses_ = {
			COIN: 'tttoe__coin',
			COIN_RAND: 'tttoe__coin--random',
			CELL: 'tttoe__cell',
			FIELD: 'tttoe',
			HIDDEN: 'is-hidden'
		};
		/**
		 * Store strings for identifiers defined by this component that are used in JavaScript.
		 *
		 * @enum {string}
		 * @private
		 */
		this.__proto__.CssIds_ = {
			COINS: 'coins',
			POINTS: 'points'
		};
		Object.assign( this, options );
	}

	/**
	 * Removes random coins from field.
	 *
	 * @param {Element} coin Html element representing a coin.
	 * @parivate
	 */
	removeRandomCoin_(coin) {
		const randomCoin = coin || document.querySelector( '.' + this.CssClasses_.FIELD ).querySelector( '.' + this.CssClasses_.COIN );
		if (randomCoin) {
			randomCoin.remove();
			this.randomCoinData.added = false;
			this.randomCoinData.index = -1;
		}
	}

	// Public methods.

	/**
	 * Adds a coin to a random cell field.
	 *
	 * @public
	 */
	appendRandomCoin() {
		if (this.mode === 'vs_computer') {
			this.removeRandomCoin_();
			const chance = getRandomInt( 0, 101 );
			if (chance <= this.randomCoinData.chancePercent) {
				const i = getRandomInt( 0, this.fieldSize );
				const coin = document.querySelector( '.' + this.CssClasses_.COIN ).cloneNode();
				coin.classList.add( this.CssClasses_.COIN_RAND );
				coin.classList.add( this.CssClasses_.HIDDEN );
				const cell = document.querySelectorAll( '.' + this.CssClasses_.CELL )[i];
				cell.firstElementChild.appendChild( coin );
				this.randomCoinData.added = true;
				this.randomCoinData.index = i;
			}
		}
	}

	/**
	 * Sets coins.
	 *
	 * @param {number} points     Experience points.
	 * @param {number} force      Add coin directly.
	 * @param {boolean} randomCoin Flag to display random coins.
	 * @param {boolean} sound      Flag to play the sound.
	 * @return {Promise} Promise
	 * @public
	 */
	setCoins(points,force,randomCoin,sound) {
		if (!force) {
			if (points >= this.coinsData.needExp) {
				this.coinsData.coins += this.coinsData.getCoins;
				this.coinsData.thresholdExp += this.coinsData.getExpInterval;
				this.coinsData.needExp += this.coinsData.getExpInterval;
				this.displayCoins();
				// this.unlockChips();
			}
		} else {
			this.coinsData.coins += force;
			return new Promise( (resolve,reject) => {
				this.displayCoins(randomCoin, false, sound)
					.then(
						result => {
							// this.unlockChips();
							resolve();
						}
					);
			} );
		}
	}

	/**
	 * Displays earned coins.
	 *
	 * @param  {boolean} randomCoin Determines whether a random coin for display.
	 * @param  {boolean} animPoints Determines whether to animate the points.
	 * @param  {boolean} sound      Determines whether include the sound.
	 * @return {Promise} Promise
	 * @public
	 */
	displayCoins(randomCoin,animPoints = true,sound = true) {
		document.getElementById( this.CssIds_.COINS ).textContent = this.coinsData.coins;
		const coin = document.querySelectorAll( '.' + this.CssClasses_.COIN )[randomCoin ? 1 : 0];
		coin.classList.remove( this.CssClasses_.HIDDEN );
		if (animPoints) {
			this.anim.animate( document.getElementById( this.CssIds_.POINTS ), 'attention_seekers_1' );
		}
		if (sound) {
			this.sound.play( 'coin' );
		}
		return new Promise( (resolve,reject) => {
			this.anim.animate( coin, 'flippers_0' )
				.then(
					result => {
						if (randomCoin) {
							this.removeRandomCoin_( coin );
						}
						resolve();
					}
				);
		} );
	}

	/**
	 * Compares the index of the random coins of a given position.
	 *
	 * @param  {number} n The external position.
	 * @return {boolean}  The comparison of indexes.
	 * @public
	 */
	compareRandomCoinIndex(n) {
		if (this.randomCoinData.added && n == this.randomCoinData.index) {
			return true;
		}
		return false;
	}

	/**
	 * Creates coins makrup.
	 *
	 * @return {string} Html markup.
	 * @public
	 */
	create() {
		const html = `
			<div class="tttoe__coins">
				<div class="tttoe__coin"></div>
				<div id="${this.CssIds_.COINS}" class="tttoe__coins-count">${this.coinsData.coins}</div>
			</div>`;

		return html;
	}

}