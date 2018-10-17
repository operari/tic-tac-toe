const test = false;

class Game {
	constructor(options) {
		this.fieldSize = 9;
		this.run = 'human';
		this.mode = 'training';
		this.parti = 1;
		this.difficulty = 'child';
		this.store = {};
		this.openMenu = false;
		this.openChips = false;
		this.animateChips = true;
		this.players = {
			player1: 'human',
			player2: 'computer'
		};
		this.names = {
			human: ['Вы', 'Игрок 1'],
			computer: 'Компьютер',
			human1: 'Игрок 2'
		};
		this.tickType = {
			human: 'cross',
			computer: 'nil',
			human1: 'nil'
		};
		this.numberingAxes = {};
		this.multiplyingAxes = {};
		this.additionAxes = {};
		this.fieldCells = {};
		this.count = 0;
		this.state = '';
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
		this.coinsData = {
			coins: 0,
			getExpInterval: 500,
			getCoins: 1,
			thresholdExp: 0
		};
		this.volitionData = {
			value: 0,
			interval: 10,
			points: 99,
			increasePercent: 10
		};
		this.randomCoinData = {
			chancePercent: 30,
			added: false,
			index: -1
		};
		Object.defineProperty( this.coinsData, 'needExp', {
			value: this.coinsData.getExpInterval,
			writable: true
		} );
		this.score = {
			0: {
				name: 'star',
				cost: 5,
				side: 'x',
				paid: false,
				pick: false,
				lock: true
			},
			1: {
				name: 'heart',
				cost: 6,
				side: 'o',
				paid: false,
				pick: false,
				lock: true
			},
			2: {
				name: 'paw',
				cost: 11,
				side: 'x',
				paid: false,
				pick: false,
				lock: true
			},
			3: {
				name: 'cloud',
				cost: 10,
				side: 'o',
				paid: false,
				pick: false,
				lock: true
			},
			4: {
				name: 'snowflake',
				cost: 15,
				side: 'x',
				paid: false,
				pick: false,
				lock: true
			},
			5: {
				name: 'flush',
				cost: 16,
				side: 'o',
				paid: false,
				pick: false,
				lock: true
			},
			6: {
				name: 'cake',
				cost: 21,
				side: 'x',
				paid: false,
				pick: false,
				lock: true
			},
			7: {
				name: 'bomb',
				cost: 20,
				side: 'o',
				paid: false,
				pick: false,
				lock: true
			},
			8: {
				name: 'plane',
				cost: 25,
				side: 'x',
				paid: false,
				pick: false,
				lock: true
			},
			9: {
				name: 'basketball',
				cost: 26,
				side: 'o',
				paid: false,
				pick: false,
				lock: true
			},
			length: 10
		};
		this.statistics = {
			data: [
				{
					name: 'Саша',
					volition: 50,
					coins: 100,
					chip: 'star',
					level: 5
				},
				{
					name: 'Виктор',
					volition: 30,
					coins: 70,
					chip: 'heart',
					level: 3
				}
			],
			fields: {
				ru: ['Ник', 'Воля', 'Монеты', 'Фишка', 'Уровень']
			},
			limit: 10
		};
		this.__proto__.CssClasses_ = {
			FIELD: 'tttoe',
			CELL: 'tttoe__cell',
			TICK: 'tttoe__tick',
			STORE: 'tttoe__store',
			CHIP: 'tttoe__chip',
			CHIPS_FOOT: 'tttoe__chip-footer',
			CHIP_PAID: 'tttoe__chip-paid',
			CHIPS: 'tttoe__chips',
			CHIP_PICK: 'tttoe__chip--pick',
			WIN: 'tttoe__cell--winner',
			HIDDEN: 'is-hidden',
			MSG: 'message',
			AVATAR: 'tttoe__avatar',
			MENU: 'tttoe__menu',
			COIN: 'tttoe__coin',
			BUTTON_ACT: 'tttoe__button-action',
			LOCK: 'tttoe__chip-lock',
			UNLOCK_CHIPS: 'tttoe__chips-unlock',
			CONFETTI_STATIC: 'tttoe__chips-confetti',
			STATISTICS: 'tttoe__statistics',
			ABOUT: 'tttoe__about',
			ANIM: {
				ANIMATED: 'animated',
				SHAKE: 'shake',
				FADEIN_DEF: 'fadeInDef',
				FADE_OUT: 'fadeOut',
				FADEIN_LEFT: 'fadeInLeftBig',
				FADEIN_RIGHT: 'fadeOutRightBig',
				FLIP: 'flip',
				FLASH: 'flash',
				RUBBER_BAND: 'rubberBand',
				BOUNCE_IN: 'bounceIn',
				BOUNCE_IN_UP: 'bounceInUp',
				BOUNCE_OUT_UP: 'bounceOutUp',
				BOUNCE_IN_DOWN: 'bounceInDown',
				BOUNCE_OUT_DOWN: 'bounceOutDown',
				TADA: 'tada'
			},
		};
		this.__proto__.CssIds_ = {
			APP: 'game',
			CURSOR: 'comp_cursor',
			WRP: 'wrapper',
			CONTAINER: 'container',
			MSG: 'message',
			BAR: 'menu_bar',
			CHIPS_BAR: 'chips_bar',
			RESUME: 'resume',
			MAIN_MENU: 'main_menu',
			HOTKEYS: {
				'f10': 'menu',
				'f': 'chips'
			},
			LVL: 'level',
			POINTS: 'points',
			EXP: 'experience',
			BONUS: 'bonus',
			COINS: 'coins',
			FIELD_WRP: 'field_wrp',
			VOLITION: 'volition'
		};
		this.__proto__.Constant_ = {
			SHAKE_TIMING: 2000,
			CONFETTI_TIMING: 2000,
			TICK_TIMING: 500,
			MSG_ANIM_TIMING: 1500,
			ANIM_TIMING: 1000,
			BONUS_TIMING: 2000,
			SOUND_INTERVAL: 500,
			RESTART_PARTI: 1000,
			VOLITION_COLOR: '#545bb0',
			TEXTS: {
				NEW_CHIP: {
					RU: 'Новая фишка!'
				},
				NEXT_LVL_TXT: {
					RU: 'След. ур.: '
				},
				WILL: {
					RU: 'Воля'
				}
			}
		};
		Object.assign( this, options );
		this.partiRun = this.run;
		console.log(this.difficulty);
	}

	countAxesValues() {
		const axes = ['x', 'y', 'z'];
		const cells = this.doCells();
		const sqrt = Math.sqrt( this.fieldSize );

		for (let i = 0; i < axes.length; i++) {
			const matrix = this.doMatrix( cells, sqrt, axes[i] );
			this.numberingAxes[axes[i]] = matrix;

			const matrix1 = this.doMatrix( cells, sqrt, axes[i] );
			this.computeCells( matrix1 );
			this.multiplyingAxes[axes[i]] = matrix1.reduce( (a,b) => a.concat( b ) );

			const matrix2 = this.doMatrix( cells, sqrt, axes[i] );
			this.additionAxes[axes[i]] = this.sumAxissRows( matrix2 );
			this.computeCells( matrix2, false );
			this.additionAxes[axes[i]].forEach( (v,i) => v[Object.keys( v )[0]] = matrix2[i] );
		}

	}

