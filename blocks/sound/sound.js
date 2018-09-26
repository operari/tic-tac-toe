class Sound {
	constructor(options) {
		this.element_ = null;
		this.audio_ = null;
		this.timings = {
			hover: { start: 0.00, end: 0.50 },
			click: { start: 1.00, end: 1.50 },
			tick:  { start: 2.00, end: 2.50 },
			dice:  { start: 3.00, end: 3.50 },
			flash: { start: 4.00, end: 5.00 },
			draw:  { start: 5.50, end: 6.00 },
			win:   { start: 6.50, end: 7.60 },
			point: { start: 8.00, end: 9.00 }
		};
		this.fileName = 'sound.mp3';
		this.playerId = 'player';
		this.path = 'blocks/sound/';
		Object.assign( this, options );
		this.init();
	}

	appendPlayer() {
		const elem = document.getElementById( this.playerId );

		if (elem && !elem.children.length) {
			this.element_ = elem;
			const audio = document.createElement( 'audio' );
			audio.preload = 'metadata';
			elem.appendChild( audio );
			this.audio_ = this.element_.querySelector( 'audio' );
			return true;
		}

		return false;
	}

	audioTrack() {
		if (this.fileName) {
			this.audio_.src = this.path + this.fileName + '?v=' + Date.now();
		}
	}

	play(name) {
		if (this.audio_) {
			this.audio_.currentTime = this.timings[name].start;
			const playPromise = this.audio_.play();
			if (playPromise !== undefined) {
				playPromise.then( _ => {
					this.timerId = setTimeout( () => {
						this.stop();
					}, (this.timings[name].end - this.timings[name].start) * 1000 );
				} )
				.catch( error => {
					console.error( error );
				} );
			}
		}
	}

	stop() {
		if (this.audio_) {
			clearTimeout( this.timerId );
			this.audio_.pause();
			this.audio_.currentTime = 0;
		}
	}

	init() {
		var loadDom = (e) => {
			this.appendPlayer();
			this.audioTrack();
		};
		if (document.readyState !== 'loading') {
			loadDom();
		} else {
			document.addEventListener( 'DOMContentLoaded', loadDom );
		}

	}

}