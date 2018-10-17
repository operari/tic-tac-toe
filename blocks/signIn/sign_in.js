class SignIn {
	constructor() {
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

	create() {
		const html = `
			<div id="sign_in" class="sign-in screen__sign-in animated is-hidden">
				<div class="screen__sign-in-inner">
					<h2 class="screen__display">${this.Constant_.TEXTS.TITLE[this.lang]}</h2>
					<div class="sign-in__row">
						<div class="sign-in__input-field">
							<input type="text" id="sign_in_name" class="sign-in__name" value="" />
							<label for="sign_in_name">${this.Constant_.TEXTS.NAME[this.lang]}</label>
						</div>
						<div class="sign-in__input-error animated is-hidden">${this.Constant_.TEXTS.NAME_ERROR[this.lang]}</div>
					</div>
					<div class="sign-in__row">
						<div class="sign-in__input-field">
							<input type="password" id="sign_in_pass" class="sign-in__password" minlength="5" value="" />
							<label for="sign_in_pass">${this.Constant_.TEXTS.PASS[this.lang]}</label>
							<button type="button" class="sign-in__view-pass ml-button--dim is-hidden"></button>
						</div>
						<div class="sign-in__input-error animated is-hidden">${this.Constant_.TEXTS.PASS_ERROR[this.lang]}</div>
					</div>
					<div>
						<button type="submit">${this.Constant_.TEXTS.SUBMIT[this.lang]}</button>
					</div>
				</div>
			</div>`;

		return html;
	}

	toggleHandler_(o,type,targetSelector,actSelector) {
		const h = handler.bind( this );

		function handler(e) {
			const target = e.target;
			if (!e.currentTarget.classList.contains( this.CssClasses_.HIDDEN ) && target.tagName.toLowerCase() === targetSelector) {
				const elemAct = target.parentNode.querySelector( actSelector );
				if (elemAct) {
					o.act( target, elemAct );
				}
			}
		}

		this.element_.addEventListener( type, h, true );
	}

	toggleLabel_() {
		this.toggleHandler_( {
			act: (target,elem) => {
				elem.classList.toggle( this.CssClasses_.FOCUSED, target.value ? true : false );
			}
		}, 'blur', 'input', 'label' );
	}

	toggleEye_() {
		this.toggleHandler_( {
			act: (target,elem) => {
				elem.classList.toggle( this.CssClasses_.HIDDEN, !target.value.length ? true : false );
			}
		}, 'input', 'input', '.' + this.CssClasses_.EYE );
	}

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


	init() {
		this.element_ = document.getElementById( this.CssIds_.SIGN );
		if (this.element_) {
			this.toggleLabel_();
			this.toggleEye_();
			this.togglePassword_();
		}
	}

}