	doCells() {
		const cells = [];

		for (let i = 1; i <= this.fieldSize; i++) {
			cells.push( i );
		}

		return cells;
	}

	doMatrix(arr,sqrt,axis) {

		const matrix = [];
		let row = [];

		function rec(n,matrix,row) {
			matrix = matrix || [];
			n = n;
			row = row;

			for (let i = 1; i <= arr.length; i++) {
				if (i % sqrt === 1) {
					row.push( i + (!matrix.length ? n++ : n--) );
				}
			}

			matrix.push( row );

			if (matrix.length === 1) {
				return rec( sqrt - 1, matrix, [] );
			} else {
				return matrix;
			}
		}

		if (axis === 'z') {
			return rec( 0, matrix, row );
		}

		if (axis === 'y') {
			arr = arr.slice( 0 ).sort( (a,b) => a % sqrt - b % sqrt );
		}

		for (let i = 1; i <= arr.length; i++) {
			row.push( arr[i - 1] );
			if (!(i % sqrt)) {
				matrix.push( row );
				row = [];
			}
		}

		return matrix;
	}

	computeCells(matrix,mult = true) {
		matrix.forEach( function(v,i,arr) {
			let row = [];
			(function rec(arr) {
				arr.reduce( function(a,b,i,arr) {

					if (arr.length > 1) {
						row.push( mult ? a * b : a + b );
					}

					if (b === arr[arr.length - 1]) {
						arr.shift();
						rec( arr );
					}

					return a;
				} );
			})( v );
			arr[i] = row;
		} );
	}

	sumAxissRows(matrix) {
		return matrix.map( function(arr) {
			const sum = arr.reduce( (a,b) => a + b ),
				o = {};
			o[sum] = [];

			return o;
		} );
	}

	makeFieldCells() {
		for (let i = 0; i < this.fieldSize; i++) {
			this.fieldCells[i] = {
				ticked: false,
				tickType: '',
				position: i + 1
			}
		}
		this.fieldCells.length = this.fieldSize;
	}

	makeViewField() {
		const field = document.createElement( 'table' );
		const sqrt = Math.sqrt( this.fieldSize );

		for (let i = 0; i < sqrt; i++) {
			let row = document.createElement( 'tr' );

			for (let n = 0; n < sqrt; n++) {
				let cell = document.createElement( 'td' );
				cell.className = this.CssClasses_.CELL;
				cell.id = sqrt * i + n;

				let inner = document.createElement( 'div' );
				inner.className = this.CssClasses_.FIELD + '__inner';

				cell.appendChild( inner );
				row.appendChild( cell );
			}


			field.appendChild( row );
		}

		field.className = this.CssClasses_.FIELD;

		return field;
	}

	get playerFirstName() {
		return this.names[this.players.player1][this.players.player2 === 'computer' ? 0 : 1];
	}

	get playerSecondName() {
		return this.names[this.players.player2];
	}

	get losePoints() {
		return Number.parseInt( this.expData.winPointsGame * this.expData.losePercent / 100 );
	}

	get bonusPoints() {
		return this.expData.partiPoints * this.levelGrow.bonusPercent / 100;
	}

	get bonusLosePoints() {
		return this.expData.partiPoints * this.levelGrow.bonusLosePercent / 100;
	}

	get gameWinPoints() {
		return this.expData.points - this.expData.currentLevelExp;
	}

