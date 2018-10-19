/** Class representing a pagination. */
class Pagination {
	/**
	 * Creates a new pagination.
	 *
	 * @param  {Number} allElements  Quantity all elements for dislplay.
	 * @param  {Number} limitPerPage Quantity elements displayed on page.
	 */
	constructor(allElements,limitPerPage) {
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
	get countPages_() {
		return this.allElements / this.limitPerPage <= 1 ? 1 : this.allElements / this.limitPerPage;
	}

	// Public methods.

	/**
	 * Creates pagination markup.
	 *
	 * @return {string} Html markup.
	 * @public
	 */
	create() {
		var fill = () => {
			let html = '';
			for (let i = 1; i <= this.countPages_; i++) {
				html += `<li class="${this.CssClasses_.LIST}"><a href="#" class="${this.CssClasses_.MIX_ACTION} ${this.CssClasses_.LINK} ${i === 1 ? this.CssClasses_.ACTIVE : ''}">${i}</a></li>`;
			}
			return html;
		}

		const html = `<div class="${this.CssClasses_.BLOCK} ${this.CssClasses_.MIX_BLOCK}">
			<ul class="${this.CssClasses_.CONTAINER}">
				${fill()}
			</ul>
		</div>`;

		return html;
	}

	/**
	 * Display the active pagination item.
	 *
	 * @public
	 */
	toggleActive() {
		const block = document.querySelector( '.' + this.CssClasses_.BLOCK );

		var handler = (e) => {
			const target = e.target;
			if (target.tagName === 'A') {
				const links = block.querySelectorAll( '.' + this.CssClasses_.LINK );
				Array.from( links ).forEach( (elem) => elem.classList.remove( this.CssClasses_.ACTIVE ) );
				target.classList.add( this.CssClasses_.ACTIVE );
			}
		};

		block.addEventListener( 'click', handler );
	}

}