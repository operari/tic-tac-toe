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
			point: { start: 8.00, end: 9.00 },
			swing: { start: 9.50, end: 10.50 },
			level: { start: 11.00, end: 11.70 },
			coin: { start: 12.00, end: 12.60 },
			will: { start: 13.00, end: 15.00 }
		};
		this.fileName = 'sound.mp3';
		this.playerId = 'audio_player';
		this.wrapperId = 'wrapper';
		this.path = 'blocks/sound/';
		Object.assign(this, options);
		this.init();
	}

	_createClass(Sound, [{
		key: 'appendPlayer',
		value: function appendPlayer() {
			this.removePlayer();
			var wrapper = document.getElementById(this.wrapperId);
			var html = '\n\t\t\t<div id="audio_player" class="sound">\n\t\t\t\t<audio preload="metadata"></audio>\n\t\t\t\t<button id="toggle_sound" class="ml-button--dim sound__toggle">\n\t\t\t\t\t<svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" fill="#585f80" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/><path d="M0 0h24v24H0z" fill="none"/></svg>\n\t\t\t\t\t<svg class="is-hidden" xmlns="http://www.w3.org/2000/svg" width="43" height="43" fill="#585f80" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>\n\t\t\t\t\t<span id="m" class="tttoe__menu-bar-key">m</span>\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t';

			wrapper.insertAdjacentHTML('beforeend', html);

			this.element_ = document.getElementById(this.playerId);
			this.audioTrack();
		}
	}, {
		key: 'removePlayer',
		value: function removePlayer() {
			var player = document.getElementById(this.playerId);
			if (player) {
				player.remove();
			}
		}
	}, {
		key: 'audioTrack',
		value: function audioTrack() {
			if (this.fileName) {
				this.audio_ = this.element_.querySelector('audio');
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
						console.info(error);
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
		key: 'mute',
		value: function mute() {
			this.audio_.muted = !this.audio_.muted;
		}
	}, {
		key: 'init',
		value: function init() {
			var _this2 = this;

			var handler = function handler(e) {
				_this2.appendPlayer();
				document.getElementById('toggle_sound').addEventListener('click', function (e) {
					_this2.play('click');
					var btn = e.currentTarget;
					btn.children[+!_this2.audio_.muted].classList.remove('is-hidden');
					btn.children[+_this2.audio_.muted].classList.add('is-hidden');
					setTimeout(function () {
						_this2.mute();
					}, 500);
				});
				document.getElementById('toggle_sound').addEventListener('mouseenter', function (e) {
					_this2.play('hover');
				});
				document.addEventListener('keyup', function (e) {
					if (e.key.toLowerCase() === 'm') {
						document.getElementById('m').parentNode.click();
					}
				});
			};
			if (document.readyState !== 'loading') {
				handler();
			} else {
				document.addEventListener('DOMContentLoaded', handler);
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
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ToggleScreen = function () {
	function ToggleScreen(elem) {
		_classCallCheck(this, ToggleScreen);

		this.elem = elem || document.documentElement;
	}

	_createClass(ToggleScreen, [{
		key: "open",
		value: function open() {
			if (this.elem.requestFullscreen) {
				this.elem.requestFullscreen();
			} else if (this.elem.mozRequestFullScreen) {
				this.elem.mozRequestFullScreen();
			} else if (this.elem.webkitRequestFullscreen) {
				this.elem.webkitRequestFullscreen();
			} else if (this.elem.msRequestFullscreen) {
				this.elem.msRequestFullscreen();
			}
		}
	}, {
		key: "close",
		value: function close() {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}
		}
	}]);

	return ToggleScreen;
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

	_createClass(Screen, [{
		key: 'makeView',
		value: function makeView() {
			var html = '\n\t\t\t<div id="screen" class="screen animated fadeInDef">\n\t\t\t\t<div class="screen__inner">\n\t\t\t\t\t<div id="' + this.CssIds_.MAIN + '" class="screen__main animated">\n\t\t\t\t\t\t<h1 class="screen__title">\u041A\u0440\u0435\u0441\u0442\u0438\u043A\u0438-\u043D\u043E\u043B\u0438\u043A\u0438</h1>\n\t\t\t\t\t\t<div class="screen__phrase">\u041A\u043B\u0430\u0441\u0441\u0438\u043A\u0430 \u0438\u0433\u0440\u043E\u0432\u043E\u0439 \u0438\u043D\u0434\u0443\u0441\u0442\u0440\u0438\u0438</div>\n\n\t\t\t\t\t\t<div class="screen__robot">\n\t\t\t\t\t\t\t<button type="button" id="' + this.CssIds_.START + '" class="screen__start">\u041D\u0430\u0447\u0430\u0442\u044C \u0438\u0433\u0440\u0443</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div id="game_mode" class="screen__mode animated is-hidden">\n\t\t\t\t\t\t<h2 class="screen__display">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0440\u0435\u0436\u0438\u043C \u0438\u0433\u0440\u044B:</h2>\n\t\t\t\t\t\t<button class="bg-color--pink" data-mode="training" data-players=\'{ "player1": "human", "player2": "computer" }\'>\u0422\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0430</button>\n\t\t\t\t\t\t<button class="bg-color--blue" data-mode="vs_computer" data-players=\'{ "player1": "human", "player2": "computer" }\'>\u0421 \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440\u043E\u043C</button>\n\t\t\t\t\t\t<button class="bg-color--gold" data-mode="vs_human" data-players=\'{ "player1": "human", "player2": "human1" }\'>\u0421 \u0447\u0435\u043B\u043E\u0432\u0435\u043A\u043E\u043C</button>\n\t\t\t\t\t\t<button class="bg-color--purple" data-mode="network" data-players=\'{ "player1": "human", "player2": "human1" }\' disabled>\u041F\u043E \u0441\u0435\u0442\u0438</button>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div id="' + this.CssIds_.SIDE + '" class="screen__side animated is-hidden">\n\t\t\t\t\t\t<h2 class="screen__display">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0442\u043E\u0440\u043E\u043D\u0443:</h2>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<button class="screen__side-cross ml-button--fab" type="button" data-side="cross">x</button>\n\t\t\t\t\t\t\t<button class="screen__side-nil ml-button--fab" type="button" data-side="nil">o</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div id="' + this.CssIds_.FIRST + '" class="screen__pick-move animated is-hidden">\n\t\t\t\t\t\t<h2 class="screen__display">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u0442\u043E \u0445\u043E\u0434\u0438\u0442 \u043F\u0435\u0440\u0432\u044B\u043C:</h2>\n\t\t\t\t\t\t<button class="ml-button--color" data-run="human">\u0412\u044B</button>\n\t\t\t\t\t\t<button class="ml-button--color" data-run="computer">\u041A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440</button>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div id="' + this.CssIds_.DICE + '" class="screen__dice is-hidden animated">\n\t\t\t\t\t\t<button class="ml-button--color screen__dice--button">\u041D\u0430\u0447\u0430\u0442\u044C</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t';

			document.getElementById(this.CssIds_.WRP).insertAdjacentHTML('beforeend', html);
			this.screen = document.getElementById(this.CssIds_.SCREEN);
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
							if (target.id && target.id === _this3.CssIds_.START) {
								var fullscreen = new ToggleScreen();
								setTimeout(function () {
									fullscreen.open();
								}, _this3.Constant_.FULLSCREEN_TIMING);
							}
							_this3.sound.play('click');
							_this3.switchLastScreen(target, arr);
							_this3.makeOptions(target, ['side', 'run', 'mode', 'players']);
							_this3.toggleView(arr[0], arr[1]).then(function (result) {
								arr.shift();
								return rec.call(_this3, result, arr);
							});
						});
						el.addEventListener('mouseover', function (e) {
							if (!e.target.classList.contains(_this3.CssClasses_.HIDDEN)) {
								_this3.sound.play('hover');
							}
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

			var handler = function handler(e) {
				_this5.makeView();
				_this5.sound = new Sound();
				_this5.options.sound = _this5.sound;
				_this5.controller().then(function (result) {
					_this5.screen.classList.toggle(_this5.CssClasses_.HIDDEN);
					_this5.screen.classList.toggle(_this5.CssClasses_.FADEOUT);
					document.getElementById(_this5.CssIds_.SCREEN).remove();

					var game = new Game(_this5.options);
					game.init().then(function (result) {
						return game.makeMove();
					});
				});
			};
			if (document.readyState !== 'loading') {
				handler();
			} else {
				document.addEventListener('DOMContentLoaded', handler);
			}
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
		this.mode = 'vs_computer';
		this.parti = 3;
		this.difficulty = 'hard';
		this.store = {};
		this.openMenu = false;
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
			chancePercent: 40,
			added: false,
			index: -1
		};
		Object.defineProperty(this.coinsData, 'needExp', {
			value: this.coinsData.getExpInterval,
			writable: true
		});
		this.__proto__.CssClasses_ = {
			FIELD: 'tttoe',
			CELL: 'tttoe__cell',
			TICK: 'tttoe__tick',
			STORE: 'tttoe__store',
			WIN: 'tttoe__cell--winner',
			HIDDEN: 'is-hidden',
			FADEIN_DEF: 'fadeInDef',
			FADE_OUT: 'fadeOut',
			MSG: 'message',
			AVATAR: 'tttoe__avatar',
			SHAKE: 'shake',
			MENU: 'tttoe__menu',
			FADEIN_LEFT: 'fadeInLeftBig',
			FADEIN_RIGHT: 'fadeOutRightBig',
			FLIP: 'flip',
			FLASH: 'flash',
			BOUNCE_IN: 'bounceIn',
			COIN: 'tttoe__coin',
			RUBBER_BAND: 'rubberBand'
		};
		this.__proto__.CssIds_ = {
			APP: 'game',
			CURSOR: 'comp_cursor',
			WRP: 'wrapper',
			CONTAINER: 'container',
			MSG: 'message',
			BAR: 'menu_bar',
			RESUME: 'resume',
			MAIN_MENU: 'main_menu',
			F10: 'f10',
			LVL: 'level',
			POINTS: 'points',
			EXP: 'experience',
			BONUS: 'bonus',
			COINS: 'coins',
			FIELD_WRP: 'field_wrp',
			VOLITION: 'volition'
		};
		this.__proto__.Constant_ = {
			RESTART_TIMING: 2000,
			CONFETTI_TIMING: 2000,
			TICK_TIMING: 500,
			MSG_ANIM_TIMING: 1500,
			ANIM_TIMING: 1000,
			BONUS_TIMING: 2000,
			SOUND_INTERVAL: 500,
			NEXT_LVL_TXT: 'След. ур.: ',
			WILL: 'Воля',
			VOLITION_COLOR: '#545bb0'
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

			var html = '\n\t\t\t<div id="container" class="layout__container is-hidden animated">\n\t\t\t\t<div id="game" class="layout__game">\n\t\t\t\t\t<div class="layout__header">\n\t\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t\t<div class="tttoe__coins">\n\t\t\t\t\t\t\t\t<div class="tttoe__coin animated"></div>\n\t\t\t\t\t\t\t\t<div id="' + this.CssIds_.COINS + '" class="tttoe__coins-count">' + this.coinsData.coins + '</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div id="menu_bar" class="tttoe__menu-bar">\n\t\t\t\t\t\t\t\t<button class="ml-button--dim">\n\t\t\t\t\t\t\t\t\t<svg class="tttoe__menu-bar-ico" xmlns="http://www.w3.org/2000/svg" width="42" height="43" fill="#585f80" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>\n\t\t\t\t\t\t\t\t\t<span id="f10" class="tttoe__menu-bar-key">f10</span>\n\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div id="status" class="tttoe__status row">\n\t\t\t\t\t\t\t<div id="player1" class="tttoe__player">\n\t\t\t\t\t\t\t\t<div class="tttoe__avatar">\n\t\t\t\t\t\t\t\t\t<img src="blocks/game/' + this.players.player1 + '.png" alt="" />\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="tttoe__name">' + this.playerFirstName + '</div>\n\t\t\t\t\t\t\t\t<div class="tttoe__store">0</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div id="player2" class="tttoe__player">\n\t\t\t\t\t\t\t\t<div class="tttoe__avatar">\n\t\t\t\t\t\t\t\t\t<img src="blocks/game/' + this.players.player2 + '.png" alt="" />\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="tttoe__name">' + this.playerSecondName + '</div>\n\t\t\t\t\t\t\t\t<div class="tttoe__store">0</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="layout__middle">\n\t\t\t\t\t\t<div id="' + this.CssIds_.FIELD_WRP + '" class="tttoe__field-wrp row row--center">\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<div id="comp_cursor" class="tttoe__computer-cursor is-hidden"></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="layout__footer">\n\t\t\t\t\t\t<div class="row row--right">\n\t\t\t\t\t\t\t<div class="tttoe__volition" data-title="' + this.Constant_.WILL + '">\n\t\t\t\t\t\t\t\t<div id="volition" class="tttoe__volition-count">0</div>\n\t\t\t\t\t\t\t\t<svg class="tttoe__volition-ico animated" width="42" height="42" fill="#ffffff" aria-hidden="true" data-prefix="fas" data-icon="brain" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M208 0c-29.87 0-54.74 20.55-61.8 48.22-.75-.02-1.45-.22-2.2-.22-35.34 0-64 28.65-64 64 0 4.84.64 9.51 1.66 14.04C52.54 138 32 166.57 32 200c0 12.58 3.16 24.32 8.34 34.91C16.34 248.72 0 274.33 0 304c0 33.34 20.42 61.88 49.42 73.89-.9 4.57-1.42 9.28-1.42 14.11 0 39.76 32.23 72 72 72 4.12 0 8.1-.55 12.03-1.21C141.61 491.31 168.25 512 200 512c39.77 0 72-32.24 72-72V205.45c-10.91 8.98-23.98 15.45-38.36 18.39-4.97 1.02-9.64-2.82-9.64-7.89v-16.18c0-3.57 2.35-6.78 5.8-7.66 24.2-6.16 42.2-27.95 42.2-54.04V64c0-35.35-28.66-64-64-64zm368 304c0-29.67-16.34-55.28-40.34-69.09 5.17-10.59 8.34-22.33 8.34-34.91 0-33.43-20.54-62-49.66-73.96 1.02-4.53 1.66-9.2 1.66-14.04 0-35.35-28.66-64-64-64-.75 0-1.45.2-2.2.22C422.74 20.55 397.87 0 368 0c-35.34 0-64 28.65-64 64v74.07c0 26.09 17.99 47.88 42.2 54.04 3.46.88 5.8 4.09 5.8 7.66v16.18c0 5.07-4.68 8.91-9.64 7.89-14.38-2.94-27.44-9.41-38.36-18.39V440c0 39.76 32.23 72 72 72 31.75 0 58.39-20.69 67.97-49.21 3.93.67 7.91 1.21 12.03 1.21 39.77 0 72-32.24 72-72 0-4.83-.52-9.54-1.42-14.11 29-12.01 49.42-40.55 49.42-73.89z"></path></svg>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="tttoe__exp-bar">\n\t\t\t\t\t\t\t\t<span id="' + this.CssIds_.POINTS + '" class="tttoe__exp-points animated">' + this.expData.points + '</span>\n\t\t\t\t\t\t\t\t<div id="' + this.CssIds_.EXP + '" class="tttoe__experience" data-next-lvl="' + this.Constant_.NEXT_LVL_TXT + ' ' + this.setNextLevelExp() + '"><span></span></div>\n\t\t\t\t\t\t\t\t<div id="level" class="tttoe__level">\u0423\u0440\u043E\u0432\u0435\u043D\u044C: <span class="animated">' + this.level + '</span></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="layout__popups">\n\t\t\t\t\t\t<div id="message" class="tttoe__message animated animated--msg"></div>\n\t\t\t\t\t\t<div class="tttoe__menu animated is-hidden">\n\t\t\t\t\t\t\t<div class="game-menu">\n\t\t\t\t\t\t\t\t<button id="' + this.CssIds_.RESUME + '" class="game-menu__action bg-color--blue">\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F</button>\n\t\t\t\t\t\t\t\t<button class="game-menu__action bg-color--pink">\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430</button>\n\t\t\t\t\t\t\t\t<button class="game-menu__action bg-color--gold">\u041E\u0431 \u0438\u0433\u0440\u0435</button>\n\t\t\t\t\t\t\t\t<button id="' + this.CssIds_.MAIN_MENU + '" class="game-menu__action bg-color--purple">\u0413\u043B\u0430\u0432\u043D\u043E\u0435 \u043C\u0435\u043D\u044E</button>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="tttoe__bonus animated is-hidden"><div id="bonus"></div></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t';

			var field = this.makeViewField();

			return new Promise(function (resolve, reject) {
				var handler = function handler(e) {
					var wrapper = document.getElementById(_this2.CssIds_.WRP);
					wrapper.insertAdjacentHTML('beforeend', html);
					_this2.fieldElement = document.getElementById(_this2.CssIds_.APP);
					document.getElementById(_this2.CssIds_.FIELD_WRP).firstElementChild.appendChild(field);
					_this2.appendRandomCoin();
					_this2.showView();
					resolve();
				};

				if (document.readyState === 'complete') {
					handler();
				} else {
					document.addEventListener('DOMContentLoaded', handler);
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
			this.setPoints(this.run);
			this.displayWinner(comb, axis);
			this.switchPartiPlayer();
			var winnerName = this.getPartiWinner();
			this.displayMessage(winnerName);
			if (winnerName) {
				this.setPoints(winnerName, true);
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
				var td = target.closest('td');

				if (target.tagName === 'DIV' && td) {
					var indx = td.id;
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

							if (this.randomCoinData.added && indx == this.randomCoinData.index) {
								this.coinsData.coins += 1;
								this.displayCoins(true).then(function (result) {
									_this4.makeMove();
								});
								this.randomCoinData.added = false;
							} else {
								this.makeMove();
							}
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
					result.cell = this.difficulty === 'hard' ? resultCompareHuman.cell : this.chooseRandomCell(resultCompareComputer);
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
		key: 'setPoints',
		value: function setPoints(winner, bonus) {
			var _this8 = this;

			if (this.mode === 'vs_computer') {
				if (!bonus) {
					this.expData.points = winner === 'human' ? this.expData.points + this.expData.winPointsGame : this.expData.points && this.expData.points - this.losePoints;
					this.expData.partiPoints += winner === 'human' ? this.expData.winPointsGame : 0;
				} else {
					this.expData.points = winner === 'human' ? this.expData.points + this.bonusPoints : this.expData.points - this.bonusLosePoints;
					this.expData.points = Number.parseInt(this.expData.points);
					setTimeout(function () {
						_this8.displayBonus(winner);
						_this8.expData.partiPoints = 0;
					}, this.Constant_.MSG_ANIM_TIMING);
				}
				if (this.gameWinPoints > 0) {
					this.levelUp();
				} else {
					this.levelDown();
				}
				this.setCoins();
				this.displayExperience();
			}
		}
	}, {
		key: 'setNextLevelExp',
		value: function setNextLevelExp() {
			this.expData.nextLevelExp = (this.expData.nextLevelExp || this.expData.currentLevelExp) + this.levelGrow.value + this.level * this.levelGrow.increase;
			return this.expData.nextLevelExp;
		}
	}, {
		key: 'setCurrentLevelExp',
		value: function setCurrentLevelExp() {
			if (this.level === 1) {
				this.expData.currentLevelExp = 0;
			} else {
				this.expData.currentLevelExp = this.expData.currentLevelExp + this.levelGrow.value + (this.level - 1) * this.levelGrow.increase - this.expData.currentLevelExp;
			}
		}
	}, {
		key: 'setCoins',
		value: function setCoins() {
			if (this.expData.points >= this.coinsData.needExp) {
				this.coinsData.coins += this.coinsData.getCoins;
				this.coinsData.thresholdExp += this.coinsData.getExpInterval;
				this.coinsData.needExp += this.coinsData.getExpInterval;
				this.displayCoins();
			}
		}
	}, {
		key: 'setVolition',
		value: function setVolition() {
			if (this.mode === 'vs_computer') {
				this.volitionData.value += 1;
				if (!(this.volitionData.value % this.volitionData.interval)) {
					var points = this.volitionData.points + this.volitionData.value * this.volitionData.increasePercent / 100;
					var tmp = this.expData.winPointsGame;
					this.expData.winPointsGame = points;
					this.setPoints('human');
					this.expData.winPointsGame = tmp;
					this.displayVolition(true, points);
				} else {
					this.displayVolition();
				}
			}
		}
	}, {
		key: 'levelUp',
		value: function levelUp() {
			var _this9 = this;

			if (this.expData.points >= this.expData.nextLevelExp) {
				this.level++;
				this.expData.currentLevelExp = this.expData.nextLevelExp;
				this.setNextLevelExp();
				setTimeout(function () {
					_this9.sound.play('level');
				}, this.Constant_.SOUND_INTERVAL + 200);
				this.displayLevel();
				document.getElementById(this.CssIds_.EXP).dataset.nextLvl = this.Constant_.NEXT_LVL_TXT + this.expData.nextLevelExp;
			}
		}
	}, {
		key: 'levelDown',
		value: function levelDown() {
			if (this.expData.points < this.expData.currentLevelExp) {
				this.level--;
				this.expData.nextLevelExp = this.expData.currentLevelExp;
				this.setCurrentLevelExp();
				this.displayLevel(false);
				document.getElementById(this.CssIds_.EXP).dataset.nextLvl = this.Constant_.NEXT_LVL_TXT + this.expData.nextLevelExp;
			}
		}
	}, {
		key: 'appendRandomCoin',
		value: function appendRandomCoin() {
			if (this.mode === 'vs_computer') {
				var chance = this.getRandomInt(0, 101);
				if (chance <= this.randomCoinData.chancePercent) {
					var i = this.getRandomInt(0, this.fieldSize);
					var coin = document.querySelector('.' + this.CssClasses_.COIN).cloneNode();
					coin.classList.add(this.CssClasses_.COIN + '--random');
					coin.classList.add(this.CssClasses_.HIDDEN);
					var cell = document.querySelectorAll('.' + this.CssClasses_.CELL)[i];
					cell.firstElementChild.appendChild(coin);
					this.randomCoinData.added = true;
					this.randomCoinData.index = i;
				}
			}
		}
	}, {
		key: 'getPartiWinner',
		value: function getPartiWinner() {
			var _this10 = this;

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
					_this10.resetStores();
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
			var _this11 = this;

			var playersNames = Object.values(this.players);
			this.run = this.partiRun = playersNames.find(function (v) {
				return v !== _this11.partiRun;
			});
		}
	}, {
		key: 'animate',
		value: function animate(el, cls) {
			var timing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
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
			// console.log( 'Winner is: ' + this.run );
		}
	}, {
		key: 'displayMessage',
		value: function displayMessage(str) {
			var _this12 = this;

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
						msg += ' ' + this.names[str];
				}

				elem.textContent = msg + '!';

				setTimeout(function () {
					elem.classList.remove(_this12.CssClasses_.MSG);
				}, this.Constant_.MSG_ANIM_TIMING);
			}
		}
	}, {
		key: 'displayExperience',
		value: function displayExperience() {
			var needLvlExp = this.expData.nextLevelExp - this.expData.currentLevelExp;
			var elem = document.getElementById(this.CssIds_.EXP);
			elem.firstElementChild.style.width = Number.parseInt(this.gameWinPoints / needLvlExp * 100) + '%';
			document.getElementById(this.CssIds_.POINTS).textContent = this.expData.points;
		}
	}, {
		key: 'displayBonus',
		value: function displayBonus(winner, volition) {
			var _this13 = this;

			var elem = document.getElementById(this.CssIds_.BONUS);
			if (!volition) {
				if (winner === 'human') {
					if (this.bonusPoints > 0) {
						elem.innerHTML = '<span class="tttoe__bonus-win">+' + Number.parseInt(this.bonusPoints) + '</span><span class="tttoe__bonus-msg">\u0411\u043E\u043D\u0443\u0441</span>';
					} else {
						return false;
					}
				} else {
					if (this.bonusLosePoints > 0) {
						elem.innerHTML = '<span class="tttoe__bonus-lose">-' + Number.parseInt(this.bonusLosePoints) + '</span><span class="tttoe__bonus-msg">\u041B\u0443\u0437</span>';
					} else {
						return false;
					}
				}
			} else {
				elem.innerHTML = '<span class="tttoe__bonus-volition">+' + volition + '</span><span class="tttoe__bonus-msg">\u0412\u043E\u043B\u044F</span>';
			}
			elem.parentNode.classList.toggle(this.CssClasses_.HIDDEN);
			this.sound.play('swing');
			this.animate(elem.parentNode, this.CssClasses_.FADEIN_LEFT, 0, false).then(function (result) {
				setTimeout(function () {
					_this13.sound.play('swing');
					_this13.animate(elem.parentNode, _this13.CssClasses_.FADEIN_RIGHT, _this13.Constant_.ANIM_TIMING).then(function (result) {
						elem.parentNode.classList.toggle(_this13.CssClasses_.HIDDEN);
						elem.parentNode.classList.toggle(_this13.CssClasses_.FADEIN_LEFT);
					});
				}, _this13.Constant_.BONUS_TIMING);
			});
		}
	}, {
		key: 'displayCoins',
		value: function displayCoins(randomCoin) {
			var _this14 = this;

			document.getElementById(this.CssIds_.COINS).textContent = this.coinsData.coins;
			var coin = document.querySelectorAll('.' + this.CssClasses_.COIN)[randomCoin ? 1 : 0];
			coin.classList.remove(this.CssClasses_.HIDDEN);
			if (!randomCoin) {
				this.animate(document.getElementById(this.CssIds_.POINTS), this.CssClasses_.FLASH, this.Constant_.ANIM_TIMING);
			}
			this.sound.play('coin');
			return new Promise(function (resolve, reject) {
				_this14.animate(coin, _this14.CssClasses_.FLIP, _this14.Constant_.ANIM_TIMING).then(function (result) {
					coin.remove();
					resolve();
				});
			});
		}
	}, {
		key: 'displayLevel',
		value: function displayLevel() {
			var _this15 = this;

			var anim = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

			var elem = document.getElementById(this.CssIds_.LVL).firstElementChild;
			elem.textContent = this.level;
			if (anim) {
				setTimeout(function () {
					_this15.animate(elem, _this15.CssClasses_.BOUNCE_IN, _this15.Constant_.ANIM_TIMING);
				}, this.Constant_.SOUND_INTERVAL + 200);
			}
		}
	}, {
		key: 'displayVolition',
		value: function displayVolition(anim, points) {
			var _this16 = this;

			var elem = document.getElementById(this.CssIds_.VOLITION);
			elem.textContent = this.volitionData.value;
			if (anim) {
				this.sound.play('will');
				elem.nextElementSibling.style.fill = this.Constant_.VOLITION_COLOR;
				this.animate(elem.nextElementSibling, this.CssClasses_.RUBBER_BAND, this.Constant_.ANIM_TIMING).then(function (result) {
					elem.nextElementSibling.style.fill = '#ffffff';
					_this16.displayBonus(null, points);
				});
			}
		}
	}, {
		key: 'restartMove',
		value: function restartMove() {
			var _this17 = this;

			return new Promise(function (resolve, reject) {
				setTimeout(function () {
					var fieldCells = Array.from(_this17.fieldCells);

					for (var i = 0; i < fieldCells.length; i++) {
						fieldCells[i].ticked = false;
						fieldCells[i].tickType = '';

						var td = document.getElementById(i);
						var remClass = Array.from(td.classList).find(function (v) {
							return (/winner/.test(v)
							);
						});
						td.classList.remove(remClass);
						var tick = td.querySelector('.' + _this17.CssClasses_.TICK);
						tick && tick.remove();

						_this17.count = 0;
						_this17.state = '';
					}

					var randomCoin = document.querySelector('.' + _this17.CssClasses_.FIELD).querySelector('.' + _this17.CssClasses_.COIN);
					randomCoin && randomCoin.remove();
					_this17.randomCoinData.added = false;
					_this17.randomCoinData.index = -1;

					_this17.appendRandomCoin();

					resolve();
				}, _this17.Constant_.RESTART_TIMING);
			});
		}
	}, {
		key: 'draw',
		value: function draw() {
			var _this18 = this;

			if (this.count === this.fieldSize) {
				this.sound.play('draw');
				this.displayMessage('draw');
				this.switchPartiPlayer();
				this.setVolition();
				this.restartMove().then(function (result) {
					_this18.makeMove();
				});
				return true;
			}
			return false;
		}
	}, {
		key: 'computerMoveAnimation',
		value: function computerMoveAnimation(id) {
			var _this19 = this;

			return new Promise(function (resolve, reject) {
				if (id >= 0) {
					var cell = document.getElementById(id);
					var cellCenter = cell.offsetWidth / 2;
					var cursor = document.getElementById(_this19.CssIds_.CURSOR);
					var positionTop = cell.offsetTop + cellCenter - cursor.offsetTop - cursor.offsetHeight + 'px';
					// const positionLeft = cell.offsetLeft + cellCenter - cursor.offsetLeft + 'px';
					var positionLeft = cursor.offsetLeft - cell.offsetLeft - cellCenter + 'px';

					cursor.classList.remove(_this19.CssClasses_.HIDDEN);
					cursor.style.top = positionTop;
					cursor.style.right = positionLeft;
					setTimeout(function () {
						cursor.classList.add(_this19.CssClasses_.HIDDEN);
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
		key: 'gameMenuBarActions',
		value: function gameMenuBarActions() {
			var _this20 = this;

			var menu = document.querySelector('.' + this.CssClasses_.MENU);
			document.getElementById(this.CssIds_.BAR).addEventListener('click', function (e) {
				var target = e.target;
				var findBtn = target.closest('button');
				if (findBtn) {
					_this20.sound.play('click');
					_this20.gameMenuToggle(menu);
					_this20.animate(menu, _this20.CssClasses_.FADEIN_DEF, 0, false);
					_this20.gameMenuActions(menu);
				}
			});
			Array.from(document.getElementById(this.CssIds_.BAR).querySelectorAll('button')).forEach(function (elem) {
				elem.addEventListener('mouseenter', function (e) {
					_this20.sound.play('hover');
				});
			});
			document.addEventListener('keyup', function (e) {
				if (e.key === 'F10') {
					if (!_this20.openMenu) {
						document.getElementById(_this20.CssIds_.F10).closest('button').click();
					}
				}
			});
		}
	}, {
		key: 'gameMenuActions',
		value: function gameMenuActions(menu) {
			var h = handler.bind(this);
			var h1 = handler1.bind(this);

			function handler(e) {
				var _this21 = this;

				var target = e.target;
				if (target.tagName === 'BUTTON') {
					this.animate(menu, this.CssClasses_.FADE_OUT, this.Constant_.ANIM_TIMING).then(function (result) {
						if (target.id === _this21.CssIds_.MAIN_MENU) {
							_this21.restartGame();
						}
						_this21.animate(menu, _this21.CssClasses_.FADEIN_DEF);
						_this21.gameMenuToggle(menu);
					});
					this.sound.play('click');
					menu.removeEventListener('click', h);
					menu.removeEventListener('mouseover', h1);
				}
			}
			function handler1(e) {
				if (e.target.tagName === 'BUTTON' && !e.target.classList.contains(this.CssClasses_.HIDDEN)) {
					this.sound.play('hover');
				}
			}
			menu.addEventListener('click', h);
			menu.addEventListener('mouseover', h1);
		}
	}, {
		key: 'gameMenuToggle',
		value: function gameMenuToggle(elem) {
			elem.classList.toggle(this.CssClasses_.HIDDEN);
			this.openMenu = !this.openMenu;
		}
	}, {
		key: 'restartGame',
		value: function restartGame() {
			var _this22 = this;

			var container = document.getElementById(this.CssIds_.CONTAINER);
			this.animate(container, this.CssClasses_.FADE_OUT, this.Constant_.ANIM_TIMING).then(function (result) {
				container.classList.remove(_this22.CssClasses_.FADEIN_DEF);
				container.classList.add(_this22.CssClasses_.HIDDEN);
				container.remove();

				var screen = new Screen();
				screen.init();
				screen.screen.classList.remove(_this22.CssClasses_.FADE_OUT);
				screen.screen.classList.remove(_this22.CssClasses_.HIDDEN);

				var fullscreen = new ToggleScreen();
				fullscreen.close();
			});
		}
	}, {
		key: 'init',
		value: function init() {
			var _this23 = this;

			this.countAxesValues();
			this.makeFieldCells();
			return new Promise(function (resolve, reject) {
				_this23.makeView().then(function (result) {
					_this23.gameMenuBarActions();
					resolve();
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
	}, {
		key: 'losePoints',
		get: function get() {
			return Number.parseInt(this.expData.winPointsGame * this.expData.losePercent / 100);
		}
	}, {
		key: 'bonusPoints',
		get: function get() {
			return this.expData.partiPoints * this.levelGrow.bonusPercent / 100;
		}
	}, {
		key: 'bonusLosePoints',
		get: function get() {
			return this.expData.partiPoints * this.levelGrow.bonusLosePercent / 100;
		}
	}, {
		key: 'gameWinPoints',
		get: function get() {
			return this.expData.points - this.expData.currentLevelExp;
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