	makeView() {
		this.pagination = new Pagination( this.statistics.data.length, this.statistics.limit );
		const html = `
			<div id="container" class="layout__container is-hidden animated">
				<div id="game" class="layout__game">
					<div class="layout__header">
						<div class="row">
							<div class="tttoe__coins">
								<div class="tttoe__coin animated"></div>
								<div id="${this.CssIds_.COINS}" class="tttoe__coins-count">${this.coinsData.coins}</div>
							</div>
							<div class="row">
								<div id="chips_bar" class="tttoe__chips-bar">
									<button class="tttoe__button-action ml-button--dim" data-popup="${this.CssClasses_.CHIPS}">
										<div class="tttoe__chips-bar-ico"></div>
										<div id="f" class="tttoe__key">f</div>
									</button>
								</div>
								<div id="menu_bar" class="tttoe__menu-bar">
									<button class="tttoe__button-action ml-button--dim" data-popup="${this.CssClasses_.MENU}">
										<div class="tttoe__menu-bar-ico"></div>
										<div id="f10" class="tttoe__key">f10</div>
									</button>
								</div>
							</div>
						</div>
						<div id="status" class="tttoe__status row">
							<div id="player1" class="tttoe__player">
								<div class="tttoe__avatar">
									<img src="blocks/game/${this.players.player1}.png" alt="" />
								</div>
								<div class="tttoe__name">${this.playerFirstName}</div>
								<div class="tttoe__store">0</div>
							</div>
							<div id="player2" class="tttoe__player">
								<div class="tttoe__avatar">
									<img src="blocks/game/${this.players.player2}.png" alt="" />
								</div>
								<div class="tttoe__name">${this.playerSecondName}</div>
								<div class="tttoe__store">0</div>
							</div>
						</div>
					</div>
					<div class="layout__middle">
						<div id="${this.CssIds_.FIELD_WRP}" class="tttoe__field-wrp row row--center">
							<div>
								<div id="comp_cursor" class="tttoe__computer-cursor is-hidden"></div>
							</div>
						</div>
					</div>
					<div class="layout__footer">
						<div class="row row--right">
							<div class="tttoe__volition" data-title="${this.Constant_.TEXTS.WILL.RU}">
								<div id="volition" class="tttoe__volition-count">0</div>
								<svg class="tttoe__volition-ico animated" width="42" height="42" fill="#ffffff" aria-hidden="true" data-prefix="fas" data-icon="brain" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M208 0c-29.87 0-54.74 20.55-61.8 48.22-.75-.02-1.45-.22-2.2-.22-35.34 0-64 28.65-64 64 0 4.84.64 9.51 1.66 14.04C52.54 138 32 166.57 32 200c0 12.58 3.16 24.32 8.34 34.91C16.34 248.72 0 274.33 0 304c0 33.34 20.42 61.88 49.42 73.89-.9 4.57-1.42 9.28-1.42 14.11 0 39.76 32.23 72 72 72 4.12 0 8.1-.55 12.03-1.21C141.61 491.31 168.25 512 200 512c39.77 0 72-32.24 72-72V205.45c-10.91 8.98-23.98 15.45-38.36 18.39-4.97 1.02-9.64-2.82-9.64-7.89v-16.18c0-3.57 2.35-6.78 5.8-7.66 24.2-6.16 42.2-27.95 42.2-54.04V64c0-35.35-28.66-64-64-64zm368 304c0-29.67-16.34-55.28-40.34-69.09 5.17-10.59 8.34-22.33 8.34-34.91 0-33.43-20.54-62-49.66-73.96 1.02-4.53 1.66-9.2 1.66-14.04 0-35.35-28.66-64-64-64-.75 0-1.45.2-2.2.22C422.74 20.55 397.87 0 368 0c-35.34 0-64 28.65-64 64v74.07c0 26.09 17.99 47.88 42.2 54.04 3.46.88 5.8 4.09 5.8 7.66v16.18c0 5.07-4.68 8.91-9.64 7.89-14.38-2.94-27.44-9.41-38.36-18.39V440c0 39.76 32.23 72 72 72 31.75 0 58.39-20.69 67.97-49.21 3.93.67 7.91 1.21 12.03 1.21 39.77 0 72-32.24 72-72 0-4.83-.52-9.54-1.42-14.11 29-12.01 49.42-40.55 49.42-73.89z"></path></svg>
							</div>
							<div class="tttoe__exp-bar">
								<span id="${this.CssIds_.POINTS}" class="tttoe__exp-points animated">${this.expData.points}</span>
								<div id="${this.CssIds_.EXP}" class="tttoe__experience" data-next-lvl="${this.Constant_.TEXTS.NEXT_LVL_TXT.RU} ${this.setNextLevelExp()}"><span></span></div>
								<div id="level" class="tttoe__level">Уровень: <span class="animated">${this.level}</span></div>
							</div>
						</div>
					</div>
					<div class="layout__popups">
						<div class="tttoe__chips layout__substrate animated is-hidden" data-flag="openChips">
							<div class="tttoe__chips-inner layout__popup">
								<h3>Магазин</h3>
								<div class="row row--left">
									${this.fillScore()}
								</div>
								<button class="tttoe__chips-close tttoe__button-action ml-button--dim" type="button"></button>
							</div>
						</div>
						<div class="tttoe__statistics layout__substrate animated is-hidden">
							<div class="tttoe__statistics-inner layout__popup">
								<h3>Статистика</h3>
								<div class="row row--left">
									${this.fillStatistics()}
									${this.pagination.create()}
								</div>
								<button class="tttoe__chips-close tttoe__button-action ml-button--dim" type="button"></button>
							</div>
						</div>
						<div class="tttoe__about layout__substrate animated is-hidden">
							<div class="tttoe__about-inner layout__popup">
								<h3>Об игре</h3>
								<p class="tttoe__about-text">Крестики-нолики - игра нашего детства.
								Играйте против компьютера, друга или по сети.
								Получайте опыт, прокачивайте уровень и открывайте эпичные фишки в магазине.
								</p>
								<div class="tttoe__affiliate"></div>
								<p><b>Разработчик</b><br>Александр Радевич</p>
								<p><a href="http://operari.by" target="_blank">OPERARI</a></p>
								<button class="tttoe__chips-close tttoe__button-action ml-button--dim" type="button"></button>
							</div>
						</div>
						<div class="tttoe__menu layout__substrate animated is-hidden" data-flag="openMenu">
							<div class="game-menu">
								<button id="${this.CssIds_.RESUME}" class="game-menu__action tttoe__button-action bg-color--blue">Вернуться</button>
								<button class="game-menu__action tttoe__button-action bg-color--pink" data-popup="${this.CssClasses_.STATISTICS}">Статистика</button>
								<button class="game-menu__action tttoe__button-action bg-color--gold" data-popup="${this.CssClasses_.ABOUT}">Об игре</button>
								<button id="${this.CssIds_.MAIN_MENU}" class="game-menu__action tttoe__button-action bg-color--purple">Главное меню</button>
							</div>
						</div>
						<div class="tttoe__chips-unlock is-hidden">
							<div class="tttoe__chips-confetti animated">
								<img src="blocks/game/confetti.png" alt="" />
							</div>
						</div>
						<div id="message" class="tttoe__message animated animated--msg"></div>
						<div class="tttoe__bonus animated is-hidden"><div id="bonus"></div></div>
					</div>
				</div>
			</div>
			`;

		const field = this.makeViewField();

		return new Promise( (resolve,reject) => {
			var handler = (e) => {
				const wrapper = document.getElementById( this.CssIds_.WRP );
				wrapper.insertAdjacentHTML( 'beforeend', html );
				this.fieldElement = document.getElementById( this.CssIds_.APP );
				document.getElementById( this.CssIds_.FIELD_WRP ).firstElementChild.appendChild( field );
				this.appendRandomCoin();
				this.showView();
				resolve();
			}
			if (document.readyState === 'complete') {
				handler();
			} else {
				document.addEventListener( 'DOMContentLoaded', handler );
			}
		} );
	}

	showView() {
		const container = document.getElementById( this.CssIds_.CONTAINER );
		container.classList.toggle( this.CssClasses_.HIDDEN );
		container.classList.toggle( this.CssClasses_.ANIM.FADEIN_DEF );
	}

	fillScore() {
		let html = '';

		for (let i = 0; i < this.score.length; i++) {
			const elem = this.score[i];
			const chip =
				`<button class="tttoe__chip tttoe__button-action ml-button--dim" data-index="${i}" ${elem.lock ? 'disabled' : ''}>
					<div class="tttoe__chip-ico tttoe__${elem.name}"></div>
					<div class="tttoe__chip-footer">
						<span class="tttoe__coin tttoe__coin--mini animated"></span>
						<span class="tttoe__chip-cost">${elem.cost}</span>
					</div>
					${elem.lock ? '<div class="tttoe__chip-lock"><div></div></div>': ''}
					<div class="tttoe__chip-side">${elem.side}</div>
				</button>`;
			html += chip;
		}

		return html;

	}

	fillStatistics() {
		const table = document.createElement( 'table' );

		var appendRow = () => {
			const row = document.createElement( 'tr' );
			table.appendChild( row );
			return row;
		};
		const row = appendRow();

		for (let i = 0; i < this.statistics.fields.ru.length; i++) {
			const headCell = document.createElement( 'th' );
			headCell.textContent = this.statistics.fields.ru[i];
			row.appendChild( headCell );
		}

		for (let i = 0; i < this.statistics.data.length; i++) {
			if (i + 1 > this.statistics.limit) {
				break;
			}
			const o = this.statistics.data[i];
			const row = appendRow();
			for (let prop in o) {
				const cell = document.createElement( 'td' );
				if (prop === 'chip') {
					cell.innerHTML = `<div class="tttoe__chip-ico tttoe__chip-ico--mini tttoe__${o[prop]}"></div>`;
				} else if (prop === 'name') {
					cell.innerHTML = `<span></span><span>${o[prop]}</span>`;
				} else {
					cell.textContent = o[prop];
				}
				row.appendChild( cell );
			}


		}

		return table.outerHTML;
	}

	makeMove() {
		switch (this.mode) {
			case 'vs_human':
				if (this.run === 'human') {
					this.doHuman( this.players.player1, this.players.player2 );
				} else {
					this.doHuman( this.players.player2, this.players.player1 );
				}
				break;
			case 'training':

			default:
				if (this.run === 'human') {
					this.doHuman( this.players.player1, this.players.player2 );
				} else {
					this.doComputer();
				}
		}

	}

