/** Class representing a experience */
class Experience {
	/**
	 * Creates a new experience.

 	 * @param  {Object} options Rewrite options.
	 */
	constructor(options) {
		this.lang = 'RU';
		this.level = 1;
		this.levelGrow = {
			value: 500,
			increase: 50,
			bonusPercent: 20,
			bonusLosePercent: 5
		};
		this.expData = {
			winPointsGame: 100,
			losePercent: 20,
			points: 0,
			partiPoints: 0,
			currentLevelExp: 0,
			nextLevelExp: 0
		};
		this.volitionData = {
			value: 0,
			interval: 10,
			points: 99,
			increasePercent: 20
		};
		/**
		 * Store strings for class names defined by this component that are used in JavaScript.
		 *
		 * @enum {string}
		 * @private
		*/
		this.__proto__.CssClasses_ = {
			BONUS_WIN: 'experience__bonus-win',
			BONUS_LOSE: 'experience__bonus-lose',
			BONUS_WILL: 'experience__bonus-volition',
			HIDDEN: 'is-hidden'
		};
		/**
		 * Store strings for identifiers defined by this component that are used in JavaScript.
		 *
		 * @enum {string}
		 * @private
		*/
		this.__proto__.CssIds_ = {
			EXP: 'experience',
			POINTS: 'points',
			BONUS: 'bonus',
			LVL: 'level',
			VOLITION: 'volition',
			MSG: 'message'
		};
		/**
		 * Store constants in one place so they can be updated easily.
		 *
		 * @enum {(string | number)}
		 * @private
		*/
		this.__proto__.Constant_ = {
			MSG_ANIM_TIMING: 1500,
			BONUS_TIMING: 2000,
			SOUND_INTERVAL: 500,
			VOLITION_COLOR: '#545bb0'
		};
		/**
		 * Store texts in one place so they can be updated easily.
		 *
		 * @enum {(object | string)}
		 * @private
		*/
		this.__proto__.Texts_ = {
			NEXT_LVL_TXT: { RU: 'След. ур.: ' },
			WILL: { RU: 'Воля' },
			BONUS: { RU: 'Бонус'},
			LOSE: { RU: 'Луз' },
			LEVEL: { RU: 'Уровень'},
			WIN: { RU: 'Выиграл'},
			DRAW: { RU: 'Ничья' },
			YOU: { RU: 'Вы' }
		};
		Object.assign( this, options );
	}

	/**
	 * Gets points loss.
	 *
	 * @return {number} Points.
	 * @private
	 */
	get losePoints_() {
		return Number.parseInt( this.expData.winPointsGame * this.expData.losePercent / 100 );
	}

	/**
	 * Gets bonus points.
	 * @return {number} Points.
	 * @private
	 */
	get bonusPoints_() {
		return this.expData.partiPoints * this.levelGrow.bonusPercent / 100;
	}

	/**
	 * Gets points bonus loss.
	 *
	 * @return {number} Points.
	 * @private
	 */
	get bonusLosePoints_() {
		return this.expData.partiPoints * this.levelGrow.bonusLosePercent / 100;
	}

	/**
	 * Gets points won per game.
	 *
	 * @return {number} Points.
	 * @private
	 */
	get gameWinPoints_() {
		return this.expData.points - this.expData.currentLevelExp;
	}

	/**
	 * Sets next level experience.
	 *
	 * @return {number} Points.
	 * @private
	 */
	setNextLevelExp_() {
		this.expData.nextLevelExp = ((this.expData.nextLevelExp || this.expData.currentLevelExp) + this.levelGrow.value) + this.level * this.levelGrow.increase;
		return this.expData.nextLevelExp;
	}

	/**
	 * Sets current level experience.
	 *
	 * @private
	 */
	setCurrentLevelExp_() {
		if (this.level === 1) {
			this.expData.currentLevelExp = 0;
		} else {
			this.expData.currentLevelExp = ((this.expData.currentLevelExp + this.levelGrow.value) + (this.level - 1) * this.levelGrow.increase) - this.expData.currentLevelExp;
		}
	}

	/**
	 * Raises the level.
	 *
	 * @private
	 */
	levelUp_() {
		if (this.expData.points >= this.expData.nextLevelExp) {
			this.level++;
			this.expData.currentLevelExp = this.expData.nextLevelExp;
			this.setNextLevelExp_();
			this.displayLevel();
		}
	}

	/**
	 * Lowers the level.
	 *
	 * @private
	 */
	levelDown_() {
		if (this.expData.points < this.expData.currentLevelExp) {
			this.level--;
			this.expData.nextLevelExp = this.expData.currentLevelExp;
			this.setCurrentLevelExp_();
			this.displayLevel( false );
		}
	}

	// Public methods.

