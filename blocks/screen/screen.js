/** Class representing a screen. */
class Screen {
	/**
	 * Creates a new screen.
	 */
	constructor() {
		this.lang = 'RU';
		this.dice = true;
		this.animation = true;
		this.screen_ = null;
		this.options_ = {};
		this.gameModes_ = {
			training: ['human', 'computer'],
			vs_computer: ['human', 'computer'],
			vs_human: ['human', 'human1'],
			network: 'По сети'
		};
		/**
		 * Store strings for identifiers defined by this component that are used in JavaScript.
		 *
		 * @enum {string}
		 * @private
		*/
		this.__proto__.CssIds_ = {
			SCREEN: 'screen',
			START: 'start_game',
			CONTAINER: 'container',
			MODE: 'game_mode',
			MAIN: 'game_main',
			SIDE: 'game_side',
			SIGN: 'sign_in',
			DIFFICULTY: 'game__difficulty',
			FIRST: 'first_move',
			DICE: 'dice',
			WRP: 'wrapper'
		};
		/**
		 * Store strings for class names defined by this component that are used in JavaScript.
		 *
		 * @enum {string}
		 * @private
		*/
		this.__proto__.CssClasses_ = {
			HIDDEN: 'is-hidden',
			ACTIVE: 'is-active',
			DICE: 'dice'
		};
		/**
		 * Store constants in one place so they can be updated easily.
		 *
		 * @enum {(string | number)}
		 * @private
		*/
		this.__proto__.Constant_ = {
			ANIM_TIMING: 1000,
			DICE_HIDE_TIMING: 3000,
			FULLSCREEN_TIMING: 1000
		};
		/**
		 * Store texts in one place so they can be updated easily.
		 *
		 * @enum {Object}
		 * @private
		 */
		this.__proto__.Texts_ = {
			TITLE: { RU: 'Крестики-нолики' },
			PHRASE: { RU: 'Классика игровой индустрии' },
			START: { RU: 'Начать игру' },
			MODE: {	RU: 'Выберите режим игры:' },
			TRAINING: {	RU: 'Тренировка' },
			VS_COMPUTER: { RU: 'С компьютером' },
			VS_HUMAN: {	RU: 'С человеком' },
			NETWORK: { RU: 'По сети' },
			DIFFICULTY: { RU: 'Выберите сложность:' },
			CHILD: { RU: 'Ребенок' },
			EASY: { RU: 'Легко' },
			HARD: { RU: 'Сложно' },
			SIDE: { RU: 'Выберите сторону:' },
			FIRST: { RU: 'Выберите кто ходит первым:' },
			YOU: { RU: 'Вы'	},
			COMPUTER: {	RU: 'Компьютер' },
			START: { RU: 'Начать' }
		};
	}