	highlightMove() {
		const props = Object.keys( this.players );
		const values = Object.values( this.players );

		var highlight = (id,add = true) => {
			const elem = document.getElementById( id ).querySelector( '.' + this.CssClasses_.AVATAR );
			elem.classList[add ? 'add' : 'remove']( this.CssClasses_.AVATAR + '--highlight' );
		};

		let i = values.findIndex( v => v === this.run );
		highlight( props[i] );

		i = values.findIndex( v => v !== this.run );
		highlight( props[i], false );

	}

	actionsAfterWin(comb,axis) {
		return new Promise( (resolve,reject) => {
			this.setStore();
			this.setPoints( this.run );
			this.displayWinner( comb, axis );
			this.switchPartiPlayer();
			const winnerName = this.getGameWinner();
			if (winnerName) {
				this.displayMessage( winnerName );
				const loserName = this.getPartiLoser( winnerName );
				const winnerId = this.getPlayerId( winnerName );
				const loserId = this.getPlayerId( loserName );
				this.throwConfetti( document.getElementById( winnerId ), this.Constant_.CONFETTI_TIMING );
				this.animate( document.getElementById( loserId ).querySelector( '.' + this.CssClasses_.AVATAR ), this.CssClasses_.ANIM.SHAKE, this.Constant_.SHAK_TIMING );
				this.setPoints( winnerName, true )
					.then(
						result => {
							this.resetStores();
							resolve();
						}
					);
			} else {
				setTimeout( () => resolve(), this.Constant_.RESTART_PARTI );
			}
		} );
	}

	doHuman(curr,next) {
		this.highlightMove();

		const h = handler.bind( this );

		function handler(e) {
			const target = e.target;
			const td = target.closest( 'td' );

			if (target.tagName === 'DIV' && td) {
				const indx = td.id;
				const ticked = this.tick( indx, this.tickType[curr] );
				if (ticked) {
					this.fieldElement.removeEventListener( 'click', h );

					const winnerComb = this.checkWinnerCombination( false, curr );
					if (winnerComb) {
						this.actionsAfterWin( winnerComb.comb, winnerComb.axis )
							.then(
								result => {
									this.restartParti()
										.then(
											result => {
												this.makeMove();
											}
										);
								}
							);
					} else {
						if (this.players.player2 !== 'computer') {
							if (this.draw()) {
								return;
							}
						}
						this.run = next;

						if (this.randomCoinData.added && indx == this.randomCoinData.index) {
							this.setCoins( 1, true )
								.then(
									result => {
										this.makeMove();
									}
								);
							this.randomCoinData.added = false;
						} else {
							this.makeMove();
						}

					}
				}
			}

		}

		if (this.run !== 'computer') {
			this.fieldElement.addEventListener( 'click', h );
		}
	}

	doComputer() {
		this.highlightMove();

		const result = this.analysis();
		const n = result.cell - 1;

		this.computerMoveAnimation(n)
			.then(
				res => {
					const ticked = this.tick( n, this.tickType[this.run] );
					this.state = this.count === this.fieldSize && this.state !== 'win' ? 'draw' : this.state;
					if (this.state === 'win') {
						if (ticked) {
							this.actionsAfterWin( result.comb, result.axis )
								.then(
									result => {
										this.restartParti()
											.then(
												result => {
													this.makeMove();
												}
											);
									}
								)
						}
					} else if (this.state === 'draw') {
						this.count = this.fieldSize;
						this.draw();
					} else {
						if (ticked) {
							setTimeout( () => {
								this.run = 'human';
								this.makeMove();
							}, this.Constant_.TICK_TIMING );
						}
					}
				}
			);
	}

	tick(n,type,tick = true) {
		if (this.fieldCells[n] && !this.fieldCells[n].ticked) {
			this.fieldCells[n].ticked = true;
			this.fieldCells[n].tickType = type;
			this.displayTick( n, type );
			this.sound.play( 'tick' );

			this.count++;

			return true;
		}

		return false;
	}

	checkWinnerCombination(axis,tickType) {
		const comb = Array.from( this.fieldCells ).filter( o => o.ticked && o.tickType === this.tickType[tickType] ).map( o => o.position );

		if (axis) {
			const matrix = this.numberingAxes[axis];
			return findCombRow.call( this, matrix );
		} else {
			const axiss = [];
			const finded = [];
			for (let prop in this.numberingAxes) {
				const matrix = this.numberingAxes[prop];
				finded.push( findCombRow.call( this, matrix ) );
				axiss.push( prop );
			}
			const findedIndex = finded.findIndex( a => a.length );
			if (~findedIndex) {
				return {
					comb: finded[findedIndex],
					axis: this.makeRotateAxisClass( axiss[findedIndex], finded[findedIndex] )
				}
			}
		}

		function findCombRow(matrix) {
			for (let i = 0; i < matrix.length; i++) {
				const row = matrix[i];
				let identicallyRow = false;
				if (comb.length === row.length) {
					identicallyRow = comb.every( a => row.some( b => a === b ) );
				} else {
					if (comb.length > row.length) {
						identicallyRow = row.every( a => comb.some( b => a === b ) );
					}
				}
				if (identicallyRow) {
					return row;
				}
			}
			return false;
		}

	}

	getRandomCell() {
		let ticked = false,
			n;
		do {
			n = this.getRandomInt( 0, this.fieldSize );
			ticked = this.isTickedCell( n );
		} while (ticked === true);

		return n + 1;
	}

	analysis() {
		let result = {};
		if (this.count < 2) {
			result.cell = this.getRandomCell();
		} else {
			const o = this.filterCells();
			const resultCompareComputer = this.makePotentialCells( o.emptyCells, o.computerCells, 'computer' );
			const resultCompareHuman = this.makePotentialCells( o.emptyCells, o.humanCells, 'human' );

			if (resultCompareComputer.cell) {
				if (this.difficulty === 'child' && this.count <= this.fieldSize - 2) {
					const randCell = this.getRandomCell();
					if (randCell === resultCompareComputer.cell) {
						this.state = 'win';
						result = resultCompareComputer;
					} else {
						result.cell = randCell;
					}
				} else {
					this.state = 'win';
					result = resultCompareComputer;
				}
			} else if (resultCompareHuman.cell) {
				switch(this.difficulty) {
					case 'hard':
						result.cell = resultCompareHuman.cell;
						break;
					case 'easy':
						result.cell = resultCompareComputer.length ? this.chooseRandomCell( resultCompareComputer ) : resultCompareHuman.cell;
						break;
					default:
						result.cell = this.getRandomCell();
				}
			} else {
				if (resultCompareComputer.length) {
					result.cell = this.chooseRandomCell( resultCompareComputer );
				} else if (resultCompareHuman.length) {
					result.cell = this.chooseRandomCell( resultCompareHuman );
				} else {
					this.state = 'draw';
					result.cell = o.emptyCells[0] ? o.emptyCells[0].position : -1;
				}
			}
		}

		return result;

	}