	/**
	 * Sets points.
	 *
	 * @param {string} winner Winner name of party or game.
	 * @param {boolean} bonus Determines whether additional bonus points.
	 * @public
	 */
	setPoints(winner,bonus) {
		return new Promise( (resolve,reject) => {
			if (this.mode === 'vs_computer') {
				if (!bonus) {
					this.expData.points = winner === 'human' ? this.expData.points + this.expData.winPointsGame : this.expData.points && this.expData.points - this.losePoints_;
					this.expData.partiPoints += winner === 'human' ? this.expData.winPointsGame : 0;
				} else {
					this.expData.points = winner === 'human' ? this.expData.points + this.bonusPoints_ : this.expData.points - this.bonusLosePoints_;
					this.expData.points = Number.parseInt( this.expData.points );
					setTimeout( _ => {
						this.displayBonus( winner )
							.then(
								result => {
									resolve();
								}
							);
						this.expData.partiPoints = 0;
					}, this.Constant_.MSG_ANIM_TIMING );
				}
				if (this.gameWinPoints_ > 0) {
					this.levelUp_();
				} else {
					this.levelDown_();
				}
				this.coins.setCoins( this.expData.points );
				this.displayExperience();
			}
			setTimeout( () => resolve(), this.Constant_.MSG_ANIM_TIMING );
		} );
	}

	/**
	 * Sets will.
	 *
	 * @public
	 */
	setVolition() {
		if (this.mode === 'vs_computer') {
			this.volitionData.value += 1;
			if (!(this.volitionData.value % this.volitionData.interval)) {
				const points = this.volitionData.points + this.volitionData.value * this.volitionData.increasePercent / 100;
				const tmp = this.expData.winPointsGame;
				this.expData.winPointsGame = points;
				this.setPoints( 'human' )
				this.expData.winPointsGame = tmp;
				this.displayVolition( true, points )
			} else {
				this.displayVolition()
			}
		}
	}

	/**
	 * Displays bonus points.
	 *
	 * @param  {string} winner   The name of winner game.
	 * @param  {number} volition Bonus points for the will.
	 * @return {Promise} Promise.
	 * @public
	 */
	displayBonus(winner,volition) {
		return new Promise( (resolve,reject) => {
			const elem = document.getElementById( this.CssIds_.BONUS );
			var target = null;
			if (!volition) {
				if (winner === 'human') {
					if (this.bonusPoints_ > 0) {
						target = elem.querySelector( '.' + this.CssClasses_.BONUS_WIN );
						target.textContent = +Number.parseInt( this.bonusPoints_ );
					} else {
						return resolve();
					}
				} else {
					if (this.bonusLosePoints_ > 0) {
						target = elem.querySelector( '.' + this.CssClasses_.BONUS_LOSE );
						target.textContent = -Number.parseInt( this.bonusLosePoints_ );
					} else {
						return resolve();
					}
				}
			} else {
				target = elem.querySelector( '.' + this.CssClasses_.BONUS_WILL );
				target.textContent = volition;
			}
			target.parentNode.classList.remove( this.CssClasses_.HIDDEN );
			this.sound.play( 'swing' );
			this.anim.animate( elem.parentNode, 'fading_entrances_4', false, 0 )
				.then(
					result => {
						setTimeout( _ => {
							this.sound.play( 'swing' );
							this.anim.animate( elem.parentNode, 'fading_exits_6', undefined, undefined, true )
								.then(
									result => target.parentNode.classList.add( this.CssClasses_.HIDDEN )
								);
							resolve();
						}, this.Constant_.BONUS_TIMING );
					}
				);
		} );
	}

	/**
	 * Displays level.
	 *
	 * @param  {boolean} anim Determines whether the animation level.
	 * @public
	 */
	displayLevel(anim = true) {
		const elem = document.getElementById( this.CssIds_.LVL ).firstElementChild;
		elem.textContent = this.level;
		document.getElementById( this.CssIds_.EXP ).dataset.nextLvl = this.Texts_.NEXT_LVL_TXT[this.lang] + this.expData.nextLevelExp;
		if (anim) {
			setTimeout( _ => {
				this.sound.play( 'level' );
				this.anim.animate( elem, 'bouncing_entrances_0' );
			}, this.Constant_.SOUND_INTERVAL + 200 );
		}
	}

	/**
	 * Displays experience.
	 *
	 * @public
	 */
	displayExperience() {
		const needLvlExp = this.expData.nextLevelExp - this.expData.currentLevelExp;
		const elem = document.getElementById( this.CssIds_.EXP );
		elem.firstElementChild.style.width = Number.parseInt( this.gameWinPoints_ / needLvlExp * 100 ) + '%';
		document.getElementById( this.CssIds_.POINTS ).textContent = this.expData.points;
	}

