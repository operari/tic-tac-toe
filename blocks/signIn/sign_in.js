/** Class representing sign in. */
class SignIn {
	/**
	 * Creates login ui.
	 * @constructor
	*/
	constructor() {
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
			PASS: {	RU: 'Пароль' },
			NAME_ERROR: { RU: 'Имя уже существует!'	},
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
	toggleHandler_(o,type,targetSelector,actSelector) {

		var handler = function(e) {
			const target = e.target;
			if (!e.currentTarget.classList.contains( this.CssClasses_.HIDDEN ) && target.tagName.toLowerCase() === targetSelector) {
				const elemAct = target.parentNode.querySelector( actSelector );
				if (elemAct) {
					o.act( target, elemAct );
				}
			}
		}.bind( this );

		this.element_.addEventListener( type, handler, true );
	}

	/**
	 * Toggle label position at event blur.
	 *
	 * @private
	 */
	toggleLabel_() {
		this.toggleHandler_( {
			act: (target,elem) => {
				elem.classList.toggle( this.CssClasses_.FOCUSED, target.value ? true : false );
			}
		}, 'blur', 'input', 'label' );
	}

	/**
	 * Toggle display of eye icon at event input.
	 *
	 * @private
	 */
	toggleEye_() {
		this.toggleHandler_( {
			act: (target,elem) => {
				elem.classList.toggle( this.CssClasses_.HIDDEN, !target.value.length ? true : false );
			}
		}, 'input', 'input', '.' + this.CssClasses_.EYE );
	}

	/**
	 *	Toggle display of password text at event mousedown|mouseup.
	 *
	 * @private
	 */
	togglePassword_() {
		this.toggleHandler_( {
			act: (target,elem) => {
				elem.type = 'text';
			}
		}, 'mousedown', 'button', 'input' );

		this.toggleHandler_( {
			act: (target,elem) => {
				elem.type = 'password';
			}
		}, 'mouseup', 'button', 'input' );

	}

	// Public methods.

	/**
	 * Create html login markup.
	 *
	 * @public
	 * @return {string} Html markup.
	 */
	create() {
		const html = `
			<div id="sign_in" class="sign-in screen__sign-in animated is-hidden">
				<div class="screen__sign-in-inner">
					<h2 class="screen__display">${this.Texts_.TITLE[this.lang]}</h2>
					<div class="sign-in__row">
						<div class="sign-in__input-field">
							<input type="text" id="sign_in_name" class="sign-in__name" value="" />
							<label for="sign_in_name">${this.Texts_.NAME[this.lang]}</label>
						</div>
						<div class="sign-in__input-error animated is-hidden">${this.Texts_.NAME_ERROR[this.lang]}</div>
					</div>
					<div class="sign-in__row">
						<div class="sign-in__input-field">
							<input type="password" id="sign_in_pass" class="sign-in__password" minlength="5" value="" />
							<label for="sign_in_pass">${this.Texts_.PASS[this.lang]}</label>
							<button type="button" class="sign-in__view-pass ml-button--dim is-hidden"></button>
						</div>
						<div class="sign-in__input-error animated is-hidden">${this.Texts_.PASS_ERROR[this.lang]}</div>
					</div>
					<div>
						<button type="submit">${this.Texts_.SUBMIT[this.lang]}</button>
					</div>
				</div>
			</div>`;

		return html;
	}

	/**
	 * Initialize element.
	 */
	init() {
		this.element_ = document.getElementById( this.CssIds_.SIGN );
		if (this.element_) {
			this.toggleLabel_();
			this.toggleEye_();
			this.togglePassword_();
		}
	}

}