	filterCells() {
		const field = Array.from( this.fieldCells );
		const filteredCells = {};
		filteredCells.emptyCells = field.filter( o => !o.ticked );
		filteredCells.humanCells = field.filter( o => o.tickType === this.tickType['human'] );
		filteredCells.computerCells = field.filter( o => o.tickType === this.tickType['computer'] );

		return filteredCells;
	}

	makePotentialCells(emptyCells,playerCells,player) {

		let potentialCells = [];
		for (let i = 0; i < emptyCells.length; i++) {
			const result = this.getPlayerPotentialCells( emptyCells[i].position, playerCells, player );
			if (result) {
				if (typeof( result ) === 'object' && result[0]) {
					potentialCells.push( result );
				} else {
					return result;
				}
			}
		}

		return potentialCells;
	}

	getPlayerPotentialCells(emptyCell,compareCells,player) {
		const playerPotencialCells = [];

		for (let i = 0; i < compareCells.length; i++) {
			const compareCell = compareCells[i].position;
			const axisMultiply = compareCell * emptyCell;
			const axis = this.getAxis( axisMultiply );
			if (axis) {
				const axisAddition = compareCell + emptyCell;
				const potentialCell = this.getPotentialCell( axis, axisAddition );
				if (potentialCell) {
					const potentialCellObj = this.fieldCells[potentialCell - 1];
					if (potentialCellObj.ticked) {
						if (potentialCellObj.tickType === this.tickType[player]) {
							const testTicked = this.doTestTick( emptyCell, player );
							if (testTicked) {
								const winnerComb = this.checkWinnerCombination( axis, player );
								this.doTestTick( emptyCell, false, false );
								if (winnerComb) {
									return {
										cell: emptyCell,
										comb: winnerComb,
										axis: this.makeRotateAxisClass( axis, winnerComb )
									}
								}
							}
						}
					} else {
						playerPotencialCells.push( potentialCell );
					}
				}
			}
		}

		return playerPotencialCells.length ? playerPotencialCells : false;
	}

	getPotentialCell(axis,sumCells) {
		const axisValues = this.additionAxes[axis];

		for (let i = 0; i < axisValues.length; i++) {
			const propAxisSumRow = Object.keys( axisValues[i] )[0];
			const valuesAxisRow = axisValues[i][propAxisSumRow];
			const find = valuesAxisRow.some( v => v === sumCells );
			if (find) {
				return propAxisSumRow - sumCells;
			}
		}

		return false;

	}

	isTickedCell(n) {
		if (this.fieldCells[n].ticked) {
			return true;
		}
		return false;
	}

	doTestTick(cell,player,test=true) {
		const n = cell - 1;

		if (test) {
			this.fieldCells[n].ticked = true;
			this.fieldCells[n].tickType = this.tickType[player];

			return true;
		}

		this.fieldCells[n].ticked = false;
		this.fieldCells[n].tickType = '';

		return false;
	}

	getAxis(n) {
		for (let axis in this.multiplyingAxes) {
			const val = this.multiplyingAxes[axis];
			const find = val.some( v => v === n );

			if (find) {
				return axis;
			}

		}

		return false;

	}

	makeRotateAxisClass(str,arr) {
		str = str === 'z' && arr.some( v => v === 3 ) ? str + '-45' : str
		return str;
	}

	chooseRandomCell(potentialCells) {
		potentialCells = potentialCells.reduce( (a,b) => a.concat( b ) );
		const arr = new UniqueArray( potentialCells );
		const potentialCellsUniq = arr.unique();

		const n = this.getRandomInt( 0, potentialCellsUniq.length );
		const cell = potentialCellsUniq[n];

		return cell;
	}

	setStore() {
		typeof( this.store[this.run] ) === 'number' ? this.store[this.run] += 1: this.store[this.run] = 1;
		this.displayStore();
	}

	setPoints(winner,bonus) {
		return new Promise( (resolve,reject) => {
			if (this.mode === 'vs_computer') {
				if (!bonus) {
					this.expData.points = winner === 'human' ? this.expData.points + this.expData.winPointsGame : this.expData.points && this.expData.points - this.losePoints;
					this.expData.partiPoints += winner === 'human' ? this.expData.winPointsGame : 0;
				} else {
					this.expData.points = winner === 'human' ? this.expData.points + this.bonusPoints : this.expData.points - this.bonusLosePoints;
					this.expData.points = Number.parseInt( this.expData.points );
						setTimeout( () => {
							this.displayBonus( winner )
								.then(
									result => {
										resolve();
									}
								);
							this.expData.partiPoints = 0;
						}, this.Constant_.MSG_ANIM_TIMING );
				}
				if (this.gameWinPoints > 0) {
					this.levelUp();
				} else {
					this.levelDown();
				}
				this.setCoins();
				this.displayExperience();
			}
			setTimeout( () => resolve(), this.Constant_.MSG_ANIM_TIMING );
		} );
	}

	setNextLevelExp() {
		this.expData.nextLevelExp = ((this.expData.nextLevelExp || this.expData.currentLevelExp) + this.levelGrow.value) + this.level * this.levelGrow.increase;
		return this.expData.nextLevelExp;
	}

	setCurrentLevelExp() {
		if (this.level === 1) {
			this.expData.currentLevelExp = 0;
		} else {
			this.expData.currentLevelExp = ((this.expData.currentLevelExp + this.levelGrow.value) + (this.level - 1) * this.levelGrow.increase) - this.expData.currentLevelExp;
		}
	}

	setCoins(force,randomCoin,sound) {
		if (!force) {
			if (this.expData.points >= this.coinsData.needExp) {
				this.coinsData.coins += this.coinsData.getCoins;
				this.coinsData.thresholdExp += this.coinsData.getExpInterval;
				this.coinsData.needExp += this.coinsData.getExpInterval;
				this.displayCoins();
				this.unlockChips();
			}
		} else {
			this.coinsData.coins += force;
			return new Promise( (resolve,reject) => {
				this.displayCoins(randomCoin, false, sound)
					.then(
						result => {
							this.unlockChips();
							resolve();
						}
					);
			} );
		}
	}

	unlockChips() {
		const chips = Array.from( this.score ).filter( o => o.cost <= this.coinsData.coins && o.lock );
		const chipsIcons = [];

		if (chips.length) {
			chips.forEach( o => {
				o.lock = false;
				const chipIco = document.querySelector( `.${this.CssClasses_.FIELD}__${o.name}` );
				const parent = chipIco.parentNode;
				parent.disabled = false;
				parent.querySelector( '.' + this.CssClasses_.LOCK ).remove();
				chipsIcons.push( chipIco );
			} );
		}

		if (this.animateChips) {
			let i = 0;
			(function rec(arr,n) {
				if (n === arr.length) return;
				this.displayUnlockChip( arr[n] )
					.then(
						result => {
							return rec.call( this, arr, ++n );
						}
					);
			}).call( this, chipsIcons, i );
		}

	}

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

