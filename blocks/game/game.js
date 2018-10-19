const test = true;

/** Class representing a game. */
class Game {
	/**
	 * Creates a new game.
	 *
	 * @param {Object} options Rewrite options.
	 */
	constructor(options) {
		this.fieldSize = 9;
		this.run = 'human';
		this.mode = 'vs_computer';
		this.parti = 1;
		this.difficulty = 'child';
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
		this.store = {
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
			limit: 1
		};
		/**
		 * Store strings for class names defined by this component that are used in JavaScript.
		 *
		 * @enum {string}
		 * @private
		*/
		this.__proto__.CssClasses_ = {
			FIELD: 'tttoe',
			INNER: 'tttoe__inner',
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
			AVATAR: 'tttoe__avatar',
			MENU: 'tttoe__menu',
			BUTTON_ACT: 'tttoe__button-action',
			LOCK: 'tttoe__chip-lock',
			UNLOCK_CHIPS: 'tttoe__chips-unlock',
			CONFETTI_STATIC: 'tttoe__chips-confetti',
			STATISTICS: 'tttoe__statistics',
			ABOUT: 'tttoe__about',
			ANIMATED: 'animated'
		};
		/**
		 * Store strings for identifiers defined by this component that are used in JavaScript.
		 *
		 * @enum {string}
		 * @private
		*/
		this.__proto__.CssIds_ = {
			APP: 'game',
			CURSOR: 'comp_cursor',
			WRP: 'wrapper',
			CONTAINER: 'container',
			BAR: 'menu_bar',
			CHIPS_BAR: 'chips_bar',
			RESUME: 'resume',
			MAIN_MENU: 'main_menu',
			/** @type {Object} */
			HOTKEYS: {
				'f10': 'menu',
				'f': 'chips'
			},
			FIELD_WRP: 'field_wrp',
		};
		/**
		 * Store constants in one place so they can be updated easily.
		 *
		 * @enum {(string | number)}
		 * @private
		*/
		this.__proto__.Constant_ = {
			SHAKE_TIMING: 2000,
			CONFETTI_TIMING: 2000,
			TICK_TIMING: 500,
			ANIM_TIMING: 1000,
			RESTART_PARTI: 1000,
			MOVE_ANIMATION: 1000
		};
		/**
		 * Store texts in one place so they can be updated easily.
		 *
		 * @enum {(string | number)}
		 * @private
		*/
		this.__proto__.Texts_ = {
			NEW_CHIP: {	RU: 'Новая фишка!' }
		};
		Object.assign( this, options );
		this.partiRun = this.run;
	}

	/**
	 * Creates matrices of calculated values.
	 *
	 * @private
	 */
	countAxesValues_() {
		const axes = ['x', 'y', 'z'];
		const cells = this.doCells_();
		const sqrt = Math.sqrt( this.fieldSize );

		for (let i = 0; i < axes.length; i++) {
			const matrix = this.doMatrix_( cells, sqrt, axes[i] );
			this.numberingAxes[axes[i]] = matrix;

			const matrix1 = this.doMatrix_( cells, sqrt, axes[i] );
			this.computeCells_( matrix1 );
			this.multiplyingAxes[axes[i]] = matrix1.reduce( (a,b) => a.concat( b ) );

			const matrix2 = this.doMatrix_( cells, sqrt, axes[i] );
			this.additionAxes[axes[i]] = this.sumAxissRows_( matrix2 );
			this.computeCells_( matrix2, false );
			this.additionAxes[axes[i]].forEach( (v,i) => v[Object.keys( v )[0]] = matrix2[i] );
		}

	}

	/**
	 * Creates game cells.
	 *
	 * @return {Array} Cells.
	 * @private
	 */
	doCells_() {
		const cells = [];

		for (let i = 1; i <= this.fieldSize; i++) {
			cells.push( i );
		}

		return cells;
	}