	/**
	 * Creates screen markup.
	 *
	 * @return {Element} Screen element.
	 * @private
	 */
	makeView_() {
		const html = `
			<div id="screen" class="screen is-hidden">
				<div class="screen__inner">
					<div id="${this.CssIds_.MAIN}" class="screen__main is-active">
						<h1 class="screen__title">${this.Texts_.TITLE[this.lang]}</h1>
						<div class="screen__phrase">${this.Texts_.PHRASE[this.lang]}</div>
						<div class="screen__robot">
							<button type="button" id="${this.CssIds_.START}" class="screen__start">${this.Texts_.START[this.lang]}</button>
						</div>
					</div>
					<div id="${this.CssIds_.MODE}" class="screen__mode is-hidden">
						<h2 class="screen__display">${this.Texts_.MODE[this.lang]}</h2>
						<button class="bg-color--pink" data-mode="training" data-players='{ "player1": "human", "player2": "computer" }'>${this.Texts_.TRAINING[this.lang]}</button>
						<button class="bg-color--blue" data-mode="vs_computer" data-players='{ "player1": "human", "player2": "computer" }'>${this.Texts_.VS_COMPUTER[this.lang]}</button>
						<button class="bg-color--gold" data-mode="vs_human" data-players='{ "player1": "human", "player2": "human1" }'>${this.Texts_.VS_HUMAN[this.lang]}</button>
						<button class="bg-color--purple" data-mode="network" data-players='{ "player1": "human", "player2": "human1" }' disabled>${this.Texts_.NETWORK[this.lang]}</button>
					</div>
					${this.signIn.create()}
					<div id="${this.CssIds_.DIFFICULTY}" class="screen__difficulty is-hidden">
						<h2 class="screen__display">${this.Texts_.DIFFICULTY[this.lang]}</h2>
						<button class="bg-color--green" data-difficulty="child">${this.Texts_.CHILD[this.lang]}</button>
						<button class="bg-color--blue" data-difficulty="easy">${this.Texts_.EASY[this.lang]}</button>
						<button class="bg-color--red" data-difficulty="hard">${this.Texts_.HARD[this.lang]}</button>
					</div>
					<div id="${this.CssIds_.SIDE}" class="screen__side is-hidden">
						<h2 class="screen__display">${this.Texts_.SIDE[this.lang]}</h2>
						<div>
							<button class="screen__side-cross ml-button--fab" type="button" data-side="cross">x</button>
							<button class="screen__side-nil ml-button--fab" type="button" data-side="nil">o</button>
						</div>
					</div>
					<div id="${this.CssIds_.FIRST}" class="screen__pick-move is-hidden">
						<h2 class="screen__display">${this.Texts_.FIRST[this.lang]}</h2>
						<button class="ml-button--color" data-run="human">${this.Texts_.YOU[this.lang]}</button>
						<button class="ml-button--color" data-run="computer">${this.Texts_.COMPUTER[this.lang]}</button>
					</div>
					<div id="${this.CssIds_.DICE}" class="screen__dice is-hidden">
						<button class="ml-button--color screen__dice--button">${this.Texts_.START[this.lang]}</button>
					</div>
				</div>
			</div>
			`;

		document.getElementById( this.CssIds_.WRP ).insertAdjacentHTML( 'beforeend', html );
		this.screen_ = document.getElementById( this.CssIds_.SCREEN );

		return document.getElementById( this.CssIds_.SCREEN );
	}

	/**
	 * Set the dice winner.
	 *
	 * @return {Number} Win dice index.
	 * @private
	 */
	setDiceWinner_() {
		const arr = Array.from( arguments );
		const n = Math.max.apply( null, arr );
		const i = arr.findIndex( v => v === n );

		this.options_.run = this.gameModes_[this.options_.mode][i];

		return i;
	}

	/**
	 * Throw dice.
	 *
	 * @return {Number} Win dice index.
	 * @private
	 */
	throwDice_() {
		const container = document.getElementById( this.CssIds_.DICE );
		var n1, n2;
		this.sound.play( 'dice' );
		do {
			const dice1 = new Dice( container );
			const dice2 = new Dice( container );
			n1 = dice1.play();
			n2 = dice2.play();

			if (n1 === n2) {
				const dice = document.querySelectorAll( '.' + this.CssClasses_.DICE );
				Array.from( dice ).forEach( el => el.remove() );
			}
		} while(n1 === n2);

		return this.setDiceWinner_(n1, n2);
	}

	/**
	 * Animate the winning dice.
	 *
	 * @param  {Number} i Win dice index.
	 * @private
	 */
	animWinnerDice_(i) {
		setTimeout( _ => {
			this.sound.play( 'flash' );
			const dice = document.querySelectorAll( '.' + this.CssClasses_.DICE )[i];
			this.anim.animate( dice, 'attention_seekers_1' );
		}, this.Constant_.ANIM_TIMING );
	}

	/**
	 * Hide dice after throwing.
	 *
	 * @async
	 * @return {Promise<string>} Promise
	 * @private
	 */
	hideDice_() {
		setTimeout( _ => {
			document.getElementById( this.CssIds_.DICE ).querySelector('button').click();
		}, this.Constant_.DICE_HIDE_TIMING );
	}

	/**
	 * Set game options.
	 *
	 * @param  {Element} button Pressed button.
	 * @param  {Array} arr Array of attributes(options) bound with button.
	 * @private
	 */
	setOptions_(button,arr) {
		for (let i = 0; i < arr.length; i++) {
			const dataset = button.dataset,
				attr = arr[i];
			if (dataset && dataset[attr]) {
				if (attr === 'side') {
					this.setTickType_(dataset[attr]);
				} else if (attr === 'players') {
					this.options_[attr] = JSON.parse( dataset[attr] );
				} else {
					this.options_[attr] = dataset[attr];
				}
			}
		}
	}

