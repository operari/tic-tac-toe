/** Class representing a score. */
class Score {
	/**
	 * Creates a new score.
	 * @param  {Object} options Rewrite options.
	 */
	constructor(options) {
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
			HIGHLIGHT: 'score__avatar--highlight',
		};
		Object.assign( this, options );
	}

	/**
	 * Gets score names.
	 *
	 * @return {Array} Array of score names.
	 * @private
	 */
	get scoreNames_() {
		return Object.keys( this.score );
	}

	/**
	 * Gets score.
	 *
	 * @return {Array} Array of score.
	 * @private
	 */
	get score_() {
		return Object.values( this.score );
	}

	// Public methods.

	/**
	 * Gets sum score.
	 *
	 * @return {number} Sum of.
	 * @public
	 */
	getSumScore() {
		return this.score_.reduce( (a,b) => a + b );;
	}

	/**
	 * Gets name of the rich man.
	 *
	 * @return {string} Name.
	 * @public
	 */
	getNameRichScore() {
		const n = Math.max.apply( null, this.score_ );
		return this.scoreNames_[this.score_.findIndex( v => v === n )];
	}

	/**
	 * Sets score.
	 *
	 * @param {string} run      The player that moves.
	 * @param {string} playerId Identifier of player that moves.
	 * @public
	 */
	setScore(run,playerId) {
		typeof( this.score[run] ) === 'number' ? this.score[run] += 1: this.score[run] = 1;
		this.displayScore( playerId, this.score[run] );
	}


	/**
	 * Displays score.
	 *
	 * @param  {string} playerId Player identifier.
	 * @param  {number} score Score to set.
	 * @public
	 */
	displayScore(playerId,score) {
		document.getElementById( playerId ).querySelector( '.' + this.CssClasses_.SCORE ).textContent = score;
	}

	/**
	 * Resets score.
	 *
	 * @public
	 */
	resetScore() {
		this.score = {};
		const score = document.querySelectorAll( '.' + this.CssClasses_.SCORE );

		for (let i = 0; i < score.length; i++) {
			score[i].textContent = 0;
		}
	}

	/**
	 * Adds hightlight class on the avatar.
	 *
	 * @param {string} id The identifier of the parent element of the avatar.
	 * @public
	 */
	highlightAvatar(id) {
		const avatars = Array.from( document.querySelectorAll( '.' + this.CssClasses_.AVATAR ) );
		avatars.forEach( el => el.classList[el.parentNode.id === id ? 'add' : 'remove']( this.CssClasses_.HIGHLIGHT ) );
	}

	/**
	 * Creates score markup.
	 *
	 * @return {string} HTML markup.
	 * @public
	 */
	create() {
		const html = `
			<div class="score tttoe__score row">
				<div id="player1" class="score__player">
					<div class="score__avatar">
						<img src="blocks/game/${this.players.player1}.png" alt="" />
					</div>
					<div class="score__name">${this.playerFirstName}</div>
					<div class="score__score">0</div>
				</div>
				<div id="player2" class="score__player">
					<div class="score__avatar">
						<img src="blocks/game/${this.players.player2}.png" alt="" />
					</div>
					<div class="score__name">${this.playerSecondName}</div>
					<div class="score__score">0</div>
				</div>
			</div>`;

		return html;
	}

}