	levelUp() {
		if (this.expData.points >= this.expData.nextLevelExp) {
			this.level++
				this.expData.currentLevelExp = this.expData.nextLevelExp;
			this.setNextLevelExp();
			setTimeout( () => {
				this.sound.play( 'level' );
			}, this.Constant_.SOUND_INTERVAL + 200 );
			this.displayLevel();
			document.getElementById( this.CssIds_.EXP ).dataset.nextLvl = this.Constant_.TEXTS.NEXT_LVL_TXT.RU + this.expData.nextLevelExp;
		}
	}

	levelDown() {
		if (this.expData.points < this.expData.currentLevelExp) {
			this.level--;
			this.expData.nextLevelExp = this.expData.currentLevelExp;
			this.setCurrentLevelExp();
			this.displayLevel( false );
			document.getElementById( this.CssIds_.EXP ).dataset.nextLvl = this.Constant_.TEXTS.NEXT_LVL_TXT.RU + this.expData.nextLevelExp;
		}
	}

	appendRandomCoin() {
		if (this.mode === 'vs_computer') {
			const chance = this.getRandomInt( 0, 101 );
			if (chance <= this.randomCoinData.chancePercent) {
				const i = this.getRandomInt( 0, this.fieldSize );
				const coin = document.querySelector( '.' + this.CssClasses_.COIN ).cloneNode();
				coin.classList.add( this.CssClasses_.COIN + '--random' );
				coin.classList.add( this.CssClasses_.HIDDEN );
				const cell = document.querySelectorAll( '.' + this.CssClasses_.CELL )[i];
				cell.firstElementChild.appendChild( coin );
				this.randomCoinData.added = true;
				this.randomCoinData.index = i;
			}
		}

	}

	getGameWinner() {
		const stores = Object.values( this.store );
		const sum = stores.reduce( (a,b) => a + b );
		if (sum === this.parti) {
			this.sound.play( 'win' );
			const n = Math.max.apply( null, stores );
			let i = stores.findIndex( v => v === n );
			const winner = Object.keys( this.store )[i];
			const prop = this.getPlayerId( winner );

			return winner;
		} else {
			this.sound.play( 'point' );
		}

		return false;
	}

	getPartiLoser(winner) {
		const players = Object.values( this.players );
		const i = players.findIndex( v => v !== winner );
		return players[i];
	}

	getPlayerId(name) {
		for (let prop in this.players) {
			if (this.players[prop] === name) {
				return prop;
			}
		}
		return false;
	}

	switchPartiPlayer() {
		const playersNames = Object.values( this.players );
		this.run = this.partiRun = playersNames.find( v => v !== this.partiRun );
	}

	animate(el,cls,timing = 0,del = true) {
		if (el) {
			el.classList.add( cls );
			return new Promise( (resolve,reject) => {
				setTimeout( () => {
					del && el.classList.remove( cls );
					resolve();
				}, timing );
			} );
		}
		return false;
	}

	throwConfetti(el,timing) {
		if (el) {
			const confetti = new Confetti( 'confetti', 150 );
			el.appendChild( confetti );
			return new Promise( (resolve,reject) => {
				setTimeout( () => {
					confetti.remove();
					resolve();
				}, timing );
			} );
		}
		return false;

	}

	getRandomInt(min,max) {
		return Math.floor( Math.random() * (max - min) ) + min;
	}

	getSoundInterval(name,add = 10) {
		return (this.sound.timings[name].end - this.sound.timings[name].start) * 1e3 + add;
	}

	getClassPickedChip(side) {
		if (this.run !== 'computer') {
			const chip = Array.from( this.score ).find( o => o.pick && o.side === this.transSymbolTextSide( side ) );
			if (chip) {
				return ` ${this.CssClasses_.FIELD}__${chip.name}`;
			}
		}
		return '';
	}

	resetStores() {
		this.store = {};
		const stores = document.querySelectorAll( '.' + this.CssClasses_.STORE );

		for (let i = 0; i < stores.length; i++) {
			stores[i].textContent = 0;
		}

	}

	displayStore() {
		for (let prop in this.players) {
			if (this.run === this.players[prop]) {
				document.getElementById( prop ).querySelector( '.' + this.CssClasses_.STORE ).textContent = this.store[this.run];

				break;
			}
		}
	}

	displayTick(n,type) {
		let tick = document.createElement( 'div' );
		tick.className = `${this.CssClasses_.TICK} ${this.CssClasses_.TICK}--${this.tickType[this.run]}${this.getClassPickedChip( type )}`;
		this.fieldElement.querySelectorAll( 'td' )[n].firstElementChild.appendChild( tick );
	}

	displayWinner(arr,axis) {
		for (let i = 0; i < arr.length; i++) {
			this.fieldElement.querySelectorAll( 'td' )[arr[i] - 1].classList.add( this.CssClasses_.WIN + '-' + axis );
		}
		// console.log( 'Winner is: ' + this.run );
	}

	displayMessage(str) {
		if (str) {
			const elem = document.getElementById( this.CssIds_.MSG );
			elem.classList.add( this.CssClasses_.MSG );
			let msg = 'Выиграл';

			switch (str) {
				case 'human':
					msg += this.playerFirstName === 'Вы' ? 'и ' + this.playerFirstName : ' ' + this.playerFirstName;
					break;
				case 'draw':
					msg = 'Ничья';
					break;
				default:
					msg += ' ' + this.names[str];
			}

			elem.textContent = msg + '!';

			setTimeout( () => {
				elem.classList.remove( this.CssClasses_.MSG );
			}, this.Constant_.MSG_ANIM_TIMING );

		}
	}

	displayExperience() {
		const needLvlExp = this.expData.nextLevelExp - this.expData.currentLevelExp;
		const elem = document.getElementById( this.CssIds_.EXP );
		elem.firstElementChild.style.width = Number.parseInt( this.gameWinPoints / needLvlExp * 100 ) + '%';
		document.getElementById( this.CssIds_.POINTS ).textContent = this.expData.points;
	}

	displayBonus(winner,volition) {
		return new Promise( (resolve,reject) => {
			const elem = document.getElementById( this.CssIds_.BONUS );
			if (!volition) {
				if (winner === 'human') {
					if (this.bonusPoints > 0) {
						elem.innerHTML = `<span class="tttoe__bonus-win">+${Number.parseInt( this.bonusPoints )}</span><span class="tttoe__bonus-msg">Бонус</span>`;
					} else {
						return resolve();
					}
				} else {
					if (this.bonusLosePoints > 0) {
						elem.innerHTML = `<span class="tttoe__bonus-lose">-${Number.parseInt( this.bonusLosePoints )}</span><span class="tttoe__bonus-msg">Луз</span>`;
					} else {
						return resolve();
					}
				}
			} else {
				elem.innerHTML = `<span class="tttoe__bonus-volition">+${volition}</span><span class="tttoe__bonus-msg">Воля</span>`;
			}
			elem.parentNode.classList.toggle( this.CssClasses_.HIDDEN );
			this.sound.play( 'swing' );
			this.animate( elem.parentNode, this.CssClasses_.ANIM.FADEIN_LEFT, 0, false )
				.then(
					result => {
						setTimeout( () => {
							this.sound.play( 'swing' );
							this.animate( elem.parentNode, this.CssClasses_.ANIM.FADEIN_RIGHT, this.Constant_.ANIM_TIMING )
								.then(
									result => {
										elem.parentNode.classList.toggle( this.CssClasses_.HIDDEN );
										elem.parentNode.classList.toggle( this.CssClasses_.ANIM.FADEIN_LEFT );
									}
								);
							resolve();
						}, this.Constant_.BONUS_TIMING );
					}
				);
		} );
	}