	/**
	 * Sets player2 tick type.
	 *
	 * @param {String} side Name tick.
	 * @private
	 */
	setTickType_(side) {
		const mode = this.options_.mode;
		this.options_.tickType = { human: side };

		switch(mode) {
			case 'vs_human':
				this.options_.tickType.human1 = side === 'cross' ? 'nil' : 'cross';
				break;
			default:
				this.options_.tickType.computer = side === 'cross' ? 'nil' : 'cross';
		}

	}

	/**
	 * Registers handlers on screens.
	 *
	 * @param  {Element} screen First element `screen` for action.
	 * @private
	 */
	controller_(screen) {
		(function rec(el) {
			if (el) {
				if (el.id === this.CssIds_.DICE && this.dice) {
					const i = this.throwDice_();
					this.animWinnerDice_( i );
					this.hideDice_();
				}
				el.addEventListener( 'click', (e) => {
					const target = e.target;
					if (target.tagName !== "BUTTON" || /sign/.test( target.className )) return;
					if (target.id && target.id === this.CssIds_.START) {
						const fullscreen = new ToggleScreen();
						setTimeout( _ => fullscreen.open(), this.Constant_.FULLSCREEN_TIMING );
					}
					/**

						TODO:
						- Possible to implement with steps.
					 */
					if (target.dataset.mode) {
						if (target.dataset.mode !== 'training') {
							document.getElementById( this.CssIds_.DIFFICULTY ).remove();
							document.getElementById( this.CssIds_.FIRST ).remove();
						} else {
							document.getElementById( this.CssIds_.DICE ).remove();
							this.dice = false;
						}
						if (!['vs_computer', 'network'].some( v => v === target.dataset.mode)) {
							document.getElementById( this.CssIds_.SIGN ).remove();
						}
					}
					this.sound.play( 'click' );
					this.setOptions_( target, Object.keys( target.dataset ) );
					this.switchScreen( el )
						.then(
							result => {
								return rec.call( this, result );
							}
						);
				} );
				el.addEventListener( 'mouseover', (e) => {
					const target = e.target;
					if (target.tagName !== "BUTTON" || /sign/.test( target.className )) return;
					if (!target.classList.contains( this.CssClasses_.HIDDEN )) {
						this.sound.play( 'hover' );
					}
				} );
			}
		}).call( this, screen );
	}

	// Public methods.

	/**
	 * Switches screens.
	 *
	 * @param  {Element} curr Current screen.
	 * @param  {Number} step Quantity of switchable screens.
	 * @return {Promise<Element>} New screen for actions.
	 * @public
	 */
	switchScreen(curr,step) {
		curr = curr || document.querySelector( '.' + this.CssClasses_.ACTIVE );
		const next = curr.nextElementSibling;
		if (curr) {
			return new Promise( (resolve,reject) => {
				this.anim.animate(curr, curr.id !== this.CssIds_.DICE ? 'fading_exits_9' : '' )
					.then(
						result => {
							curr.remove();
							if (next) {
								next.classList.toggle( this.CssClasses_.ACTIVE );
								this.anim.animate( next, curr.id !== this.CssIds_.SIDE ? 'fading_entrances_9' : 'fading_entrances_0', false )
									.then(
										result => {
											if (step) {
												this.switchScreen( next, --step );
											}
											resolve( next );
										}
									);
							} else {
								this.runGame();
							}
						}
					);
			} );
		}
	}

	/**
	 * Creates instance a game.
	 *
	 * @public
	 */
	runGame() {
		document.getElementById( this.CssIds_.SCREEN ).remove();
		const game = new Game( this.options_ );
		game.init()
			.then(
				result => game.makeMove_()
			);
	}

	/**
	 * Initialize.
	 */
	init() {
		var handler = (e) => {
			this.anim = new Animation();
			this.signIn = new SignIn();
			const screen = this.makeView_();
			this.anim.animate( screen, 'fading_entrances_0' );
			this.signIn.init();
			this.sound = new Sound();
			this.options_.sound = this.sound;
			this.options_.anim = this.anim;
			this.controller_( document.querySelector( '.' + this.CssClasses_.ACTIVE ) );
		};
		if (document.readyState !== 'loading') {
			handler();
		} else {
			document.addEventListener( 'DOMContentLoaded', handler );
		}
	}

}

const screen = new Screen();
screen.init();