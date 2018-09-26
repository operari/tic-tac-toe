class Game {
	constructor(options) {
		this.fieldSize = 9;
		this.run = 'computer';
		this.mode = 'training';
		this.parti = 3;
		this.store = {};
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
		this.__proto__.CssClasses_ = {
			FIELD: 'tttoe',
			CELL: 'tttoe__cell',
			TICK: 'tttoe__tick',
			STORE: 'tttoe__store',
			WIN: 'tttoe__cell--winner',
			HIDDEN: 'is-hidden',
			FADEIN_DEF: 'fadeInDef',
			MSG: 'message',
			AVATAR: 'tttoe__avatar',
			SHAKE: 'shake'
		};
		this.__proto__.CssIds_ = {
			APP: 'game',
			CURSOR: 'comp_cursor',
			CONTAINER: 'container',
			MSG: 'message'
		};
		this.__proto__.Constant_ = {
			RESTART_TIMING: 2000,
			CONFETTI_TIMING: 5000,
			TICK_TIMING: 500,
			MSG_ANIM_TIMING: 1500
		};
		Object.assign( this, options );
		this.partiRun = this.run;
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
			arr = arr.slice( 0 ).sort( (a, b) => a % sqrt - b % sqrt );
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

	computeCells(matrix, mult = true) {
		matrix.forEach( function(v,i,arr) {
			let row = [];
			(function rec(arr) {
				arr.reduce(function(a,b,i,arr) {

					if (arr.length > 1) {
						row.push( mult ? a * b : a + b );
					}

					if (b === arr[arr.length - 1]) {
						arr.shift();
						rec( arr );
					}

					return a;
				});
			})( v );
			arr[i] = row;
		} );
	}

	sumAxissRows(matrix) {
		return matrix.map( function(arr) {
			const sum = arr.reduce( (a, b) => a + b ),
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

				let inner = document.createElement('div');
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

	makeView() {
		const html = `
			<div id="status" class="tttoe__status">
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
			<div id="comp_cursor" class="tttoe__computer-cursor is-hidden"></div>
			<div id="message" class="tttoe__message animated animated--msg"></div>`;

		const field = this.makeViewField();

		return new Promise( (resolve,reject) => {
			var loadDom = (e) => {
				this.fieldElement = document.getElementById( this.CssIds_.APP );
				this.fieldElement.innerHTML += html;
				this.fieldElement.appendChild( field );
				this.showView();
				resolve();
			}

			if (document.readyState === 'complete') {
				loadDom();
			} else {
				document.addEventListener( 'DOMContentLoaded', loadDom );
			}

		} );
	}

	showView() {
		const container = document.getElementById( this.CssIds_.CONTAINER );
		container.classList.toggle( this.CssClasses_.HIDDEN );
		container.classList.toggle( this.CssClasses_.FADEIN_DEF );
	}

	makeMove() {
		switch(this.mode) {
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

		var highlight = (id, add = true) => {
			const elem = document.getElementById( id ).querySelector( '.' + this.CssClasses_.AVATAR );
			elem.classList[add ? 'add' : 'remove']( this.CssClasses_.AVATAR + '--highlight' );
		};

		let i = values.findIndex( v => v === this.run );
		highlight( props[i] );

		i = values.findIndex( v => v !== this.run );
		highlight( props[i], false );

	}

	actionsAfterWin(comb,axis) {
		this.setStore();
		this.displayWinner( comb, axis );
		this.switchPartiPlayer();
		const winnerName = this.getPartiWinner();
		this.displayMessage( winnerName );
		if (winnerName) {
			const loserName = this.getPartiLoser( winnerName );
			const winnerId = this.getPlayerId( winnerName );
			const loserId = this.getPlayerId( loserName );
			this.throwConfetti( document.getElementById( winnerId ), this.Constant_.CONFETTI_TIMING );
			this.animate( document.getElementById( loserId ).querySelector( '.' + this.CssClasses_.AVATAR ), this.CssClasses_.SHAKE, this.Constant_.RESTART_TIMING );
		}
	}

	doHuman(curr,next) {
		this.highlightMove();

		const h = handler.bind( this );

		function handler(e) {
			const target = e.target;

			if (target.tagName === 'DIV') {
				const indx = target.closest('td').id;
				const ticked = this.tick( indx, this.tickType[curr] );
				if (ticked) {
					this.fieldElement.removeEventListener( 'click', h );

					const winnerComb = this.checkWinnerCombination( false, curr );
					if (winnerComb) {
						this.actionsAfterWin( winnerComb.comb, winnerComb.axis );
						this.restartMove()
							.then(
								result => {
									this.makeMove();
								}
							);
					} else {
						if (this.players.player2 !== 'computer') {
							if (this.draw()) {
								return;
							}
						}
						this.run = next;
						this.makeMove();
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
							this.actionsAfterWin( result.comb, result.axis );
							this.restartMove()
								.then(
									result => {
										this.makeMove();
									}
								);
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

	tick(n, type, tick = true) {
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

	analysis() {
		let result = {};
		if (this.count < 2) {
			let ticked = false,
				n;
			do {
				n = this.getRandomInt( 0, this.fieldSize );
				ticked = this.isTickedCell( n );
			} while(ticked === true);
			result.cell = n + 1;
		} else {
			const o =  this.filterCells();
			const resultCompareComputer = this.makePotentialCells( o.emptyCells, o.computerCells, 'computer' );
			const resultCompareHuman = this.makePotentialCells( o.emptyCells, o.humanCells, 'human' );

			if (resultCompareComputer.cell) {
				this.state = 'win';
				result = resultCompareComputer;
			} else if (resultCompareHuman.cell) {
				result.cell = resultCompareHuman.cell;
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

	doTestTick(cell, player, test = true) {
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
		str = str === 'z' && arr.some( v => v === 3 ) ?  str + '-45' : str
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
		typeof( this.store[this.run] ) === 'number' ? this.store[this.run] += 1 : this.store[this.run] = 1;
		this.displayStore();
	}

	getPartiWinner() {
		const stores = Object.values( this.store );
		const sum = stores.reduce( (a,b) => a + b );

		if (sum === this.parti) {
			this.sound.play( 'win' );
			const n = Math.max.apply( null, stores );
			let i = stores.findIndex( v => v === n );
			const winner = Object.keys( this.store )[i];
			const prop = this.getPlayerId( winner );

			setTimeout( () => {
				this.resetStores();
			}, this.Constant_.RESTART_TIMING );

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

	animate(el,cls,timing,del=true) {
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

	resetStores() {
		this.store = {};
		const stores = document.querySelectorAll( '.' + this.CssClasses_.STORE  );

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
		let tick = document.createElement('div');
		tick.className = 'tttoe__tick tttoe__tick--' + this.tickType[this.run];
		this.fieldElement.querySelectorAll( 'td' )[n].firstElementChild.appendChild( tick );
	}

	displayWinner(arr,axis) {
		for (let i = 0; i < arr.length; i++) {
			this.fieldElement.querySelectorAll( 'td' )[arr[i] - 1].classList.add( this.CssClasses_.WIN + '-' + axis );
		}
		console.log( 'Winner is: ' + this.run );
		setTimeout(function() {
			// window.location.reload();
		}, 2000);
	}

	displayMessage(str) {
		if (str) {
			const elem = document.getElementById( this.CssIds_.MSG );
			elem.classList.add( this.CssClasses_.MSG );
			let msg = 'Выиграл';

			switch(str) {
				case 'human':
					msg += this.playerFirstName === 'Вы' ? 'и ' + this.playerFirstName : ' ' + this.playerFirstName;
					break;
				case 'draw':
					msg = 'Ничья';
					break;
				default:
					msg += ' ' + this.names[this.run];
			}

			elem.textContent = msg + '!';

			setTimeout( () => {
				elem.classList.remove( this.CssClasses_.MSG );
			}, this.Constant_.MSG_ANIM_TIMING );

		}
	}

	restartMove() {
		return new Promise( (resolve,reject) => {
			setTimeout( () => {
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

				resolve();
			}, this.Constant_.RESTART_TIMING );
		} );
	}

	draw() {
		if (this.count === this.fieldSize) {
			this.sound.play( 'draw' );
			this.displayMessage( 'draw' );
			this.switchPartiPlayer();
			this.restartMove()
				.then(
					result => {
						this.makeMove();
					}
				);
			return true;
		}
		return false;
	}

	computerMoveAnimation(id) {
		return new Promise( (resolve,reject) => {
			if (id >= 0) {
				const cell = document.getElementById(id);
				const cellCenter = cell.offsetWidth / 2;
				const cursor = document.getElementById(this.CssIds_.CURSOR);
				const positionTop = cell.offsetTop + cellCenter - cursor.offsetTop - cursor.offsetHeight + 'px';
				// const positionLeft = cell.offsetLeft + cellCenter - cursor.offsetLeft + 'px';
				const positionLeft = cursor.offsetLeft - cell.offsetLeft - cellCenter + 'px';

				cursor.classList.remove(this.CssClasses_.HIDDEN);
				cursor.style.top = positionTop;
				cursor.style.right = positionLeft;
				setTimeout( () => {
					cursor.classList.add(this.CssClasses_.HIDDEN);
					cursor.style.top = '';
					cursor.style.right = '';
					resolve();
				}, 1000 );
			} else {
				resolve();
			}
		} );
	}

	init() {
		this.countAxesValues();
		this.makeFieldCells();
		return new Promise( (resolve,reject) => {
			this.makeView()
				.then(
					result => resolve()
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
				throw new Error('The array does not have a suitable length!');
			}
			unique = this[0];
		}
		return unique;
	}
}


// const sound = new Sound();

// const game = new Game( { sound: sound } );

// game.init()
// 	.then(
// 		result => game.makeMove()
// 	);
