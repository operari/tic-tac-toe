class Game {
	constructor() {
		this.fieldSize = 9;
		this.run = 'human';
		this.tickType = {
			human: 'cross',
			computer: 'nil'
		},
		this.numberingAxes = {};
		this.multiplyingAxes = {};
		this.additionAxes = {};
		this.fieldCells = {};
		this.count = 0;
		this.state = '';
		this.__proto__.CssClasses_ = {
			field: 'tttoe',
			cell: 'tttoe__cell',
			win: 'tttoe__cell--winner',
			hidden: 'is-hidden'
		},
		this.__proto__.CssIds_ = {
			app: 'game',
			cursor: 'comp_cursor'
		}
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

	makeView() {
		const field = document.createElement( 'table' );
		const sqrt = Math.sqrt( this.fieldSize );

		for (let i = 0; i < sqrt; i++) {
			let row = document.createElement( 'tr' );

			for (let n = 0; n < sqrt; n++) {
				let cell = document.createElement( 'td' );
				cell.className = this.CssClasses_.cell;
				cell.id = sqrt * i + n;

				let inner = document.createElement('div');
				inner.className = this.CssClasses_.field + '__inner';

				cell.appendChild( inner );
				row.appendChild( cell );
			}


			field.appendChild( row );
		}

		field.className = this.CssClasses_.field;

		const compCursor = document.createElement('div');
		compCursor.id = 'comp_cursor';
		compCursor.className = 'tttoe__computer-cursor is-hidden';

		return new Promise( (resolve,reject) => {
			document.addEventListener( 'DOMContentLoaded', (e) => {
				this.fieldElement = document.getElementById( this.CssIds_.app );
				this.fieldElement.appendChild( compCursor );
				this.fieldElement.appendChild( field );
				resolve();
			} );
		} );

	}

	makeMove() {
		if (this.run === 'human') {
			this.doHuman();
		} else {
			this.doComputer();
		}
	}

	doHuman() {
		const h = handler.bind( this );

		function handler(e) {
			const target = e.target;

			if (target.tagName === 'DIV') {
				const indx = target.closest('td').id;

				const ticked = this.tick( indx, this.tickType['human'] );
				if (ticked) {
					this.fieldElement.removeEventListener( 'click', h );

					const winnerComb = this.checkWinnerCombination( false, 'human' );
					if (winnerComb) {
						this.displayWinner( winnerComb.comb, winnerComb.axis );
					} else {
						// this.draw();
						this.run = 'computer';
						this.makeMove();
					}
				}
			}

		}

		if (this.run === 'human') {
			this.fieldElement.addEventListener( 'click', h );
		}
	}

	doComputer() {
		const result = this.analysis();
		const n = result.cell - 1;

		this.computerMoveAnimation(n)
			.then(
				res => {
					const ticked = this.tick( n, this.tickType[this.run] );
					this.state = this.count === this.fieldSize ? 'draw' : this.state;

					if (this.state === 'win') {
						if (ticked) {
							this.displayWinner( result.comb, result.axis );
						}
					} else if (this.state === 'draw') {
						this.count = this.fieldSize;
						this.draw();
					} else {
						if (ticked) {
							setTimeout( () => {
								this.run = 'human';
								this.makeMove();
							}, 500 );
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

			this.count++;

			return true;
		}

		return false;
	}

	checkWinnerCombination(axis,tickType) {
		const comb = Array.from( this.fieldCells ).filter( o => o.ticked && o.tickType === this.tickType[tickType] ).map( o => o.position );

		if (axis) {
			const matrix = this.numberingAxes[axis];
			return findCombRow( matrix );
		} else {
			const axiss = [];
			const finded = [];
			for (let prop in this.numberingAxes) {
				const matrix = this.numberingAxes[prop];
				finded.push( findCombRow( matrix ) );
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

	getRandomInt(min,max) {
		return Math.floor( Math.random() * (max - min) ) + min;
	}

	displayTick(n,type) {
		let tick = document.createElement('div');
		tick.className = 'tttoe__tick tttoe__tick--' + this.tickType[this.run];
		this.fieldElement.querySelectorAll( 'td' )[n].firstElementChild.appendChild( tick );
	}

	displayWinner(arr,axis) {
		for (let i = 0; i < arr.length; i++) {
			this.fieldElement.querySelectorAll( 'td' )[arr[i] - 1].classList.add( this.CssClasses_.win + '-' + axis );
		}
		console.log( 'Winner is: ' + this.run );
		setTimeout(function() {
			window.location.reload();
		}, 2000);
	}

	draw() {
		if (this.count === this.fieldSize) {
			setTimeout(function() {
				window.location.reload();
			}, 2000);
			console.log('Draw!');
		}
	}

	computerMoveAnimation(id) {
		return new Promise( (resolve,reject) => {
			if (id >= 0) {
				const cell = document.getElementById(id);
				const cellCenter = cell.offsetWidth / 2;
				const cursor = document.getElementById(this.CssIds_.cursor);
				const positionTop = cell.offsetTop + cellCenter - cursor.offsetTop - cursor.offsetHeight + 'px';
				const positionLeft = cell.offsetLeft + cellCenter - cursor.offsetLeft + 'px';

				cursor.classList.remove(this.CssClasses_.hidden);
				cursor.style.top = positionTop;
				cursor.style.left = positionLeft;
				setTimeout( () => {
					cursor.classList.add(this.CssClasses_.hidden);
					cursor.style.top = '';
					cursor.style.left = '';
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


const game = new Game();

game.init()
	.then(
		result => game.makeMove()
	);
