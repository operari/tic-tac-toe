class Confetti {
	constructor(id,count) {
		this.id = id;
		this.count = count;
		return this.init();
	}

	create() {
		const confetti = document.createElement( 'div' );
		confetti.id = this.id;
		confetti.className = 'confetti';
		if (confetti) {
			let i = this.count;
			while (i > -1) {
				const elem = document.createElement( 'div' );
				elem.className = 'confetti__' + i;
				confetti.appendChild( elem );

				i--;
			}

			return confetti;

		} else {
			throw new Error('Element .confetti not found!');
		}
	}

	init()  {
		return this.create();
	}
}