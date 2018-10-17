'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sound = function () {
	function Sound(options) {
		_classCallCheck(this, Sound);

		this.element_ = null;
		this.audio_ = null;
		this.playing = '';
		this.timings = {
			hover: { start: 0.00, end: 0.50, priority: 1 },
			click: { start: 1.00, end: 1.50, priority: 2 },
			tick: { start: 2.00, end: 2.50, priority: 3 },
			dice: { start: 3.00, end: 3.50, priority: 3 },
			flash: { start: 4.00, end: 5.00, priority: 3 },
			draw: { start: 5.50, end: 6.00, priority: 4 },
			win: { start: 6.50, end: 7.60, priority: 4 },
			point: { start: 8.00, end: 9.00, priority: 4 },
			swing: { start: 9.50, end: 10.40, priority: 6 },
			level: { start: 11.00, end: 11.70, priority: 7 },
			coin: { start: 12.00, end: 12.60, priority: 4 },
			will: { start: 13.00, end: 14.50, priority: 5 },
			tada: { start: 15.50, end: 17.00, priority: 3 },
			lock: { start: 17.50, end: 18.50, priority: 3 },
			coins: { start: 19.00, end: 19.80, priority: 3 },
			coin1: { start: 20.50, end: 22.00, priority: 3 }
		};
		this.fileName = 'sound.mp3';
		this.playerId = 'audio_player';
		this.wrapperId = 'wrapper';
		this.path = 'blocks/sound/';
		this.muted = false;
		Object.assign(this, options);
		this.init();
	}

	_createClass(Sound, [{
		key: 'appendPlayer',
		value: function appendPlayer() {
			this.removePlayer();
			var wrapper = document.getElementById(this.wrapperId);
			var html = '\n\t\t\t<div id="audio_player" class="sound">\n\t\t\t\t<audio preload="metadata" ' + (this.muted ? 'muted' : '') + '></audio>\n\t\t\t\t<button id="toggle_sound" class="ml-button--dim sound__toggle">\n\t\t\t\t\t<svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" fill="#585f80" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/><path d="M0 0h24v24H0z" fill="none"/></svg>\n\t\t\t\t\t<svg class="is-hidden" xmlns="http://www.w3.org/2000/svg" width="43" height="43" fill="#585f80" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>\n\t\t\t\t\t<span id="m" class="tttoe__key">m</span>\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t';

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
				return new Promise(function (resolve, reject) {
					if (_this.compareTracksPriority(name)) {
						if (_this.playing) {
							setTimeout(function () {
								_this.stop();
								resolve();
							}, _this.getSoundInterval(_this.playing));
						}
						_this.playing = name;
						_this.audio_.currentTime = _this.timings[name].start;
						var playPromise = _this.audio_.play();
						if (playPromise !== undefined) {
							playPromise.then(function (_) {
								_this.timerId = setTimeout(function () {
									_this.stop();
									resolve();
								}, _this.getSoundInterval(name));
							}).catch(function (error) {
								console.info(error);
							});
						}
					} else {
						resolve();
					}
				});
			}
		}
	}, {
		key: 'stop',
		value: function stop() {
			clearTimeout(this.timerId);
			this.audio_.pause();
			this.audio_.currentTime = 0;
			this.playing = '';
			return true;
		}
	}, {
		key: 'getSoundInterval',
		value: function getSoundInterval(name) {
			var add = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

			return (this.timings[name].end - this.timings[name].start) * 1e3 + add;
		}
	}, {
		key: 'mute',
		value: function mute() {
			this.audio_.muted = !this.audio_.muted;
		}
	}, {
		key: 'compareTracksPriority',
		value: function compareTracksPriority(name) {
			if (this.playing) {
				if (this.timings[this.playing].priority >= this.timings[name].priority) {
					return false;
				}
			}
			return true;
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
					if (e.key && e.key.toLowerCase() === 'm') {
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
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pagination = function () {
	function Pagination(allElements, limitPerPage) {
		_classCallCheck(this, Pagination);

		this.allElements = allElements;
		this.limitPerPage = limitPerPage;
		this.__proto__.CssClasses_ = {
			BLOCK: 'pagination',
			CONTAINER: 'pagination__marked-list',
			LIST: 'pagination__list',
			LINK: 'pagination__link',
			ACTIVE: 'pagination__link--active',
			MIX_BLOCK: 'tttoe__statistics-pagination',
			MIX_ACTION: 'tttoe__button-action'
		};
	}

	_createClass(Pagination, [{
		key: 'create',
		value: function create() {
			var _this = this;

			var fill = function fill() {
				var html = '';
				for (var i = 1; i <= _this.countPages; i++) {
					html += '<li class="' + _this.CssClasses_.LIST + '"><a href="#" class="' + _this.CssClasses_.MIX_ACTION + ' ' + _this.CssClasses_.LINK + ' ' + (i === 1 ? _this.CssClasses_.ACTIVE : '') + '">' + i + '</a></li>';
				}
				return html;
			};

			var html = '<div class="' + this.CssClasses_.BLOCK + ' ' + this.CssClasses_.MIX_BLOCK + '">\n\t\t\t<ul class="' + this.CssClasses_.CONTAINER + '">\n\t\t\t\t' + fill() + '\n\t\t\t</ul>\n\t\t</div>';

			return html;
		}
	}, {
		key: 'toggleActive',
		value: function toggleActive() {
			var _this2 = this;

			var block = document.querySelector('.' + this.CssClasses_.BLOCK);

			var handler = function handler(e) {
				var target = e.target;
				if (target.tagName === 'A') {
					var links = block.querySelectorAll('.' + _this2.CssClasses_.LINK);
					Array.from(links).forEach(function (elem) {
						return elem.classList.remove(_this2.CssClasses_.ACTIVE);
					});
					target.classList.add(_this2.CssClasses_.ACTIVE);
				}
			};

			block.addEventListener('click', handler);
		}
	}, {
		key: 'init',
		value: function init() {
			this.create();
		}
	}, {
		key: 'countPages',
		get: function get() {
			return this.allElements / this.limitPerPage <= 1 ? 1 : this.allElements / this.limitPerPage;
		}
	}]);

	return Pagination;
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

var SignIn = function () {
	function SignIn() {
		_classCallCheck(this, SignIn);

		this.lang = 'RU';
		this.__proto__.CssIds_ = {
			SIGN: 'sign_in'
		};
		this.__proto__.CssClasses_ = {
			HIDDEN: 'is-hidden',
			FOCUSED: 'is-focused',
			EYE: 'sign-in__view-pass',
			SHOW_PASS: 'sign-in__show-pass'
		};
		this.__proto__.Constant_ = {
			TEXTS: {
				NAME: {
					RU: 'Имя'
				},
				PASS: {
					RU: 'Пароль'
				},
				NAME_ERROR: {
					RU: 'Имя уже существует!'
				},
				PASS_ERROR: {
					RU: 'Введите пароль не менее 5 символов!'
				},
				TITLE: {
					RU: 'Войдите'
				},
				SUBMIT: {
					RU: 'Войти'
				}
			}
		};
	}

	_createClass(SignIn, [{
		key: 'create',
		value: function create() {
			var html = '\n\t\t\t<div id="sign_in" class="sign-in screen__sign-in animated is-hidden">\n\t\t\t\t<div class="screen__sign-in-inner">\n\t\t\t\t\t<h2 class="screen__display">' + this.Constant_.TEXTS.TITLE[this.lang] + '</h2>\n\t\t\t\t\t<div class="sign-in__row">\n\t\t\t\t\t\t<div class="sign-in__input-field">\n\t\t\t\t\t\t\t<input type="text" id="sign_in_name" class="sign-in__name" value="" />\n\t\t\t\t\t\t\t<label for="sign_in_name">' + this.Constant_.TEXTS.NAME[this.lang] + '</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="sign-in__input-error animated is-hidden">' + this.Constant_.TEXTS.NAME_ERROR[this.lang] + '</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="sign-in__row">\n\t\t\t\t\t\t<div class="sign-in__input-field">\n\t\t\t\t\t\t\t<input type="password" id="sign_in_pass" class="sign-in__password" minlength="5" value="" />\n\t\t\t\t\t\t\t<label for="sign_in_pass">' + this.Constant_.TEXTS.PASS[this.lang] + '</label>\n\t\t\t\t\t\t\t<button type="button" class="sign-in__view-pass ml-button--dim is-hidden"></button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="sign-in__input-error animated is-hidden">' + this.Constant_.TEXTS.PASS_ERROR[this.lang] + '</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<button type="submit">' + this.Constant_.TEXTS.SUBMIT[this.lang] + '</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>';

			return html;
		}
	}, {
		key: 'toggleHandler_',
		value: function toggleHandler_(o, type, targetSelector, actSelector) {
			var h = handler.bind(this);

			function handler(e) {
				var target = e.target;
				if (!e.currentTarget.classList.contains(this.CssClasses_.HIDDEN) && target.tagName.toLowerCase() === targetSelector) {
					var elemAct = target.parentNode.querySelector(actSelector);
					if (elemAct) {
						o.act(target, elemAct);
					}
				}
			}

			this.element_.addEventListener(type, h, true);
		}
	}, {
		key: 'toggleLabel_',
		value: function toggleLabel_() {
			var _this = this;

			this.toggleHandler_({
				act: function act(target, elem) {
					elem.classList.toggle(_this.CssClasses_.FOCUSED, target.value ? true : false);
				}
			}, 'blur', 'input', 'label');
		}
	}, {
		key: 'toggleEye_',
		value: function toggleEye_() {
			var _this2 = this;

			this.toggleHandler_({
				act: function act(target, elem) {
					elem.classList.toggle(_this2.CssClasses_.HIDDEN, !target.value.length ? true : false);
				}
			}, 'input', 'input', '.' + this.CssClasses_.EYE);
		}
	}, {
		key: 'togglePassword_',
		value: function togglePassword_() {
			this.toggleHandler_({
				act: function act(target, elem) {
					elem.type = 'text';
				}
			}, 'mousedown', 'button', 'input');

			this.toggleHandler_({
				act: function act(target, elem) {
					elem.type = 'password';
				}
			}, 'mouseup', 'button', 'input');
		}
	}, {
		key: 'init',
		value: function init() {
			this.element_ = document.getElementById(this.CssIds_.SIGN);
			if (this.element_) {
				this.toggleLabel_();
				this.toggleEye_();
				this.togglePassword_();
			}
		}
	}]);

	return SignIn;
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

	_createClass(Screen, [{
		key: 'makeView',
		value: function makeView() {
			var html = '\n\t\t\t<div id="screen" class="screen animated fadeInDef">\n\t\t\t\t<div class="screen__inner">\n\t\t\t\t\t<div id="' + this.CssIds_.MAIN + '" class="screen__main animated">\n\t\t\t\t\t\t<h1 class="screen__title">\u041A\u0440\u0435\u0441\u0442\u0438\u043A\u0438-\u043D\u043E\u043B\u0438\u043A\u0438</h1>\n\t\t\t\t\t\t<div class="screen__phrase">\u041A\u043B\u0430\u0441\u0441\u0438\u043A\u0430 \u0438\u0433\u0440\u043E\u0432\u043E\u0439 \u0438\u043D\u0434\u0443\u0441\u0442\u0440\u0438\u0438</div>\n\t\t\t\t\t\t<div class="screen__robot">\n\t\t\t\t\t\t\t<button type="button" id="' + this.CssIds_.START + '" class="screen__start">\u041D\u0430\u0447\u0430\u0442\u044C \u0438\u0433\u0440\u0443</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div id="' + this.CssIds_.MODE + '" class="screen__mode animated is-hidden">\n\t\t\t\t\t\t<h2 class="screen__display">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0440\u0435\u0436\u0438\u043C \u0438\u0433\u0440\u044B:</h2>\n\t\t\t\t\t\t<button class="bg-color--pink" data-mode="training" data-players=\'{ "player1": "human", "player2": "computer" }\'>\u0422\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0430</button>\n\t\t\t\t\t\t<button class="bg-color--blue" data-mode="vs_computer" data-players=\'{ "player1": "human", "player2": "computer" }\'>\u0421 \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440\u043E\u043C</button>\n\t\t\t\t\t\t<button class="bg-color--gold" data-mode="vs_human" data-players=\'{ "player1": "human", "player2": "human1" }\'>\u0421 \u0447\u0435\u043B\u043E\u0432\u0435\u043A\u043E\u043C</button>\n\t\t\t\t\t\t<button class="bg-color--purple" data-mode="network" data-players=\'{ "player1": "human", "player2": "human1" }\' disabled>\u041F\u043E \u0441\u0435\u0442\u0438</button>\n\t\t\t\t\t</div>\n\t\t\t\t\t' + this.signIn.create() + '\n\t\t\t\t\t<div id="' + this.CssIds_.DIFFICULTY + '" class="screen__difficulty animated is-hidden">\n\t\t\t\t\t\t<h2 class="screen__display">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u043B\u043E\u0436\u043D\u043E\u0441\u0442\u044C:</h2>\n\t\t\t\t\t\t<button class="bg-color--green" data-difficulty="child">\u0420\u0435\u0431\u0435\u043D\u043E\u043A</button>\n\t\t\t\t\t\t<button class="bg-color--blue" data-difficulty="easy">\u041B\u0435\u0433\u043A\u043E</button>\n\t\t\t\t\t\t<button class="bg-color--red" data-difficulty="hard">\u0421\u043B\u043E\u0436\u043D\u043E</button>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div id="' + this.CssIds_.SIDE + '" class="screen__side animated is-hidden">\n\t\t\t\t\t\t<h2 class="screen__display">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0442\u043E\u0440\u043E\u043D\u0443:</h2>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<button class="screen__side-cross ml-button--fab" type="button" data-side="cross">x</button>\n\t\t\t\t\t\t\t<button class="screen__side-nil ml-button--fab" type="button" data-side="nil">o</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div id="' + this.CssIds_.FIRST + '" class="screen__pick-move animated is-hidden">\n\t\t\t\t\t\t<h2 class="screen__display">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u0442\u043E \u0445\u043E\u0434\u0438\u0442 \u043F\u0435\u0440\u0432\u044B\u043C:</h2>\n\t\t\t\t\t\t<button class="ml-button--color" data-run="human">\u0412\u044B</button>\n\t\t\t\t\t\t<button class="ml-button--color" data-run="computer">\u041A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440</button>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div id="' + this.CssIds_.DICE + '" class="screen__dice is-hidden animated">\n\t\t\t\t\t\t<button class="ml-button--color screen__dice--button">\u041D\u0430\u0447\u0430\u0442\u044C</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t';

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
		key: 'animWinnerDice',
		value: function animWinnerDice(i) {
			var _this = this;

			setTimeout(function () {
				_this.sound.play('flash');
				var dice = document.querySelectorAll('.' + _this.CssClasses_.DICE)[i];
				dice.classList.remove(_this.CssClasses_.ROTATEIN);
				_this.animate(dice, _this.CssClasses_.FLASH);
			}, this.Constant_.ANIM_TIMING);
		}
	}, {
		key: 'hideDice',
		value: function hideDice() {
			var _this2 = this;

			return new Promise(function (resolve, reject) {
				setTimeout(function () {
					document.getElementById(_this2.CssIds_.DICE).querySelector('button').click();
					resolve();
				}, _this2.Constant_.DICE_HIDE_TIMING);
			});
		}
	}, {
		key: 'animate',
		value: function animate(el, cls) {
			var _this3 = this;

			if (el) {
				el.classList.add(cls);
				return new Promise(function (resolve, reject) {
					setTimeout(function () {
						resolve();
					}, _this3.Constant_.ANIM_TIMING);
				});
			}
			return false;
		}
	}, {
		key: 'toggleView',
		value: function toggleView(id1, id2) {
			var _this4 = this;

			var el1 = document.getElementById(id1);
			var el2 = document.getElementById(id2);
			if (el1) {
				return new Promise(function (resolve, reject) {
					_this4.animate(el1, _this4.CssClasses_.FADEOUT).then(function (result) {
						el1.remove();
						if (el2) {
							el2.classList.toggle(_this4.CssClasses_.HIDDEN);
							_this4.animate(el2, !_this4.dice ? _this4.CssClasses_.FADEIN : _this4.CssClasses_.FADEIN_DEF).then(function (result) {
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
			var _this6 = this;

			var btnStart = document.getElementById(this.CssIds_.START);
			var arrIds = [this.CssIds_.MAIN, this.CssIds_.MODE, this.CssIds_.SIDE, this.CssIds_.DICE];

			return new Promise(function (resolve, reject) {
				(function rec(el, arr) {
					var _this5 = this;

					if (arr.length) {
						if (arr.length === 1 && this.dice) {
							var i = this.throwDice();
							this.animWinnerDice(i);
							this.hideDice().then(function (result) {
								return resolve();
							});
						}
						el.addEventListener('click', function (e) {
							var target = e.target;
							if (target.tagName !== "BUTTON" || /sign/.test(target.className)) return;
							if (target.id && target.id === _this5.CssIds_.START) {
								var fullscreen = new ToggleScreen();
								setTimeout(function () {
									return fullscreen.open();
								}, _this5.Constant_.FULLSCREEN_TIMING);
							}
							if (target.dataset.mode === 'training') {
								arr.splice(1, 0, _this5.CssIds_.DIFFICULTY);
							}
							if (target.dataset.mode === 'vs_computer' || target.dataset.mode === 'network') {
								arr.splice(1, 0, _this5.CssIds_.SIGN);
							}
							_this5.sound.play('click');
							_this5.switchLastScreen(target, arr);
							_this5.makeOptions(target, ['side', 'run', 'mode', 'players', 'difficulty']);
							_this5.toggleView(arr[0], arr[1]).then(function (result) {
								arr.shift();
								return rec.call(_this5, result, arr);
							});
						});
						el.addEventListener('mouseover', function (e) {
							if (!e.target.classList.contains(_this5.CssClasses_.HIDDEN)) {
								_this5.sound.play('hover');
							}
						});
					} else {
						resolve();
					}
				}).call(_this6, btnStart, arrIds);
			});
		}
	}, {
		key: 'init',
		value: function init() {
			var _this7 = this;

			var handler = function handler(e) {
				_this7.signIn = new SignIn();
				_this7.makeView();
				_this7.signIn.init();
				_this7.sound = new Sound();
				_this7.options.sound = _this7.sound;
				_this7.controller().then(function (result) {
					_this7.screen.classList.toggle(_this7.CssClasses_.HIDDEN);
					_this7.screen.classList.toggle(_this7.CssClasses_.FADEOUT);
					document.getElementById(_this7.CssIds_.SCREEN).remove();
					var game = new Game(_this7.options);
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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var test = false;

var Game = function () {
	function Game(options) {
		_classCallCheck(this, Game);

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
		Object.defineProperty(this.coinsData, 'needExp', {
			value: this.coinsData.getExpInterval,
			writable: true
		});
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
			data: [{
				name: 'Саша',
				volition: 50,
				coins: 100,
				chip: 'star',
				level: 5
			}, {
				name: 'Виктор',
				volition: 30,
				coins: 70,
				chip: 'heart',
				level: 3
			}],
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
			}
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
		Object.assign(this, options);
		this.partiRun = this.run;
		console.log(this.difficulty);
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

			this.pagination = new Pagination(this.statistics.data.length, this.statistics.limit);
			var html = '\n\t\t\t<div id="container" class="layout__container is-hidden animated">\n\t\t\t\t<div id="game" class="layout__game">\n\t\t\t\t\t<div class="layout__header">\n\t\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t\t<div class="tttoe__coins">\n\t\t\t\t\t\t\t\t<div class="tttoe__coin animated"></div>\n\t\t\t\t\t\t\t\t<div id="' + this.CssIds_.COINS + '" class="tttoe__coins-count">' + this.coinsData.coins + '</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t\t\t<div id="chips_bar" class="tttoe__chips-bar">\n\t\t\t\t\t\t\t\t\t<button class="tttoe__button-action ml-button--dim" data-popup="' + this.CssClasses_.CHIPS + '">\n\t\t\t\t\t\t\t\t\t\t<div class="tttoe__chips-bar-ico"></div>\n\t\t\t\t\t\t\t\t\t\t<div id="f" class="tttoe__key">f</div>\n\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div id="menu_bar" class="tttoe__menu-bar">\n\t\t\t\t\t\t\t\t\t<button class="tttoe__button-action ml-button--dim" data-popup="' + this.CssClasses_.MENU + '">\n\t\t\t\t\t\t\t\t\t\t<div class="tttoe__menu-bar-ico"></div>\n\t\t\t\t\t\t\t\t\t\t<div id="f10" class="tttoe__key">f10</div>\n\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div id="status" class="tttoe__status row">\n\t\t\t\t\t\t\t<div id="player1" class="tttoe__player">\n\t\t\t\t\t\t\t\t<div class="tttoe__avatar">\n\t\t\t\t\t\t\t\t\t<img src="blocks/game/' + this.players.player1 + '.png" alt="" />\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="tttoe__name">' + this.playerFirstName + '</div>\n\t\t\t\t\t\t\t\t<div class="tttoe__store">0</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div id="player2" class="tttoe__player">\n\t\t\t\t\t\t\t\t<div class="tttoe__avatar">\n\t\t\t\t\t\t\t\t\t<img src="blocks/game/' + this.players.player2 + '.png" alt="" />\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="tttoe__name">' + this.playerSecondName + '</div>\n\t\t\t\t\t\t\t\t<div class="tttoe__store">0</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="layout__middle">\n\t\t\t\t\t\t<div id="' + this.CssIds_.FIELD_WRP + '" class="tttoe__field-wrp row row--center">\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<div id="comp_cursor" class="tttoe__computer-cursor is-hidden"></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="layout__footer">\n\t\t\t\t\t\t<div class="row row--right">\n\t\t\t\t\t\t\t<div class="tttoe__volition" data-title="' + this.Constant_.TEXTS.WILL.RU + '">\n\t\t\t\t\t\t\t\t<div id="volition" class="tttoe__volition-count">0</div>\n\t\t\t\t\t\t\t\t<svg class="tttoe__volition-ico animated" width="42" height="42" fill="#ffffff" aria-hidden="true" data-prefix="fas" data-icon="brain" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M208 0c-29.87 0-54.74 20.55-61.8 48.22-.75-.02-1.45-.22-2.2-.22-35.34 0-64 28.65-64 64 0 4.84.64 9.51 1.66 14.04C52.54 138 32 166.57 32 200c0 12.58 3.16 24.32 8.34 34.91C16.34 248.72 0 274.33 0 304c0 33.34 20.42 61.88 49.42 73.89-.9 4.57-1.42 9.28-1.42 14.11 0 39.76 32.23 72 72 72 4.12 0 8.1-.55 12.03-1.21C141.61 491.31 168.25 512 200 512c39.77 0 72-32.24 72-72V205.45c-10.91 8.98-23.98 15.45-38.36 18.39-4.97 1.02-9.64-2.82-9.64-7.89v-16.18c0-3.57 2.35-6.78 5.8-7.66 24.2-6.16 42.2-27.95 42.2-54.04V64c0-35.35-28.66-64-64-64zm368 304c0-29.67-16.34-55.28-40.34-69.09 5.17-10.59 8.34-22.33 8.34-34.91 0-33.43-20.54-62-49.66-73.96 1.02-4.53 1.66-9.2 1.66-14.04 0-35.35-28.66-64-64-64-.75 0-1.45.2-2.2.22C422.74 20.55 397.87 0 368 0c-35.34 0-64 28.65-64 64v74.07c0 26.09 17.99 47.88 42.2 54.04 3.46.88 5.8 4.09 5.8 7.66v16.18c0 5.07-4.68 8.91-9.64 7.89-14.38-2.94-27.44-9.41-38.36-18.39V440c0 39.76 32.23 72 72 72 31.75 0 58.39-20.69 67.97-49.21 3.93.67 7.91 1.21 12.03 1.21 39.77 0 72-32.24 72-72 0-4.83-.52-9.54-1.42-14.11 29-12.01 49.42-40.55 49.42-73.89z"></path></svg>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="tttoe__exp-bar">\n\t\t\t\t\t\t\t\t<span id="' + this.CssIds_.POINTS + '" class="tttoe__exp-points animated">' + this.expData.points + '</span>\n\t\t\t\t\t\t\t\t<div id="' + this.CssIds_.EXP + '" class="tttoe__experience" data-next-lvl="' + this.Constant_.TEXTS.NEXT_LVL_TXT.RU + ' ' + this.setNextLevelExp() + '"><span></span></div>\n\t\t\t\t\t\t\t\t<div id="level" class="tttoe__level">\u0423\u0440\u043E\u0432\u0435\u043D\u044C: <span class="animated">' + this.level + '</span></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="layout__popups">\n\t\t\t\t\t\t<div class="tttoe__chips layout__substrate animated is-hidden" data-flag="openChips">\n\t\t\t\t\t\t\t<div class="tttoe__chips-inner layout__popup">\n\t\t\t\t\t\t\t\t<h3>\u041C\u0430\u0433\u0430\u0437\u0438\u043D</h3>\n\t\t\t\t\t\t\t\t<div class="row row--left">\n\t\t\t\t\t\t\t\t\t' + this.fillScore() + '\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<button class="tttoe__chips-close tttoe__button-action ml-button--dim" type="button"></button>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="tttoe__statistics layout__substrate animated is-hidden">\n\t\t\t\t\t\t\t<div class="tttoe__statistics-inner layout__popup">\n\t\t\t\t\t\t\t\t<h3>\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430</h3>\n\t\t\t\t\t\t\t\t<div class="row row--left">\n\t\t\t\t\t\t\t\t\t' + this.fillStatistics() + '\n\t\t\t\t\t\t\t\t\t' + this.pagination.create() + '\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<button class="tttoe__chips-close tttoe__button-action ml-button--dim" type="button"></button>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="tttoe__about layout__substrate animated is-hidden">\n\t\t\t\t\t\t\t<div class="tttoe__about-inner layout__popup">\n\t\t\t\t\t\t\t\t<h3>\u041E\u0431 \u0438\u0433\u0440\u0435</h3>\n\t\t\t\t\t\t\t\t<p class="tttoe__about-text">\u041A\u0440\u0435\u0441\u0442\u0438\u043A\u0438-\u043D\u043E\u043B\u0438\u043A\u0438 - \u0438\u0433\u0440\u0430 \u043D\u0430\u0448\u0435\u0433\u043E \u0434\u0435\u0442\u0441\u0442\u0432\u0430.\n\t\t\t\t\t\t\t\t\u0418\u0433\u0440\u0430\u0439\u0442\u0435 \u043F\u0440\u043E\u0442\u0438\u0432 \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440\u0430, \u0434\u0440\u0443\u0433\u0430 \u0438\u043B\u0438 \u043F\u043E \u0441\u0435\u0442\u0438.\n\t\t\t\t\t\t\t\t\u041F\u043E\u043B\u0443\u0447\u0430\u0439\u0442\u0435 \u043E\u043F\u044B\u0442, \u043F\u0440\u043E\u043A\u0430\u0447\u0438\u0432\u0430\u0439\u0442\u0435 \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u0438 \u043E\u0442\u043A\u0440\u044B\u0432\u0430\u0439\u0442\u0435 \u044D\u043F\u0438\u0447\u043D\u044B\u0435 \u0444\u0438\u0448\u043A\u0438 \u0432 \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u0435.\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t<div class="tttoe__affiliate"></div>\n\t\t\t\t\t\t\t\t<p><b>\u0420\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A</b><br>\u0410\u043B\u0435\u043A\u0441\u0430\u043D\u0434\u0440 \u0420\u0430\u0434\u0435\u0432\u0438\u0447</p>\n\t\t\t\t\t\t\t\t<p><a href="http://operari.by" target="_blank">OPERARI</a></p>\n\t\t\t\t\t\t\t\t<button class="tttoe__chips-close tttoe__button-action ml-button--dim" type="button"></button>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="tttoe__menu layout__substrate animated is-hidden" data-flag="openMenu">\n\t\t\t\t\t\t\t<div class="game-menu">\n\t\t\t\t\t\t\t\t<button id="' + this.CssIds_.RESUME + '" class="game-menu__action tttoe__button-action bg-color--blue">\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F</button>\n\t\t\t\t\t\t\t\t<button class="game-menu__action tttoe__button-action bg-color--pink" data-popup="' + this.CssClasses_.STATISTICS + '">\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430</button>\n\t\t\t\t\t\t\t\t<button class="game-menu__action tttoe__button-action bg-color--gold" data-popup="' + this.CssClasses_.ABOUT + '">\u041E\u0431 \u0438\u0433\u0440\u0435</button>\n\t\t\t\t\t\t\t\t<button id="' + this.CssIds_.MAIN_MENU + '" class="game-menu__action tttoe__button-action bg-color--purple">\u0413\u043B\u0430\u0432\u043D\u043E\u0435 \u043C\u0435\u043D\u044E</button>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="tttoe__chips-unlock is-hidden">\n\t\t\t\t\t\t\t<div class="tttoe__chips-confetti animated">\n\t\t\t\t\t\t\t\t<img src="blocks/game/confetti.png" alt="" />\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div id="message" class="tttoe__message animated animated--msg"></div>\n\t\t\t\t\t\t<div class="tttoe__bonus animated is-hidden"><div id="bonus"></div></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t';

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
			container.classList.toggle(this.CssClasses_.ANIM.FADEIN_DEF);
		}
	}, {
		key: 'fillScore',
		value: function fillScore() {
			var html = '';

			for (var i = 0; i < this.score.length; i++) {
				var elem = this.score[i];
				var chip = '<button class="tttoe__chip tttoe__button-action ml-button--dim" data-index="' + i + '" ' + (elem.lock ? 'disabled' : '') + '>\n\t\t\t\t\t<div class="tttoe__chip-ico tttoe__' + elem.name + '"></div>\n\t\t\t\t\t<div class="tttoe__chip-footer">\n\t\t\t\t\t\t<span class="tttoe__coin tttoe__coin--mini animated"></span>\n\t\t\t\t\t\t<span class="tttoe__chip-cost">' + elem.cost + '</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t' + (elem.lock ? '<div class="tttoe__chip-lock"><div></div></div>' : '') + '\n\t\t\t\t\t<div class="tttoe__chip-side">' + elem.side + '</div>\n\t\t\t\t</button>';
				html += chip;
			}

			return html;
		}
	}, {
		key: 'fillStatistics',
		value: function fillStatistics() {
			var table = document.createElement('table');

			var appendRow = function appendRow() {
				var row = document.createElement('tr');
				table.appendChild(row);
				return row;
			};
			var row = appendRow();

			for (var i = 0; i < this.statistics.fields.ru.length; i++) {
				var headCell = document.createElement('th');
				headCell.textContent = this.statistics.fields.ru[i];
				row.appendChild(headCell);
			}

			for (var _i = 0; _i < this.statistics.data.length; _i++) {
				if (_i + 1 > this.statistics.limit) {
					break;
				}
				var o = this.statistics.data[_i];
				var _row = appendRow();
				for (var prop in o) {
					var cell = document.createElement('td');
					if (prop === 'chip') {
						cell.innerHTML = '<div class="tttoe__chip-ico tttoe__chip-ico--mini tttoe__' + o[prop] + '"></div>';
					} else if (prop === 'name') {
						cell.innerHTML = '<span></span><span>' + o[prop] + '</span>';
					} else {
						cell.textContent = o[prop];
					}
					_row.appendChild(cell);
				}
			}

			return table.outerHTML;
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
			var _this4 = this;

			return new Promise(function (resolve, reject) {
				_this4.setStore();
				_this4.setPoints(_this4.run);
				_this4.displayWinner(comb, axis);
				_this4.switchPartiPlayer();
				var winnerName = _this4.getGameWinner();
				if (winnerName) {
					_this4.displayMessage(winnerName);
					var loserName = _this4.getPartiLoser(winnerName);
					var winnerId = _this4.getPlayerId(winnerName);
					var loserId = _this4.getPlayerId(loserName);
					_this4.throwConfetti(document.getElementById(winnerId), _this4.Constant_.CONFETTI_TIMING);
					_this4.animate(document.getElementById(loserId).querySelector('.' + _this4.CssClasses_.AVATAR), _this4.CssClasses_.ANIM.SHAKE, _this4.Constant_.SHAK_TIMING);
					_this4.setPoints(winnerName, true).then(function (result) {
						_this4.resetStores();
						resolve();
					});
				} else {
					setTimeout(function () {
						return resolve();
					}, _this4.Constant_.RESTART_PARTI);
				}
			});
		}
	}, {
		key: 'doHuman',
		value: function doHuman(curr, next) {
			this.highlightMove();

			var h = handler.bind(this);

			function handler(e) {
				var _this5 = this;

				var target = e.target;
				var td = target.closest('td');

				if (target.tagName === 'DIV' && td) {
					var indx = td.id;
					var ticked = this.tick(indx, this.tickType[curr]);
					if (ticked) {
						this.fieldElement.removeEventListener('click', h);

						var winnerComb = this.checkWinnerCombination(false, curr);
						if (winnerComb) {
							this.actionsAfterWin(winnerComb.comb, winnerComb.axis).then(function (result) {
								_this5.restartParti().then(function (result) {
									_this5.makeMove();
								});
							});
						} else {
							if (this.players.player2 !== 'computer') {
								if (this.draw()) {
									return;
								}
							}
							this.run = next;

							if (this.randomCoinData.added && indx == this.randomCoinData.index) {
								this.setCoins(1, true).then(function (result) {
									_this5.makeMove();
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
			var _this6 = this;

			this.highlightMove();

			var result = this.analysis();
			var n = result.cell - 1;

			this.computerMoveAnimation(n).then(function (res) {
				var ticked = _this6.tick(n, _this6.tickType[_this6.run]);
				_this6.state = _this6.count === _this6.fieldSize && _this6.state !== 'win' ? 'draw' : _this6.state;
				if (_this6.state === 'win') {
					if (ticked) {
						_this6.actionsAfterWin(result.comb, result.axis).then(function (result) {
							_this6.restartParti().then(function (result) {
								_this6.makeMove();
							});
						});
					}
				} else if (_this6.state === 'draw') {
					_this6.count = _this6.fieldSize;
					_this6.draw();
				} else {
					if (ticked) {
						setTimeout(function () {
							_this6.run = 'human';
							_this6.makeMove();
						}, _this6.Constant_.TICK_TIMING);
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
			var _this7 = this;

			var comb = Array.from(this.fieldCells).filter(function (o) {
				return o.ticked && o.tickType === _this7.tickType[tickType];
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
		key: 'getRandomCell',
		value: function getRandomCell() {
			var ticked = false,
			    n = void 0;
			do {
				n = this.getRandomInt(0, this.fieldSize);
				ticked = this.isTickedCell(n);
			} while (ticked === true);

			return n + 1;
		}
	}, {
		key: 'analysis',
		value: function analysis() {
			var result = {};
			if (this.count < 2) {
				result.cell = this.getRandomCell();
			} else {
				var o = this.filterCells();
				var resultCompareComputer = this.makePotentialCells(o.emptyCells, o.computerCells, 'computer');
				var resultCompareHuman = this.makePotentialCells(o.emptyCells, o.humanCells, 'human');

				if (resultCompareComputer.cell) {
					if (this.difficulty === 'child' && this.count <= this.fieldSize - 2) {
						var randCell = this.getRandomCell();
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
					switch (this.difficulty) {
						case 'hard':
							result.cell = resultCompareHuman.cell;
							break;
						case 'easy':
							result.cell = resultCompareComputer.length ? this.chooseRandomCell(resultCompareComputer) : resultCompareHuman.cell;
							break;
						default:
							result.cell = this.getRandomCell();
					}
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
			var _this8 = this;

			var field = Array.from(this.fieldCells);
			var filteredCells = {};
			filteredCells.emptyCells = field.filter(function (o) {
				return !o.ticked;
			});
			filteredCells.humanCells = field.filter(function (o) {
				return o.tickType === _this8.tickType['human'];
			});
			filteredCells.computerCells = field.filter(function (o) {
				return o.tickType === _this8.tickType['computer'];
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
			var _this9 = this;

			return new Promise(function (resolve, reject) {
				if (_this9.mode === 'vs_computer') {
					if (!bonus) {
						_this9.expData.points = winner === 'human' ? _this9.expData.points + _this9.expData.winPointsGame : _this9.expData.points && _this9.expData.points - _this9.losePoints;
						_this9.expData.partiPoints += winner === 'human' ? _this9.expData.winPointsGame : 0;
					} else {
						_this9.expData.points = winner === 'human' ? _this9.expData.points + _this9.bonusPoints : _this9.expData.points - _this9.bonusLosePoints;
						_this9.expData.points = Number.parseInt(_this9.expData.points);
						setTimeout(function () {
							_this9.displayBonus(winner).then(function (result) {
								resolve();
							});
							_this9.expData.partiPoints = 0;
						}, _this9.Constant_.MSG_ANIM_TIMING);
					}
					if (_this9.gameWinPoints > 0) {
						_this9.levelUp();
					} else {
						_this9.levelDown();
					}
					_this9.setCoins();
					_this9.displayExperience();
				}
				setTimeout(function () {
					return resolve();
				}, _this9.Constant_.MSG_ANIM_TIMING);
			});
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
		value: function setCoins(force, randomCoin, sound) {
			var _this10 = this;

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
				return new Promise(function (resolve, reject) {
					_this10.displayCoins(randomCoin, false, sound).then(function (result) {
						_this10.unlockChips();
						resolve();
					});
				});
			}
		}
	}, {
		key: 'unlockChips',
		value: function unlockChips() {
			var _this11 = this;

			var chips = Array.from(this.score).filter(function (o) {
				return o.cost <= _this11.coinsData.coins && o.lock;
			});
			var chipsIcons = [];

			if (chips.length) {
				chips.forEach(function (o) {
					o.lock = false;
					var chipIco = document.querySelector('.' + _this11.CssClasses_.FIELD + '__' + o.name);
					var parent = chipIco.parentNode;
					parent.disabled = false;
					parent.querySelector('.' + _this11.CssClasses_.LOCK).remove();
					chipsIcons.push(chipIco);
				});
			}

			if (this.animateChips) {
				var i = 0;
				(function rec(arr, n) {
					var _this12 = this;

					if (n === arr.length) return;
					this.displayUnlockChip(arr[n]).then(function (result) {
						return rec.call(_this12, arr, ++n);
					});
				}).call(this, chipsIcons, i);
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
			var _this13 = this;

			if (this.expData.points >= this.expData.nextLevelExp) {
				this.level++;
				this.expData.currentLevelExp = this.expData.nextLevelExp;
				this.setNextLevelExp();
				setTimeout(function () {
					_this13.sound.play('level');
				}, this.Constant_.SOUND_INTERVAL + 200);
				this.displayLevel();
				document.getElementById(this.CssIds_.EXP).dataset.nextLvl = this.Constant_.TEXTS.NEXT_LVL_TXT.RU + this.expData.nextLevelExp;
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
				document.getElementById(this.CssIds_.EXP).dataset.nextLvl = this.Constant_.TEXTS.NEXT_LVL_TXT.RU + this.expData.nextLevelExp;
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
		key: 'getGameWinner',
		value: function getGameWinner() {
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
			var _this14 = this;

			var playersNames = Object.values(this.players);
			this.run = this.partiRun = playersNames.find(function (v) {
				return v !== _this14.partiRun;
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
		key: 'getSoundInterval',
		value: function getSoundInterval(name) {
			var add = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

			return (this.sound.timings[name].end - this.sound.timings[name].start) * 1e3 + add;
		}
	}, {
		key: 'getClassPickedChip',
		value: function getClassPickedChip(side) {
			var _this15 = this;

			if (this.run !== 'computer') {
				var chip = Array.from(this.score).find(function (o) {
					return o.pick && o.side === _this15.transSymbolTextSide(side);
				});
				if (chip) {
					return ' ' + this.CssClasses_.FIELD + '__' + chip.name;
				}
			}
			return '';
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
			tick.className = this.CssClasses_.TICK + ' ' + this.CssClasses_.TICK + '--' + this.tickType[this.run] + this.getClassPickedChip(type);
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
			var _this16 = this;

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
					elem.classList.remove(_this16.CssClasses_.MSG);
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
			var _this17 = this;

			return new Promise(function (resolve, reject) {
				var elem = document.getElementById(_this17.CssIds_.BONUS);
				if (!volition) {
					if (winner === 'human') {
						if (_this17.bonusPoints > 0) {
							elem.innerHTML = '<span class="tttoe__bonus-win">+' + Number.parseInt(_this17.bonusPoints) + '</span><span class="tttoe__bonus-msg">\u0411\u043E\u043D\u0443\u0441</span>';
						} else {
							return resolve();
						}
					} else {
						if (_this17.bonusLosePoints > 0) {
							elem.innerHTML = '<span class="tttoe__bonus-lose">-' + Number.parseInt(_this17.bonusLosePoints) + '</span><span class="tttoe__bonus-msg">\u041B\u0443\u0437</span>';
						} else {
							return resolve();
						}
					}
				} else {
					elem.innerHTML = '<span class="tttoe__bonus-volition">+' + volition + '</span><span class="tttoe__bonus-msg">\u0412\u043E\u043B\u044F</span>';
				}
				elem.parentNode.classList.toggle(_this17.CssClasses_.HIDDEN);
				_this17.sound.play('swing');
				_this17.animate(elem.parentNode, _this17.CssClasses_.ANIM.FADEIN_LEFT, 0, false).then(function (result) {
					setTimeout(function () {
						_this17.sound.play('swing');
						_this17.animate(elem.parentNode, _this17.CssClasses_.ANIM.FADEIN_RIGHT, _this17.Constant_.ANIM_TIMING).then(function (result) {
							elem.parentNode.classList.toggle(_this17.CssClasses_.HIDDEN);
							elem.parentNode.classList.toggle(_this17.CssClasses_.ANIM.FADEIN_LEFT);
						});
						resolve();
					}, _this17.Constant_.BONUS_TIMING);
				});
			});
		}
	}, {
		key: 'displayCoins',
		value: function displayCoins(randomCoin) {
			var _this18 = this;

			var animPoints = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
			var sound = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

			document.getElementById(this.CssIds_.COINS).textContent = this.coinsData.coins;
			var coin = document.querySelectorAll('.' + this.CssClasses_.COIN)[randomCoin ? 1 : 0];
			coin.classList.remove(this.CssClasses_.HIDDEN);
			if (animPoints) {
				this.animate(document.getElementById(this.CssIds_.POINTS), this.CssClasses_.ANIM.FLASH, this.Constant_.ANIM_TIMING);
			}
			if (sound) {
				this.sound.play('coin');
			}
			return new Promise(function (resolve, reject) {
				_this18.animate(coin, _this18.CssClasses_.ANIM.FLIP, _this18.Constant_.ANIM_TIMING).then(function (result) {
					randomCoin && coin.remove();
					resolve();
				});
			});
		}
	}, {
		key: 'displayLevel',
		value: function displayLevel() {
			var _this19 = this;

			var anim = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

			var elem = document.getElementById(this.CssIds_.LVL).firstElementChild;
			elem.textContent = this.level;
			if (anim) {
				setTimeout(function () {
					_this19.animate(elem, _this19.CssClasses_.ANIM.BOUNCE_IN, _this19.Constant_.ANIM_TIMING);
				}, this.Constant_.SOUND_INTERVAL + 200);
			}
		}
	}, {
		key: 'displayVolition',
		value: function displayVolition(anim, points) {
			var _this20 = this;

			var elem = document.getElementById(this.CssIds_.VOLITION);
			elem.textContent = this.volitionData.value;
			if (anim) {
				this.sound.play('will').then(function (result) {
					_this20.displayBonus(null, points);
				});
				elem.nextElementSibling.style.fill = this.Constant_.VOLITION_COLOR;
				this.animate(elem.nextElementSibling, this.CssClasses_.ANIM.RUBBER_BAND, this.Constant_.ANIM_TIMING).then(function (result) {
					elem.nextElementSibling.style.fill = '#ffffff';
				});
			}
		}
	}, {
		key: 'displayUnlockChip',
		value: function displayUnlockChip(elem) {
			var _this21 = this;

			return new Promise(function (resolve, reject) {
				var wrp = document.querySelector('.' + _this21.CssClasses_.UNLOCK_CHIPS);
				var confetti = wrp.querySelector('.' + _this21.CssClasses_.CONFETTI_STATIC);
				var btnAct = document.querySelector('.' + _this21.CssClasses_.BUTTON_ACT);
				var clone = elem.cloneNode();
				clone.classList.add(_this21.CssClasses_.ANIM.ANIMATED);
				var span = document.createElement('span');
				span.textContent = _this21.Constant_.TEXTS.NEW_CHIP.RU;
				span.className = _this21.CssClasses_.ANIM.ANIMATED;
				clone.appendChild(span);
				wrp.appendChild(clone);

				_this21.sound.play('swing');
				btnAct.disabled = true;
				wrp.classList.toggle(_this21.CssClasses_.HIDDEN);
				_this21.animate(confetti, _this21.CssClasses_.ANIM.BOUNCE_IN_DOWN, _this21.Constant_.ANIM_TIMING, false);
				_this21.animate(clone, _this21.CssClasses_.ANIM.BOUNCE_IN_UP, _this21.Constant_.ANIM_TIMING, false).then(function (result) {
					_this21.animate(span, _this21.CssClasses_.ANIM.TADA, 0, false);
					_this21.sound.play('tada').then(function (result) {
						_this21.sound.play('swing');
						_this21.animate(confetti, _this21.CssClasses_.ANIM.BOUNCE_OUT_DOWN, _this21.Constant_.ANIM_TIMING).then(function (result) {
							confetti.classList.remove(_this21.CssClasses_.ANIM.BOUNCE_IN_DOWN);
						});
						_this21.animate(clone, _this21.CssClasses_.ANIM.BOUNCE_OUT_UP, _this21.Constant_.ANIM_TIMING).then(function (result) {
							clone.remove();
							btnAct.disabled = false;
							wrp.classList.toggle(_this21.CssClasses_.HIDDEN);
							resolve();
						});
					});
				});
			});
		}
	}, {
		key: 'restartParti',
		value: function restartParti() {
			var _this22 = this;

			return new Promise(function (resolve, reject) {
				var fieldCells = Array.from(_this22.fieldCells);

				for (var i = 0; i < fieldCells.length; i++) {
					fieldCells[i].ticked = false;
					fieldCells[i].tickType = '';

					var td = document.getElementById(i);
					var remClass = Array.from(td.classList).find(function (v) {
						return (/winner/.test(v)
						);
					});
					td.classList.remove(remClass);
					var tick = td.querySelector('.' + _this22.CssClasses_.TICK);
					tick && tick.remove();

					_this22.count = 0;
					_this22.state = '';
				}

				var randomCoin = document.querySelector('.' + _this22.CssClasses_.FIELD).querySelector('.' + _this22.CssClasses_.COIN);
				randomCoin && randomCoin.remove();
				_this22.randomCoinData.added = false;
				_this22.randomCoinData.index = -1;

				_this22.appendRandomCoin();

				resolve();
			});
		}
	}, {
		key: 'toggleScoreChipsDisplay',
		value: function toggleScoreChipsDisplay(target, n) {
			var _this23 = this;

			var flag = target.classList.toggle(this.CssClasses_.CHIP_PICK);
			this.score[n].pick = flag;
			var chips = Array.from(document.querySelectorAll('.' + this.CssClasses_.CHIP));
			var chipMustDisable = chips.filter(function (v, i) {
				return _this23.score[i].pick && i != n;
			})[0];

			if (chipMustDisable) {
				chipMustDisable.classList.remove(this.CssClasses_.CHIP_PICK);
				var chip = this.score[chipMustDisable.dataset.index];
				chip.pick = false;
				return chip;
			}
			return false;
		}
	}, {
		key: 'toggleFieldChipsDisplay',
		value: function toggleFieldChipsDisplay(o) {
			var _this24 = this;

			var side = this.transSymbolTextSide(o.side);
			var chips = document.querySelectorAll('.' + this.CssClasses_.TICK + '--' + side);

			if (chips.length && this.tickType.human === side) {
				Array.from(chips).forEach(function (v) {
					return v.classList.toggle(_this24.CssClasses_.FIELD + '__' + o.name);
				});
			}
		}
	}, {
		key: 'transSymbolTextSide',
		value: function transSymbolTextSide(side) {
			if (side.length === 1) {
				return side === 'x' ? 'cross' : 'nil';
			} else {
				return side === 'cross' ? 'x' : 'o';
			}
		}
	}, {
		key: 'draw',
		value: function draw() {
			var _this25 = this;

			if (this.count === this.fieldSize) {
				this.displayMessage('draw');
				this.switchPartiPlayer();
				this.sound.play('draw').then(function (result) {
					_this25.setVolition();
					setTimeout(function () {
						_this25.restartParti().then(function (result) {
							_this25.makeMove();
						});
					}, _this25.Constant_.RESTART_PARTI);
				});
				return true;
			}
			return false;
		}
	}, {
		key: 'computerMoveAnimation',
		value: function computerMoveAnimation(id) {
			var _this26 = this;

			return new Promise(function (resolve, reject) {
				if (id >= 0) {
					var cell = document.getElementById(id);
					var cellCenter = cell.offsetWidth / 2;
					var cursor = document.getElementById(_this26.CssIds_.CURSOR);
					var positionTop = cell.offsetTop + cellCenter - cursor.offsetTop - cursor.offsetHeight + 'px';
					// const positionLeft = cell.offsetLeft + cellCenter - cursor.offsetLeft + 'px';
					var positionLeft = cursor.offsetLeft - cell.offsetLeft - cellCenter + 'px';

					cursor.classList.remove(_this26.CssClasses_.HIDDEN);
					cursor.style.top = positionTop;
					cursor.style.right = positionLeft;
					setTimeout(function () {
						cursor.classList.add(_this26.CssClasses_.HIDDEN);
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
		key: 'registerCallPopups',
		value: function registerCallPopups() {
			var _this27 = this;

			document.addEventListener('click', function (e) {
				var btn = _this27.findNode(e);
				if (btn) {
					var popupClassElem = btn.dataset && btn.dataset.popup;
					if (popupClassElem && !btn.disabled) {
						var popup = document.querySelector('.' + btn.dataset.popup);
						var p = _this27.popupToggle(popup);
						if (typeof p === 'boolean' && p) {
							//  Call menuActions, chipActions
							_this27[popupClassElem.replace(/^.+__/, '') + 'Actions'](popup);
						}
					}
				}
			});
		}
	}, {
		key: 'popupToggle',
		value: function popupToggle(elem) {
			var _this28 = this;

			var flag = elem.dataset.flag;
			if (this[flag]) {
				elem.removeEventListener('click', this.bindedHandler);
				return new Promise(function (resolve, reject) {
					_this28[flag] = !_this28[flag];
					_this28.animate(elem, _this28.CssClasses_.ANIM.FADE_OUT, _this28.Constant_.ANIM_TIMING).then(function (result) {
						elem.classList.remove(_this28.CssClasses_.ANIM.FADEIN_DEF);
						elem.classList.toggle(_this28.CssClasses_.HIDDEN);
						resolve();
					});
				});
			} else {
				elem.classList.toggle(this.CssClasses_.HIDDEN);
				this.animate(elem, this.CssClasses_.ANIM.FADEIN_DEF, 0, false);
				this[flag] = !this[flag];
				return true;
			}
		}
	}, {
		key: 'actionsHandler',
		value: function actionsHandler(o, elem) {
			this.bindedHandler = handler.bind(this);
			this.bindedElem = elem;

			function handler(e) {
				var target = e.target.closest('button') || e.target.closest('a');
				if (target) {
					o.act(target, elem);
					if (/(\b|__)close\b/.test(target.className)) {
						this.popupToggle(elem);
					}
				}
			}

			elem.addEventListener('click', this.bindedHandler);
		}
	}, {
		key: 'menuActions',
		value: function menuActions(elem) {
			var _this29 = this;

			this.actionsHandler({
				act: function act(target, elem) {
					_this29.popupToggle(elem).then(function (result) {
						if (target.id === _this29.CssIds_.MAIN_MENU) {
							_this29.restartGame();
						}
					});
				}
			}, elem);
		}
	}, {
		key: 'chipsActions',
		value: function chipsActions(elem) {
			var _this30 = this;

			this.actionsHandler({
				act: function act(target, elem) {
					if (target.classList.contains(_this30.CssClasses_.CHIP) && !target.disabled) {
						var i = target.dataset.index;
						var chip = _this30.score[i];
						if (_this30.buyChip(chip, i)) {
							var disabledChip = _this30.toggleScoreChipsDisplay(target, i);
							if (disabledChip) {
								_this30.toggleFieldChipsDisplay(disabledChip);
							}
							_this30.toggleFieldChipsDisplay(chip);
						} else {
							setTimeout(function () {
								_this30.sound.play('coin1');
							}, _this30.getSoundInterval('click'));
						}
					}
				}
			}, elem);
		}
	}, {
		key: 'statisticsActions',
		value: function statisticsActions(elem) {
			this.pagination.toggleActive();
			this.actionsHandler({
				act: function act(target, elem) {
					console.log('act');
				}
			}, elem);
		}
	}, {
		key: 'aboutActions',
		value: function aboutActions(elem) {
			this.actionsHandler({
				act: function act(target, elem) {}
			}, elem);
		}
	}, {
		key: 'buyChip',
		value: function buyChip(o, n) {
			var _this31 = this;

			if (!o.paid && this.coinsData.coins - o.cost >= 0) {
				this.setCoins(-o.cost, false, false);
				document.querySelector('button[data-index="' + n + '"]').querySelector('.' + this.CssClasses_.CHIPS_FOOT).innerHTML = '<div class="' + this.CssClasses_.CHIP_PAID + '"></div>';
				setTimeout(function () {
					_this31.sound.play('coins');
				}, this.getSoundInterval('click'));
				return o.paid = true;
			}
			return o.paid;
		}
	}, {
		key: 'restartGame',
		value: function restartGame() {
			var _this32 = this;

			var container = document.getElementById(this.CssIds_.CONTAINER);
			this.animate(container, this.CssClasses_.ANIM.FADE_OUT, this.Constant_.ANIM_TIMING).then(function (result) {
				container.classList.remove(_this32.CssClasses_.ANIM.FADEIN_DEF);
				container.classList.add(_this32.CssClasses_.HIDDEN);
				container.remove();

				var screen = new Screen();
				screen.init();
				screen.screen.classList.remove(_this32.CssClasses_.ANIM.FADE_OUT);
				screen.screen.classList.remove(_this32.CssClasses_.HIDDEN);

				var fullscreen = new ToggleScreen();
				fullscreen.close();
			});
		}
	}, {
		key: 'findNode',
		value: function findNode(e) {
			var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.CssClasses_.BUTTON_ACT;

			return e.target.closest('.' + selector);
		}
	}, {
		key: 'soundOfButtons',
		value: function soundOfButtons() {
			var _this33 = this;

			document.addEventListener('click', function (e) {
				var btn = _this33.findNode(e);
				if (btn) {
					if (btn.disabled && [].concat(_toConsumableArray(btn.children)).some(function (v) {
						return v.classList.contains(_this33.CssClasses_.LOCK);
					})) {
						_this33.sound.play('lock');
					} else {
						_this33.sound.play('click');
					}
				}
			});

			document.addEventListener('mouseover', function (e) {
				var btn = _this33.findNode(e);
				if (btn) {
					if (!btn.dataset.hover) {
						_this33.sound.play('hover');
						setTimeout(function () {
							btn.dataset.hover = '';
						}, 1000);
					}
					btn.dataset.hover = 1;
				}
			});
		}
	}, {
		key: 'triggers',
		value: function triggers() {
			var _this34 = this;

			document.addEventListener('keyup', function (e) {
				var hotkeys = Object.keys(_this34.CssIds_.HOTKEYS);
				var findKey = hotkeys.find(function (v) {
					return v === e.key.toLowerCase();
				});
				if (findKey) {
					if (_this34.bindedElem) {
						_this34.bindedElem.removeEventListener('click', _this34.bindedHandler);
					}
					document.getElementById(findKey).closest('button').click();
				}
			});
		}
	}, {
		key: 'init',
		value: function init() {
			var _this35 = this;

			this.countAxesValues();
			this.makeFieldCells();
			return new Promise(function (resolve, reject) {
				_this35.makeView().then(function (result) {
					_this35.soundOfButtons();
					_this35.triggers();
					_this35.registerCallPopups();
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

if (test) {
	var sound = new Sound();

	var game = new Game({
		sound: sound
	});

	game.init().then(function (result) {
		return game.makeMove();
	});
}
//# sourceMappingURL=maps/bundle.js.map
