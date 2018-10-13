class Pagination {
	constructor(allElements,limitPerPage) {
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

	get countPages() {
		return this.allElements / this.limitPerPage <= 1 ? 1 : this.allElements / this.limitPerPage;
	}

	create() {
		var fill = () => {
			let html = '';
			for (let i = 1; i <= this.countPages; i++) {
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

	init() {
		this.create();
	}

}