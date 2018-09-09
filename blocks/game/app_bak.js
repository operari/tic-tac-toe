class App {
	constructor() {
		this.fieldSize = 9;
		this.run = 'computer';
		this.tickType = {
			human: 'cross',
			computer: 'nil'
		},
		this.axissDefault= {};
		this.axiss = {};
		this.axissValues = {};
		this.field = {};
		this.count = 0;
		this.__proto__.CssClasses_ = {
			field: 'tttoe',
			cell: 'tttoe__cell',
			win: 'tttoe__cell--winner'
		},
		this.__proto__.CssIds_ = {
			app: 'app'
		}
	}

	init() {
		this.countAxiss().doMatrix(this.fieldSize);
		this.makeField();
		return new Promise( (resolve, reject) => {
			this.makeView()
				.then(
					result => resolve()
				);
		} );
	}

	makeField() {
		for (let i = 0; i < this.fieldSize; i++) {
			this.field[i] = {
				ticked: false,
				tickType: '',
				index: i + 1
			}
		}
		this.field.length = this.fieldSize;
	}

	countAxiss() {
		const self = this;
		return {
			doCells(len) {
				const cells = [];

				for (let i = 1; i <= len; i++) {
					cells.push(i);
				}

				return cells;
			},
			doMatrix(fieldSize) {
				const axiss = ['x', 'y', 'z'];
				const cells = this.doCells(fieldSize);
				const sqrt = Math.sqrt(fieldSize);

				for (let i = 0; i < axiss.length; i++) {
					let matrix = this.pushCells(cells, sqrt, axiss[i]);
					self.axissDefault[axiss[i]] = matrix;

					let matrix1 = this.pushCells(cells, sqrt, axiss[i]);
					this.computeCells(matrix1);
					self.axiss[axiss[i]] = matrix1.reduce( (a, b) => a.concat(b) );

					let matrix2 = this.pushCells(cells, sqrt, axiss[i]);
					self.axissValues[axiss[i]] = this.sumAxissRows(matrix2);
					this.computeCells(matrix2, false);
					self.axissValues[axiss[i]].forEach( (v, i) => v[Object.keys(v)[0]] = matrix2[i] );
				}

			},
			pushCells(arr, sqrt, axis) {

				const matrix = [];
				let row = [];

				function rec(n, matrix, row) {
					matrix = matrix || [];
					n = n;
					row = row;

					for (let i = 1; i <= arr.length; i++) {
						if (i % sqrt === 1) {
							row.push(i + (!matrix.length ? n++ : n--) );
						}
					}

					matrix.push(row);

					if (matrix.length === 1) {
						return rec(sqrt - 1, matrix, []);
					} else {
						return matrix;
					}
				}

				if (axis === 'z') {
					return rec(0, matrix, row);
				}

				if (axis === 'y') {
					arr = arr.slice(0).sort( (a, b) => a % sqrt - b % sqrt );
				}

				for (let i = 1; i <= arr.length; i++) {
					row.push(arr[i - 1]);
					if (!(i % sqrt)) {
						matrix.push(row);
						row = [];
					}
				}

				return matrix;
			},
			computeCells(matrix, mult = true) {
				matrix.forEach(function(v, i, arr) {
					let row = [];
					(function rec(arr) {
						arr.reduce(function(a, b, i, arr) {

							if (arr.length > 1) {
								row.push(mult ? a * b : a + b);
							}

							if (b === arr[arr.length - 1]) {
								arr.shift();
								rec(arr);
							}

							return a;
						});
					})(v);
					arr[i] = row;
				});
			},
			sumAxissRows(matrix) {
				return matrix.map(function(arr) {
					const sum = arr.reduce( (a, b) => a + b ), o = {};
					o[sum] = [];
					return o;
				});
			}
		}
	}

	makeView() {
		const field = document.createElement('table');
		const sqrt = Math.sqrt(this.fieldSize);

		for (let i = 0; i < sqrt; i++) {
			let row = document.createElement('tr');

			for (let n = 0; n < sqrt; n++) {
				let cell = document.createElement('td');
				cell.className = this.CssClasses_.cell;
				cell.id = sqrt * i + n;

				row.appendChild(cell);
			}


			field.appendChild(row);
		}

		field.className = this.CssClasses_.field;

		return new Promise( (resolve, reject) => {
			document.addEventListener('DOMContentLoaded', (e) => {
				this.fieldElement = document.getElementById(this.CssIds_.app);
				this.fieldElement.appendChild(field);
				resolve();
			});
		} );

	}

	view(n, type) {
		this.fieldElement.querySelectorAll('td')[n].textContent = type === 'cross' ? 'x' : '0';
	}

	getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	winner(arr, axis) {
		for (let i = 0; i < arr.length; i++) {
			this.fieldElement.querySelectorAll('td')[arr[i] - 1].classList.add(this.CssClasses_.win + '-' + axis);
		}
		console.log('Winner is: ' + this.run);
		window.location.reload();
	}

	draw() {
		if (this.count === this.fieldSize) {
			window.location.reload();
		}
	}

	checkWinnerCombination(axis, tickType) {
		const comb = Array.from(this.field).filter(o => o.ticked && o.tickType === this.tickType[tickType]).map(o => o.index);

		if (axis) {
			const matrix = this.axissDefault[axis];
			return findCombRow(matrix);
		} else {
			const axiss = [];
			const finded = [];
			for (let prop in this.axissDefault) {
				const matrix = this.axissDefault[prop];
				finded.push(findCombRow(matrix));
				axiss.push(prop);
			}
			const findedIndex = finded.findIndex(a => a.length);
			if (~findedIndex) {
				return {
					comb: finded[findedIndex],
					axis: axiss[findedIndex] === 'z' && finded[findedIndex].some(v => v === 3) ?  axiss[findedIndex] + '-45' : axiss[findedIndex]
				}
			}
		}

		function findCombRow(matrix) {
			for (let i = 0; i < matrix.length; i++) {
				const row = matrix[i];
				let identicallyRow = false;
				if (comb.length === row.length) {
					identicallyRow = comb.every( a => row.some(b => a === b ) );
				} else {
					if (comb.length > row.length) {
						identicallyRow = row.every( a => comb.some(b => a === b ) );
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
		const self = this;
		return {
			do() {
				return this.filterCells();
			},
			filterCells() {
				const field = Array.from(self.field);
				const emptyCells = field.filter(o => !o.ticked);
				const humanCells = field.filter(o => o.tickType === self.tickType['human']);
				const computerCells = field.filter(o => o.tickType === self.tickType['computer']);

				const resultCompareComputer = this.makePotentialCells(emptyCells, computerCells, 'computer');
				var cell = 0;

				if (!resultCompareComputer.length && resultCompareComputer.cell) {
					return resultCompareComputer;
				} else {
					const resultCompareHuman = this.makePotentialCells(emptyCells, humanCells, 'human');

					if (!resultCompareHuman.length && !resultCompareComputer.length) {
						return emptyCells[0] && emptyCells[0].index;
					}

					if (!resultCompareHuman.length) {
						cell = resultCompareHuman.cell;
						// cell = this.chooseRandomCell(resultCompareComputer);
						// console.log('CELL HUMAN WIN COMBINATION: ' + cell);
					} else {
						if (resultCompareComputer.length) {
							cell = this.chooseRandomCell(resultCompareComputer);
						} else {
							cell = -1;
						}
					}

				}

				return cell;

			},
			chooseRandomCell(potentialCells) {
				/**

					TODO:
					- Make uniq method

				 */

				potentialCells = potentialCells.reduce((a, b) => a.concat(b)).sort((a, b) => a - b);
				let potentialCellsUniq = [];
				if (potentialCells.length > 1) {
					potentialCells.reduce((a, b, i, arr) => {
						if (a - b) {
							potentialCellsUniq.push(a);
							if (arr.length -1 === i) {
								potentialCellsUniq.push(b);
							}
						}
						if (arr.length === 2) {
							potentialCellsUniq.push(b);
						}
						return b;
					});
				} else {
					potentialCellsUniq = potentialCells[0];
				}

				const n = self.getRandomInt(0, potentialCellsUniq.length);
				const cell = potentialCellsUniq[n];

				return cell;
			},
			makePotentialCells(emptyCells, playerCells, player) {

				let potentialCells = [];
				for (let i = 0; i < emptyCells.length; i++) {
					const trying = this.getPlayerPotentialCells(emptyCells[i].index, playerCells, player);
					if (trying) {
						if (typeof(trying) === 'object' && trying[0]) {
							potentialCells.push(trying);
						} else {
							return trying;
						}
					}
				}
				return potentialCells;
			},
			getPlayerPotentialCells(emptyCell, compareCells, player) {
				const playerPotencialCells = [];
				for (let i = 0; i < compareCells.length; i++) {
					const compareCell = compareCells[i].index;
					const axisMultiply = compareCell * emptyCell;
					const axis = this.getAxis(axisMultiply);
					if (axis) {
						const axisAddition = compareCell + emptyCell;
						const potentialCell = this.getPotentialCell(axis, axisAddition);
						const potentialCellObj = self.field[potentialCell.findedCell - 1];
						if (potentialCell) {

							if (potentialCellObj.ticked) {
								if (potentialCellObj.tickType === self.tickType[player]) {
									const testTicked = this.testTick(emptyCell, true, player);
									if (testTicked) {
										const winnerComb = self.checkWinnerCombination(axis, player);
										this.testTick(emptyCell, false);
										if (winnerComb) {
											return {
												cell: emptyCell,
												comb: winnerComb,
												axis: axis === 'z' && winnerComb.some(v => v === 3) ?  axis + '-45' : axis
											}
										}
									}
								}
							} else {
								playerPotencialCells.push(potentialCell.findedCell);
							}
						}
					}
				}
				return playerPotencialCells.length ? playerPotencialCells : false;
			},
			getPotentialCell(axis, sumCells) {
				const axisValues = self.axissValues[axis];

				for (let i = 0; i < axisValues.length; i++) {
					const propAxisSumRow = Object.keys(axisValues[i])[0];
					const valuesAxisRow = axisValues[i][propAxisSumRow];
					const find = valuesAxisRow.some(v => v === sumCells);
					if (find) {
						const findedCell = propAxisSumRow - sumCells;
						return {
							propAxisSumRow: propAxisSumRow,
							findedCell: findedCell
						};
					}
				}

				return false;

			},
			testTick(cell, test = true, player) {
				const n = cell - 1;

				if (test) {
					self.field[n].ticked = true;
					self.field[n].tickType = self.tickType[player];
					return true;
				}

				self.field[n].ticked = false;
				self.field[n].tickType = '';
				return false;

			},
			getAxis(n) {
				for (let axis in self.axiss) {
					const val = self.axiss[axis];
					const find = val.some(v => v === n);

					if (find) {
						return axis;
					}

				}

				return false;

			}
		}
	}

	doRun() {
		const self = this;
		return {
			run() {
				if (self.run === 'human') {
					this.doHuman();
				} else {
					this.doComputer();
				}
			},
			doHuman() {
				const h = handler.bind(this);

				function handler(e) {
					const target = e.target;

					if (target.tagName === 'TD') {
						const indx = target.id;

						const ticked = this.tick(indx, true, self.tickType['human']);
						if (ticked) {
							self.fieldElement.removeEventListener('click', h);

							const winnerComb = self.checkWinnerCombination(false, 'human');
							if (winnerComb) {
								self.winner(winnerComb.comb, winnerComb.axis);

								return;
							}
							self.draw();
							self.run = 'computer';
							this.run();
						}
					}

				}

				self.fieldElement.addEventListener('click', h);
			},
			doComputer() {
				if (self.count < 2) {
					let ticked = false;
					do {
						const n = self.getRandomInt(0, self.fieldSize);
						ticked = this.tick(n, true, self.tickType['computer']);

						self.run = 'human';
						this.run();
					} while(ticked === false)
				} else {
					const result = self.analysis().do();

					if (result) {
						if (typeof(result) === 'number') {
							if (result === -1) {
								self.count = self.fieldSize;
								self.draw();
							}
							const n = result - 1;
							const ticked = this.tick(n, true, self.tickType[self.run]);
							if (ticked) {
								self.draw();
								self.run = 'human';
								this.run();
							}

						} else {
							const n = result.cell - 1;
							const ticked = this.tick(n, true, self.tickType[self.run]);

							if (ticked) {
								self.winner(result.comb, result.axis);
								return;
							}
						}
					}

				}
			},
			tick(n, tick, type) {
				if (!self.field[n].ticked) {
					self.field[n].ticked = tick;
					self.field[n].tickType = type;
					self.view(n, type);

					self.count++;

					return true;
				}

				return false;
			}
		}
	}

}

const app = new App();
app.init()
	.then(
		function fulfilled(contens) {
			app.doRun().run();
		}
	);