	/**
	 * Creates a matrix of cell values.
	 *
	 * @param  {Array} arr  Cells.
	 * @param  {Number} sqrt Square root of field size.
	 * @param  {String} axis Counting axis.
	 * @return {Array} Matrix.
	 * @private
	 */
	doMatrix_(arr,sqrt,axis) {

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

	/**
	 * Computes cells of matrix.
	 *
	 * @param  {Array}  matrix Matrix of cell values.
	 * @param  {Boolean} mult Arithmetic operation.
	 * @private
	 */
	computeCells_(matrix,mult = true) {
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

	/**
	 * Calculates the sum of the rows of each axis.
	 *
	 * @param  {Array} matrix Matrix of cell values.
	 * @private
	 */
	sumAxissRows_(matrix) {
		return matrix.map( function(arr) {
			const sum = arr.reduce( (a,b) => a + b ),
				o = {};
			o[sum] = [];

			return o;
		} );
	}

	/**
	 * Writes state of each cell.
	 *
	 * @private
	 */
	makeFieldCells_() {
		for (let i = 0; i < this.fieldSize; i++) {
			this.fieldCells[i] = {
				ticked: false,
				tickType: '',
				position: i + 1
			}
		}
		this.fieldCells.length = this.fieldSize;
	}

	/**
	 * Creates this visual part of game field.
	 *
	 * @return {Element} [description]
	 * @private
	 */
	makeViewField_() {
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

	/**
	 * Creates the visual part of the game.
	 *
	 * @return {Promise} Promise
	 * @private
	 */
	makeView_() {
		const html = `
			<div id="container" class="layout__container is-hidden">
				<div id="game" class="layout__game">
					<div class="layout__header">
						<div class="row">
							<div class="tttoe__coins">
								<div class="tttoe__coin"></div>
								<div id="${this.coins.CssIds_.COINS}" class="tttoe__coins-count">${this.coins.coinsData.coins}</div>
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
						${this.score.create()}
					</div>
					<div class="layout__middle">
						<div id="${this.CssIds_.FIELD_WRP}" class="tttoe__field-wrp row row--center">
							<div>
								<div id="comp_cursor" class="tttoe__computer-cursor is-hidden"></div>
							</div>
						</div>
					</div>
					<div class="layout__footer">
						${this.experience.create()}
					</div>
					<div class="layout__popups">
						<div class="tttoe__chips layout__substrate is-hidden" data-flag="openChips">
							<div class="tttoe__chips-inner layout__popup">
								<h3>Магазин</h3>
								<div class="row row--left">
									${this.fillStore()}
								</div>
								<button class="tttoe__chips-close tttoe__button-action ml-button--dim" type="button"></button>
							</div>
						</div>
						<div class="tttoe__statistics layout__substrate is-hidden">
							<div class="tttoe__statistics-inner layout__popup">
								<h3>Статистика</h3>
								<div class="row row--left">
									${this.fillStatistics()}
									${this.pagination.create()}
								</div>
								<button class="tttoe__chips-close tttoe__button-action ml-button--dim" type="button"></button>
							</div>
						</div>
						<div class="tttoe__about layout__substrate is-hidden">
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
						<div class="tttoe__menu layout__substrate is-hidden" data-flag="openMenu">
							<div class="game-menu">
								<button id="${this.CssIds_.RESUME}" class="game-menu__action tttoe__button-action bg-color--blue">Вернуться</button>
								<button class="game-menu__action tttoe__button-action bg-color--pink" data-popup="${this.CssClasses_.STATISTICS}">Статистика</button>
								<button class="game-menu__action tttoe__button-action bg-color--gold" data-popup="${this.CssClasses_.ABOUT}">Об игре</button>
								<button id="${this.CssIds_.MAIN_MENU}" class="game-menu__action tttoe__button-action bg-color--purple">Главное меню</button>
							</div>
						</div>
						<div class="tttoe__chips-unlock is-hidden">
							<div class="tttoe__chips-confetti">
								<img src="blocks/game/confetti.png" alt="" />
							</div>
						</div>
						<div id="message" class="tttoe__message animated--msg is-hidden"></div>
						${this.experience.createBonus()}
					</div>
				</div>
			</div>
			`;

		const field = this.makeViewField_();

		return new Promise( (resolve,reject) => {
			var handler = (e) => {
				const wrapper = document.getElementById( this.CssIds_.WRP );
				wrapper.insertAdjacentHTML( 'beforeend', html );
				this.fieldElement = document.getElementById( this.CssIds_.APP );
				document.getElementById( this.CssIds_.FIELD_WRP ).firstElementChild.appendChild( field );
				this.showView_();
				resolve();
			}
			if (document.readyState === 'complete') {
				handler();
			} else {
				document.addEventListener( 'DOMContentLoaded', handler );
			}
		} );
	}

	/**
	 * Displays view.
	 *
	 * @private
	 */
	showView_() {
		const container = document.getElementById( this.CssIds_.CONTAINER );
		this.anim.animate( container, 'fading_entrances_0' );
	}

	fillStore() {
		let html = '';

		for (let i = 0; i < this.store.length; i++) {
			const elem = this.store[i];
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

	/**
	 * Makes move.
	 *
	 * @private
	 */
	makeMove_() {
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
		this.score.highlightAvatar( this.getPlayerId_( this.run ), true );
	}

	/**
	 * Action after party.
	 *
	 * @param  {Array} comb Row combination of a parti winner.
	 * @param  {string} axis The axis of a parti winner.
	 * @return {Promise} Promise.
	 */
	actionsAfterPartiOver_(comb,axis) {
		return new Promise( (resolve,reject) => {
			this.score.setScore( this.run, this.getPlayerId_( this.run ) );
			this.experience.setPoints( this.run );
			this.displayWinnerThrough( comb, axis );
			this.switchPartiPlayer_();
			const winnerName = this.getGameWinner_();
			if (winnerName) {
				this.experience.displayPartiResultMessage( winnerName );
				const loserName = this.getGameLoser_( winnerName );
				const winnerId = this.getPlayerId_( winnerName );
				const loserId = this.getPlayerId_( loserName );
				this.throwConfetti( document.getElementById( winnerId ), this.Constant_.CONFETTI_TIMING );
				this.anim.animate( document.getElementById( loserId ).querySelector( '.' + this.CssClasses_.AVATAR ), 'attention_seekers_11', true, this.Constant_.SHAKE_TIMING );
				this.experience.setPoints( winnerName, true )
					.then(
						result => {
							this.score.resetScore();
							resolve();
						}
					);
			} else {
				this.sound.play( 'point' );
				setTimeout( _ => resolve(), this.Constant_.RESTART_PARTI );
			}
		} );
	}

	/**
	 * Checks the winner combination.
	 *
	 * @param  {boolean|string} axis Found potential axis winning.
	 * @param  {string} player The player that moves.
	 * @return {(Array|Object)} Array of computer winning combination or an object with a human's winning data.
	 * @private
	 */
	checkWinnerCombination_(axis,player) {
		const comb = Array.from( this.fieldCells ).filter( o => o.ticked && o.tickType === this.tickType[player] ).map( o => o.position );

		/**
		 * Finds the winning row of the axis.
		 *
		 * @param  {Array} matrix Row matrix.
		 * @return {Array|boolean} Found row or not.
		 * @private
		 */
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
					axis: this.makeRotateAxisClass_( axiss[findedIndex], finded[findedIndex] )
				}
			}
		}

	}

	/**
	 * Gets random cell where to make a move.
	 *
	 * @return {number} Cell position.
	 * @private
	 */
	getRandomCell_() {
		let ticked = false,
			n;
		do {
			n = getRandomInt( 0, this.fieldSize );
			ticked = this.isTickedCell_( n );
		} while (ticked === true);

		return n + 1;
	}

	/**
	 * Checks if cell is ticked.
	 *
	 * @param  {number}  n Cell number.
	 * @return {boolean} Is a cell ticked.
	 * @private
	 */
	isTickedCell_(n) {
		if (this.fieldCells[n].ticked) {
			return true;
		}
		return false;
	}

	/**
	 * An algorithm that analyzes the playing field where to make a move depending on the complexity.
	 *
	 * @return {Object} Cell where to make a move or cell, winning combination and axis.
	 * @private
	 */
	analysis_() {
		let result = {};
		if (this.count < 2) {
			result.cell = this.getRandomCell_();
		} else {
			const o = this.filterCells_();
			const resultCompareComputer = this.makePotentialCells_( o.emptyCells, o.computerCells, 'computer' );
			const resultCompareHuman = this.makePotentialCells_( o.emptyCells, o.humanCells, 'human' );

			if (resultCompareComputer.cell) {
				if (this.difficulty === 'child' && this.count <= this.fieldSize - 2) {
					const randCell = this.getRandomCell_();
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
						result.cell = resultCompareComputer.length ? this.chooseRandomCell_( resultCompareComputer ) : resultCompareHuman.cell;
						break;
					default:
						result.cell = this.getRandomCell_();
				}
			} else {
				if (resultCompareComputer.length) {
					result.cell = this.chooseRandomCell_( resultCompareComputer );
				} else if (resultCompareHuman.length) {
					result.cell = this.chooseRandomCell_( resultCompareHuman );
				} else {
					this.state = 'draw';
					result.cell = o.emptyCells[0] ? o.emptyCells[0].position : -1;
				}
			}
		}

		return result;

	}

	/**
	 * Filters cells on empty, computer, human.
	 *
	 * @return {Object} Object filtered cell in arrays.
	 */
	filterCells_() {
		const field = Array.from( this.fieldCells );
		const filteredCells = {};
		filteredCells.emptyCells = field.filter( o => !o.ticked );
		filteredCells.humanCells = field.filter( o => o.tickType === this.tickType['human'] );
		filteredCells.computerCells = field.filter( o => o.tickType === this.tickType['computer'] );

		return filteredCells;
	}

	/**
	 * Makes potential cells for move.
	 *
	 * @param  {Array} emptyCells  Object array with empty cells.
	 * @param  {Array} playerCells Object array with player cells that moves.
	 * @param  {string} player The player that moves.
	 * @return {Array|Object} Array with elements in the array with potential cells or object with winning combination.
	 * @private
	 */
	makePotentialCells_(emptyCells,playerCells,player) {
		let potentialCells = [];
		for (let i = 0; i < emptyCells.length; i++) {
			const result = this.getPlayerPotentialCells_( emptyCells[i].position, playerCells, player );
			if (result) {
				if (Array.isArray( result )) {
					potentialCells.push( result );
				} else {
					return result;
				}
			}
		}
		return potentialCells;
	}

	/**
	 * Gets potencial cells for each player individually.
	 *
	 * @param  {number} emptyCell Empty cell.
	 * @param  {Array} compareCells Compare cells.
	 * @param  {[type]} player The player that moves.
	 * @return {(Array|Object|boolean)} Array of potential cells for player or object with winning combination or false.
	 * @private
	 */
	getPlayerPotentialCells_(emptyCell,compareCells,player) {
		const playerPotencialCells = [];

		for (let i = 0; i < compareCells.length; i++) {
			const compareCell = compareCells[i].position;
			const axisMultiply = compareCell * emptyCell;
			const axis = this.getAxis_( axisMultiply );
			if (axis) {
				const axisAddition = compareCell + emptyCell;
				const potentialCell = this.getPotentialCell_( axis, axisAddition );
				if (potentialCell) {
					const potentialCellObj = this.fieldCells[potentialCell - 1];
					if (potentialCellObj.ticked) {
						if (potentialCellObj.tickType === this.tickType[player]) {
							const testTicked = this.doTestTick_( emptyCell, player );
							if (testTicked) {
								const winnerComb = this.checkWinnerCombination_( axis, player );
								this.doTestTick_( emptyCell, false, false );
								if (winnerComb) {
									return {
										cell: emptyCell,
										comb: winnerComb,
										axis: this.makeRotateAxisClass_( axis, winnerComb )
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

	/**
	 * Gets potential cell for to makes a move.
	 *
	 * @param  {string} axis Curretn axis.
	 * @param  {number} sumCells Sum of ticked cells on row.
	 * @return {(number|boolean)} Potencial cell for move.
	 * @private
	 */
	getPotentialCell_(axis,sumCells) {
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

	/**
	 * Makes test tick.
	 *
	 * @param  {number}  cell Empty cell.
	 * @param  {string}  player The player that moves.
	 * @param  {boolean} test If test then fires for that cell.
	 * @return {boolean} Check or uncheck empty cell.
	 * @private
	 */
	doTestTick_(cell,player,test=true) {
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

	/**
	 * Gets current axis.
	 *
	 * @param  {number} n Multiply cells.
	 * @return {string|boolean} If the expression finds an axis returns the axis.
	 */
	getAxis_(n) {
		for (let axis in this.multiplyingAxes) {
			const val = this.multiplyingAxes[axis];
			const find = val.some( v => v === n );

			if (find) {
				return axis;
			}

		}

		return false;

	}

	/**
	 * Makes class for winning row.
	 *
	 * @param  {string} str Winning axis.
	 * @param  {Array} arr Array winning combination.
	 * @return {string} Axis class.
	 * @private
	 */
	makeRotateAxisClass_(str,arr) {
		str = str === 'z' && arr.some( v => v === 3 ) ? str + '-45' : str
		return str;
	}

	/**
	 * Gets random cell from array of potential cells.
	 *
	 * @param  {Array} potentialCells The array of potential cells.
	 * @return {number} Random cell.
	 * @private
	 */
	chooseRandomCell_(potentialCells) {
		potentialCells = potentialCells.reduce( (a,b) => a.concat( b ) );
		const arr = new UniqueArray( potentialCells );
		const potentialCellsUniq = arr.unique();

		const n = getRandomInt( 0, potentialCellsUniq.length );
		const cell = potentialCellsUniq[n];

		return cell;
	}

	unlockChips() {
		const chips = Array.from( this.store ).filter( o => o.cost <= this.coinsData.coins && o.lock );
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

	/**
	 * Gets the winner of the game.
	 *
	 * @return {(string|boolean)} Winner name.
	 * @private
	 */
	getGameWinner_() {
		if (this.score.getSumScore() === this.parti) {
			this.sound.play( 'win' );
			return this.score.getNameRichScore();
		} else {
			return false;
		}

	}

	/**
	 * Gets name of player loser game.
	 *
	 * @param  {string} winner Winner name.
	 * @return {string} Loser name.
	 * @private
	 */
	getGameLoser_(winner) {
		const players = Object.values( this.players );
		const i = players.findIndex( v => v !== winner );
		return players[i];
	}

	/**
	 * Gets player identifier.
	 *
	 * @param  {string} name Player name.
	 * @return {(string|boolean)} Player identifier.
	 */
	getPlayerId_(name) {
		for (let prop in this.players) {
			if (this.players[prop] === name) {
				return prop;
			}
		}
		return false;
	}

	/**
	 * Toggles the player who will move first in the next turn.
	 *
	 * @private
	 */
	switchPartiPlayer_() {
		const playersNames = Object.values( this.players );
		this.run = this.partiRun = playersNames.find( v => v !== this.partiRun );
	}

	getClassPickedChip(side) {
		if (this.run !== 'computer') {
			const chip = Array.from( this.store ).find( o => o.pick && o.side === this.transSymbolTextSide( side ) );
			if (chip) {
				return ` ${this.CssClasses_.FIELD}__${chip.name}`;
			}
		}
		return '';
	}

	displayUnlockChip(elem) {
		return new Promise( (resolve,reject) => {
			const wrapper = document.querySelector( '.' + this.CssClasses_.UNLOCK_CHIPS );
			const confetti = wrapper.querySelector( '.' + this.CssClasses_.CONFETTI_STATIC );
			const btnAct = document.querySelector( '.' + this.CssClasses_.BUTTON_ACT );
			const clone = elem.cloneNode();
			clone.classList.add( this.CssClasses_.ANIMATED );
			const span = document.createElement( 'span' );
			span.textContent = this.Texts_.NEW_CHIP.RU;
			span.className = this.CssClasses_.ANIMATED;
			clone.appendChild( span );
			wrapper.appendChild( clone );

			this.sound.play( 'swing' );
			btnAct.disabled = true;

			wrapper.classList.toggle( this.CssClasses_.HIDDEN );
			this.anim.animate( confetti, 'bouncing_entrances_1', false );
			this.anim.animate( clone, 'bouncing_entrances_4', false )
				.then(
					result => {
						this.anim.animate( span, 'attention_seekers_9', false, 0 );
						this.sound.play( 'tada' )
							.then(
								result => {
									this.sound.play( 'swing' );
									this.anim.animate( confetti, 'boucing_exits_1' );
									this.anim.animate( clone, 'boucing_exits_4' )
										.then(
											result => {
												clone.remove();
												btnAct.disabled = false;
												wrapper.classList.toggle( this.CssClasses_.HIDDEN );
												resolve();
											}
										);
								}
							);
					}
				);
		} );
	}

	/**
	 * Restarts the party.
	 *
	 * @return {Promise} Promise.
	 * @private
	 */
	restartParti_() {
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

			this.coins.appendRandomCoin();

			resolve();
		} );
	}

	toggleScoreChipsDisplay(target,n) {
		const flag = target.classList.toggle( this.CssClasses_.CHIP_PICK );
		this.store[n].pick = flag;
		let chips = Array.from( document.querySelectorAll( '.' + this.CssClasses_.CHIP ) );
		const chipMustDisable = chips.filter( (v,i) => this.store[i].pick && i != n )[0];

		if (chipMustDisable) {
			chipMustDisable.classList.remove( this.CssClasses_.CHIP_PICK );
			const chip = this.store[chipMustDisable.dataset.index];
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

	/**
	 * Checks the game for a draw.
	 *
	 * @return {boolean} The state draws.
	 * @private
	 */
	draw_() {
		if (this.count === this.fieldSize) {
			this.experience.displayPartiResultMessage( 'draw' );
			this.switchPartiPlayer_();
			this.sound.play( 'draw' )
				.then(
					result => {
						this.experience.setVolition()
							setTimeout( () => {
								this.restartParti_()
									.then(
										result => {
											this.makeMove_();
										}
									);
							}, this.Constant_.RESTART_PARTI );
					}
				)
			return true;
		}
		return false;
	}

	/**
	 * Makes the animation of the computer.
	 *
	 * @param  {number} id Cell identifier.
	 * @return {Promise} Promise.
	 * @private
	 */
	computerMoveAnimation_(id) {
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
				setTimeout( _ => {
					cursor.classList.add( this.CssClasses_.HIDDEN );
					cursor.style.top = '';
					cursor.style.right = '';
					resolve();
				}, this.Constant_.MOVE_ANIMATION );
			} else {
				resolve();
			}
		} );
	}

	/**
	 * Registers calls popups.
	 *
	 * @private
	 */
	registerCallPopups_() {
		document.addEventListener( 'click', (e) => {
			const btn = this.findNode_( e );
			if (btn) {
				const popupClassElem = btn.dataset && btn.dataset.popup;
				if (popupClassElem && !btn.disabled) {
					const popup = document.querySelector( '.' + btn.dataset.popup );
					const p = this.popupToggle( popup );
					if (typeof(p) === 'boolean' && p) {
						//  Call menuActions, chipActions, statisticsActions, aboutActions
						this[popupClassElem.replace( /^.+__/, '' ) + 'Actions_']( popup );
					}
				}
			}
		} );
	}

	/**
	 * Actions handler.
	 *
	 * @param  {Object} o Unique logic for each act method.
	 * @param  {Element} elem Element on which events are triggered.
	 * @private
	 */
	actionsHandler_(o,elem) {
		this.bindedHandler = handler.bind( this );
		this.bindedElem = elem;

		/**
		 * Handler.
		 *
		 * @param  {Event} e The event that fired.
		 */
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

	/**
	 * Menus actions.
	 *
	 * @param  {Element} elem Popup element for toggle.
	 * @private
	 */
	menuActions_(elem) {
		this.actionsHandler_( {
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

	/**
	 * Chips actions.
	 *
	 * @param  {Element} elem Popup element for actions.
	 * @private
	 */
	chipsActions_(elem) {
		this.actionsHandler_( {
			act: (target,elem) => {
				if (target.classList.contains( this.CssClasses_.CHIP ) && !target.disabled) {
					const i = target.dataset.index;
					const chip = this.store[i];
					if (this.buyChip( chip, i )) {
						const disabledChip = this.toggleScoreChipsDisplay( target, i );
						if (disabledChip) {
							this.toggleFieldChipsDisplay( disabledChip );
						}
						this.toggleFieldChipsDisplay( chip );
					} else {
						this.sound.play( 'coin1' );
					}
				}

			}
		}, elem );
	}

	/**
	 * Statistics actions.
	 *
	 * @param  {Element} elem Popup element for actions.
	 * @private
	 */
	statisticsActions_(elem) {
		this.pagination.toggleActive();
		this.actionsHandler_( {
			act: (target,elem) => {
				console.log('act');
			}
		}, elem );
	}

	/**
	 * About actions.
	 *
	 * @param  {Element} elem Popup element for actions.
	 * @private]
	 */
	aboutActions_(elem) {
		this.actionsHandler_( {
			act: (target,elem) => {
			}
		}, elem );
	}

	buyChip(o,n) {
		if (!o.paid && (this.coinsData.coins - o.cost >= 0)) {
			this.setCoins( -o.cost, false, false );
			document.querySelector( `button[data-index="${n}"]` ).querySelector( '.' + this.CssClasses_.CHIPS_FOOT ).innerHTML = `<div class="${this.CssClasses_.CHIP_PAID}"></div>`;
			this.sound.play( 'coins' );
			return o.paid = true;
		}
		return o.paid;
	}

	restartGame() {
		const container = document.getElementById( this.CssIds_.CONTAINER );
		this.anim.animate( container, 'fading_exits_0' )
			.then(
				result => {
					container.remove();

					const screen = new Screen();
					screen.init();

					const fullscreen = new ToggleScreen();
					fullscreen.close();
				}
			);
	}

	/**
	 * Finds ancestor.
	 *
	 * @param  {Event} e The event that fired.
	 * @param  {String} selector Selector for query.
	 * @return {Element} Found element.
	 * @private
	 */
	findNode_(e,selector = this.CssClasses_.BUTTON_ACT) {
		return e.target.closest( '.' + selector );
	}

	/**
	 * Registers sounds on buttons.
	 *
	 * @private
	 */
	soundOfButtons_() {
		document.addEventListener( 'click', (e) => {
			const btn = this.findNode_( e );
			if (btn) {
				if (btn.disabled && [...btn.children].some( v => v.classList.contains( this.CssClasses_.LOCK ) )) {
					this.sound.play( 'lock' );
				} else {
					this.sound.play( 'click' );
				}
			}
		} );

		document.addEventListener( 'mouseover', (e) => {
			const btn = this.findNode_( e );
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

	/**
	 * Registers triggers on hotkeys.
	 *
	 * @private
	 */
	triggers_() {
		document.addEventListener( 'keyup', (e) => {
			const hotkeys = Object.keys( this.CssIds_.HOTKEYS );
			const findKey = hotkeys.find( (v) => v === e.key && e.key.toLowerCase() );
			if (findKey) {
				if (this.bindedElem) {
					this.bindedElem.removeEventListener( 'click', this.bindedHandler );
				}
				document.getElementById( findKey ).closest( 'button' ).click();
			}
		} );
	}

	// Public methods.

	/**
	 * Makes a move by human.
	 *
	 * @param  {String} curr Human move.
	 * @param  {String} next Computer or human1 move.
	 * @param {Number} id Target cell identifier.
	 * @public
	 */
	doHuman(curr,next,id) {

		const h = handler.bind( this );

		/**
		 * Handler.
		 *
		 * @param  {Event} e The event that fired.
		 * @private
		 */
		function handler(e) {
			const target = e.target;
			const td = target.closest( 'td' );
			if (target.tagName === 'DIV' && td) {
				const indx = td.id;
				const ticked = this.tick( indx, this.tickType[curr] );
				if (ticked) {
					this.fieldElement.removeEventListener( 'click', h );

					const winnerComb = this.checkWinnerCombination_( false, curr );
					if (winnerComb) {
						this.actionsAfterPartiOver_( winnerComb.comb, winnerComb.axis )
							.then(
								result => {
									this.restartParti_()
										.then(
											result => {
												this.makeMove_();
											}
										);
								}
							);
					} else {
						if (this.players.player2 !== 'computer') {
							if (this.draw_()) {
								return;
							}
						}
						this.run = next;

						if (this.coins.compareRandomCoinIndex( indx )) {
							this.coins.setCoins( this.experience.expData.points, 1, true )
								.then(
									result => {
										this.makeMove_();
									}
								);
						} else {
							this.makeMove_();
						}

					}
				}
			}

		}

		if (this.run !== 'computer') {
			if (Number.isInteger( id ) && id >= 0 && id <= this.fieldSize - 1) {
				h( { target: document.getElementById( id ).firstElementChild } );
			} else {
				this.fieldElement.addEventListener( 'click', h );
			}
		}
	}


	/**
	 * Makes a move by computer.
	 *
	 * @public
	 */
	doComputer() {

		const result = this.analysis_();
		const n = result.cell - 1;

		this.computerMoveAnimation_(n)
			.then(
				res => {
					const ticked = this.tick( n, this.tickType[this.players.player2] );
					this.state = this.count === this.fieldSize && this.state !== 'win' ? 'draw' : this.state;
					if (this.state === 'win') {
						if (ticked) {
							this.actionsAfterPartiOver_( result.comb, result.axis )
								.then(
									result => {
										this.restartParti_()
											.then(
												result => {
													this.makeMove_();
												}
											);
									}
								)
						}
					} else if (this.state === 'draw') {
						this.count = this.fieldSize;
						this.draw_();
					} else {
						if (ticked) {
							setTimeout( () => {
								this.run = 'human';
								this.makeMove_();
							}, this.Constant_.TICK_TIMING );
						}
					}
				}
			);
	}

	/**
	 * Creates a tick.
	 *
	 * @param  {Number}  n Tick number.
	 * @param  {String}  type Tick view.
	 * @return {Boolean} If ticked.
	 * @public
	 */
	tick(n,type) {
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

	/**
	 * Display tick.
	 *
	 * @param  {Number} n Tick number.
	 * @param  {String} type Tick view.
	 * @public
	 */
	displayTick(n,type) {
		let tick = document.createElement( 'div' );
		tick.className = `${this.CssClasses_.TICK} ${this.CssClasses_.TICK}--${type}${this.getClassPickedChip( type )}`;
		this.fieldElement.querySelectorAll( 'td' )[n].firstElementChild.appendChild( tick );
	}

	/**
	 * Displays winner row.
	 *
	 * @param  {Array} arr Row combination of a parti winner.
	 * @param  {string} axis The axis of a parti winner.
	 * @public
	 */
	displayWinnerThrough(arr,axis) {
		for (let i = 0; i < arr.length; i++) {
			this.fieldElement.querySelectorAll( 'td' )[arr[i] - 1].classList.add( this.CssClasses_.WIN + '-' + axis );
		}
	}

	/**
	 * Toggles popup visibility.
	 *
	 * @param  {Element} elem Element to toggle visibility.
	 * @return {Boolean} When popup is displayed.
	 * @return {Promise} Promise when popup is closed.
	 * @public
	 */
	popupToggle(elem) {
		const flag = elem.dataset.flag;
		if (this[flag]) {
			elem.removeEventListener( 'click', this.bindedHandler );
			return new Promise( (resolve,reject) => {
				this[flag] = !this[flag];
				this.anim.animate( elem, 'fading_exits_0', undefined, undefined, true )
					.then(
						result => resolve()
					);
			} );
		} else {
			this.anim.animate( elem, 'fading_entrances_0', false, 0 );
			this[flag] = !this[flag];
			return true;
		}
	}

	/**
	 * Throws confetti.
	 *
	 * @param  {Element} el Element container for confetti.
	 * @param  {number} timing Timing when confetti will end.
	 * @return {Promise} Promise.
	 * @public
	 */
	throwConfetti(el,timing) {
		if (el) {
			const confetti = new Confetti( 'confetti', 150 );
			el.appendChild( confetti );
			return new Promise( (resolve,reject) => {
				setTimeout( _ => {
					confetti.remove();
					resolve();
				}, timing );
			} );
		}
		return false;
	}

	/**
	 * Initialize.
	 */
	init() {
		this.countAxesValues_();
		this.makeFieldCells_();
		return new Promise( (resolve,reject) => {
			this.pagination = new Pagination( this.statistics.data.length, this.statistics.limit );
			this.score = new Score( {
				players: this.players,
				names: this.names,
				playerFirstName: this.playerFirstName,
				playerSecondName: this.playerSecondName
			} );
			this.coins = new Coins( {
				fieldSize: this.fieldSize,
				mode: this.mode,
				sound: this.sound,
				anim: this.anim
			} );
			this.experience = new Experience( {
				mode: this.mode,
				coins: this.coins,
				sound: this.sound,
				anim: this.anim,
				names: this.names,
				playerFirstName: this.playerFirstName,
				playerSecondName: this.playerSecondName
			} );
			this.makeView_()
				.then(
					result => {
						this.coins.appendRandomCoin();
						this.soundOfButtons_();
						this.triggers_();
						this.registerCallPopups_();
						resolve();
					}
				);
		} );
	}

}

if (test) {
	const sound = new Sound();
	const anim = new Animation();

	const game = new Game( {
		sound: sound,
		anim: anim
	} );

	game.init()
		.then(
			result => game.makeMove_()
		);
}