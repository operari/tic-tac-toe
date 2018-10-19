'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

/**
 * Class repersenting a unique array.
 * @extends Array
 */
var UniqueArray = function (_extendableBuiltin2) {
	_inherits(UniqueArray, _extendableBuiltin2);

	function UniqueArray() {
		_classCallCheck(this, UniqueArray);

		return _possibleConstructorReturn(this, (UniqueArray.__proto__ || Object.getPrototypeOf(UniqueArray)).apply(this, arguments));
	}

	_createClass(UniqueArray, [{
		key: 'unique',

		/**
   * Creates a new array with unique values.
   *
   * @return {Array} Array with unique values.
   */
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

/**
 * Getting a random integer between two values.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 * @param  {Number} min The minimum is inclusive.
 * @param  {Number} max The maximum is exclusive.
 * @return {Number} Random number in range.
 * @private
 */


function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Class representing library animate.css */
var Animation = function () {
	/**
  * Creates animation.
  */
	function Animation() {
		_classCallCheck(this, Animation);

		this.on = true;
		this.timing = 1000;
		/**
   * Store strings for class names defined by this component that are used in JavaScript.
   *
   * @enum {(string | array)}
   * @private
  */
		this.__proto__.CssClasses_ = {
			ANIMATED: 'animated',
			HIDDEN: 'is-hidden',
			ATTENTION_SEEKERS: ['bounce', 'flash', 'headShake', 'headBeat', 'jello', 'pulse', 'rubberBand', 'shake', 'swing', 'tada', 'wobble', 'shakeHard'],
			BOUNCING_ENTRANCES: ['bounceIn', 'bounceInDown', 'bounceInLeft', 'bounceInRight', 'bounceInUp'],
			BOUCING_EXITS: ['bounceOut', 'bounceOutDown', 'bounceOutLeft', 'bounceOutRight', 'bounceOutUp'],
			FADING_ENTRANCES: ['fadeIn', 'fadeInDown', 'fadeInDownBig', 'fadeInLeft', 'fadeInLeftBig', 'fadeInRight', 'fadeInRightBig', 'fadeInUp', 'fadeInUpBig', 'fadeInScale'],
			FADING_EXITS: ['fadeOut', 'fadeOutDown', 'fadeOutDownBig', 'fadeOutLeft', 'fadeOutLeftBig', 'fadeOutRight', 'fadeOutRightBig', 'fadeOutUp', 'fadeOutUpBig', 'fadeOutScale', 'fadeOutScaleBig'],
			FLIPPERS: ['flip', 'flipInX', 'flipInY', 'flipOutX', 'flipOutY'],
			LIGHTSPEED: ['lightSpeedIn', 'lightSpeedOut'],
			ROTATING_ENTRANCES: ['rotateIn', 'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft', 'rotateInUpRight'],
			ROTATING_EXITS: ['rotateOut', 'rotateOutDownLeft', 'rotateOutDownRight', 'rotateOutUpLeft', 'rotateOutUpRight'],
			SLIDING_ENTRANCES: ['slideInDown', 'slideInLeft', 'slideInRight', 'slideInUp'],
			SLIDING_EXITS: ['slideOutDown', 'slideOutLeft', 'slideOutRight', 'slideOutUp'],
			SPECIALS: ['hinge', 'jackInTheBox', 'rollin', 'rollOut', 'lock'],
			ZOOMING_ENTRANCES: ['zoomIn', 'zoomInDown', 'zoomInLeft', 'zoomInRight', 'zoomInUp']
		};
	}

	/**
  * Gets section name.
  *
  * @param  {string} target Place which stores the animation.
  * @return {(string|boolean)} Found section.
  * @private
  */


	_createClass(Animation, [{
		key: 'getSection_',
		value: function getSection_(target) {
			var match = /^.+(?=_\d+$)/.exec(target);
			if (match) {
				return match[0].toUpperCase();
			}
			return false;
		}

		/**
   * Gets the position of the class.
   *
   * @param  {string} target Place wich stores the animation.
   * @return {number} Class index.
   * @private
   */

	}, {
		key: 'getClassPosition_',
		value: function getClassPosition_(target) {
			return (/\d+$/.exec(target)[0]
			);
		}

		// Public methods.

		/**
   * Animates of the element.
  
   * @param  {Element}  el     Animated element.
   * @param  {string}  target  Place which stores the animation.
   * @param  {boolean} del     Indicates whether the class to remove.
   * @param  {number}  timing  Timeout when animation end.
   * @param  {boolean} willBeHidden  Specifies whether to remove the class is-hidden after animation end.
   * @return {Promise} Promise, when the animation is finished.
   * @public
   */

	}, {
		key: 'animate',
		value: function animate(el, target) {
			var del = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

			var _this = this;

			var timing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.timing;
			var willBeHidden = arguments[4];

			return new Promise(function (resolve, reject) {
				if (target == '') resolve();
				var section = _this.getSection_(target);
				var n = _this.getClassPosition_(target);
				if (el) {
					if (el.classList.contains(_this.CssClasses_.HIDDEN)) {
						el.classList.remove(_this.CssClasses_.HIDDEN);
					}
					el.classList.add(_this.CssClasses_.ANIMATED);
					el.classList.add(_this.CssClasses_[section][n]);
					setTimeout(function () {
						if (del) {
							el.classList.remove(_this.CssClasses_.ANIMATED);
							el.classList.remove(_this.CssClasses_[section][n]);
							if (willBeHidden) {
								el.classList.add(_this.CssClasses_.HIDDEN);
							}
							if (window.savedAnimatesСlass) {
								el.classList.remove(window.savedAnimatesСlass);
							}
						} else {
							window.savedAnimatesСlass = _this.CssClasses_[section][n];
						}
						resolve();
					}, _this.on && timing);
				}
			});
		}

		/**
   * Finds the class name or the name of the section and the index class.
   *
   * @param  {string} criterion Target or class name.
   * @throws If class is invalid.
   * @return {(string|Object)} Class name or section name, class index.
   * @public
   */

	}, {
		key: 'find',
		value: function find(criterion) {
			var section = this.getSection_(criterion);
			if (section) {
				var n = this.getClassPosition_(criterion);
				return this.CssClasses_[section][n];
			} else {
				for (var prop in this.CssClasses_) {
					var value = this.CssClasses_[prop];
					if (Array.isArray(value)) {
						var foundIndex = value.findIndex(function (v) {
							return v === criterion;
						});
						if (~foundIndex) {
							var o = {
								section: prop.toLowerCase(),
								index: foundIndex
							};
							o.copy = o.section + '_' + o.index;
							return o;
						}
					}
				}
				throw new Error('Class ' + criterion + ' not found!');
			}
		}
	}]);

	return Animation;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Class representing a sound. */
var Sound = function () {
	/**
  * Creates a new sound.
  */
	function Sound(options) {
		_classCallCheck(this, Sound);

		this.element_ = null;
		this.audio_ = null;
		this.playing_ = '';
		this.muted_ = false;
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
		/**
   * Store strings for identifiers defined by this component that are used in JavaScript.
   *
   * @enum {string}
   * @private
  */
		this.__proto__.CssIds_ = {
			MUTE_KEY: 'm',
			PLAYER: 'audio_player',
			CONTAINER: 'wrapper'
		};
		/**
   * Store strings for class names defined by this component that are used in JavaScript.
   *
   * @enum {string}
   * @private
  */
		this.__proto__.CssClasses_ = {
			HIDDEN: 'is-hidden',
			MUTE: 'sound__toggle'
		};
		/**
   * Store constants in one place so they can be updated easily.
   *
   * @enum {string | number}
   * @private
  */
		this.__proto__.Constant_ = {
			MUTE_TIMING: 500,
			FILENAME: 'sound.mp3',
			PATH: 'blocks/sound/'
		};
		this.init();
	}

	/**
  * Inserts player into markup.
  *
  * @throws  Will throw an error if element not found.
  * @private
  */


	_createClass(Sound, [{
		key: 'insertPlayer_',
		value: function insertPlayer_() {
			this.removePlayer_();
			var wrapper = document.getElementById(this.CssIds_.CONTAINER);
			if (wrapper) {
				var html = '\n\t\t\t\t<div id="audio_player" class="sound">\n\t\t\t\t\t<audio preload="metadata" ' + (this.muted_ ? 'muted' : '') + '></audio>\n\t\t\t\t\t<button id="toggle_sound" class="ml-button--dim sound__toggle">\n\t\t\t\t\t\t<svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" fill="#585f80" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/><path d="M0 0h24v24H0z" fill="none"/></svg>\n\t\t\t\t\t\t<svg class="is-hidden" xmlns="http://www.w3.org/2000/svg" width="43" height="43" fill="#585f80" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>\n\t\t\t\t\t\t<span id="m" class="tttoe__key">m</span>\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t';

				wrapper.insertAdjacentHTML('beforeend', html);

				this.element_ = document.getElementById(this.CssIds_.PLAYER);
				this.audioTrack_();
			} else {
				throw new Error('Element wrapper not found!');
			}
		}

		/**
   * Removes player from markup.
   *
   * @private
   */

	}, {
		key: 'removePlayer_',
		value: function removePlayer_() {
			var player = document.getElementById(this.CssIds_.PLAYER);
			if (player) {
				player.remove();
			}
		}

		/**
   * Inserts track to play.
   *
   * @private
   */

	}, {
		key: 'audioTrack_',
		value: function audioTrack_() {
			if (this.Constant_.FILENAME) {
				this.audio_ = this.element_.querySelector('audio');
				this.audio_.src = this.Constant_.PATH + this.Constant_.FILENAME + '?v=' + Date.now();
			}
		}

		/**
   * Compares the priority of playing tracks.
   *
   * @param  {String} name Track name.
   * @return {Boolean} Is the priority of the track being played is greater, equal than the new track.
   * @private
   */

	}, {
		key: 'compareTracksPriority_',
		value: function compareTracksPriority_(name) {
			if (this.playing_) {
				// if the priority of the track being played is greater, the new track is not played.
				if (this.timings[this.playing_].priority >= this.timings[name].priority) {
					return false;
				}
			}
			// The priority of the new track greater...
			return true;
		}

		// Public methods.

		/**
   * Calculates track play time.
   *
   * @param  {String} name Track name.
   * @param  {Number} add  Addition milliseconds.
   * @return {Number} Play interval.
   * @public
   */

	}, {
		key: 'getSoundInterval',
		value: function getSoundInterval(name) {
			var add = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

			return (this.timings[name].end - this.timings[name].start) * 1e3 + add;
		}

		/**
   * Plays the track.
   *
   * @async
   * @param  {String} The name of the track being played.
   * @return {Promise<string>} Promise.
   * @public
   */

	}, {
		key: 'play',
		value: function play(name) {
			var _this = this;

			if (this.audio_) {
				return new Promise(function (resolve, reject) {
					if (_this.compareTracksPriority_(name)) {
						if (_this.playing_) {
							setTimeout(function () {
								_this.stop();
								resolve();
							}, _this.getSoundInterval(_this.playing_));
						}
						_this.playing_ = name;
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

		/**
   * Stops the track.
   *
   * @public
   */

	}, {
		key: 'stop',
		value: function stop() {
			clearTimeout(this.timerId);
			this.audio_.pause();
			this.audio_.currentTime = 0;
			this.playing_ = '';
		}

		/**
   * Mutes the track.
   *
   * @public
   */

	}, {
		key: 'mute',
		value: function mute() {
			this.audio_.muted = !this.audio_.muted;
		}

		/**
   * Initialize.
   */

	}, {
		key: 'init',
		value: function init() {
			var _this2 = this;

			var handler = function handler(e) {
				_this2.insertPlayer_();
				var btnMute = document.querySelector('.' + _this2.CssClasses_.MUTE);
				btnMute.addEventListener('click', function (e) {
					_this2.play('click');
					var btn = e.currentTarget;
					btn.children[+!_this2.audio_.muted].classList.remove(_this2.CssClasses_.HIDDEN);
					btn.children[+_this2.audio_.muted].classList.add(_this2.CssClasses_.HIDDEN);
					setTimeout(function (_) {
						return _this2.mute();
					}, _this2.Constant_.MUTE_TIMING);
				});
				btnMute.addEventListener('mouseenter', function (e) {
					_this2.play('hover');
				});
				document.addEventListener('keyup', function (e) {
					if (e.key && e.key.toLowerCase() === 'm') {
						document.getElementById(_this2.CssIds_.MUTE_KEY).parentNode.click();
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

/** Class representing a dice. */
var Dice = function () {
	/**
  * Creates a new dice.
  *
  * @param  {Element} container Container for new dice.
  * @return {Object} New dice instance.
  */
	function Dice(container) {
		_classCallCheck(this, Dice);

		this.container_ = container;
		this.sides_ = 6;
		this.dice_ = null;
		this.animate_ = true;
		/**
   * Store strings for class names defined by this component that are used in JavaScript.
   *
   * @enum {string}
   * @private
  */
		this.__proto__.CssClasses_ = {
			SIDE: 'dice__side',
			DOT: 'dice__dot',
			HIDDEN: 'is-hidden',
			DICE: 'dice',
			AUTO: 'layout__auto',
			ANIMATED: 'animated'
		};
		/**
   * Store constants in one place so they can be updated easily.
   *
   * @enum {(string | number)}
   * @private
  */
		this.__proto__.Constant_ = {
			ANIM_TIMING: 1000
		};
		this.init();
	}

	/**
  * Fill side with dotes.
  *
  * @param  {Element} el New side of the dice.
  * @param  {Number} n Quantity dotes on the side.
  * @return {Boolean} Is filled side.
  * @private
  */


	_createClass(Dice, [{
		key: 'makeDots_',
		value: function makeDots_(el, n) {
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

		// Public methods.

		/**
   * Creates a new dice element.
   *
   * @return {Element} New dice element.
   * @public
   */

	}, {
		key: 'create',
		value: function create() {
			this.dice_ = document.createElement('div');
			this.dice_.className = this.CssClasses_.DICE + ' ' + this.CssClasses_.AUTO + (this.animate_ ? ' ' + this.CssClasses_.ANIMATED + ' ' + this.CssClasses_.ROTATEIN : '');
			for (var i = 0, j = i + 1; i < this.sides_; i++, j++) {
				var side = document.createElement('div');
				side.className = this.CssClasses_.SIDE + ' ' + this.CssClasses_.SIDE + '--' + j + ' ' + this.CssClasses_.HIDDEN;
				if (this.makeDots_(side, j)) {
					this.dice_.appendChild(side);
				}
			}
			if (this.container_) {
				this.container_.appendChild(this.dice_);
			} else {
				return this.dice_;
			}
		}

		/**
   * Throw the dice.
   *
   * @return {Number} Number of displayed side ot the dice.
   * @public
   */

	}, {
		key: 'play',
		value: function play() {
			if (this.container_) {
				this.container_.classList.remove(this.CssClasses_.HIDDEN);
			}
			var n = getRandomInt(0, this.sides_);
			this.dice_.children[n].classList.remove(this.CssClasses_.HIDDEN);
			if (this.animate_) {
				var anim = new Animation();
				anim.animate(this.dice_, 'rotating_entrances_0', true, this.Constant_.ANIM_TIMING);
			}

			return n + 1;
		}

		/**
   * Initialize.
   */

	}, {
		key: 'init',
		value: function init() {
			if (this.container_) {
				this.create();
			}
		}
	}]);

	return Dice;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Class representing a confetti. */
var Confetti = function () {
	/**
  * Creates a new Confetti.
  *
  * @param  {string} id New item id.
  * @param  {number} count The amount of confetti displayed.
  * @return {Element} Confetti instance.
  */
	function Confetti(id, count) {
		_classCallCheck(this, Confetti);

		this.id_ = id;
		this.count_ = count;
		return this.init();
	}

	// Public methods.

	/**
  * Creates a new copy of confetti.
  *
  * @throws Will throw an error if element not found.
  * @return {Element} Confetti element for append.
  */


	_createClass(Confetti, [{
		key: 'create',
		value: function create() {
			var confetti = document.createElement('div');
			confetti.id = this.id_;
			confetti.className = 'confetti';
			if (confetti) {
				var i = this.count_;
				while (i > -1) {
					var elem = document.createElement('div');
					elem.className = 'confetti__' + i;
					confetti.appendChild(elem);

					i--;
				}

				return confetti;
			} else {
				throw new Error('Element confetti not found!');
			}
		}

		/**
   * Initialize.
   *
   * @return {Element} Confetti.
   */

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

/** Class representing a pagination. */
var Pagination = function () {
	/**
  * Creates a new pagination.
  *
  * @param  {Number} allElements  Quantity all elements for dislplay.
  * @param  {Number} limitPerPage Quantity elements displayed on page.
  */
	function Pagination(allElements, limitPerPage) {
		_classCallCheck(this, Pagination);

		this.allElements = allElements;
		this.limitPerPage = limitPerPage;
		/**
   * Store strings for class names defined by this component that are used in JavaScript.
   *
   * @enum {string}
   * @private
  */
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

	/**
  * Calculate amount elements for display.
  *
  * @return {Number} Elements for display.
  * @private
  */


	_createClass(Pagination, [{
		key: 'create',


		// Public methods.

		/**
   * Creates pagination markup.
   *
   * @return {string} Html markup.
   * @public
   */
		value: function create() {
			var _this = this;

			var fill = function fill() {
				var html = '';
				for (var i = 1; i <= _this.countPages_; i++) {
					html += '<li class="' + _this.CssClasses_.LIST + '"><a href="#" class="' + _this.CssClasses_.MIX_ACTION + ' ' + _this.CssClasses_.LINK + ' ' + (i === 1 ? _this.CssClasses_.ACTIVE : '') + '">' + i + '</a></li>';
				}
				return html;
			};

			var html = '<div class="' + this.CssClasses_.BLOCK + ' ' + this.CssClasses_.MIX_BLOCK + '">\n\t\t\t<ul class="' + this.CssClasses_.CONTAINER + '">\n\t\t\t\t' + fill() + '\n\t\t\t</ul>\n\t\t</div>';

			return html;
		}

		/**
   * Display the active pagination item.
   *
   * @public
   */

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
		key: 'countPages_',
		get: function get() {
			return this.allElements / this.limitPerPage <= 1 ? 1 : this.allElements / this.limitPerPage;
		}
	}]);

	return Pagination;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Class representing toggle screen of element. */
var ToggleScreen = function () {
	/**
  * Creates a new toggle.
  * @param  {Element} elem Element for toggle.
  */
	function ToggleScreen(elem) {
		_classCallCheck(this, ToggleScreen);

		this.elem = elem || document.documentElement;
	}

	// Public methods.

	/**
  * Open item in full screen
  *
  * @public
  */


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

		/**
   * Exit full screen
   *
   * @public
   */

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

/** Class representing sign in. */
var SignIn = function () {
	/**
  * Creates login ui.
  * @constructor
 */
	function SignIn() {
		_classCallCheck(this, SignIn);

		this.lang = 'RU';
		/**
   * Store strings for identifiers defined by this component that are used in JavaScript.
   *
   * @enum {string}
   * @private
  */
		this.__proto__.CssIds_ = {
			SIGN: 'sign_in'
		};
		/**
   * Store strings for class names defined by this component that are used in JavaScript.
   *
   * @enum {string}
   * @private
  */
		this.__proto__.CssClasses_ = {
			HIDDEN: 'is-hidden',
			FOCUSED: 'is-focused',
			EYE: 'sign-in__view-pass',
			SHOW_PASS: 'sign-in__show-pass'
		};
		/**
   * Store texts in one place so they can be updated easily.
   *
   * @enum {Object}
   * @private
  */
		this.__proto__.Texts_ = {
			NAME: { RU: 'Имя' },
			PASS: { RU: 'Пароль' },
			NAME_ERROR: { RU: 'Имя уже существует!' },
			PASS_ERROR: { RU: 'Введите пароль не менее 5 символов!' },
			TITLE: { RU: 'Войдите' },
			SUBMIT: { RU: 'Войти' }
		};
	}

	/**
  * Handle change of state.
  *
  * @param  {object} o Unique logic for each toggle method.
  * @param  {string} type The event type for fire.
  * @param  {string} targetSelector Element selector on which events are triggered.
  * @param  {string} actSelector Element selector for actions.
  * @private
  */


	_createClass(SignIn, [{
		key: 'toggleHandler_',
		value: function toggleHandler_(o, type, targetSelector, actSelector) {

			var handler = function (e) {
				var target = e.target;
				if (!e.currentTarget.classList.contains(this.CssClasses_.HIDDEN) && target.tagName.toLowerCase() === targetSelector) {
					var elemAct = target.parentNode.querySelector(actSelector);
					if (elemAct) {
						o.act(target, elemAct);
					}
				}
			}.bind(this);

			this.element_.addEventListener(type, handler, true);
		}

		/**
   * Toggle label position at event blur.
   *
   * @private
   */

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

		/**
   * Toggle display of eye icon at event input.
   *
   * @private
   */

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

		/**
   *	Toggle display of password text at event mousedown|mouseup.
   *
   * @private
   */

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

		// Public methods.

		/**
   * Create html login markup.
   *
   * @public
   * @return {string} Html markup.
   */

	}, {
		key: 'create',
		value: function create() {
			var html = '\n\t\t\t<div id="sign_in" class="sign-in screen__sign-in animated is-hidden">\n\t\t\t\t<div class="screen__sign-in-inner">\n\t\t\t\t\t<h2 class="screen__display">' + this.Texts_.TITLE[this.lang] + '</h2>\n\t\t\t\t\t<div class="sign-in__row">\n\t\t\t\t\t\t<div class="sign-in__input-field">\n\t\t\t\t\t\t\t<input type="text" id="sign_in_name" class="sign-in__name" value="" />\n\t\t\t\t\t\t\t<label for="sign_in_name">' + this.Texts_.NAME[this.lang] + '</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="sign-in__input-error animated is-hidden">' + this.Texts_.NAME_ERROR[this.lang] + '</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="sign-in__row">\n\t\t\t\t\t\t<div class="sign-in__input-field">\n\t\t\t\t\t\t\t<input type="password" id="sign_in_pass" class="sign-in__password" minlength="5" value="" />\n\t\t\t\t\t\t\t<label for="sign_in_pass">' + this.Texts_.PASS[this.lang] + '</label>\n\t\t\t\t\t\t\t<button type="button" class="sign-in__view-pass ml-button--dim is-hidden"></button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="sign-in__input-error animated is-hidden">' + this.Texts_.PASS_ERROR[this.lang] + '</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<button type="submit">' + this.Texts_.SUBMIT[this.lang] + '</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>';

			return html;
		}

		/**
   * Initialize element.
   */

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

/** Class representing a score. */
var Score = function () {
	/**
  * Creates a new score.
  * @param  {Object} options Rewrite options.
  */
	function Score(options) {
		_classCallCheck(this, Score);

		this.score = {};
		/**
   * Store strings for class names defined by this component that are used in JavaScript.
   *
   * @enum {string}
   * @private
  */
		this.__proto__.CssClasses_ = {
			SCORE: 'score__score',
			AVATAR: 'score__avatar',
			HIGHLIGHT: 'score__avatar--highlight'
		};
		Object.assign(this, options);
	}

	/**
  * Gets score names.
  *
  * @return {Array} Array of score names.
  * @private
  */


	_createClass(Score, [{
		key: 'getSumScore',


		// Public methods.

		/**
   * Gets sum score.
   *
   * @return {number} Sum of.
   * @public
   */
		value: function getSumScore() {
			return this.score_.reduce(function (a, b) {
				return a + b;
			});;
		}

		/**
   * Gets name of the rich man.
   *
   * @return {string} Name.
   * @public
   */

	}, {
		key: 'getNameRichScore',
		value: function getNameRichScore() {
			var n = Math.max.apply(null, this.score_);
			return this.scoreNames_[this.score_.findIndex(function (v) {
				return v === n;
			})];
		}

		/**
   * Sets score.
   *
   * @param {string} run      The player that moves.
   * @param {string} playerId Identifier of player that moves.
   * @public
   */

	}, {
		key: 'setScore',
		value: function setScore(run, playerId) {
			typeof this.score[run] === 'number' ? this.score[run] += 1 : this.score[run] = 1;
			this.displayScore(playerId, this.score[run]);
		}

		/**
   * Displays score.
   *
   * @param  {string} playerId Player identifier.
   * @param  {number} score Score to set.
   * @public
   */

	}, {
		key: 'displayScore',
		value: function displayScore(playerId, score) {
			document.getElementById(playerId).querySelector('.' + this.CssClasses_.SCORE).textContent = score;
		}

		/**
   * Resets score.
   *
   * @public
   */

	}, {
		key: 'resetScore',
		value: function resetScore() {
			this.score = {};
			var score = document.querySelectorAll('.' + this.CssClasses_.SCORE);

			for (var i = 0; i < score.length; i++) {
				score[i].textContent = 0;
			}
		}

		/**
   * Adds hightlight class on the avatar.
   *
   * @param {string} id The identifier of the parent element of the avatar.
   * @public
   */

	}, {
		key: 'highlightAvatar',
		value: function highlightAvatar(id) {
			var _this = this;

			var avatars = Array.from(document.querySelectorAll('.' + this.CssClasses_.AVATAR));
			avatars.forEach(function (el) {
				return el.classList[el.parentNode.id === id ? 'add' : 'remove'](_this.CssClasses_.HIGHLIGHT);
			});
		}

		/**
   * Creates score markup.
   *
   * @return {string} HTML markup.
   * @public
   */

	}, {
		key: 'create',
		value: function create() {
			var html = '\n\t\t\t<div class="score tttoe__score row">\n\t\t\t\t<div id="player1" class="score__player">\n\t\t\t\t\t<div class="score__avatar">\n\t\t\t\t\t\t<img src="blocks/game/' + this.players.player1 + '.png" alt="" />\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="score__name">' + this.playerFirstName + '</div>\n\t\t\t\t\t<div class="score__score">0</div>\n\t\t\t\t</div>\n\t\t\t\t<div id="player2" class="score__player">\n\t\t\t\t\t<div class="score__avatar">\n\t\t\t\t\t\t<img src="blocks/game/' + this.players.player2 + '.png" alt="" />\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="score__name">' + this.playerSecondName + '</div>\n\t\t\t\t\t<div class="score__score">0</div>\n\t\t\t\t</div>\n\t\t\t</div>';

			return html;
		}
	}, {
		key: 'scoreNames_',
		get: function get() {
			return Object.keys(this.score);
		}

		/**
   * Gets score.
   *
   * @return {Array} Array of score.
   * @private
   */

	}, {
		key: 'score_',
		get: function get() {
			return Object.values(this.score);
		}
	}]);

	return Score;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Class representing a coins */
var Coins = function () {
	/**
  * Creates a new coins.
  *
 	 * @param  {Object} options Rewrite options.
  */
	function Coins(options) {
		_classCallCheck(this, Coins);

		this.coinsData = {
			coins: 0,
			getExpInterval: 500,
			getCoins: 1,
			thresholdExp: 0
		};
		Object.defineProperty(this.coinsData, 'needExp', {
			value: this.coinsData.getExpInterval,
			writable: true
		});
		this.randomCoinData = {
			chancePercent: 30,
			added: false,
			index: -1
		};
		/**
   * Store string for class name defined by this compontent that are used in JavaScript.
   *
   * @enum {string}
   * @private
   */
		this.__proto__.CssClasses_ = {
			COIN: 'tttoe__coin',
			COIN_RAND: 'tttoe__coin--random',
			CELL: 'tttoe__cell',
			FIELD: 'tttoe',
			HIDDEN: 'is-hidden'
		};
		/**
   * Store strings for identifiers defined by this component that are used in JavaScript.
   *
   * @enum {string}
   * @private
   */
		this.__proto__.CssIds_ = {
			COINS: 'coins',
			POINTS: 'points'
		};
		Object.assign(this, options);
	}

	/**
  * Removes random coins from field.
  *
  * @param {Element} coin Html element representing a coin.
  * @parivate
  */


	_createClass(Coins, [{
		key: 'removeRandomCoin_',
		value: function removeRandomCoin_(coin) {
			var randomCoin = coin || document.querySelector('.' + this.CssClasses_.FIELD).querySelector('.' + this.CssClasses_.COIN);
			if (randomCoin) {
				randomCoin.remove();
				this.randomCoinData.added = false;
				this.randomCoinData.index = -1;
			}
		}

		// Public methods.

		/**
   * Adds a coin to a random cell field.
   *
   * @public
   */

	}, {
		key: 'appendRandomCoin',
		value: function appendRandomCoin() {
			if (this.mode === 'vs_computer') {
				this.removeRandomCoin_();
				var chance = getRandomInt(0, 101);
				if (chance <= this.randomCoinData.chancePercent) {
					var i = getRandomInt(0, this.fieldSize);
					var coin = document.querySelector('.' + this.CssClasses_.COIN).cloneNode();
					coin.classList.add(this.CssClasses_.COIN_RAND);
					coin.classList.add(this.CssClasses_.HIDDEN);
					var cell = document.querySelectorAll('.' + this.CssClasses_.CELL)[i];
					cell.firstElementChild.appendChild(coin);
					this.randomCoinData.added = true;
					this.randomCoinData.index = i;
				}
			}
		}

		/**
   * Sets coins.
   *
   * @param {number} points     Experience points.
   * @param {number} force      Add coin directly.
   * @param {boolean} randomCoin Flag to display random coins.
   * @param {boolean} sound      Flag to play the sound.
   * @return {Promise} Promise
   * @public
   */

	}, {
		key: 'setCoins',
		value: function setCoins(points, force, randomCoin, sound) {
			var _this = this;

			if (!force) {
				if (points >= this.coinsData.needExp) {
					this.coinsData.coins += this.coinsData.getCoins;
					this.coinsData.thresholdExp += this.coinsData.getExpInterval;
					this.coinsData.needExp += this.coinsData.getExpInterval;
					this.displayCoins();
					// this.unlockChips();
				}
			} else {
				this.coinsData.coins += force;
				return new Promise(function (resolve, reject) {
					_this.displayCoins(randomCoin, false, sound).then(function (result) {
						// this.unlockChips();
						resolve();
					});
				});
			}
		}

		/**
   * Displays earned coins.
   *
   * @param  {boolean} randomCoin Determines whether a random coin for display.
   * @param  {boolean} animPoints Determines whether to animate the points.
   * @param  {boolean} sound      Determines whether include the sound.
   * @return {Promise} Promise
   * @public
   */

	}, {
		key: 'displayCoins',
		value: function displayCoins(randomCoin) {
			var _this2 = this;

			var animPoints = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
			var sound = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

			document.getElementById(this.CssIds_.COINS).textContent = this.coinsData.coins;
			var coin = document.querySelectorAll('.' + this.CssClasses_.COIN)[randomCoin ? 1 : 0];
			coin.classList.remove(this.CssClasses_.HIDDEN);
			if (animPoints) {
				this.anim.animate(document.getElementById(this.CssIds_.POINTS), 'attention_seekers_1');
			}
			if (sound) {
				this.sound.play('coin');
			}
			return new Promise(function (resolve, reject) {
				_this2.anim.animate(coin, 'flippers_0').then(function (result) {
					if (randomCoin) {
						_this2.removeRandomCoin_(coin);
					}
					resolve();
				});
			});
		}

		/**
   * Compares the index of the random coins of a given position.
   *
   * @param  {number} n The external position.
   * @return {boolean}  The comparison of indexes.
   * @public
   */

	}, {
		key: 'compareRandomCoinIndex',
		value: function compareRandomCoinIndex(n) {
			if (this.randomCoinData.added && n == this.randomCoinData.index) {
				return true;
			}
			return false;
		}

		/**
   * Creates coins makrup.
   *
   * @return {string} Html markup.
   * @public
   */

	}, {
		key: 'create',
		value: function create() {
			var html = '\n\t\t\t<div class="tttoe__coins">\n\t\t\t\t<div class="tttoe__coin"></div>\n\t\t\t\t<div id="' + this.CssIds_.COINS + '" class="tttoe__coins-count">' + this.coinsData.coins + '</div>\n\t\t\t</div>';

			return html;
		}
	}]);

	return Coins;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Class representing a experience */
var Experience = function () {
	/**
  * Creates a new experience.
 
 	 * @param  {Object} options Rewrite options.
  */
	function Experience(options) {
		_classCallCheck(this, Experience);

		this.lang = 'RU';
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
		this.volitionData = {
			value: 0,
			interval: 10,
			points: 99,
			increasePercent: 20
		};
		/**
   * Store strings for class names defined by this component that are used in JavaScript.
   *
   * @enum {string}
   * @private
  */
		this.__proto__.CssClasses_ = {
			BONUS_WIN: 'experience__bonus-win',
			BONUS_LOSE: 'experience__bonus-lose',
			BONUS_WILL: 'experience__bonus-volition',
			HIDDEN: 'is-hidden'
		};
		/**
   * Store strings for identifiers defined by this component that are used in JavaScript.
   *
   * @enum {string}
   * @private
  */
		this.__proto__.CssIds_ = {
			EXP: 'experience',
			POINTS: 'points',
			BONUS: 'bonus',
			LVL: 'level',
			VOLITION: 'volition',
			MSG: 'message'
		};
		/**
   * Store constants in one place so they can be updated easily.
   *
   * @enum {(string | number)}
   * @private
  */
		this.__proto__.Constant_ = {
			MSG_ANIM_TIMING: 1500,
			BONUS_TIMING: 2000,
			SOUND_INTERVAL: 500,
			VOLITION_COLOR: '#545bb0'
		};
		/**
   * Store texts in one place so they can be updated easily.
   *
   * @enum {(object | string)}
   * @private
  */
		this.__proto__.Texts_ = {
			NEXT_LVL_TXT: { RU: 'След. ур.: ' },
			WILL: { RU: 'Воля' },
			BONUS: { RU: 'Бонус' },
			LOSE: { RU: 'Луз' },
			LEVEL: { RU: 'Уровень' },
			WIN: { RU: 'Выиграл' },
			DRAW: { RU: 'Ничья' },
			YOU: { RU: 'Вы' }
		};
		Object.assign(this, options);
	}

	/**
  * Gets points loss.
  *
  * @return {number} Points.
  * @private
  */


	_createClass(Experience, [{
		key: 'setNextLevelExp_',


		/**
   * Sets next level experience.
   *
   * @return {number} Points.
   * @private
   */
		value: function setNextLevelExp_() {
			this.expData.nextLevelExp = (this.expData.nextLevelExp || this.expData.currentLevelExp) + this.levelGrow.value + this.level * this.levelGrow.increase;
			return this.expData.nextLevelExp;
		}

		/**
   * Sets current level experience.
   *
   * @private
   */

	}, {
		key: 'setCurrentLevelExp_',
		value: function setCurrentLevelExp_() {
			if (this.level === 1) {
				this.expData.currentLevelExp = 0;
			} else {
				this.expData.currentLevelExp = this.expData.currentLevelExp + this.levelGrow.value + (this.level - 1) * this.levelGrow.increase - this.expData.currentLevelExp;
			}
		}

		/**
   * Raises the level.
   *
   * @private
   */

	}, {
		key: 'levelUp_',
		value: function levelUp_() {
			if (this.expData.points >= this.expData.nextLevelExp) {
				this.level++;
				this.expData.currentLevelExp = this.expData.nextLevelExp;
				this.setNextLevelExp_();
				this.displayLevel();
			}
		}

		/**
   * Lowers the level.
   *
   * @private
   */

	}, {
		key: 'levelDown_',
		value: function levelDown_() {
			if (this.expData.points < this.expData.currentLevelExp) {
				this.level--;
				this.expData.nextLevelExp = this.expData.currentLevelExp;
				this.setCurrentLevelExp_();
				this.displayLevel(false);
			}
		}

		// Public methods.

		/**
   * Sets points.
   *
   * @param {string} winner Winner name of party or game.
   * @param {boolean} bonus Determines whether additional bonus points.
   * @public
   */

	}, {
		key: 'setPoints',
		value: function setPoints(winner, bonus) {
			var _this = this;

			return new Promise(function (resolve, reject) {
				if (_this.mode === 'vs_computer') {
					if (!bonus) {
						_this.expData.points = winner === 'human' ? _this.expData.points + _this.expData.winPointsGame : _this.expData.points && _this.expData.points - _this.losePoints_;
						_this.expData.partiPoints += winner === 'human' ? _this.expData.winPointsGame : 0;
					} else {
						_this.expData.points = winner === 'human' ? _this.expData.points + _this.bonusPoints_ : _this.expData.points - _this.bonusLosePoints_;
						_this.expData.points = Number.parseInt(_this.expData.points);
						setTimeout(function (_) {
							_this.displayBonus(winner).then(function (result) {
								resolve();
							});
							_this.expData.partiPoints = 0;
						}, _this.Constant_.MSG_ANIM_TIMING);
					}
					if (_this.gameWinPoints_ > 0) {
						_this.levelUp_();
					} else {
						_this.levelDown_();
					}
					_this.coins.setCoins(_this.expData.points);
					_this.displayExperience();
				}
				setTimeout(function () {
					return resolve();
				}, _this.Constant_.MSG_ANIM_TIMING);
			});
		}

		/**
   * Sets will.
   *
   * @public
   */

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

		/**
   * Displays bonus points.
   *
   * @param  {string} winner   The name of winner game.
   * @param  {number} volition Bonus points for the will.
   * @return {Promise} Promise.
   * @public
   */

	}, {
		key: 'displayBonus',
		value: function displayBonus(winner, volition) {
			var _this2 = this;

			return new Promise(function (resolve, reject) {
				var elem = document.getElementById(_this2.CssIds_.BONUS);
				var target = null;
				if (!volition) {
					if (winner === 'human') {
						if (_this2.bonusPoints_ > 0) {
							target = elem.querySelector('.' + _this2.CssClasses_.BONUS_WIN);
							target.textContent = +Number.parseInt(_this2.bonusPoints_);
						} else {
							return resolve();
						}
					} else {
						if (_this2.bonusLosePoints_ > 0) {
							target = elem.querySelector('.' + _this2.CssClasses_.BONUS_LOSE);
							target.textContent = -Number.parseInt(_this2.bonusLosePoints_);
						} else {
							return resolve();
						}
					}
				} else {
					target = elem.querySelector('.' + _this2.CssClasses_.BONUS_WILL);
					target.textContent = volition;
				}
				target.parentNode.classList.remove(_this2.CssClasses_.HIDDEN);
				_this2.sound.play('swing');
				_this2.anim.animate(elem.parentNode, 'fading_entrances_4', false, 0).then(function (result) {
					setTimeout(function (_) {
						_this2.sound.play('swing');
						_this2.anim.animate(elem.parentNode, 'fading_exits_6', undefined, undefined, true).then(function (result) {
							return target.parentNode.classList.add(_this2.CssClasses_.HIDDEN);
						});
						resolve();
					}, _this2.Constant_.BONUS_TIMING);
				});
			});
		}

		/**
   * Displays level.
   *
   * @param  {boolean} anim Determines whether the animation level.
   * @public
   */

	}, {
		key: 'displayLevel',
		value: function displayLevel() {
			var _this3 = this;

			var anim = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

			var elem = document.getElementById(this.CssIds_.LVL).firstElementChild;
			elem.textContent = this.level;
			document.getElementById(this.CssIds_.EXP).dataset.nextLvl = this.Texts_.NEXT_LVL_TXT[this.lang] + this.expData.nextLevelExp;
			if (anim) {
				setTimeout(function (_) {
					_this3.sound.play('level');
					_this3.anim.animate(elem, 'bouncing_entrances_0');
				}, this.Constant_.SOUND_INTERVAL + 200);
			}
		}

		/**
   * Displays experience.
   *
   * @public
   */

	}, {
		key: 'displayExperience',
		value: function displayExperience() {
			var needLvlExp = this.expData.nextLevelExp - this.expData.currentLevelExp;
			var elem = document.getElementById(this.CssIds_.EXP);
			elem.firstElementChild.style.width = Number.parseInt(this.gameWinPoints_ / needLvlExp * 100) + '%';
			document.getElementById(this.CssIds_.POINTS).textContent = this.expData.points;
		}

		/**
   * Displays will.
   *
   * @param  {boolean} anim   Determines whether the animation will.
   * @param  {number} points  Bonus points for the will.
   * @public
   */

	}, {
		key: 'displayVolition',
		value: function displayVolition(anim, points) {
			var _this4 = this;

			var elem = document.getElementById(this.CssIds_.VOLITION);
			elem.textContent = this.volitionData.value;
			if (anim) {
				this.sound.play('will').then(function (result) {
					_this4.displayBonus(null, points);
				});
				elem.nextElementSibling.style.fill = this.Constant_.VOLITION_COLOR;
				this.anim.animate(elem.nextElementSibling, 'attention_seekers_6').then(function (result) {
					elem.nextElementSibling.style.fill = '#ffffff';
				});
			}
		}

		/**
   * Displays parti result message.
   *
   * @param  {string} str Message for display.
   * @public
   */

	}, {
		key: 'displayPartiResultMessage',
		value: function displayPartiResultMessage(str) {
			if (str) {
				var elem = document.getElementById(this.CssIds_.MSG);
				var msg = this.Texts_.WIN[this.lang];

				switch (str) {
					case 'human':
						msg += this.playerFirstName === this.Texts_.YOU[this.lang] ? 'и ' + this.playerFirstName : ' ' + this.playerFirstName;
						break;
					case 'draw':
						msg = this.Texts_.DRAW[this.lang];
						break;
					default:
						msg += ' ' + this.names[str];
				}

				elem.textContent = msg + '!';

				this.anim.animate(elem, 'fading_exits_10', undefined, this.Constant_.MSG_ANIM_TIMING, true);
			}
		}

		/**
   * Creates bonus markup.
   *
   * @return {string} Html markup.
   * @public
   */

	}, {
		key: 'createBonus',
		value: function createBonus() {
			var html = '\n\t\t\t<div class="experience__bonus is-hidden">\n\t\t\t\t<div id="bonus">\n\t\t\t\t\t<div class="is-hidden"><span class="experience__bonus-win"></span><span class="experience__bonus-msg">' + this.Texts_.BONUS[this.lang] + '</span></div>\n\t\t\t\t\t<div class="is-hidden"><span class="experience__bonus-lose"></span><span class="experience__bonus-msg">' + this.Texts_.LOSE[this.lang] + '</span></div>\n\t\t\t\t\t<div class="is-hidden"><span class="experience__bonus-volition"></span><span class="experience__bonus-msg">' + this.Texts_.WILL[this.lang] + '</span></div>\n\t\t\t\t</div>\n\t\t\t</div>';

			return html;
		}

		/**
   * Creates volition and experience markup.
   *
   * @return {string} Html markup.
   * @public
   */

	}, {
		key: 'create',
		value: function create() {
			var html = '\n\t\t\t<div class="row row--right">\n\t\t\t\t<div class="experience__volition" data-title="' + this.Texts_.WILL[this.lang] + '">\n\t\t\t\t\t<div id="volition" class="experience__volition-count">0</div>\n\t\t\t\t\t<svg class="experience__volition-ico" width="42" height="42" fill="#ffffff" aria-hidden="true" data-prefix="fas" data-icon="brain" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M208 0c-29.87 0-54.74 20.55-61.8 48.22-.75-.02-1.45-.22-2.2-.22-35.34 0-64 28.65-64 64 0 4.84.64 9.51 1.66 14.04C52.54 138 32 166.57 32 200c0 12.58 3.16 24.32 8.34 34.91C16.34 248.72 0 274.33 0 304c0 33.34 20.42 61.88 49.42 73.89-.9 4.57-1.42 9.28-1.42 14.11 0 39.76 32.23 72 72 72 4.12 0 8.1-.55 12.03-1.21C141.61 491.31 168.25 512 200 512c39.77 0 72-32.24 72-72V205.45c-10.91 8.98-23.98 15.45-38.36 18.39-4.97 1.02-9.64-2.82-9.64-7.89v-16.18c0-3.57 2.35-6.78 5.8-7.66 24.2-6.16 42.2-27.95 42.2-54.04V64c0-35.35-28.66-64-64-64zm368 304c0-29.67-16.34-55.28-40.34-69.09 5.17-10.59 8.34-22.33 8.34-34.91 0-33.43-20.54-62-49.66-73.96 1.02-4.53 1.66-9.2 1.66-14.04 0-35.35-28.66-64-64-64-.75 0-1.45.2-2.2.22C422.74 20.55 397.87 0 368 0c-35.34 0-64 28.65-64 64v74.07c0 26.09 17.99 47.88 42.2 54.04 3.46.88 5.8 4.09 5.8 7.66v16.18c0 5.07-4.68 8.91-9.64 7.89-14.38-2.94-27.44-9.41-38.36-18.39V440c0 39.76 32.23 72 72 72 31.75 0 58.39-20.69 67.97-49.21 3.93.67 7.91 1.21 12.03 1.21 39.77 0 72-32.24 72-72 0-4.83-.52-9.54-1.42-14.11 29-12.01 49.42-40.55 49.42-73.89z"></path></svg>\n\t\t\t\t</div>\n\t\t\t\t<div class="experience__exp-bar">\n\t\t\t\t\t<span id="' + this.CssIds_.POINTS + '" class="experience__exp-points">' + this.expData.points + '</span>\n\t\t\t\t\t<div id="' + this.CssIds_.EXP + '" class="experience__experience" data-next-lvl="' + this.Texts_.NEXT_LVL_TXT[this.lang] + ' ' + this.setNextLevelExp_() + '"><span></span></div>\n\t\t\t\t\t<div id="level" class="experience__level">' + this.Texts_.LEVEL[this.lang] + ': <span>' + this.level + '</span></div>\n\t\t\t\t</div>\n\t\t\t</div>';

			return html;
		}
	}, {
		key: 'losePoints_',
		get: function get() {
			return Number.parseInt(this.expData.winPointsGame * this.expData.losePercent / 100);
		}

		/**
   * Gets bonus points.
   * @return {number} Points.
   * @private
   */

	}, {
		key: 'bonusPoints_',
		get: function get() {
			return this.expData.partiPoints * this.levelGrow.bonusPercent / 100;
		}

		/**
   * Gets points bonus loss.
   *
   * @return {number} Points.
   * @private
   */

	}, {
		key: 'bonusLosePoints_',
		get: function get() {
			return this.expData.partiPoints * this.levelGrow.bonusLosePercent / 100;
		}

		/**
   * Gets points won per game.
   *
   * @return {number} Points.
   * @private
   */

	}, {
		key: 'gameWinPoints_',
		get: function get() {
			return this.expData.points - this.expData.currentLevelExp;
		}
	}]);

	return Experience;
}();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var test = true;

/** Class representing a game. */

var Game = function () {
	/**
  * Creates a new game.
  *
  * @param {Object} options Rewrite options.
  */
	function Game(options) {
		_classCallCheck(this, Game);

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
			FIELD_WRP: 'field_wrp'
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
			NEW_CHIP: { RU: 'Новая фишка!' }
		};
		Object.assign(this, options);
		this.partiRun = this.run;
	}

	/**
  * Creates matrices of calculated values.
  *
  * @private
  */


	_createClass(Game, [{
		key: 'countAxesValues_',
		value: function countAxesValues_() {
			var _this = this;

			var axes = ['x', 'y', 'z'];
			var cells = this.doCells_();
			var sqrt = Math.sqrt(this.fieldSize);

			var _loop = function _loop(i) {
				var matrix = _this.doMatrix_(cells, sqrt, axes[i]);
				_this.numberingAxes[axes[i]] = matrix;

				var matrix1 = _this.doMatrix_(cells, sqrt, axes[i]);
				_this.computeCells_(matrix1);
				_this.multiplyingAxes[axes[i]] = matrix1.reduce(function (a, b) {
					return a.concat(b);
				});

				var matrix2 = _this.doMatrix_(cells, sqrt, axes[i]);
				_this.additionAxes[axes[i]] = _this.sumAxissRows_(matrix2);
				_this.computeCells_(matrix2, false);
				_this.additionAxes[axes[i]].forEach(function (v, i) {
					return v[Object.keys(v)[0]] = matrix2[i];
				});
			};

			for (var i = 0; i < axes.length; i++) {
				_loop(i);
			}
		}

		/**
   * Creates game cells.
   *
   * @return {Array} Cells.
   * @private
   */

	}, {
		key: 'doCells_',
		value: function doCells_() {
			var cells = [];

			for (var i = 1; i <= this.fieldSize; i++) {
				cells.push(i);
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

	}, {
		key: 'doMatrix_',
		value: function doMatrix_(arr, sqrt, axis) {

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

		/**
   * Computes cells of matrix.
   *
   * @param  {Array}  matrix Matrix of cell values.
   * @param  {Boolean} mult Arithmetic operation.
   * @private
   */

	}, {
		key: 'computeCells_',
		value: function computeCells_(matrix) {
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

		/**
   * Calculates the sum of the rows of each axis.
   *
   * @param  {Array} matrix Matrix of cell values.
   * @private
   */

	}, {
		key: 'sumAxissRows_',
		value: function sumAxissRows_(matrix) {
			return matrix.map(function (arr) {
				var sum = arr.reduce(function (a, b) {
					return a + b;
				}),
				    o = {};
				o[sum] = [];

				return o;
			});
		}

		/**
   * Writes state of each cell.
   *
   * @private
   */

	}, {
		key: 'makeFieldCells_',
		value: function makeFieldCells_() {
			for (var i = 0; i < this.fieldSize; i++) {
				this.fieldCells[i] = {
					ticked: false,
					tickType: '',
					position: i + 1
				};
			}
			this.fieldCells.length = this.fieldSize;
		}

		/**
   * Creates this visual part of game field.
   *
   * @return {Element} [description]
   * @private
   */

	}, {
		key: 'makeViewField_',
		value: function makeViewField_() {
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
		key: 'makeView_',


		/**
   * Creates the visual part of the game.
   *
   * @return {Promise} Promise
   * @private
   */
		value: function makeView_() {
			var _this2 = this;

			var html = '\n\t\t\t<div id="container" class="layout__container is-hidden">\n\t\t\t\t<div id="game" class="layout__game">\n\t\t\t\t\t<div class="layout__header">\n\t\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t\t<div class="tttoe__coins">\n\t\t\t\t\t\t\t\t<div class="tttoe__coin"></div>\n\t\t\t\t\t\t\t\t<div id="' + this.coins.CssIds_.COINS + '" class="tttoe__coins-count">' + this.coins.coinsData.coins + '</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t\t\t<div id="chips_bar" class="tttoe__chips-bar">\n\t\t\t\t\t\t\t\t\t<button class="tttoe__button-action ml-button--dim" data-popup="' + this.CssClasses_.CHIPS + '">\n\t\t\t\t\t\t\t\t\t\t<div class="tttoe__chips-bar-ico"></div>\n\t\t\t\t\t\t\t\t\t\t<div id="f" class="tttoe__key">f</div>\n\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div id="menu_bar" class="tttoe__menu-bar">\n\t\t\t\t\t\t\t\t\t<button class="tttoe__button-action ml-button--dim" data-popup="' + this.CssClasses_.MENU + '">\n\t\t\t\t\t\t\t\t\t\t<div class="tttoe__menu-bar-ico"></div>\n\t\t\t\t\t\t\t\t\t\t<div id="f10" class="tttoe__key">f10</div>\n\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t' + this.score.create() + '\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="layout__middle">\n\t\t\t\t\t\t<div id="' + this.CssIds_.FIELD_WRP + '" class="tttoe__field-wrp row row--center">\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<div id="comp_cursor" class="tttoe__computer-cursor is-hidden"></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="layout__footer">\n\t\t\t\t\t\t' + this.experience.create() + '\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="layout__popups">\n\t\t\t\t\t\t<div class="tttoe__chips layout__substrate is-hidden" data-flag="openChips">\n\t\t\t\t\t\t\t<div class="tttoe__chips-inner layout__popup">\n\t\t\t\t\t\t\t\t<h3>\u041C\u0430\u0433\u0430\u0437\u0438\u043D</h3>\n\t\t\t\t\t\t\t\t<div class="row row--left">\n\t\t\t\t\t\t\t\t\t' + this.fillStore() + '\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<button class="tttoe__chips-close tttoe__button-action ml-button--dim" type="button"></button>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="tttoe__statistics layout__substrate is-hidden">\n\t\t\t\t\t\t\t<div class="tttoe__statistics-inner layout__popup">\n\t\t\t\t\t\t\t\t<h3>\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430</h3>\n\t\t\t\t\t\t\t\t<div class="row row--left">\n\t\t\t\t\t\t\t\t\t' + this.fillStatistics() + '\n\t\t\t\t\t\t\t\t\t' + this.pagination.create() + '\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<button class="tttoe__chips-close tttoe__button-action ml-button--dim" type="button"></button>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="tttoe__about layout__substrate is-hidden">\n\t\t\t\t\t\t\t<div class="tttoe__about-inner layout__popup">\n\t\t\t\t\t\t\t\t<h3>\u041E\u0431 \u0438\u0433\u0440\u0435</h3>\n\t\t\t\t\t\t\t\t<p class="tttoe__about-text">\u041A\u0440\u0435\u0441\u0442\u0438\u043A\u0438-\u043D\u043E\u043B\u0438\u043A\u0438 - \u0438\u0433\u0440\u0430 \u043D\u0430\u0448\u0435\u0433\u043E \u0434\u0435\u0442\u0441\u0442\u0432\u0430.\n\t\t\t\t\t\t\t\t\u0418\u0433\u0440\u0430\u0439\u0442\u0435 \u043F\u0440\u043E\u0442\u0438\u0432 \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440\u0430, \u0434\u0440\u0443\u0433\u0430 \u0438\u043B\u0438 \u043F\u043E \u0441\u0435\u0442\u0438.\n\t\t\t\t\t\t\t\t\u041F\u043E\u043B\u0443\u0447\u0430\u0439\u0442\u0435 \u043E\u043F\u044B\u0442, \u043F\u0440\u043E\u043A\u0430\u0447\u0438\u0432\u0430\u0439\u0442\u0435 \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u0438 \u043E\u0442\u043A\u0440\u044B\u0432\u0430\u0439\u0442\u0435 \u044D\u043F\u0438\u0447\u043D\u044B\u0435 \u0444\u0438\u0448\u043A\u0438 \u0432 \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u0435.\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t<div class="tttoe__affiliate"></div>\n\t\t\t\t\t\t\t\t<p><b>\u0420\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A</b><br>\u0410\u043B\u0435\u043A\u0441\u0430\u043D\u0434\u0440 \u0420\u0430\u0434\u0435\u0432\u0438\u0447</p>\n\t\t\t\t\t\t\t\t<p><a href="http://operari.by" target="_blank">OPERARI</a></p>\n\t\t\t\t\t\t\t\t<button class="tttoe__chips-close tttoe__button-action ml-button--dim" type="button"></button>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="tttoe__menu layout__substrate is-hidden" data-flag="openMenu">\n\t\t\t\t\t\t\t<div class="game-menu">\n\t\t\t\t\t\t\t\t<button id="' + this.CssIds_.RESUME + '" class="game-menu__action tttoe__button-action bg-color--blue">\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F</button>\n\t\t\t\t\t\t\t\t<button class="game-menu__action tttoe__button-action bg-color--pink" data-popup="' + this.CssClasses_.STATISTICS + '">\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430</button>\n\t\t\t\t\t\t\t\t<button class="game-menu__action tttoe__button-action bg-color--gold" data-popup="' + this.CssClasses_.ABOUT + '">\u041E\u0431 \u0438\u0433\u0440\u0435</button>\n\t\t\t\t\t\t\t\t<button id="' + this.CssIds_.MAIN_MENU + '" class="game-menu__action tttoe__button-action bg-color--purple">\u0413\u043B\u0430\u0432\u043D\u043E\u0435 \u043C\u0435\u043D\u044E</button>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="tttoe__chips-unlock is-hidden">\n\t\t\t\t\t\t\t<div class="tttoe__chips-confetti">\n\t\t\t\t\t\t\t\t<img src="blocks/game/confetti.png" alt="" />\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div id="message" class="tttoe__message animated--msg is-hidden"></div>\n\t\t\t\t\t\t' + this.experience.createBonus() + '\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t';

			var field = this.makeViewField_();

			return new Promise(function (resolve, reject) {
				var handler = function handler(e) {
					var wrapper = document.getElementById(_this2.CssIds_.WRP);
					wrapper.insertAdjacentHTML('beforeend', html);
					_this2.fieldElement = document.getElementById(_this2.CssIds_.APP);
					document.getElementById(_this2.CssIds_.FIELD_WRP).firstElementChild.appendChild(field);
					_this2.showView_();
					resolve();
				};
				if (document.readyState === 'complete') {
					handler();
				} else {
					document.addEventListener('DOMContentLoaded', handler);
				}
			});
		}

		/**
   * Displays view.
   *
   * @private
   */

	}, {
		key: 'showView_',
		value: function showView_() {
			var container = document.getElementById(this.CssIds_.CONTAINER);
			this.anim.animate(container, 'fading_entrances_0');
		}
	}, {
		key: 'fillStore',
		value: function fillStore() {
			var html = '';

			for (var i = 0; i < this.store.length; i++) {
				var elem = this.store[i];
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

		/**
   * Makes move.
   *
   * @private
   */

	}, {
		key: 'makeMove_',
		value: function makeMove_() {
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
			this.score.highlightAvatar(this.getPlayerId_(this.run), true);
		}

		/**
   * Action after party.
   *
   * @param  {Array} comb Row combination of a parti winner.
   * @param  {string} axis The axis of a parti winner.
   * @return {Promise} Promise.
   */

	}, {
		key: 'actionsAfterPartiOver_',
		value: function actionsAfterPartiOver_(comb, axis) {
			var _this3 = this;

			return new Promise(function (resolve, reject) {
				_this3.score.setScore(_this3.run, _this3.getPlayerId_(_this3.run));
				_this3.experience.setPoints(_this3.run);
				_this3.displayWinnerThrough(comb, axis);
				_this3.switchPartiPlayer_();
				var winnerName = _this3.getGameWinner_();
				if (winnerName) {
					_this3.experience.displayPartiResultMessage(winnerName);
					var loserName = _this3.getGameLoser_(winnerName);
					var winnerId = _this3.getPlayerId_(winnerName);
					var loserId = _this3.getPlayerId_(loserName);
					_this3.throwConfetti(document.getElementById(winnerId), _this3.Constant_.CONFETTI_TIMING);
					_this3.anim.animate(document.getElementById(loserId).querySelector('.' + _this3.CssClasses_.AVATAR), 'attention_seekers_11', true, _this3.Constant_.SHAKE_TIMING);
					_this3.experience.setPoints(winnerName, true).then(function (result) {
						_this3.score.resetScore();
						resolve();
					});
				} else {
					_this3.sound.play('point');
					setTimeout(function (_) {
						return resolve();
					}, _this3.Constant_.RESTART_PARTI);
				}
			});
		}

		/**
   * Checks the winner combination.
   *
   * @param  {boolean|string} axis Found potential axis winning.
   * @param  {string} player The player that moves.
   * @return {(Array|Object)} Array of computer winning combination or an object with a human's winning data.
   * @private
   */

	}, {
		key: 'checkWinnerCombination_',
		value: function checkWinnerCombination_(axis, player) {
			var _this4 = this;

			var comb = Array.from(this.fieldCells).filter(function (o) {
				return o.ticked && o.tickType === _this4.tickType[player];
			}).map(function (o) {
				return o.position;
			});

			/**
    * Finds the winning row of the axis.
    *
    * @param  {Array} matrix Row matrix.
    * @return {Array|boolean} Found row or not.
    * @private
    */
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
						axis: this.makeRotateAxisClass_(axiss[findedIndex], finded[findedIndex])
					};
				}
			}
		}

		/**
   * Gets random cell where to make a move.
   *
   * @return {number} Cell position.
   * @private
   */

	}, {
		key: 'getRandomCell_',
		value: function getRandomCell_() {
			var ticked = false,
			    n = void 0;
			do {
				n = getRandomInt(0, this.fieldSize);
				ticked = this.isTickedCell_(n);
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

	}, {
		key: 'isTickedCell_',
		value: function isTickedCell_(n) {
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

	}, {
		key: 'analysis_',
		value: function analysis_() {
			var result = {};
			if (this.count < 2) {
				result.cell = this.getRandomCell_();
			} else {
				var o = this.filterCells_();
				var resultCompareComputer = this.makePotentialCells_(o.emptyCells, o.computerCells, 'computer');
				var resultCompareHuman = this.makePotentialCells_(o.emptyCells, o.humanCells, 'human');

				if (resultCompareComputer.cell) {
					if (this.difficulty === 'child' && this.count <= this.fieldSize - 2) {
						var randCell = this.getRandomCell_();
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
							result.cell = resultCompareComputer.length ? this.chooseRandomCell_(resultCompareComputer) : resultCompareHuman.cell;
							break;
						default:
							result.cell = this.getRandomCell_();
					}
				} else {
					if (resultCompareComputer.length) {
						result.cell = this.chooseRandomCell_(resultCompareComputer);
					} else if (resultCompareHuman.length) {
						result.cell = this.chooseRandomCell_(resultCompareHuman);
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

	}, {
		key: 'filterCells_',
		value: function filterCells_() {
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

		/**
   * Makes potential cells for move.
   *
   * @param  {Array} emptyCells  Object array with empty cells.
   * @param  {Array} playerCells Object array with player cells that moves.
   * @param  {string} player The player that moves.
   * @return {Array|Object} Array with elements in the array with potential cells or object with winning combination.
   * @private
   */

	}, {
		key: 'makePotentialCells_',
		value: function makePotentialCells_(emptyCells, playerCells, player) {
			var potentialCells = [];
			for (var i = 0; i < emptyCells.length; i++) {
				var result = this.getPlayerPotentialCells_(emptyCells[i].position, playerCells, player);
				if (result) {
					if (Array.isArray(result)) {
						potentialCells.push(result);
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

	}, {
		key: 'getPlayerPotentialCells_',
		value: function getPlayerPotentialCells_(emptyCell, compareCells, player) {
			var playerPotencialCells = [];

			for (var i = 0; i < compareCells.length; i++) {
				var compareCell = compareCells[i].position;
				var axisMultiply = compareCell * emptyCell;
				var axis = this.getAxis_(axisMultiply);
				if (axis) {
					var axisAddition = compareCell + emptyCell;
					var potentialCell = this.getPotentialCell_(axis, axisAddition);
					if (potentialCell) {
						var potentialCellObj = this.fieldCells[potentialCell - 1];
						if (potentialCellObj.ticked) {
							if (potentialCellObj.tickType === this.tickType[player]) {
								var testTicked = this.doTestTick_(emptyCell, player);
								if (testTicked) {
									var winnerComb = this.checkWinnerCombination_(axis, player);
									this.doTestTick_(emptyCell, false, false);
									if (winnerComb) {
										return {
											cell: emptyCell,
											comb: winnerComb,
											axis: this.makeRotateAxisClass_(axis, winnerComb)
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

		/**
   * Gets potential cell for to makes a move.
   *
   * @param  {string} axis Curretn axis.
   * @param  {number} sumCells Sum of ticked cells on row.
   * @return {(number|boolean)} Potencial cell for move.
   * @private
   */

	}, {
		key: 'getPotentialCell_',
		value: function getPotentialCell_(axis, sumCells) {
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

		/**
   * Makes test tick.
   *
   * @param  {number}  cell Empty cell.
   * @param  {string}  player The player that moves.
   * @param  {boolean} test If test then fires for that cell.
   * @return {boolean} Check or uncheck empty cell.
   * @private
   */

	}, {
		key: 'doTestTick_',
		value: function doTestTick_(cell, player) {
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

		/**
   * Gets current axis.
   *
   * @param  {number} n Multiply cells.
   * @return {string|boolean} If the expression finds an axis returns the axis.
   */

	}, {
		key: 'getAxis_',
		value: function getAxis_(n) {
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

		/**
   * Makes class for winning row.
   *
   * @param  {string} str Winning axis.
   * @param  {Array} arr Array winning combination.
   * @return {string} Axis class.
   * @private
   */

	}, {
		key: 'makeRotateAxisClass_',
		value: function makeRotateAxisClass_(str, arr) {
			str = str === 'z' && arr.some(function (v) {
				return v === 3;
			}) ? str + '-45' : str;
			return str;
		}

		/**
   * Gets random cell from array of potential cells.
   *
   * @param  {Array} potentialCells The array of potential cells.
   * @return {number} Random cell.
   * @private
   */

	}, {
		key: 'chooseRandomCell_',
		value: function chooseRandomCell_(potentialCells) {
			potentialCells = potentialCells.reduce(function (a, b) {
				return a.concat(b);
			});
			var arr = new UniqueArray(potentialCells);
			var potentialCellsUniq = arr.unique();

			var n = getRandomInt(0, potentialCellsUniq.length);
			var cell = potentialCellsUniq[n];

			return cell;
		}
	}, {
		key: 'unlockChips',
		value: function unlockChips() {
			var _this6 = this;

			var chips = Array.from(this.store).filter(function (o) {
				return o.cost <= _this6.coinsData.coins && o.lock;
			});
			var chipsIcons = [];

			if (chips.length) {
				chips.forEach(function (o) {
					o.lock = false;
					var chipIco = document.querySelector('.' + _this6.CssClasses_.FIELD + '__' + o.name);
					var parent = chipIco.parentNode;
					parent.disabled = false;
					parent.querySelector('.' + _this6.CssClasses_.LOCK).remove();
					chipsIcons.push(chipIco);
				});
			}

			if (this.animateChips) {
				var i = 0;
				(function rec(arr, n) {
					var _this7 = this;

					if (n === arr.length) return;
					this.displayUnlockChip(arr[n]).then(function (result) {
						return rec.call(_this7, arr, ++n);
					});
				}).call(this, chipsIcons, i);
			}
		}

		/**
   * Gets the winner of the game.
   *
   * @return {(string|boolean)} Winner name.
   * @private
   */

	}, {
		key: 'getGameWinner_',
		value: function getGameWinner_() {
			if (this.score.getSumScore() === this.parti) {
				this.sound.play('win');
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

	}, {
		key: 'getGameLoser_',
		value: function getGameLoser_(winner) {
			var players = Object.values(this.players);
			var i = players.findIndex(function (v) {
				return v !== winner;
			});
			return players[i];
		}

		/**
   * Gets player identifier.
   *
   * @param  {string} name Player name.
   * @return {(string|boolean)} Player identifier.
   */

	}, {
		key: 'getPlayerId_',
		value: function getPlayerId_(name) {
			for (var prop in this.players) {
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

	}, {
		key: 'switchPartiPlayer_',
		value: function switchPartiPlayer_() {
			var _this8 = this;

			var playersNames = Object.values(this.players);
			this.run = this.partiRun = playersNames.find(function (v) {
				return v !== _this8.partiRun;
			});
		}
	}, {
		key: 'getClassPickedChip',
		value: function getClassPickedChip(side) {
			var _this9 = this;

			if (this.run !== 'computer') {
				var chip = Array.from(this.store).find(function (o) {
					return o.pick && o.side === _this9.transSymbolTextSide(side);
				});
				if (chip) {
					return ' ' + this.CssClasses_.FIELD + '__' + chip.name;
				}
			}
			return '';
		}
	}, {
		key: 'displayUnlockChip',
		value: function displayUnlockChip(elem) {
			var _this10 = this;

			return new Promise(function (resolve, reject) {
				var wrapper = document.querySelector('.' + _this10.CssClasses_.UNLOCK_CHIPS);
				var confetti = wrapper.querySelector('.' + _this10.CssClasses_.CONFETTI_STATIC);
				var btnAct = document.querySelector('.' + _this10.CssClasses_.BUTTON_ACT);
				var clone = elem.cloneNode();
				clone.classList.add(_this10.CssClasses_.ANIMATED);
				var span = document.createElement('span');
				span.textContent = _this10.Texts_.NEW_CHIP.RU;
				span.className = _this10.CssClasses_.ANIMATED;
				clone.appendChild(span);
				wrapper.appendChild(clone);

				_this10.sound.play('swing');
				btnAct.disabled = true;

				wrapper.classList.toggle(_this10.CssClasses_.HIDDEN);
				_this10.anim.animate(confetti, 'bouncing_entrances_1', false);
				_this10.anim.animate(clone, 'bouncing_entrances_4', false).then(function (result) {
					_this10.anim.animate(span, 'attention_seekers_9', false, 0);
					_this10.sound.play('tada').then(function (result) {
						_this10.sound.play('swing');
						_this10.anim.animate(confetti, 'boucing_exits_1');
						_this10.anim.animate(clone, 'boucing_exits_4').then(function (result) {
							clone.remove();
							btnAct.disabled = false;
							wrapper.classList.toggle(_this10.CssClasses_.HIDDEN);
							resolve();
						});
					});
				});
			});
		}

		/**
   * Restarts the party.
   *
   * @return {Promise} Promise.
   * @private
   */

	}, {
		key: 'restartParti_',
		value: function restartParti_() {
			var _this11 = this;

			return new Promise(function (resolve, reject) {
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

				_this11.coins.appendRandomCoin();

				resolve();
			});
		}
	}, {
		key: 'toggleScoreChipsDisplay',
		value: function toggleScoreChipsDisplay(target, n) {
			var _this12 = this;

			var flag = target.classList.toggle(this.CssClasses_.CHIP_PICK);
			this.store[n].pick = flag;
			var chips = Array.from(document.querySelectorAll('.' + this.CssClasses_.CHIP));
			var chipMustDisable = chips.filter(function (v, i) {
				return _this12.store[i].pick && i != n;
			})[0];

			if (chipMustDisable) {
				chipMustDisable.classList.remove(this.CssClasses_.CHIP_PICK);
				var chip = this.store[chipMustDisable.dataset.index];
				chip.pick = false;
				return chip;
			}
			return false;
		}
	}, {
		key: 'toggleFieldChipsDisplay',
		value: function toggleFieldChipsDisplay(o) {
			var _this13 = this;

			var side = this.transSymbolTextSide(o.side);
			var chips = document.querySelectorAll('.' + this.CssClasses_.TICK + '--' + side);

			if (chips.length && this.tickType.human === side) {
				Array.from(chips).forEach(function (v) {
					return v.classList.toggle(_this13.CssClasses_.FIELD + '__' + o.name);
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

		/**
   * Checks the game for a draw.
   *
   * @return {boolean} The state draws.
   * @private
   */

	}, {
		key: 'draw_',
		value: function draw_() {
			var _this14 = this;

			if (this.count === this.fieldSize) {
				this.experience.displayPartiResultMessage('draw');
				this.switchPartiPlayer_();
				this.sound.play('draw').then(function (result) {
					_this14.experience.setVolition();
					setTimeout(function () {
						_this14.restartParti_().then(function (result) {
							_this14.makeMove_();
						});
					}, _this14.Constant_.RESTART_PARTI);
				});
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

	}, {
		key: 'computerMoveAnimation_',
		value: function computerMoveAnimation_(id) {
			var _this15 = this;

			return new Promise(function (resolve, reject) {
				if (id >= 0) {
					var cell = document.getElementById(id);
					var cellCenter = cell.offsetWidth / 2;
					var cursor = document.getElementById(_this15.CssIds_.CURSOR);
					var positionTop = cell.offsetTop + cellCenter - cursor.offsetTop - cursor.offsetHeight + 'px';
					// const positionLeft = cell.offsetLeft + cellCenter - cursor.offsetLeft + 'px';
					var positionLeft = cursor.offsetLeft - cell.offsetLeft - cellCenter + 'px';

					cursor.classList.remove(_this15.CssClasses_.HIDDEN);
					cursor.style.top = positionTop;
					cursor.style.right = positionLeft;
					setTimeout(function (_) {
						cursor.classList.add(_this15.CssClasses_.HIDDEN);
						cursor.style.top = '';
						cursor.style.right = '';
						resolve();
					}, _this15.Constant_.MOVE_ANIMATION);
				} else {
					resolve();
				}
			});
		}

		/**
   * Registers calls popups.
   *
   * @private
   */

	}, {
		key: 'registerCallPopups_',
		value: function registerCallPopups_() {
			var _this16 = this;

			document.addEventListener('click', function (e) {
				var btn = _this16.findNode_(e);
				if (btn) {
					var popupClassElem = btn.dataset && btn.dataset.popup;
					if (popupClassElem && !btn.disabled) {
						var popup = document.querySelector('.' + btn.dataset.popup);
						var p = _this16.popupToggle(popup);
						if (typeof p === 'boolean' && p) {
							//  Call menuActions, chipActions, statisticsActions, aboutActions
							_this16[popupClassElem.replace(/^.+__/, '') + 'Actions_'](popup);
						}
					}
				}
			});
		}

		/**
   * Actions handler.
   *
   * @param  {Object} o Unique logic for each act method.
   * @param  {Element} elem Element on which events are triggered.
   * @private
   */

	}, {
		key: 'actionsHandler_',
		value: function actionsHandler_(o, elem) {
			this.bindedHandler = handler.bind(this);
			this.bindedElem = elem;

			/**
    * Handler.
    *
    * @param  {Event} e The event that fired.
    */
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

		/**
   * Menus actions.
   *
   * @param  {Element} elem Popup element for toggle.
   * @private
   */

	}, {
		key: 'menuActions_',
		value: function menuActions_(elem) {
			var _this17 = this;

			this.actionsHandler_({
				act: function act(target, elem) {
					_this17.popupToggle(elem).then(function (result) {
						if (target.id === _this17.CssIds_.MAIN_MENU) {
							_this17.restartGame();
						}
					});
				}
			}, elem);
		}

		/**
   * Chips actions.
   *
   * @param  {Element} elem Popup element for actions.
   * @private
   */

	}, {
		key: 'chipsActions_',
		value: function chipsActions_(elem) {
			var _this18 = this;

			this.actionsHandler_({
				act: function act(target, elem) {
					if (target.classList.contains(_this18.CssClasses_.CHIP) && !target.disabled) {
						var i = target.dataset.index;
						var chip = _this18.store[i];
						if (_this18.buyChip(chip, i)) {
							var disabledChip = _this18.toggleScoreChipsDisplay(target, i);
							if (disabledChip) {
								_this18.toggleFieldChipsDisplay(disabledChip);
							}
							_this18.toggleFieldChipsDisplay(chip);
						} else {
							_this18.sound.play('coin1');
						}
					}
				}
			}, elem);
		}

		/**
   * Statistics actions.
   *
   * @param  {Element} elem Popup element for actions.
   * @private
   */

	}, {
		key: 'statisticsActions_',
		value: function statisticsActions_(elem) {
			this.pagination.toggleActive();
			this.actionsHandler_({
				act: function act(target, elem) {
					console.log('act');
				}
			}, elem);
		}

		/**
   * About actions.
   *
   * @param  {Element} elem Popup element for actions.
   * @private]
   */

	}, {
		key: 'aboutActions_',
		value: function aboutActions_(elem) {
			this.actionsHandler_({
				act: function act(target, elem) {}
			}, elem);
		}
	}, {
		key: 'buyChip',
		value: function buyChip(o, n) {
			if (!o.paid && this.coinsData.coins - o.cost >= 0) {
				this.setCoins(-o.cost, false, false);
				document.querySelector('button[data-index="' + n + '"]').querySelector('.' + this.CssClasses_.CHIPS_FOOT).innerHTML = '<div class="' + this.CssClasses_.CHIP_PAID + '"></div>';
				this.sound.play('coins');
				return o.paid = true;
			}
			return o.paid;
		}
	}, {
		key: 'restartGame',
		value: function restartGame() {
			var container = document.getElementById(this.CssIds_.CONTAINER);
			this.anim.animate(container, 'fading_exits_0').then(function (result) {
				container.remove();

				var screen = new Screen();
				screen.init();

				var fullscreen = new ToggleScreen();
				fullscreen.close();
			});
		}

		/**
   * Finds ancestor.
   *
   * @param  {Event} e The event that fired.
   * @param  {String} selector Selector for query.
   * @return {Element} Found element.
   * @private
   */

	}, {
		key: 'findNode_',
		value: function findNode_(e) {
			var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.CssClasses_.BUTTON_ACT;

			return e.target.closest('.' + selector);
		}

		/**
   * Registers sounds on buttons.
   *
   * @private
   */

	}, {
		key: 'soundOfButtons_',
		value: function soundOfButtons_() {
			var _this19 = this;

			document.addEventListener('click', function (e) {
				var btn = _this19.findNode_(e);
				if (btn) {
					if (btn.disabled && [].concat(_toConsumableArray(btn.children)).some(function (v) {
						return v.classList.contains(_this19.CssClasses_.LOCK);
					})) {
						_this19.sound.play('lock');
					} else {
						_this19.sound.play('click');
					}
				}
			});

			document.addEventListener('mouseover', function (e) {
				var btn = _this19.findNode_(e);
				if (btn) {
					if (!btn.dataset.hover) {
						_this19.sound.play('hover');
						setTimeout(function () {
							btn.dataset.hover = '';
						}, 1000);
					}
					btn.dataset.hover = 1;
				}
			});
		}

		/**
   * Registers triggers on hotkeys.
   *
   * @private
   */

	}, {
		key: 'triggers_',
		value: function triggers_() {
			var _this20 = this;

			document.addEventListener('keyup', function (e) {
				var hotkeys = Object.keys(_this20.CssIds_.HOTKEYS);
				var findKey = hotkeys.find(function (v) {
					return v === e.key && e.key.toLowerCase();
				});
				if (findKey) {
					if (_this20.bindedElem) {
						_this20.bindedElem.removeEventListener('click', _this20.bindedHandler);
					}
					document.getElementById(findKey).closest('button').click();
				}
			});
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

	}, {
		key: 'doHuman',
		value: function doHuman(curr, next, id) {

			var h = handler.bind(this);

			/**
    * Handler.
    *
    * @param  {Event} e The event that fired.
    * @private
    */
			function handler(e) {
				var _this21 = this;

				var target = e.target;
				var td = target.closest('td');
				if (target.tagName === 'DIV' && td) {
					var indx = td.id;
					var ticked = this.tick(indx, this.tickType[curr]);
					if (ticked) {
						this.fieldElement.removeEventListener('click', h);

						var winnerComb = this.checkWinnerCombination_(false, curr);
						if (winnerComb) {
							this.actionsAfterPartiOver_(winnerComb.comb, winnerComb.axis).then(function (result) {
								_this21.restartParti_().then(function (result) {
									_this21.makeMove_();
								});
							});
						} else {
							if (this.players.player2 !== 'computer') {
								if (this.draw_()) {
									return;
								}
							}
							this.run = next;

							if (this.coins.compareRandomCoinIndex(indx)) {
								this.coins.setCoins(this.experience.expData.points, 1, true).then(function (result) {
									_this21.makeMove_();
								});
							} else {
								this.makeMove_();
							}
						}
					}
				}
			}

			if (this.run !== 'computer') {
				if (Number.isInteger(id) && id >= 0 && id <= this.fieldSize - 1) {
					h({ target: document.getElementById(id).firstElementChild });
				} else {
					this.fieldElement.addEventListener('click', h);
				}
			}
		}

		/**
   * Makes a move by computer.
   *
   * @public
   */

	}, {
		key: 'doComputer',
		value: function doComputer() {
			var _this22 = this;

			var result = this.analysis_();
			var n = result.cell - 1;

			this.computerMoveAnimation_(n).then(function (res) {
				var ticked = _this22.tick(n, _this22.tickType[_this22.players.player2]);
				_this22.state = _this22.count === _this22.fieldSize && _this22.state !== 'win' ? 'draw' : _this22.state;
				if (_this22.state === 'win') {
					if (ticked) {
						_this22.actionsAfterPartiOver_(result.comb, result.axis).then(function (result) {
							_this22.restartParti_().then(function (result) {
								_this22.makeMove_();
							});
						});
					}
				} else if (_this22.state === 'draw') {
					_this22.count = _this22.fieldSize;
					_this22.draw_();
				} else {
					if (ticked) {
						setTimeout(function () {
							_this22.run = 'human';
							_this22.makeMove_();
						}, _this22.Constant_.TICK_TIMING);
					}
				}
			});
		}

		/**
   * Creates a tick.
   *
   * @param  {Number}  n Tick number.
   * @param  {String}  type Tick view.
   * @return {Boolean} If ticked.
   * @public
   */

	}, {
		key: 'tick',
		value: function tick(n, type) {
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

		/**
   * Display tick.
   *
   * @param  {Number} n Tick number.
   * @param  {String} type Tick view.
   * @public
   */

	}, {
		key: 'displayTick',
		value: function displayTick(n, type) {
			var tick = document.createElement('div');
			tick.className = this.CssClasses_.TICK + ' ' + this.CssClasses_.TICK + '--' + type + this.getClassPickedChip(type);
			this.fieldElement.querySelectorAll('td')[n].firstElementChild.appendChild(tick);
		}

		/**
   * Displays winner row.
   *
   * @param  {Array} arr Row combination of a parti winner.
   * @param  {string} axis The axis of a parti winner.
   * @public
   */

	}, {
		key: 'displayWinnerThrough',
		value: function displayWinnerThrough(arr, axis) {
			for (var i = 0; i < arr.length; i++) {
				this.fieldElement.querySelectorAll('td')[arr[i] - 1].classList.add(this.CssClasses_.WIN + '-' + axis);
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

	}, {
		key: 'popupToggle',
		value: function popupToggle(elem) {
			var _this23 = this;

			var flag = elem.dataset.flag;
			if (this[flag]) {
				elem.removeEventListener('click', this.bindedHandler);
				return new Promise(function (resolve, reject) {
					_this23[flag] = !_this23[flag];
					_this23.anim.animate(elem, 'fading_exits_0', undefined, undefined, true).then(function (result) {
						return resolve();
					});
				});
			} else {
				this.anim.animate(elem, 'fading_entrances_0', false, 0);
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

	}, {
		key: 'throwConfetti',
		value: function throwConfetti(el, timing) {
			if (el) {
				var confetti = new Confetti('confetti', 150);
				el.appendChild(confetti);
				return new Promise(function (resolve, reject) {
					setTimeout(function (_) {
						confetti.remove();
						resolve();
					}, timing);
				});
			}
			return false;
		}

		/**
   * Initialize.
   */

	}, {
		key: 'init',
		value: function init() {
			var _this24 = this;

			this.countAxesValues_();
			this.makeFieldCells_();
			return new Promise(function (resolve, reject) {
				_this24.pagination = new Pagination(_this24.statistics.data.length, _this24.statistics.limit);
				_this24.score = new Score({
					players: _this24.players,
					names: _this24.names,
					playerFirstName: _this24.playerFirstName,
					playerSecondName: _this24.playerSecondName
				});
				_this24.coins = new Coins({
					fieldSize: _this24.fieldSize,
					mode: _this24.mode,
					sound: _this24.sound,
					anim: _this24.anim
				});
				_this24.experience = new Experience({
					mode: _this24.mode,
					coins: _this24.coins,
					sound: _this24.sound,
					anim: _this24.anim,
					names: _this24.names,
					playerFirstName: _this24.playerFirstName,
					playerSecondName: _this24.playerSecondName
				});
				_this24.makeView_().then(function (result) {
					_this24.coins.appendRandomCoin();
					_this24.soundOfButtons_();
					_this24.triggers_();
					_this24.registerCallPopups_();
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
	}]);

	return Game;
}();

if (test) {
	var sound = new Sound();
	var anim = new Animation();

	var game = new Game({
		sound: sound,
		anim: anim
	});

	game.init().then(function (result) {
		return game.makeMove_();
	});
}
//# sourceMappingURL=maps/bundle.js.map
