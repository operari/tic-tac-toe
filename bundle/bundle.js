'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _extendableBuiltin(cls) {
	function ExtendableBuiltin() {
		var instance = Reflect.construct(cls, Array.from(arguments));
		Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
		return instance;
	}

	ExtendableBuiltin.prototype = Object.create(cls.prototype, {
		constructor: {
			value: cls,
			enumerable: false,
			writable: true,
			configurable: true
		}
	});

	if (Object.setPrototypeOf) {
		Object.setPrototypeOf(ExtendableBuiltin, cls);
	} else {
		ExtendableBuiltin.__proto__ = cls;
	}

	return ExtendableBuiltin;
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
	function Game() {
		_classCallCheck(this, Game);

		this.fieldSize = 9;
		this.run = 'human';
		this.tickType = {
			human: 'cross',
			computer: 'nil'
		}, this.numberingAxes = {};
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
		}, this.__proto__.CssIds_ = {
			app: 'game',
			cursor: 'comp_cursor'
		};
	}

	_createClass(Game, [{
		key: 'countAxesValues',
		value: function countAxesValues() {
			var _this = this;

			var axes = ['x', 'y', 'z'];
			var cells = this.doCells();
			var sqrt = Math.sqrt(this.fieldSize);

			var _loop = function _loop(i) {
				var matrix = _this.doMatrix(cells, sqrt, axes[i]);
				_this.numberingAxes[axes[i]] = matrix;

				var matrix1 = _this.doMatrix(cells, sqrt, axes[i]);
				_this.computeCells(matrix1);
				_this.multiplyingAxes[axes[i]] = matrix1.reduce(function (a, b) {
					return a.concat(b);
				});

				var matrix2 = _this.doMatrix(cells, sqrt, axes[i]);
				_this.additionAxes[axes[i]] = _this.sumAxissRows(matrix2);
				_this.computeCells(matrix2, false);
				_this.additionAxes[axes[i]].forEach(function (v, i) {
					return v[Object.keys(v)[0]] = matrix2[i];
				});
			};

			for (var i = 0; i < axes.length; i++) {
				_loop(i);
			}
		}
	}, {
		key: 'doCells',
		value: function doCells() {
			var cells = [];

			for (var i = 1; i <= this.fieldSize; i++) {
				cells.push(i);
			}

			return cells;
		}
	}, {
		key: 'doMatrix',
		value: function doMatrix(arr, sqrt, axis) {

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
		}
	}, {
		key: 'computeCells',
		value: function computeCells(matrix) {
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
		}
	}, {
		key: 'sumAxissRows',
		value: function sumAxissRows(matrix) {
			return matrix.map(function (arr) {
				var sum = arr.reduce(function (a, b) {
					return a + b;
				}),
				    o = {};
				o[sum] = [];

				return o;
			});
		}
	}, {
		key: 'makeFieldCells',
		value: function makeFieldCells() {
			for (var i = 0; i < this.fieldSize; i++) {
				this.fieldCells[i] = {
					ticked: false,
					tickType: '',
					position: i + 1
				};
			}
			this.fieldCells.length = this.fieldSize;
		}
	}, {
		key: 'makeView',
		value: function makeView() {
			var _this2 = this;

			var field = document.createElement('table');
			var sqrt = Math.sqrt(this.fieldSize);

			for (var i = 0; i < sqrt; i++) {
				var row = document.createElement('tr');

				for (var n = 0; n < sqrt; n++) {
					var cell = document.createElement('td');
					cell.className = this.CssClasses_.cell;
					cell.id = sqrt * i + n;

					var inner = document.createElement('div');
					inner.className = this.CssClasses_.field + '__inner';

					cell.appendChild(inner);
					row.appendChild(cell);
				}

				field.appendChild(row);
			}

			field.className = this.CssClasses_.field;

			var compCursor = document.createElement('div');
			compCursor.id = 'comp_cursor';
			compCursor.className = 'tttoe__computer-cursor is-hidden';

			return new Promise(function (resolve, reject) {
				document.addEventListener('DOMContentLoaded', function (e) {
					_this2.fieldElement = document.getElementById(_this2.CssIds_.app);
					_this2.fieldElement.appendChild(compCursor);
					_this2.fieldElement.appendChild(field);
					resolve();
				});
			});
		}
	}, {
		key: 'makeMove',
		value: function makeMove() {
			if (this.run === 'human') {
				this.doHuman();
			} else {
				this.doComputer();
			}
		}
	}, {
		key: 'doHuman',
		value: function doHuman() {
			var h = handler.bind(this);

			function handler(e) {
				var target = e.target;

				if (target.tagName === 'DIV') {
					var indx = target.closest('td').id;

					var ticked = this.tick(indx, this.tickType['human']);
					if (ticked) {
						this.fieldElement.removeEventListener('click', h);

						var winnerComb = this.checkWinnerCombination(false, 'human');
						if (winnerComb) {
							this.displayWinner(winnerComb.comb, winnerComb.axis);
						} else {
							// this.draw();
							this.run = 'computer';
							this.makeMove();
						}
					}
				}
			}

			if (this.run === 'human') {
				this.fieldElement.addEventListener('click', h);
			}
		}
	}, {
		key: 'doComputer',
		value: function doComputer() {
			var _this3 = this;

			var result = this.analysis();
			var n = result.cell - 1;

			this.computerMoveAnimation(n).then(function (res) {
				var ticked = _this3.tick(n, _this3.tickType[_this3.run]);
				_this3.state = _this3.count === _this3.fieldSize ? 'draw' : _this3.state;

				if (_this3.state === 'win') {
					if (ticked) {
						_this3.displayWinner(result.comb, result.axis);
					}
				} else if (_this3.state === 'draw') {
					_this3.count = _this3.fieldSize;
					_this3.draw();
				} else {
					if (ticked) {
						setTimeout(function () {
							_this3.run = 'human';
							_this3.makeMove();
						}, 500);
					}
				}
			});
		}
	}, {
		key: 'tick',
		value: function tick(n, type) {
			var _tick = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

			if (this.fieldCells[n] && !this.fieldCells[n].ticked) {
				this.fieldCells[n].ticked = true;
				this.fieldCells[n].tickType = type;
				this.displayTick(n, type);

				this.count++;

				return true;
			}

			return false;
		}
	}, {
		key: 'checkWinnerCombination',
		value: function checkWinnerCombination(axis, tickType) {
			var _this4 = this;

			var comb = Array.from(this.fieldCells).filter(function (o) {
				return o.ticked && o.tickType === _this4.tickType[tickType];
			}).map(function (o) {
				return o.position;
			});

			if (axis) {
				var matrix = this.numberingAxes[axis];
				return findCombRow(matrix);
			} else {
				var axiss = [];
				var finded = [];
				for (var prop in this.numberingAxes) {
					var _matrix = this.numberingAxes[prop];
					finded.push(findCombRow(_matrix));
					axiss.push(prop);
				}
				var findedIndex = finded.findIndex(function (a) {
					return a.length;
				});
				if (~findedIndex) {
					return {
						comb: finded[findedIndex],
						axis: this.makeRotateAxisClass(axiss[findedIndex], finded[findedIndex])
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
			var result = {};
			if (this.count < 2) {
				var ticked = false,
				    n = void 0;
				do {
					n = this.getRandomInt(0, this.fieldSize);
					ticked = this.isTickedCell(n);
				} while (ticked === true);
				result.cell = n + 1;
			} else {
				var o = this.filterCells();
				var resultCompareComputer = this.makePotentialCells(o.emptyCells, o.computerCells, 'computer');
				var resultCompareHuman = this.makePotentialCells(o.emptyCells, o.humanCells, 'human');

				if (resultCompareComputer.cell) {
					this.state = 'win';
					result = resultCompareComputer;
				} else if (resultCompareHuman.cell) {
					result.cell = resultCompareHuman.cell;
				} else {
					if (resultCompareComputer.length) {
						result.cell = this.chooseRandomCell(resultCompareComputer);
					} else if (resultCompareHuman.length) {
						result.cell = this.chooseRandomCell(resultCompareHuman);
					} else {
						this.state = 'draw';
						result.cell = o.emptyCells[0] ? o.emptyCells[0].position : -1;
					}
				}
			}

			return result;
		}
	}, {
		key: 'filterCells',
		value: function filterCells() {
			var _this5 = this;

			var field = Array.from(this.fieldCells);
			var filteredCells = {};
			filteredCells.emptyCells = field.filter(function (o) {
				return !o.ticked;
			});
			filteredCells.humanCells = field.filter(function (o) {
				return o.tickType === _this5.tickType['human'];
			});
			filteredCells.computerCells = field.filter(function (o) {
				return o.tickType === _this5.tickType['computer'];
			});

			return filteredCells;
		}
	}, {
		key: 'makePotentialCells',
		value: function makePotentialCells(emptyCells, playerCells, player) {

			var potentialCells = [];
			for (var i = 0; i < emptyCells.length; i++) {
				var result = this.getPlayerPotentialCells(emptyCells[i].position, playerCells, player);
				if (result) {
					if ((typeof result === 'undefined' ? 'undefined' : _typeof(result)) === 'object' && result[0]) {
						potentialCells.push(result);
					} else {
						return result;
					}
				}
			}

			return potentialCells;
		}
	}, {
		key: 'getPlayerPotentialCells',
		value: function getPlayerPotentialCells(emptyCell, compareCells, player) {
			var playerPotencialCells = [];

			for (var i = 0; i < compareCells.length; i++) {
				var compareCell = compareCells[i].position;
				var axisMultiply = compareCell * emptyCell;
				var axis = this.getAxis(axisMultiply);
				if (axis) {
					var axisAddition = compareCell + emptyCell;
					var potentialCell = this.getPotentialCell(axis, axisAddition);
					if (potentialCell) {
						var potentialCellObj = this.fieldCells[potentialCell - 1];
						if (potentialCellObj.ticked) {
							if (potentialCellObj.tickType === this.tickType[player]) {
								var testTicked = this.doTestTick(emptyCell, player);
								if (testTicked) {
									var winnerComb = this.checkWinnerCombination(axis, player);
									this.doTestTick(emptyCell, false, false);
									if (winnerComb) {
										return {
											cell: emptyCell,
											comb: winnerComb,
											axis: this.makeRotateAxisClass(axis, winnerComb)
										};
									}
								}
							}
						} else {
							playerPotencialCells.push(potentialCell);
						}
					}
				}
			}

			return playerPotencialCells.length ? playerPotencialCells : false;
		}
	}, {
		key: 'getPotentialCell',
		value: function getPotentialCell(axis, sumCells) {
			var axisValues = this.additionAxes[axis];

			for (var i = 0; i < axisValues.length; i++) {
				var propAxisSumRow = Object.keys(axisValues[i])[0];
				var valuesAxisRow = axisValues[i][propAxisSumRow];
				var find = valuesAxisRow.some(function (v) {
					return v === sumCells;
				});
				if (find) {
					return propAxisSumRow - sumCells;
				}
			}

			return false;
		}
	}, {
		key: 'isTickedCell',
		value: function isTickedCell(n) {
			if (this.fieldCells[n].ticked) {
				return true;
			}
			return false;
		}
	}, {
		key: 'doTestTick',
		value: function doTestTick(cell, player) {
			var test = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

			var n = cell - 1;

			if (test) {
				this.fieldCells[n].ticked = true;
				this.fieldCells[n].tickType = this.tickType[player];

				return true;
			}

			this.fieldCells[n].ticked = false;
			this.fieldCells[n].tickType = '';

			return false;
		}
	}, {
		key: 'getAxis',
		value: function getAxis(n) {
			for (var axis in this.multiplyingAxes) {
				var val = this.multiplyingAxes[axis];
				var find = val.some(function (v) {
					return v === n;
				});

				if (find) {
					return axis;
				}
			}

			return false;
		}
	}, {
		key: 'makeRotateAxisClass',
		value: function makeRotateAxisClass(str, arr) {
			str = str === 'z' && arr.some(function (v) {
				return v === 3;
			}) ? str + '-45' : str;
			return str;
		}
	}, {
		key: 'chooseRandomCell',
		value: function chooseRandomCell(potentialCells) {
			potentialCells = potentialCells.reduce(function (a, b) {
				return a.concat(b);
			});
			var arr = new UniqueArray(potentialCells);
			var potentialCellsUniq = arr.unique();

			var n = this.getRandomInt(0, potentialCellsUniq.length);
			var cell = potentialCellsUniq[n];

			return cell;
		}
	}, {
		key: 'getRandomInt',
		value: function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min)) + min;
		}
	}, {
		key: 'displayTick',
		value: function displayTick(n, type) {
			var tick = document.createElement('div');
			tick.className = 'tttoe__tick tttoe__tick--' + this.tickType[this.run];
			this.fieldElement.querySelectorAll('td')[n].firstElementChild.appendChild(tick);
		}
	}, {
		key: 'displayWinner',
		value: function displayWinner(arr, axis) {
			for (var i = 0; i < arr.length; i++) {
				this.fieldElement.querySelectorAll('td')[arr[i] - 1].classList.add(this.CssClasses_.win + '-' + axis);
			}
			console.log('Winner is: ' + this.run);
			setTimeout(function () {
				window.location.reload();
			}, 2000);
		}
	}, {
		key: 'draw',
		value: function draw() {
			if (this.count === this.fieldSize) {
				setTimeout(function () {
					window.location.reload();
				}, 2000);
				console.log('Draw!');
			}
		}
	}, {
		key: 'computerMoveAnimation',
		value: function computerMoveAnimation(id) {
			var _this6 = this;

			return new Promise(function (resolve, reject) {
				if (id >= 0) {
					var cell = document.getElementById(id);
					var cellCenter = cell.offsetWidth / 2;
					var cursor = document.getElementById(_this6.CssIds_.cursor);
					var positionTop = cell.offsetTop + cellCenter - cursor.offsetTop - cursor.offsetHeight + 'px';
					var positionLeft = cell.offsetLeft + cellCenter - cursor.offsetLeft + 'px';

					cursor.classList.remove(_this6.CssClasses_.hidden);
					cursor.style.top = positionTop;
					cursor.style.left = positionLeft;
					setTimeout(function () {
						cursor.classList.add(_this6.CssClasses_.hidden);
						cursor.style.top = '';
						cursor.style.left = '';
						resolve();
					}, 1000);
				} else {
					resolve();
				}
			});
		}
	}, {
		key: 'init',
		value: function init() {
			var _this7 = this;

			this.countAxesValues();
			this.makeFieldCells();
			return new Promise(function (resolve, reject) {
				_this7.makeView().then(function (result) {
					return resolve();
				});
			});
		}
	}]);

	return Game;
}();

var UniqueArray = function (_extendableBuiltin2) {
	_inherits(UniqueArray, _extendableBuiltin2);

	function UniqueArray() {
		_classCallCheck(this, UniqueArray);

		return _possibleConstructorReturn(this, (UniqueArray.__proto__ || Object.getPrototypeOf(UniqueArray)).apply(this, arguments));
	}

	_createClass(UniqueArray, [{
		key: 'unique',
		value: function unique() {
			this[0].sort(function (a, b) {
				return a - b;
			});
			var unique = [];
			if (this[0].length > 1) {
				this[0].reduce(function (a, b, i, arr) {
					if (a - b) {
						unique.push(a);
						if (arr[arr.length - 1] === arr[i]) {
							unique.push(b);
						}
					} else {
						if (arr.length === 2) {
							unique.push(b);
						}
					}
					return b;
				});
			} else {
				if (!this[0].length) {
					throw new Error('The array does not have a suitable length!');
				}
				unique = this[0];
			}
			return unique;
		}
	}]);

	return UniqueArray;
}(_extendableBuiltin(Array));

var game = new Game();

game.init().then(function (result) {
	return game.makeMove();
});
//# sourceMappingURL=maps/bundle.js.map
