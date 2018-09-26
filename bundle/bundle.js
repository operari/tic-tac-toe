'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sound = function () {
	function Sound(options) {
		_classCallCheck(this, Sound);

		this.element_ = null;
		this.audio_ = null;
		this.timings = {
			hover: { start: 0.00, end: 0.50 },
			click: { start: 1.00, end: 1.50 },
			tick: { start: 2.00, end: 2.50 },
			dice: { start: 3.00, end: 3.50 },
			flash: { start: 4.00, end: 5.00 },
			draw: { start: 5.50, end: 6.00 },
			win: { start: 6.50, end: 7.60 },
			point: { start: 8.00, end: 9.00 }
		};
		this.fileName = 'sound.mp3';
		this.playerId = 'player';
		this.path = 'blocks/sound/';
		Object.assign(this, options);
		this.init();
	}

	_createClass(Sound, [{
		key: 'appendPlayer',
		value: function appendPlayer() {
			var elem = document.getElementById(this.playerId);

			if (elem && !elem.children.length) {
				this.element_ = elem;
				var audio = document.createElement('audio');
				audio.preload = 'metadata';
				elem.appendChild(audio);
				this.audio_ = this.element_.querySelector('audio');
				return true;
			}

			return false;
		}
	}, {
		key: 'audioTrack',
		value: function audioTrack() {
			if (this.fileName) {
				this.audio_.src = this.path + this.fileName + '?v=' + Date.now();
			}
		}
	}, {
		key: 'play',
		value: function play(name) {
			var _this = this;

			if (this.audio_) {
				this.audio_.currentTime = this.timings[name].start;
				var playPromise = this.audio_.play();
				if (playPromise !== undefined) {
					playPromise.then(function (_) {
						_this.timerId = setTimeout(function () {
							_this.stop();
						}, (_this.timings[name].end - _this.timings[name].start) * 1000);
					}).catch(function (error) {
						console.error(error);
					});
				}
			}
		}
	}, {
		key: 'stop',
		value: function stop() {
			if (this.audio_) {
				clearTimeout(this.timerId);
				this.audio_.pause();
				this.audio_.currentTime = 0;
			}
		}
	}, {
		key: 'init',
		value: function init() {
			var _this2 = this;

			var loadDom = function loadDom(e) {
				_this2.appendPlayer();
				_this2.audioTrack();
			};
			if (document.readyState !== 'loading') {
				loadDom();
			} else {
				document.addEventListener('DOMContentLoaded', loadDom);
			}
		}
	}]);

	return Sound;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dice = function () {
	function Dice() {
		_classCallCheck(this, Dice);

		this.element = null;
		this.sides = 6;
		this.animate = true;
		this.__proto__.CssIds_ = {
			ELEM: 'dice'
		};
		this.__proto__.CssClasses_ = {
			SIDE: 'dice__side',
			DOT: 'dice__dot',
			HIDDEN: 'is-hidden',
			DICE: 'dice',
			AUTO: 'layout__auto',
			ANIMATED: 'animated',
			ROTATEIN: 'rotateIn'
		};
		this.__proto__.Constant_ = {
			ANIM_TIMING: 1000
		};
		this.init();
	}

	_createClass(Dice, [{
		key: 'makeSides',
		value: function makeSides() {
			this.element = document.getElementById(this.CssIds_.ELEM);
			if (this.element) {
				this.dice = document.createElement('div');
				this.dice.className = this.CssClasses_.DICE + ' ' + this.CssClasses_.AUTO + (this.animate ? ' ' + this.CssClasses_.ANIMATED + ' ' + this.CssClasses_.ROTATEIN : '');
				for (var i = 0, j = i + 1; i < this.sides; i++, j++) {
					var side = document.createElement('div');
					side.className = this.CssClasses_.SIDE + ' ' + this.CssClasses_.SIDE + '--' + j + ' ' + this.CssClasses_.HIDDEN;
					if (this.makeDots(side, j)) {
						this.dice.appendChild(side);
						this.element.appendChild(this.dice);
					}
				}
				return true;
			}
			return false;
		}
	}, {
		key: 'makeDots',
		value: function makeDots(el, n) {
			if (el) {
				for (var i = 0; i < n; i++) {
					var dot = document.createElement('div');
					dot.className = this.CssClasses_.DOT;
					el.appendChild(dot);
				}
				return true;
			}
			return false;
		}
	}, {
		key: 'getRandomInt',
		value: function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min)) + min;
		}
	}, {
		key: 'play',
		value: function play() {
			this.element.classList.remove(this.CssClasses_.HIDDEN);
			var n = this.getRandomInt(0, this.sides);
			this.dice.children[n].classList.remove(this.CssClasses_.HIDDEN);
			this.animateDice();

			return n + 1;
		}
	}, {
		key: 'animateDice',
		value: function animateDice() {
			var _this = this;

			if (this.animate) {
				setTimeout(function () {
					_this.dice.classList.add(_this.CssClasses_.ROTATEIN);
				}, this.Constant_.ANIM_TIMING);
			}
		}
	}, {
		key: 'init',
		value: function init() {
			this.makeSides();
		}
	}]);

	return Dice;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Confetti = function () {
	function Confetti(id, count) {
		_classCallCheck(this, Confetti);

		this.id = id;
		this.count = count;
		return this.init();
	}

	_createClass(Confetti, [{
		key: 'create',
		value: function create() {
			var confetti = document.createElement('div');
			confetti.id = this.id;
			confetti.className = 'confetti';
			if (confetti) {
				var i = this.count;
				while (i > -1) {
					var elem = document.createElement('div');
					elem.className = 'confetti__' + i;
					confetti.appendChild(elem);

					i--;
				}

				return confetti;
			} else {
				throw new Error('Element .confetti not found!');
			}
		}
	}, {
		key: 'init',
		value: function init() {
			return this.create();
		}
	}]);

	return Confetti;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Screen = function () {
	function Screen() {
		_classCallCheck(this, Screen);

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
		}, this.__proto__.CssIds_ = {
			SCREEN: 'screen',
			START: 'start_game',
			CONTAINER: 'container',
			MODE: 'game_mode',
			MAIN: 'game_main',
			SIDE: 'game_side',
			FIRST: 'first_move',
			DICE: 'dice'
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
			DICE_HIDE_TIMING: 3000
		};
	}

	_createClass(Screen, [{
		key: 'makeView',
		value: function makeView() {
			var html = '<div class="screen__inner">\n\t\t\t\t<div id="' + this.CssIds_.MAIN + '" class="screen__main animated">\n\t\t\t\t\t<h1 class="screen__title">\u041A\u0440\u0435\u0441\u0442\u0438\u043A\u0438-\u043D\u043E\u043B\u0438\u043A\u0438</h1>\n\t\t\t\t\t<div class="screen__phrase">\u041A\u043B\u0430\u0441\u0441\u0438\u043A\u0430 \u0438\u0433\u0440\u043E\u0432\u043E\u0439 \u0438\u043D\u0434\u0443\u0441\u0442\u0440\u0438\u0438</div>\n\n\t\t\t\t\t<div class="screen__robot">\n\t\t\t\t\t\t<button type="button" id="' + this.CssIds_.START + '" class="screen__start">\u041D\u0430\u0447\u0430\u0442\u044C \u0438\u0433\u0440\u0443</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div id="game_mode" class="screen__mode animated is-hidden">\n\t\t\t\t\t<h2 class="screen__display">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0440\u0435\u0436\u0438\u043C \u0438\u0433\u0440\u044B:</h2>\n\t\t\t\t\t<button class="screen__mode-training" data-mode="training" data-players=\'{ "player1": "human", "player2": "computer" }\'>\u0422\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0430</button>\n\t\t\t\t\t<button class="screen__mode-computer" data-mode="vs_computer" data-players=\'{ "player1": "human", "player2": "computer" }\'>\u0421 \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440\u043E\u043C</button>\n\t\t\t\t\t<button class="screen__mode-human" data-mode="vs_human" data-players=\'{ "player1": "human", "player2": "human1" }\'>\u0421 \u0447\u0435\u043B\u043E\u0432\u0435\u043A\u043E\u043C</button>\n\t\t\t\t\t<button class="screen__mode-network" data-mode="network" data-players=\'{ "player1": "human", "player2": "human1" }\' disabled>\u041F\u043E \u0441\u0435\u0442\u0438</button>\n\t\t\t\t</div>\n\t\t\t\t<div id="' + this.CssIds_.SIDE + '" class="screen__side animated is-hidden">\n\t\t\t\t\t<h2 class="screen__display">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0442\u043E\u0440\u043E\u043D\u0443:</h2>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<button class="screen__side-cross ml-button--fab" type="button" data-side="cross">x</button>\n\t\t\t\t\t\t<button class="screen__side-nil ml-button--fab" type="button" data-side="nil">o</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div id="' + this.CssIds_.FIRST + '" class="screen__pick-move animated is-hidden">\n\t\t\t\t\t<h2 class="screen__display">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u0442\u043E \u0445\u043E\u0434\u0438\u0442 \u043F\u0435\u0440\u0432\u044B\u043C:</h2>\n\t\t\t\t\t<button class="ml-button--color" data-run="human">\u0412\u044B</button>\n\t\t\t\t\t<button class="ml-button--color" data-run="computer">\u041A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440</button>\n\t\t\t\t</div>\n\t\t\t\t<div id="' + this.CssIds_.DICE + '" class="screen__dice is-hidden animated">\n\t\t\t\t\t<button class="ml-button--color screen__dice--button">\u041D\u0430\u0447\u0430\u0442\u044C</button>\n\t\t\t\t</div>\n\t\t\t</div>';

			this.screen.innerHTML += html;
		}
	}, {
		key: 'makeDiceWinner',
		value: function makeDiceWinner() {
			var arr = Array.from(arguments);
			var n = Math.max.apply(null, arr);
			var i = arr.findIndex(function (v) {
				return v === n;
			});

			this.options.run = this.gameModes[this.options.mode][i];

			return i;
		}
	}, {
		key: 'throwDice',
		value: function throwDice() {
			var n1, n2;
			this.sound.play('dice');
			do {
				var dice1 = new Dice();
				var dice2 = new Dice();
				n1 = dice1.play();
				n2 = dice2.play();

				if (n1 === n2) {
					var dice = document.querySelectorAll('.' + this.CssClasses_.DICE);
					Array.from(dice).forEach(function (el) {
						return el.remove();
					});
				}
			} while (n1 === n2);

			return this.makeDiceWinner(n1, n2);
		}
	}, {
		key: 'animate',
		value: function animate(el, cls) {
			var _this = this;

			if (el) {
				el.classList.add(cls);
				return new Promise(function (resolve, reject) {
					setTimeout(function () {
						resolve();
					}, _this.Constant_.ANIM_TIMING);
				});
			}
			return false;
		}
	}, {
		key: 'toggleView',
		value: function toggleView(id1, id2) {
			var _this2 = this;

			var el1 = document.getElementById(id1);
			var el2 = document.getElementById(id2);
			if (el1) {
				return new Promise(function (resolve, reject) {
					_this2.animate(el1, _this2.CssClasses_.FADEOUT).then(function (result) {
						el1.remove();
						if (el2) {
							el2.classList.toggle(_this2.CssClasses_.HIDDEN);
							_this2.animate(el2, !_this2.dice ? _this2.CssClasses_.FADEIN : _this2.CssClasses_.FADEIN_DEF).then(function (result) {
								resolve(el2);
							});
						} else {
							resolve();
						}
					});
				});
			}
			return false;
		}
	}, {
		key: 'switchLastScreen',
		value: function switchLastScreen(button, arr) {
			var mode = button.dataset.mode;
			if (mode) {
				switch (mode) {
					case 'training':
						document.getElementById(arr[arr.length - 1]).remove();
						arr[arr.length - 1] = this.CssIds_.FIRST;
						this.dice = false;
						break;
					default:
						document.getElementById(this.CssIds_.FIRST).remove();
				}
				return true;
			}
			return false;
		}
	}, {
		key: 'makeOptions',
		value: function makeOptions(button, arr) {
			for (var i = 0; i < arr.length; i++) {
				var dataset = button.dataset;
				if (dataset && dataset[arr[i]]) {
					if (arr[i] === 'side') {
						this.setTickType(dataset[arr[i]]);
					} else if (arr[i] === 'players') {
						this.options[arr[i]] = JSON.parse(dataset[arr[i]]);
					} else {
						this.options[arr[i]] = dataset[arr[i]];
					}
				}
			}
		}
	}, {
		key: 'setTickType',
		value: function setTickType(side) {
			var mode = this.options.mode;
			this.options.tickType = { human: side };

			switch (mode) {
				case 'vs_human':
					this.options.tickType.human1 = side === 'cross' ? 'nil' : 'cross';
					break;
				default:
					this.options.tickType.computer = side === 'cross' ? 'nil' : 'cross';
			}
		}
	}, {
		key: 'controller',
		value: function controller() {
			var _this4 = this;

			var btnStart = document.getElementById(this.CssIds_.START);
			var arrIds = [this.CssIds_.MAIN, this.CssIds_.MODE, this.CssIds_.SIDE, this.CssIds_.DICE];

			return new Promise(function (resolve, reject) {
				(function rec(el, arr) {
					var _this3 = this;

					if (arr.length) {
						if (arr.length === 1 && this.dice) {
							var i = this.throwDice();
							setTimeout(function () {
								_this3.sound.play('flash');
								var dice = document.querySelectorAll('.' + _this3.CssClasses_.DICE)[i];
								dice.classList.remove(_this3.CssClasses_.ROTATEIN);
								_this3.animate(dice, _this3.CssClasses_.FLASH);
							}, this.Constant_.ANIM_TIMING);
							setTimeout(function () {
								document.getElementById(_this3.CssIds_.DICE).querySelector('button').click();
								resolve();
							}, this.Constant_.DICE_HIDE_TIMING);
						}
						el.addEventListener('click', function (e) {
							var target = e.target;
							if (target.tagName !== "BUTTON") return;
							_this3.sound.play('click');
							_this3.switchLastScreen(target, arr);
							_this3.makeOptions(target, ['side', 'run', 'mode', 'players']);
							_this3.toggleView(arr[0], arr[1]).then(function (result) {
								arr.shift();
								return rec.call(_this3, result, arr);
							});
						});
						el.addEventListener('mouseover', function (e) {
							_this3.sound.play('hover');
						});
					} else {
						resolve();
					}
				}).call(_this4, btnStart, arrIds);
			});
		}
	}, {
		key: 'init',
		value: function init() {
			var _this5 = this;

			document.addEventListener('DOMContentLoaded', function (e) {
				_this5.screen = document.getElementById(_this5.CssIds_.SCREEN);
				if (!_this5.screen) return;
				_this5.makeView();
				_this5.sound = new Sound();
				_this5.options.sound = _this5.sound;
				_this5.controller().then(function (result) {
					_this5.screen.classList.toggle(_this5.CssClasses_.HIDDEN);
					_this5.animate(_this5.screen, _this5.CssClasses_.FADEOUT);

					var game = new Game(_this5.options);
					game.init().then(function (result) {
						return game.makeMove();
					});
				});
			});
		}
	}]);

	return Screen;
}();