	displayCoins(randomCoin,animPoints = true,sound = true) {
		document.getElementById( this.CssIds_.COINS ).textContent = this.coinsData.coins;
		const coin = document.querySelectorAll( '.' + this.CssClasses_.COIN )[randomCoin ? 1 : 0];
		coin.classList.remove( this.CssClasses_.HIDDEN );
		if (animPoints) {
			this.animate( document.getElementById( this.CssIds_.POINTS ), this.CssClasses_.ANIM.FLASH, this.Constant_.ANIM_TIMING );
		}
		if (sound) {
			this.sound.play( 'coin' );
		}
		return new Promise( (resolve,reject) => {
			this.animate( coin, this.CssClasses_.ANIM.FLIP, this.Constant_.ANIM_TIMING )
				.then(
					result => {
						randomCoin && coin.remove();
						resolve();
					}
				);
		} );
	}

	displayLevel(anim = true) {
		const elem = document.getElementById( this.CssIds_.LVL ).firstElementChild;
		elem.textContent = this.level;
		if (anim) {
			setTimeout( () => {
				this.animate( elem, this.CssClasses_.ANIM.BOUNCE_IN, this.Constant_.ANIM_TIMING );
			}, this.Constant_.SOUND_INTERVAL + 200 );
		}
	}

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
			this.animate( elem.nextElementSibling, this.CssClasses_.ANIM.RUBBER_BAND, this.Constant_.ANIM_TIMING )
				.then(
					result => {
						elem.nextElementSibling.style.fill = '#ffffff';
					}
				);
		}
	}

	displayUnlockChip(elem) {
		return new Promise( (resolve,reject) => {
			const wrp = document.querySelector( '.' + this.CssClasses_.UNLOCK_CHIPS );
			const confetti = wrp.querySelector( '.' + this.CssClasses_.CONFETTI_STATIC );
			const btnAct = document.querySelector( '.' + this.CssClasses_.BUTTON_ACT );
			const clone = elem.cloneNode();
			clone.classList.add( this.CssClasses_.ANIM.ANIMATED );
			const span = document.createElement( 'span' );
			span.textContent = this.Constant_.TEXTS.NEW_CHIP.RU;
			span.className = this.CssClasses_.ANIM.ANIMATED;
			clone.appendChild( span );
			wrp.appendChild( clone );

			this.sound.play( 'swing' );
			btnAct.disabled = true;
			wrp.classList.toggle( this.CssClasses_.HIDDEN );
			this.animate( confetti, this.CssClasses_.ANIM.BOUNCE_IN_DOWN, this.Constant_.ANIM_TIMING, false );
			this.animate( clone, this.CssClasses_.ANIM.BOUNCE_IN_UP, this.Constant_.ANIM_TIMING, false )
				.then(
					result => {
						this.animate( span, this.CssClasses_.ANIM.TADA, 0, false );
						this.sound.play( 'tada' )
							.then(
								result => {
									this.sound.play( 'swing' );
									this.animate( confetti, this.CssClasses_.ANIM.BOUNCE_OUT_DOWN, this.Constant_.ANIM_TIMING )
										.then(
											result => {
												confetti.classList.remove( this.CssClasses_.ANIM.BOUNCE_IN_DOWN );
											}
										);
									this.animate( clone, this.CssClasses_.ANIM.BOUNCE_OUT_UP, this.Constant_.ANIM_TIMING )
										.then(
											result => {
												clone.remove();
												btnAct.disabled = false;
												wrp.classList.toggle( this.CssClasses_.HIDDEN );
												resolve();
											}
										);
								}
							);
					}
				);
		} );
	}

	restartParti() {
		return new Promise( (resolve,reject) => {
			const fieldCells = Array.from( this.fieldCells );

			for (let i = 0; i < fieldCells.length; i++) {
				fieldCells[i].ticked = false;
				fieldCells[i].tickType = '';

				const td = document.getElementById( i );
				const remClass = Array.from( td.classList ).find( v => /winner/.test( v ) );
				td.classList.remove( remClass );
				const tick = td.querySelector( '.' + this.CssClasses_.TICK );
				tick && tick.remove();

				this.count = 0;
				this.state = '';
			}

			const randomCoin = document.querySelector( '.' + this.CssClasses_.FIELD ).querySelector( '.' + this.CssClasses_.COIN );
			randomCoin && randomCoin.remove();
			this.randomCoinData.added = false;
			this.randomCoinData.index = -1;

			this.appendRandomCoin();

			resolve();
		} );
	}

	toggleScoreChipsDisplay(target,n) {
		const flag = target.classList.toggle( this.CssClasses_.CHIP_PICK );
		this.score[n].pick = flag;
		let chips = Array.from( document.querySelectorAll( '.' + this.CssClasses_.CHIP ) );
		const chipMustDisable = chips.filter( (v,i) => this.score[i].pick && i != n )[0];

		if (chipMustDisable) {
			chipMustDisable.classList.remove( this.CssClasses_.CHIP_PICK );
			const chip = this.score[chipMustDisable.dataset.index];
			chip.pick = false;
			return chip;
		}
		return false;
	}

	toggleFieldChipsDisplay(o) {
		const side = this.transSymbolTextSide( o.side );
		const chips = document.querySelectorAll( `.${this.CssClasses_.TICK}--${side}` );

		if (chips.length && this.tickType.human === side) {
			Array.from( chips ).forEach( v => v.classList.toggle( this.CssClasses_.FIELD + '__' + o.name ) );
		}
	}

	transSymbolTextSide(side) {
		if (side.length === 1) {
			return side === 'x' ? 'cross' : 'nil';
		} else {
			return side === 'cross' ? 'x' : 'o';
		}
	}

	draw() {
		if (this.count === this.fieldSize) {
			this.displayMessage( 'draw' );
			this.switchPartiPlayer();
			this.sound.play( 'draw' )
				.then(
					result => {
						this.setVolition()
							setTimeout( () => {
								this.restartParti()
									.then(
										result => {
											this.makeMove();
										}
									);
							}, this.Constant_.RESTART_PARTI );
					}
				)
			return true;
		}
		return false;
	}

	computerMoveAnimation(id) {
		return new Promise( (resolve,reject) => {
			if (id >= 0) {
				const cell = document.getElementById( id );
				const cellCenter = cell.offsetWidth / 2;
				const cursor = document.getElementById( this.CssIds_.CURSOR );
				const positionTop = cell.offsetTop + cellCenter - cursor.offsetTop - cursor.offsetHeight + 'px';
				// const positionLeft = cell.offsetLeft + cellCenter - cursor.offsetLeft + 'px';
				const positionLeft = cursor.offsetLeft - cell.offsetLeft - cellCenter + 'px';

				cursor.classList.remove( this.CssClasses_.HIDDEN );
				cursor.style.top = positionTop;
				cursor.style.right = positionLeft;
				setTimeout( () => {
					cursor.classList.add( this.CssClasses_.HIDDEN );
					cursor.style.top = '';
					cursor.style.right = '';
					resolve();
				}, 1000 );
			} else {
				resolve();
			}
		} );
	}

	registerCallPopups() {
		document.addEventListener( 'click', (e) => {
			const btn = this.findNode( e );
			if (btn) {
				const popupClassElem = btn.dataset && btn.dataset.popup;
				if (popupClassElem && !btn.disabled) {
					const popup = document.querySelector( '.' + btn.dataset.popup );
					const p = this.popupToggle( popup );
					if (typeof(p) === 'boolean' && p) {
						//  Call menuActions, chipActions
						this[popupClassElem.replace( /^.+__/, '' ) + 'Actions']( popup );
					}
				}
			}
		} );
	}

	popupToggle(elem) {
		const flag = elem.dataset.flag;
		if (this[flag]) {
			elem.removeEventListener( 'click', this.bindedHandler );
			return new Promise( (resolve,reject) => {
				this[flag] = !this[flag];
				this.animate( elem, this.CssClasses_.ANIM.FADE_OUT, this.Constant_.ANIM_TIMING )
					.then(
						result => {
							elem.classList.remove( this.CssClasses_.ANIM.FADEIN_DEF );
							elem.classList.toggle( this.CssClasses_.HIDDEN );
							resolve();
						}
					);
			} );
		} else {
			elem.classList.toggle( this.CssClasses_.HIDDEN );
			this.animate( elem, this.CssClasses_.ANIM.FADEIN_DEF, 0, false );
			this[flag] = !this[flag];
			return true;
		}
	}

	actionsHandler(o,elem) {
		this.bindedHandler = handler.bind( this );
		this.bindedElem = elem;

		function handler(e) {
			const target = e.target.closest( 'button' ) || e.target.closest( 'a' );
			if (target) {
				o.act( target, elem );
				if (/(\b|__)close\b/.test( target.className )) {
					this.popupToggle( elem );
				}
			}
		}

		elem.addEventListener( 'click', this.bindedHandler );

	}

	menuActions(elem) {
		this.actionsHandler( {
			act: (target,elem) => {
				this.popupToggle( elem )
					.then(
						result => {
							if (target.id === this.CssIds_.MAIN_MENU) {
								this.restartGame();
							}
						}
					);
			}
		}, elem );
	}

	chipsActions(elem) {
		this.actionsHandler( {
			act: (target,elem) => {
				if (target.classList.contains( this.CssClasses_.CHIP ) && !target.disabled) {
					const i = target.dataset.index;
					const chip = this.score[i];
					if (this.buyChip( chip, i )) {
						const disabledChip = this.toggleScoreChipsDisplay( target, i );
						if (disabledChip) {
							this.toggleFieldChipsDisplay( disabledChip );
						}
						this.toggleFieldChipsDisplay( chip );
					} else {
						setTimeout( () => {
							this.sound.play( 'coin1' );
						}, this.getSoundInterval( 'click' ) );
					}
				}

			}
		}, elem );
	}

	statisticsActions(elem) {
		this.pagination.toggleActive();
		this.actionsHandler( {
			act: (target,elem) => {
				console.log('act');
			}
		}, elem );
	}

	aboutActions(elem) {
		this.actionsHandler( {
			act: (target,elem) => {
			}
		}, elem );
	}

	buyChip(o,n) {
		if (!o.paid && (this.coinsData.coins - o.cost >= 0)) {
			this.setCoins( -o.cost, false, false );
			document.querySelector( `button[data-index="${n}"]` ).querySelector( '.' + this.CssClasses_.CHIPS_FOOT ).innerHTML = `<div class="${this.CssClasses_.CHIP_PAID}"></div>`;
			setTimeout( () => {
				this.sound.play( 'coins' );
			}, this.getSoundInterval( 'click' ) );
			return o.paid = true;
		}
		return o.paid;
	}

	restartGame() {
		const container = document.getElementById( this.CssIds_.CONTAINER );
		this.animate( container, this.CssClasses_.ANIM.FADE_OUT, this.Constant_.ANIM_TIMING )
			.then(
				result => {
					container.classList.remove( this.CssClasses_.ANIM.FADEIN_DEF );
					container.classList.add( this.CssClasses_.HIDDEN );
					container.remove();

					const screen = new Screen();
					screen.init();
					screen.screen.classList.remove( this.CssClasses_.ANIM.FADE_OUT );
					screen.screen.classList.remove( this.CssClasses_.HIDDEN );

					const fullscreen = new ToggleScreen();
					fullscreen.close();
				}
			);
	}

	findNode(e,selector = this.CssClasses_.BUTTON_ACT) {
		return e.target.closest( '.' + selector );
	}

	soundOfButtons() {
		document.addEventListener( 'click', (e) => {
			const btn = this.findNode( e );
			if (btn) {
				if (btn.disabled && [...btn.children].some( v => v.classList.contains( this.CssClasses_.LOCK ) )) {
					this.sound.play( 'lock' );
				} else {
					this.sound.play( 'click' );
				}
			}
		} );

		document.addEventListener( 'mouseover', (e) => {
			const btn = this.findNode( e );
			if (btn) {
				if (!btn.dataset.hover) {
					this.sound.play( 'hover' );
					setTimeout( function() {
						btn.dataset.hover = '';
					}, 1000 );
				}
				btn.dataset.hover = 1;
			}
		} );
	}

	triggers() {
		document.addEventListener( 'keyup', (e) => {
			const hotkeys = Object.keys( this.CssIds_.HOTKEYS );
			const findKey = hotkeys.find( (v) => v === e.key.toLowerCase() );
			if (findKey) {
				if (this.bindedElem) {
					this.bindedElem.removeEventListener( 'click', this.bindedHandler );
				}
				document.getElementById( findKey ).closest( 'button' ).click();
			}
		} );
	}

	init() {
		this.countAxesValues();
		this.makeFieldCells();
		return new Promise( (resolve,reject) => {
			this.makeView()
				.then(
					result => {
						this.soundOfButtons();
						this.triggers();
						this.registerCallPopups();
						resolve();
					}
				);
		} );
	}

}

class UniqueArray extends Array {
	unique() {
		this[0].sort( (a,b) => a - b );
		let unique = [];
		if (this[0].length > 1) {
			this[0].reduce( (a,b,i,arr) => {
				if (a - b) {
					unique.push( a );
					if (arr[arr.length - 1] === arr[i]) {
						unique.push( b );
					}
				} else {
					if (arr.length === 2) {
						unique.push( b );
					}
				}
				return b;
			} );
		} else {
			if (!this[0].length) {
				throw new Error( 'The array does not have a suitable length!' );
			}
			unique = this[0];
		}
		return unique;
	}
}


if (test) {
	const sound = new Sound();

	const game = new Game( {
		sound: sound
	} );

	game.init()
		.then(
			result => game.makeMove()
		);
}