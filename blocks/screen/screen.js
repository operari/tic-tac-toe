class Screen {
	constructor() {
		this.screen = null;
		this.dice = true;
		this.options = {};
		this.gameModes = {
			training: ['human', 'computer'],
			vs_computer: ['human', 'computer'],
			vs_human: ['human', 'human1'],
			network: 'По сети'
		};
		this.sides = {
			cross: 'x',
			nil: 'o'
		},
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
		this.__proto__.CssClasses_ = {
			HIDDEN: 'is-hidden',
			FADEOUT: 'fadeOut',
			FADEIN: 'fadeIn',
			ROTATEIN: 'rotateIn',
			FLASH: 'flash',
			FADEIN_DEF: 'fadeInDef',
			DICE: 'dice'
		};
		this.__proto__.Constant_ = {
			ANIM_TIMING: 1000,
			DICE_HIDE_TIMING: 3000,
			FULLSCREEN_TIMING: 1000
		};
	}

	makeView() {
		const html = `
			<div id="screen" class="screen animated fadeInDef">
				<div class="screen__inner">
					<div id="${this.CssIds_.MAIN}" class="screen__main animated">
						<h1 class="screen__title">Крестики-нолики</h1>
						<div class="screen__phrase">Классика игровой индустрии</div>
						<div class="screen__robot">
							<button type="button" id="${this.CssIds_.START}" class="screen__start">Начать игру</button>
						</div>
					</div>
					<div id="${this.CssIds_.MODE}" class="screen__mode animated is-hidden">
						<h2 class="screen__display">Выберите режим игры:</h2>
						<button class="bg-color--pink" data-mode="training" data-players='{ "player1": "human", "player2": "computer" }'>Тренировка</button>
						<button class="bg-color--blue" data-mode="vs_computer" data-players='{ "player1": "human", "player2": "computer" }'>С компьютером</button>
						<button class="bg-color--gold" data-mode="vs_human" data-players='{ "player1": "human", "player2": "human1" }'>С человеком</button>
						<button class="bg-color--purple" data-mode="network" data-players='{ "player1": "human", "player2": "human1" }' disabled>По сети</button>
					</div>
					${this.signIn.create()}
					<div id="${this.CssIds_.DIFFICULTY}" class="screen__difficulty animated is-hidden">
						<h2 class="screen__display">Выберите сложность:</h2>
						<button class="bg-color--green" data-difficulty="child">Ребенок</button>
						<button class="bg-color--blue" data-difficulty="easy">Легко</button>
						<button class="bg-color--red" data-difficulty="hard">Сложно</button>
					</div>
					<div id="${this.CssIds_.SIDE}" class="screen__side animated is-hidden">
						<h2 class="screen__display">Выберите сторону:</h2>
						<div>
							<button class="screen__side-cross ml-button--fab" type="button" data-side="cross">x</button>
							<button class="screen__side-nil ml-button--fab" type="button" data-side="nil">o</button>
						</div>
					</div>
					<div id="${this.CssIds_.FIRST}" class="screen__pick-move animated is-hidden">
						<h2 class="screen__display">Выберите кто ходит первым:</h2>
						<button class="ml-button--color" data-run="human">Вы</button>
						<button class="ml-button--color" data-run="computer">Компьютер</button>
					</div>
					<div id="${this.CssIds_.DICE}" class="screen__dice is-hidden animated">
						<button class="ml-button--color screen__dice--button">Начать</button>
					</div>
				</div>
			</div>
			`;

		document.getElementById( this.CssIds_.WRP ).insertAdjacentHTML( 'beforeend', html );
		this.screen = document.getElementById( this.CssIds_.SCREEN );
	}

	makeDiceWinner() {
		const arr = Array.from( arguments );
		const n = Math.max.apply( null, arr );
		const i = arr.findIndex( v => v === n );

		this.options.run = this.gameModes[this.options.mode][i];

		return i;
	}

	throwDice() {
		var n1, n2;
		this.sound.play( 'dice' );
		do {
			const dice1 = new Dice();
			const dice2 = new Dice();
			n1 = dice1.play();
			n2 = dice2.play();

			if (n1 === n2) {
				const dice = document.querySelectorAll( '.' + this.CssClasses_.DICE );
				Array.from( dice ).forEach( el => el.remove() );
			}
		} while(n1 === n2);

		return this.makeDiceWinner(n1, n2);
	}

	animWinnerDice(i) {
		setTimeout( () => {
			this.sound.play( 'flash' );
			const dice = document.querySelectorAll( '.' + this.CssClasses_.DICE )[i];
			dice.classList.remove( this.CssClasses_.ROTATEIN );
			this.animate( dice, this.CssClasses_.FLASH );
		}, this.Constant_.ANIM_TIMING );
	}

	hideDice() {
		return new Promise( (resolve,reject) => {
			setTimeout( () => {
				document.getElementById( this.CssIds_.DICE ).querySelector('button').click();
				resolve();
			}, this.Constant_.DICE_HIDE_TIMING );
		} );
	}

	animate(el,cls) {
		if (el) {
			el.classList.add( cls );
			return new Promise( (resolve,reject) => {
				setTimeout( () => {
					resolve();
				}, this.Constant_.ANIM_TIMING );
			} );
		}
		return false;
	}

	toggleView(id1,id2) {
		const el1 = document.getElementById( id1 );
		const el2 = document.getElementById( id2 );
		if (el1) {
			return new Promise( (resolve,reject) => {
				this.animate(el1, this.CssClasses_.FADEOUT)
					.then(
						result => {
							el1.remove();
							if (el2) {
								el2.classList.toggle( this.CssClasses_.HIDDEN );
								this.animate( el2, !this.dice ? this.CssClasses_.FADEIN : this.CssClasses_.FADEIN_DEF )
									.then(
										result => {
											resolve( el2 );
										}
									);
							} else {
								resolve();
							}
						}
					);
			} );
		}
		return false;
	}

	switchLastScreen(button,arr) {
		const mode = button.dataset.mode;
		if (mode) {
			switch(mode) {
				case 'training':
					document.getElementById( arr[arr.length - 1] ).remove();
					arr[arr.length - 1] = this.CssIds_.FIRST;
					this.dice = false;
					break;
				default:
					document.getElementById( this.CssIds_.FIRST ).remove();
			}
			return true;
		}
		return false;
	}

	makeOptions(button,arr) {
		for (let i = 0; i < arr.length; i++) {
			const dataset = button.dataset;
			if (dataset && dataset[arr[i]]) {
				if (arr[i] === 'side') {
					this.setTickType(dataset[arr[i]]);
				} else if (arr[i] === 'players') {
					this.options[arr[i]] = JSON.parse( dataset[arr[i]] );
				} else {
					this.options[arr[i]] = dataset[arr[i]];
				}
			}
		}
	}

	setTickType(side) {
		const mode = this.options.mode;
		this.options.tickType = { human: side };

		switch(mode) {
			case 'vs_human':
				this.options.tickType.human1 = side === 'cross' ? 'nil' : 'cross';
				break;
			default:
				this.options.tickType.computer = side === 'cross' ? 'nil' : 'cross';
		}

	}

	controller() {
		const btnStart = document.getElementById( this.CssIds_.START );
		const arrIds = [this.CssIds_.MAIN, this.CssIds_.MODE, this.CssIds_.SIDE, this.CssIds_.DICE];

		return new Promise( (resolve,reject) => {
			( function rec(el,arr) {
				if (arr.length) {
					if (arr.length === 1 && this.dice) {
						const i = this.throwDice();
						this.animWinnerDice( i );
						this.hideDice()
							.then(
								result => resolve()
							);
					}
					el.addEventListener( 'click', (e) => {
						const target = e.target;
						if (target.tagName !== "BUTTON" || /sign/.test( target.className )) return;
						if (target.id && target.id === this.CssIds_.START) {
							const fullscreen = new ToggleScreen();
							setTimeout( () => fullscreen.open(), this.Constant_.FULLSCREEN_TIMING );
						}
						if (target.dataset.mode === 'training') {
							arr.splice( 1, 0, this.CssIds_.DIFFICULTY );
						}
						if (target.dataset.mode === 'vs_computer' || target.dataset.mode === 'network') {
							arr.splice( 1, 0, this.CssIds_.SIGN );
						}
						this.sound.play( 'click' );
						this.switchLastScreen( target, arr );
						this.makeOptions( target, ['side', 'run', 'mode', 'players', 'difficulty'] );
						this.toggleView( arr[0], arr[1] )
							.then(
								result => {
									arr.shift();
									return rec.call( this, result, arr );
								}
							);
					} );
					el.addEventListener( 'mouseover', (e) => {
						if (!e.target.classList.contains( this.CssClasses_.HIDDEN )) {
							this.sound.play( 'hover' );
						}
					} );
				} else {
					resolve();
				}
			} ).call( this, btnStart, arrIds );
		} );
	}

	init() {
		var handler = (e) => {
			this.signIn = new SignIn();
			this.makeView();
			this.signIn.init();
			this.sound = new Sound();
			this.options.sound = this.sound;
			this.controller()
				.then(
					result => {
						this.screen.classList.toggle( this.CssClasses_.HIDDEN );
						this.screen.classList.toggle( this.CssClasses_.FADEOUT );
						document.getElementById( this.CssIds_.SCREEN ).remove();
						const game = new Game( this.options );
						game.init()
							.then(
								result => game.makeMove()
							);

					}
				);
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