var screen = new Screen();
screen.init();
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
	function Game(options) {
		_classCallCheck(this, Game);

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
		Object.assign(this, options);
		this.partiRun = this.run;
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
		key: 'makeViewField',
		value: function makeViewField() {
			var field = document.createElement('table');
			var sqrt = Math.sqrt(this.fieldSize);

			for (var i = 0; i < sqrt; i++) {
				var row = document.createElement('tr');

				for (var n = 0; n < sqrt; n++) {
					var cell = document.createElement('td');
					cell.className = this.CssClasses_.CELL;
					cell.id = sqrt * i + n;

					var inner = document.createElement('div');
					inner.className = this.CssClasses_.FIELD + '__inner';

					cell.appendChild(inner);
					row.appendChild(cell);
				}

				field.appendChild(row);
			}

			field.className = this.CssClasses_.FIELD;

			return field;
		}
	}, {
		key: 'makeView',
		value: function makeView() {
			var _this2 = this;

			var html = '\n\t\t\t<div id="status" class="tttoe__status">\n\t\t\t\t<div id="player1" class="tttoe__player">\n\t\t\t\t\t<div class="tttoe__avatar">\n\t\t\t\t\t\t<img src="blocks/game/' + this.players.player1 + '.png" alt="" />\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="tttoe__name">' + this.playerFirstName + '</div>\n\t\t\t\t\t<div class="tttoe__store">0</div>\n\t\t\t\t</div>\n\t\t\t\t<div id="player2" class="tttoe__player">\n\t\t\t\t\t<div class="tttoe__avatar">\n\t\t\t\t\t\t<img src="blocks/game/' + this.players.player2 + '.png" alt="" />\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="tttoe__name">' + this.playerSecondName + '</div>\n\t\t\t\t\t<div class="tttoe__store">0</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div id="comp_cursor" class="tttoe__computer-cursor is-hidden"></div>\n\t\t\t<div id="message" class="tttoe__message animated animated--msg"></div>';

			var field = this.makeViewField();

			return new Promise(function (resolve, reject) {
				var loadDom = function loadDom(e) {
					_this2.fieldElement = document.getElementById(_this2.CssIds_.APP);
					_this2.fieldElement.innerHTML += html;
					_this2.fieldElement.appendChild(field);
					_this2.showView();
					resolve();
				};

				if (document.readyState === 'complete') {
					loadDom();
				} else {
					document.addEventListener('DOMContentLoaded', loadDom);
				}
			});
		}
	}, {
		key: 'showView',
		value: function showView() {
			var container = document.getElementById(this.CssIds_.CONTAINER);
			container.classList.toggle(this.CssClasses_.HIDDEN);
			container.classList.toggle(this.CssClasses_.FADEIN_DEF);
		}
	}, {
		key: 'makeMove',
		value: function makeMove() {
			switch (this.mode) {
				case 'vs_human':
					if (this.run === 'human') {
						this.doHuman(this.players.player1, this.players.player2);
					} else {
						this.doHuman(this.players.player2, this.players.player1);
					}
					break;
				case 'training':

				default:
					if (this.run === 'human') {
						this.doHuman(this.players.player1, this.players.player2);
					} else {
						this.doComputer();
					}
			}
		}
	}, {
		key: 'highlightMove',
		value: function highlightMove() {
			var _this3 = this;

			var props = Object.keys(this.players);
			var values = Object.values(this.players);

			var highlight = function highlight(id) {
				var add = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

				var elem = document.getElementById(id).querySelector('.' + _this3.CssClasses_.AVATAR);
				elem.classList[add ? 'add' : 'remove'](_this3.CssClasses_.AVATAR + '--highlight');
			};

			var i = values.findIndex(function (v) {
				return v === _this3.run;
			});
			highlight(props[i]);

			i = values.findIndex(function (v) {
				return v !== _this3.run;
			});
			highlight(props[i], false);
		}
	}, {
		key: 'actionsAfterWin',
		value: function actionsAfterWin(comb, axis) {
			this.setStore();
			this.displayWinner(comb, axis);
			this.switchPartiPlayer();
			var winnerName = this.getPartiWinner();
			this.displayMessage(winnerName);
			if (winnerName) {
				var loserName = this.getPartiLoser(winnerName);
				var winnerId = this.getPlayerId(winnerName);
				var loserId = this.getPlayerId(loserName);
				this.throwConfetti(document.getElementById(winnerId), this.Constant_.CONFETTI_TIMING);
				this.animate(document.getElementById(loserId).querySelector('.' + this.CssClasses_.AVATAR), this.CssClasses_.SHAKE, this.Constant_.RESTART_TIMING);
			}
		}
	}, {
		key: 'doHuman',
		value: function doHuman(curr, next) {
			this.highlightMove();

			var h = handler.bind(this);

			function handler(e) {
				var _this4 = this;

				var target = e.target;

				if (target.tagName === 'DIV') {
					var indx = target.closest('td').id;
					var ticked = this.tick(indx, this.tickType[curr]);
					if (ticked) {
						this.fieldElement.removeEventListener('click', h);

						var winnerComb = this.checkWinnerCombination(false, curr);
						if (winnerComb) {
							this.actionsAfterWin(winnerComb.comb, winnerComb.axis);
							this.restartMove().then(function (result) {
								_this4.makeMove();
							});
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
				this.fieldElement.addEventListener('click', h);
			}
		}
	}, {
		key: 'doComputer',
		value: function doComputer() {
			var _this5 = this;

			this.highlightMove();

			var result = this.analysis();
			var n = result.cell - 1;

			this.computerMoveAnimation(n).then(function (res) {
				var ticked = _this5.tick(n, _this5.tickType[_this5.run]);
				_this5.state = _this5.count === _this5.fieldSize && _this5.state !== 'win' ? 'draw' : _this5.state;
				if (_this5.state === 'win') {
					if (ticked) {
						_this5.actionsAfterWin(result.comb, result.axis);
						_this5.restartMove().then(function (result) {
							_this5.makeMove();
						});
					}
				} else if (_this5.state === 'draw') {
					_this5.count = _this5.fieldSize;
					_this5.draw();
				} else {
					if (ticked) {
						setTimeout(function () {
							_this5.run = 'human';
							_this5.makeMove();
						}, _this5.Constant_.TICK_TIMING);
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
				this.sound.play('tick');

				this.count++;

				return true;
			}

			return false;
		}
	}, {
		key: 'checkWinnerCombination',
		value: function checkWinnerCombination(axis, tickType) {
			var _this6 = this;

			var comb = Array.from(this.fieldCells).filter(function (o) {
				return o.ticked && o.tickType === _this6.tickType[tickType];
			}).map(function (o) {
				return o.position;
			});

			if (axis) {
				var matrix = this.numberingAxes[axis];
				return findCombRow.call(this, matrix);
			} else {
				var axiss = [];
				var finded = [];
				for (var prop in this.numberingAxes) {
					var _matrix = this.numberingAxes[prop];
					finded.push(findCombRow.call(this, _matrix));
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
			var _this7 = this;

			var field = Array.from(this.fieldCells);
			var filteredCells = {};
			filteredCells.emptyCells = field.filter(function (o) {
				return !o.ticked;
			});
			filteredCells.humanCells = field.filter(function (o) {
				return o.tickType === _this7.tickType['human'];
			});
			filteredCells.computerCells = field.filter(function (o) {
				return o.tickType === _this7.tickType['computer'];
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
		key: 'setStore',
		value: function setStore() {
			typeof this.store[this.run] === 'number' ? this.store[this.run] += 1 : this.store[this.run] = 1;
			this.displayStore();
		}
	}, {
		key: 'getPartiWinner',
		value: function getPartiWinner() {
			var _this8 = this;

			var stores = Object.values(this.store);
			var sum = stores.reduce(function (a, b) {
				return a + b;
			});

			if (sum === this.parti) {
				this.sound.play('win');
				var n = Math.max.apply(null, stores);
				var i = stores.findIndex(function (v) {
					return v === n;
				});
				var winner = Object.keys(this.store)[i];
				var prop = this.getPlayerId(winner);

				setTimeout(function () {
					_this8.resetStores();
				}, this.Constant_.RESTART_TIMING);

				return winner;
			} else {
				this.sound.play('point');
			}

			return false;
		}
	}, {
		key: 'getPartiLoser',
		value: function getPartiLoser(winner) {
			var players = Object.values(this.players);
			var i = players.findIndex(function (v) {
				return v !== winner;
			});
			return players[i];
		}
	}, {
		key: 'getPlayerId',
		value: function getPlayerId(name) {
			for (var prop in this.players) {
				if (this.players[prop] === name) {
					return prop;
				}
			}
			return false;
		}
	}, {
		key: 'switchPartiPlayer',
		value: function switchPartiPlayer() {
			var _this9 = this;

			var playersNames = Object.values(this.players);
			this.run = this.partiRun = playersNames.find(function (v) {
				return v !== _this9.partiRun;
			});
		}
	}, {
		key: 'animate',
		value: function animate(el, cls, timing) {
			var del = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

			if (el) {
				el.classList.add(cls);
				return new Promise(function (resolve, reject) {
					setTimeout(function () {
						del && el.classList.remove(cls);
						resolve();
					}, timing);
				});
			}
			return false;
		}
	}, {
		key: 'throwConfetti',
		value: function throwConfetti(el, timing) {
			if (el) {
				var confetti = new Confetti('confetti', 150);
				el.appendChild(confetti);
				return new Promise(function (resolve, reject) {
					setTimeout(function () {
						confetti.remove();
						resolve();
					}, timing);
				});
			}
			return false;
		}
	}, {
		key: 'getRandomInt',
		value: function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min)) + min;
		}
	}, {
		key: 'resetStores',
		value: function resetStores() {
			this.store = {};
			var stores = document.querySelectorAll('.' + this.CssClasses_.STORE);

			for (var i = 0; i < stores.length; i++) {
				stores[i].textContent = 0;
			}
		}
	}, {
		key: 'displayStore',
		value: function displayStore() {
			for (var prop in this.players) {
				if (this.run === this.players[prop]) {
					document.getElementById(prop).querySelector('.' + this.CssClasses_.STORE).textContent = this.store[this.run];

					break;
				}
			}
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
				this.fieldElement.querySelectorAll('td')[arr[i] - 1].classList.add(this.CssClasses_.WIN + '-' + axis);
			}
			console.log('Winner is: ' + this.run);
			setTimeout(function () {
				// window.location.reload();
			}, 2000);
		}
	}, {
		key: 'displayMessage',
		value: function displayMessage(str) {
			var _this10 = this;

			if (str) {
				var elem = document.getElementById(this.CssIds_.MSG);
				elem.classList.add(this.CssClasses_.MSG);
				var msg = 'Выиграл';

				switch (str) {
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

				setTimeout(function () {
					elem.classList.remove(_this10.CssClasses_.MSG);
				}, this.Constant_.MSG_ANIM_TIMING);
			}
		}
	}, {
		key: 'restartMove',
		value: function restartMove() {
			var _this11 = this;

			return new Promise(function (resolve, reject) {
				setTimeout(function () {
					var fieldCells = Array.from(_this11.fieldCells);

					for (var i = 0; i < fieldCells.length; i++) {
						fieldCells[i].ticked = false;
						fieldCells[i].tickType = '';

						var td = document.getElementById(i);
						var remClass = Array.from(td.classList).find(function (v) {
							return (/winner/.test(v)
							);
						});
						td.classList.remove(remClass);
						var tick = td.querySelector('.' + _this11.CssClasses_.TICK);
						tick && tick.remove();

						_this11.count = 0;
						_this11.state = '';
					}

					resolve();
				}, _this11.Constant_.RESTART_TIMING);
			});
		}
	}, {
		key: 'draw',
		value: function draw() {
			var _this12 = this;

			if (this.count === this.fieldSize) {
				this.sound.play('draw');
				this.displayMessage('draw');
				this.switchPartiPlayer();
				this.restartMove().then(function (result) {
					_this12.makeMove();
				});
				return true;
			}
			return false;
		}
	}, {
		key: 'computerMoveAnimation',
		value: function computerMoveAnimation(id) {
			var _this13 = this;

			return new Promise(function (resolve, reject) {
				if (id >= 0) {
					var cell = document.getElementById(id);
					var cellCenter = cell.offsetWidth / 2;
					var cursor = document.getElementById(_this13.CssIds_.CURSOR);
					var positionTop = cell.offsetTop + cellCenter - cursor.offsetTop - cursor.offsetHeight + 'px';
					// const positionLeft = cell.offsetLeft + cellCenter - cursor.offsetLeft + 'px';
					var positionLeft = cursor.offsetLeft - cell.offsetLeft - cellCenter + 'px';

					cursor.classList.remove(_this13.CssClasses_.HIDDEN);
					cursor.style.top = positionTop;
					cursor.style.right = positionLeft;
					setTimeout(function () {
						cursor.classList.add(_this13.CssClasses_.HIDDEN);
						cursor.style.top = '';
						cursor.style.right = '';
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
			var _this14 = this;

			this.countAxesValues();
			this.makeFieldCells();
			return new Promise(function (resolve, reject) {
				_this14.makeView().then(function (result) {
					return resolve();
				});
			});
		}
	}, {
		key: 'playerFirstName',
		get: function get() {
			return this.names[this.players.player1][this.players.player2 === 'computer' ? 0 : 1];
		}
	}, {
		key: 'playerSecondName',
		get: function get() {
			return this.names[this.players.player2];
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

// const sound = new Sound();

// const game = new Game( { sound: sound } );

// game.init()
// 	.then(
// 		result => game.makeMove()
// 	);
//# sourceMappingURL=maps/bundle.js.map
