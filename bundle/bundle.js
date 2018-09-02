'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
	function App() {
		_classCallCheck(this, App);

		this.fieldSize = 9;
		this.run = 'computer';
		this.tickType = {
			human: 'cross',
			computer: 'nil'
		}, this.axissDefault = {};
		this.axiss = {};
		this.axissValues = {};
		this.field = {};
		this.count = 0;
		this.__proto__.CssClasses_ = {
			field: 'tttoe',
			cell: 'tttoe__cell',
			win: 'tttoe__cell--winner'
		}, this.__proto__.CssIds_ = {
			app: 'app'
		};
	}

	_createClass(App, [{
		key: 'init',
		value: function init() {
			var _this = this;

			this.countAxiss().doMatrix(this.fieldSize);
			this.makeField();
			return new Promise(function (resolve, reject) {
				_this.makeView().then(function (result) {
					return resolve();
				});
			});
		}
	}, {
		key: 'makeField',
		value: function makeField() {
			for (var i = 0; i < this.fieldSize; i++) {
				this.field[i] = {
					ticked: false,
					tickType: '',
					index: i + 1
				};
			}
			this.field.length = this.fieldSize;
		}
	}, {
		key: 'countAxiss',
		value: function countAxiss() {
			var self = this;
			return {
				doCells: function doCells(len) {
					var cells = [];

					for (var i = 1; i <= len; i++) {
						cells.push(i);
					}

					return cells;
				},
				doMatrix: function doMatrix(fieldSize) {
					var _this2 = this;

					var axiss = ['x', 'y', 'z'];
					var cells = this.doCells(fieldSize);
					var sqrt = Math.sqrt(fieldSize);

					var _loop = function _loop(i) {
						var matrix = _this2.pushCells(cells, sqrt, axiss[i]);
						self.axissDefault[axiss[i]] = matrix;

						var matrix1 = _this2.pushCells(cells, sqrt, axiss[i]);
						_this2.computeCells(matrix1);
						self.axiss[axiss[i]] = matrix1.reduce(function (a, b) {
							return a.concat(b);
						});

						var matrix2 = _this2.pushCells(cells, sqrt, axiss[i]);
						self.axissValues[axiss[i]] = _this2.sumAxissRows(matrix2);
						_this2.computeCells(matrix2, false);
						self.axissValues[axiss[i]].forEach(function (v, i) {
							return v[Object.keys(v)[0]] = matrix2[i];
						});
					};

					for (var i = 0; i < axiss.length; i++) {
						_loop(i);
					}
				},
				pushCells: function pushCells(arr, sqrt, axis) {

					var matrix = [];
					var row = [];

					function rec(n, matrix, row) {
						matrix = matrix || [];
						n = n;
						row = row;

						for (var i = 1; i <= arr.length; i++) {
							if (i % sqrt === 1) {
								row.push(i + (!matrix.length ? n++ : n--));
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
						arr = arr.slice(0).sort(function (a, b) {
							return a % sqrt - b % sqrt;
						});
					}

					for (var i = 1; i <= arr.length; i++) {
						row.push(arr[i - 1]);
						if (!(i % sqrt)) {
							matrix.push(row);
							row = [];
						}
					}

					return matrix;
				},
				computeCells: function computeCells(matrix) {
					var mult = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

					matrix.forEach(function (v, i, arr) {
						var row = [];
						(function rec(arr) {
							arr.reduce(function (a, b, i, arr) {

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
				sumAxissRows: function sumAxissRows(matrix) {
					return matrix.map(function (arr) {
						var sum = arr.reduce(function (a, b) {
							return a + b;
						}),
						    o = {};
						o[sum] = [];
						return o;
					});
				}
			};
		}
	}, {
		key: 'makeView',
		value: function makeView() {
			var _this3 = this;

			var field = document.createElement('table');
			var sqrt = Math.sqrt(this.fieldSize);

			for (var i = 0; i < sqrt; i++) {
				var row = document.createElement('tr');

				for (var n = 0; n < sqrt; n++) {
					var cell = document.createElement('td');
					cell.className = this.CssClasses_.cell;
					cell.id = sqrt * i + n;

					row.appendChild(cell);
				}

				field.appendChild(row);
			}

			field.className = this.CssClasses_.field;

			return new Promise(function (resolve, reject) {
				document.addEventListener('DOMContentLoaded', function (e) {
					_this3.fieldElement = document.getElementById(_this3.CssIds_.app);
					_this3.fieldElement.appendChild(field);
					resolve();
				});
			});
		}
	}, {
		key: 'view',
		value: function view(n, type) {
			this.fieldElement.querySelectorAll('td')[n].textContent = type === 'cross' ? 'x' : '0';
		}
	}, {
		key: 'getRandomInt',
		value: function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min)) + min;
		}
	}, {
		key: 'winner',
		value: function winner(arr, axis) {
			for (var i = 0; i < arr.length; i++) {
				this.fieldElement.querySelectorAll('td')[arr[i] - 1].classList.add(this.CssClasses_.win + '-' + axis);
			}
			console.log('Winner is: ' + this.run);
			window.location.reload();
		}
	}, {
		key: 'draw',
		value: function draw() {
			if (this.count === this.fieldSize) {
				window.location.reload();
			}
		}
	}, {
		key: 'checkWinnerCombination',
		value: function checkWinnerCombination(axis, tickType) {
			var _this4 = this;

			var comb = Array.from(this.field).filter(function (o) {
				return o.ticked && o.tickType === _this4.tickType[tickType];
			}).map(function (o) {
				return o.index;
			});

			if (axis) {
				var matrix = this.axissDefault[axis];
				return findCombRow(matrix);
			} else {
				var axiss = [];
				var finded = [];
				for (var prop in this.axissDefault) {
					var _matrix = this.axissDefault[prop];
					finded.push(findCombRow(_matrix));
					axiss.push(prop);
				}
				var findedIndex = finded.findIndex(function (a) {
					return a.length;
				});
				if (~findedIndex) {
					return {
						comb: finded[findedIndex],
						axis: axiss[findedIndex] === 'z' && finded[findedIndex].some(function (v) {
							return v === 3;
						}) ? axiss[findedIndex] + '-45' : axiss[findedIndex]
					};
				}
			}

			function findCombRow(matrix) {
				var _loop2 = function _loop2(i) {
					var row = matrix[i];
					var identicallyRow = false;
					if (comb.length === row.length) {
						identicallyRow = comb.every(function (a) {
							return row.some(function (b) {
								return a === b;
							});
						});
					} else {
						if (comb.length > row.length) {
							identicallyRow = row.every(function (a) {
								return comb.some(function (b) {
									return a === b;
								});
							});
						}
					}
					if (identicallyRow) {
						return {
							v: row
						};
					}
				};

				for (var i = 0; i < matrix.length; i++) {
					var _ret2 = _loop2(i);

					if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
				}
				return false;
			}
		}
	}, {
		key: 'analysis',
		value: function analysis() {
			var self = this;
			return {
				do: function _do() {
					return this.filterCells();
				},
				filterCells: function filterCells() {
					var field = Array.from(self.field);
					var emptyCells = field.filter(function (o) {
						return !o.ticked;
					});
					var humanCells = field.filter(function (o) {
						return o.tickType === self.tickType['human'];
					});
					var computerCells = field.filter(function (o) {
						return o.tickType === self.tickType['computer'];
					});

					var resultCompareComputer = this.makePotentialCells(emptyCells, computerCells, 'computer');
					var cell = 0;

					if (!resultCompareComputer.length && resultCompareComputer.cell) {
						return resultCompareComputer;
					} else {
						var resultCompareHuman = this.makePotentialCells(emptyCells, humanCells, 'human');

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
				chooseRandomCell: function chooseRandomCell(potentialCells) {
					/**
     			TODO:
     	- Make uniq method
     		 */

					potentialCells = potentialCells.reduce(function (a, b) {
						return a.concat(b);
					}).sort(function (a, b) {
						return a - b;
					});
					var potentialCellsUniq = [];
					if (potentialCells.length > 1) {
						potentialCells.reduce(function (a, b, i, arr) {
							if (a - b) {
								potentialCellsUniq.push(a);
								if (arr.length - 1 === i) {
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

					var n = self.getRandomInt(0, potentialCellsUniq.length);
					var cell = potentialCellsUniq[n];

					return cell;
				},
				makePotentialCells: function makePotentialCells(emptyCells, playerCells, player) {

					var potentialCells = [];
					for (var i = 0; i < emptyCells.length; i++) {
						var trying = this.getPlayerPotentialCells(emptyCells[i].index, playerCells, player);
						if (trying) {
							if ((typeof trying === 'undefined' ? 'undefined' : _typeof(trying)) === 'object' && trying[0]) {
								potentialCells.push(trying);
							} else {
								return trying;
							}
						}
					}
					return potentialCells;
				},
				getPlayerPotentialCells: function getPlayerPotentialCells(emptyCell, compareCells, player) {
					var playerPotencialCells = [];
					for (var i = 0; i < compareCells.length; i++) {
						var compareCell = compareCells[i].index;
						var axisMultiply = compareCell * emptyCell;
						var axis = this.getAxis(axisMultiply);
						if (axis) {
							var axisAddition = compareCell + emptyCell;
							var potentialCell = this.getPotentialCell(axis, axisAddition);
							var potentialCellObj = self.field[potentialCell.findedCell - 1];
							if (potentialCell) {

								if (potentialCellObj.ticked) {
									if (potentialCellObj.tickType === self.tickType[player]) {
										var testTicked = this.testTick(emptyCell, true, player);
										if (testTicked) {
											var winnerComb = self.checkWinnerCombination(axis, player);
											this.testTick(emptyCell, false);
											if (winnerComb) {
												return {
													cell: emptyCell,
													comb: winnerComb,
													axis: axis === 'z' && winnerComb.some(function (v) {
														return v === 3;
													}) ? axis + '-45' : axis
												};
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
				getPotentialCell: function getPotentialCell(axis, sumCells) {
					var axisValues = self.axissValues[axis];

					for (var i = 0; i < axisValues.length; i++) {
						var propAxisSumRow = Object.keys(axisValues[i])[0];
						var valuesAxisRow = axisValues[i][propAxisSumRow];
						var find = valuesAxisRow.some(function (v) {
							return v === sumCells;
						});
						if (find) {
							var findedCell = propAxisSumRow - sumCells;
							return {
								propAxisSumRow: propAxisSumRow,
								findedCell: findedCell
							};
						}
					}

					return false;
				},
				testTick: function testTick(cell) {
					var test = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
					var player = arguments[2];

					var n = cell - 1;

					if (test) {
						self.field[n].ticked = true;
						self.field[n].tickType = self.tickType[player];
						return true;
					}

					self.field[n].ticked = false;
					self.field[n].tickType = '';
					return false;
				},
				getAxis: function getAxis(n) {
					for (var axis in self.axiss) {
						var val = self.axiss[axis];
						var find = val.some(function (v) {
							return v === n;
						});

						if (find) {
							return axis;
						}
					}

					return false;
				}
			};
		}
	}, {
		key: 'doRun',
		value: function doRun() {
			var self = this;
			return {
				run: function run() {
					if (self.run === 'human') {
						this.doHuman();
					} else {
						this.doComputer();
					}
				},
				doHuman: function doHuman() {
					var h = handler.bind(this);

					function handler(e) {
						var target = e.target;

						if (target.tagName === 'TD') {
							var indx = target.id;

							var ticked = this.tick(indx, true, self.tickType['human']);
							if (ticked) {
								self.fieldElement.removeEventListener('click', h);

								var winnerComb = self.checkWinnerCombination(false, 'human');
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
				doComputer: function doComputer() {
					if (self.count < 2) {
						var ticked = false;
						do {
							var n = self.getRandomInt(0, self.fieldSize);
							ticked = this.tick(n, true, self.tickType['computer']);

							self.run = 'human';
							this.run();
						} while (ticked === false);
					} else {
						var result = self.analysis().do();

						if (result) {
							if (typeof result === 'number') {
								if (result === -1) {
									self.count = self.fieldSize;
									self.draw();
								}
								var _n = result - 1;
								var _ticked = this.tick(_n, true, self.tickType[self.run]);
								if (_ticked) {
									self.draw();
									self.run = 'human';
									this.run();
								}
							} else {
								var _n2 = result.cell - 1;
								var _ticked2 = this.tick(_n2, true, self.tickType[self.run]);

								if (_ticked2) {
									self.winner(result.comb, result.axis);
									return;
								}
							}
						}
					}
				},
				tick: function tick(n, _tick, type) {
					if (!self.field[n].ticked) {
						self.field[n].ticked = _tick;
						self.field[n].tickType = type;
						self.view(n, type);

						self.count++;

						return true;
					}

					return false;
				}
			};
		}
	}]);

	return App;
}();

var app = new App();
app.init().then(function fulfilled(contens) {
	app.doRun().run();
});
//# sourceMappingURL=maps/bundle.js.map