	/**
	 * Displays will.
	 *
	 * @param  {boolean} anim   Determines whether the animation will.
	 * @param  {number} points  Bonus points for the will.
	 * @public
	 */
	displayVolition(anim,points) {
		const elem = document.getElementById( this.CssIds_.VOLITION );
		elem.textContent = this.volitionData.value;
		if (anim) {
			this.sound.play( 'will' )
				.then(
					result => {
						this.displayBonus( null, points );
					}
				);
			elem.nextElementSibling.style.fill = this.Constant_.VOLITION_COLOR;
			this.anim.animate( elem.nextElementSibling, 'attention_seekers_6' )
				.then(
					result => {
						elem.nextElementSibling.style.fill = '#ffffff';
					}
				);
		}
	}

	/**
	 * Displays parti result message.
	 *
	 * @param  {string} str Message for display.
	 * @public
	 */
	displayPartiResultMessage(str) {
		if (str) {
			const elem = document.getElementById( this.CssIds_.MSG );
			let msg = this.Texts_.WIN[this.lang];

			switch (str) {
				case 'human':
					msg += this.playerFirstName === this.Texts_.YOU[this.lang] ? 'и ' + this.playerFirstName : ' ' + this.playerFirstName;
					break;
				case 'draw':
					msg = this.Texts_.DRAW[this.lang];
					break;
				default:
					msg += ' ' + this.names[str];
			}

			elem.textContent = msg + '!';

			this.anim.animate( elem, 'fading_exits_10', undefined, this.Constant_.MSG_ANIM_TIMING, true );
		}
	}

	/**
	 * Creates bonus markup.
	 *
	 * @return {string} Html markup.
	 * @public
	 */
	createBonus() {
		const html = `
			<div class="experience__bonus is-hidden">
				<div id="bonus">
					<div class="is-hidden"><span class="experience__bonus-win"></span><span class="experience__bonus-msg">${this.Texts_.BONUS[this.lang]}</span></div>
					<div class="is-hidden"><span class="experience__bonus-lose"></span><span class="experience__bonus-msg">${this.Texts_.LOSE[this.lang]}</span></div>
					<div class="is-hidden"><span class="experience__bonus-volition"></span><span class="experience__bonus-msg">${this.Texts_.WILL[this.lang]}</span></div>
				</div>
			</div>`;

		return html;
	}

	/**
	 * Creates volition and experience markup.
	 *
	 * @return {string} Html markup.
	 * @public
	 */
	create() {
		const html =`
			<div class="row row--right">
				<div class="experience__volition" data-title="${this.Texts_.WILL[this.lang]}">
					<div id="volition" class="experience__volition-count">0</div>
					<svg class="experience__volition-ico" width="42" height="42" fill="#ffffff" aria-hidden="true" data-prefix="fas" data-icon="brain" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M208 0c-29.87 0-54.74 20.55-61.8 48.22-.75-.02-1.45-.22-2.2-.22-35.34 0-64 28.65-64 64 0 4.84.64 9.51 1.66 14.04C52.54 138 32 166.57 32 200c0 12.58 3.16 24.32 8.34 34.91C16.34 248.72 0 274.33 0 304c0 33.34 20.42 61.88 49.42 73.89-.9 4.57-1.42 9.28-1.42 14.11 0 39.76 32.23 72 72 72 4.12 0 8.1-.55 12.03-1.21C141.61 491.31 168.25 512 200 512c39.77 0 72-32.24 72-72V205.45c-10.91 8.98-23.98 15.45-38.36 18.39-4.97 1.02-9.64-2.82-9.64-7.89v-16.18c0-3.57 2.35-6.78 5.8-7.66 24.2-6.16 42.2-27.95 42.2-54.04V64c0-35.35-28.66-64-64-64zm368 304c0-29.67-16.34-55.28-40.34-69.09 5.17-10.59 8.34-22.33 8.34-34.91 0-33.43-20.54-62-49.66-73.96 1.02-4.53 1.66-9.2 1.66-14.04 0-35.35-28.66-64-64-64-.75 0-1.45.2-2.2.22C422.74 20.55 397.87 0 368 0c-35.34 0-64 28.65-64 64v74.07c0 26.09 17.99 47.88 42.2 54.04 3.46.88 5.8 4.09 5.8 7.66v16.18c0 5.07-4.68 8.91-9.64 7.89-14.38-2.94-27.44-9.41-38.36-18.39V440c0 39.76 32.23 72 72 72 31.75 0 58.39-20.69 67.97-49.21 3.93.67 7.91 1.21 12.03 1.21 39.77 0 72-32.24 72-72 0-4.83-.52-9.54-1.42-14.11 29-12.01 49.42-40.55 49.42-73.89z"></path></svg>
				</div>
				<div class="experience__exp-bar">
					<span id="${this.CssIds_.POINTS}" class="experience__exp-points">${this.expData.points}</span>
					<div id="${this.CssIds_.EXP}" class="experience__experience" data-next-lvl="${this.Texts_.NEXT_LVL_TXT[this.lang]} ${this.setNextLevelExp_()}"><span></span></div>
					<div id="level" class="experience__level">${this.Texts_.LEVEL[this.lang]}: <span>${this.level}</span></div>
				</div>
			</div>`

		return html;
	}

}