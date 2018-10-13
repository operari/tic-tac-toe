class Sound {
	constructor(options) {
		this.element_ = null;
		this.audio_ = null;
		this.playing = '';
		this.timings = {
			hover: { start: 0.00, end: 0.50, priority: 1 },
			click: { start: 1.00, end: 1.50, priority: 2 },
			tick:  { start: 2.00, end: 2.50 },
			dice:  { start: 3.00, end: 3.50 },
			flash: { start: 4.00, end: 5.00 },
			draw:  { start: 5.50, end: 6.00 },
			win:   { start: 6.50, end: 7.60 },
			point: { start: 8.00, end: 9.00 },
			swing: { start: 9.50, end: 10.40 },
			level: { start: 11.00, end: 11.70 },
			coin:  { start: 12.00, end: 12.60 },
			will:  { start: 13.00, end: 15.00 },
			tada:  { start: 15.50, end: 17.00, priority: 3 },
			lock:  { start: 17.50, end: 18.50, priority: 3 },
			coins: { start: 19.00, end: 19.80 },
			coin1: { start: 20.50, end: 22.00 }
		};
		this.fileName = 'sound.mp3';
		this.playerId = 'audio_player';
		this.wrapperId = 'wrapper';
		this.path = 'blocks/sound/';
		this.muted = false;
		Object.assign( this, options );
		this.init();
	}

	appendPlayer() {
		this.removePlayer();
		const wrapper = document.getElementById( this.wrapperId );
		const html = `
			<div id="audio_player" class="sound">
				<audio preload="metadata" ${this.muted ? 'muted' : ''}></audio>
				<button id="toggle_sound" class="ml-button--dim sound__toggle">
					<svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" fill="#585f80" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
					<svg class="is-hidden" xmlns="http://www.w3.org/2000/svg" width="43" height="43" fill="#585f80" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
					<span id="m" class="tttoe__key">m</span>
				</button>
			</div>
		`;

		wrapper.insertAdjacentHTML( 'beforeend', html );

		this.element_ = document.getElementById( this.playerId );
		this.audioTrack();
	}

	removePlayer() {
		const player = document.getElementById( this.playerId );
		if (player) {
			player.remove();
		}
	}

	audioTrack() {
		if (this.fileName) {
			this.audio_ = this.element_.querySelector( 'audio' );
			this.audio_.src = this.path + this.fileName + '?v=' + Date.now();
		}
	}

	play(name) {
		if (this.audio_) {
			return new Promise( (resolve,reject) => {
				if (this.compareTracksPriority( name )) {
					this.playing = name;
					this.audio_.currentTime = this.timings[name].start;
					const playPromise = this.audio_.play();
					if (playPromise !== undefined) {
						playPromise.then( _ => {
							this.timerId = setTimeout( () => {
								this.stop();
								resolve();
							}, (this.timings[name].end - this.timings[name].start) * 1000 );
						} )
						.catch( error => {
							console.info( error );
						} );
					}
				} else {
					resolve();
				}
			} );
		}
	}

	stop() {
		if (this.audio_) {
			clearTimeout( this.timerId );
			this.audio_.pause();
			this.audio_.currentTime = 0;
			this.playing = '';
		}
	}

	mute() {
		this.audio_.muted = !this.audio_.muted;
	}

	compareTracksPriority(name) {
		if (this.playing) {
			if (this.timings[this.playing].priority >= this.timings[name].priority) {
				return false;
			}
		}
		return true;
	}

	init() {
		var handler = (e) => {
			this.appendPlayer();
			document.getElementById('toggle_sound').addEventListener( 'click', (e) => {
				this.play( 'click' );
				const btn = e.currentTarget;
				btn.children[+!this.audio_.muted].classList.remove( 'is-hidden' );
				btn.children[+this.audio_.muted].classList.add( 'is-hidden' );
				setTimeout( () => {
					this.mute();
				}, 500 );
			} );
			document.getElementById('toggle_sound').addEventListener( 'mouseenter', (e) => {
				this.play( 'hover' );
			} );
			document.addEventListener( 'keyup', function(e) {
				if (e.key.toLowerCase() === 'm') {
					document.getElementById( 'm' ).parentNode.click();
				}
			} );
		};
		if (document.readyState !== 'loading') {
			handler();
		} else {
			document.addEventListener( 'DOMContentLoaded', handler );
		}

	}

}