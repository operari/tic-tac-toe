
/**
 * Class repersenting a unique array.
 * @extends Array
 */
class UniqueArray extends Array {
	/**
	 * Creates a new array with unique values.
	 *
	 * @return {Array} Array with unique values.
	 */
	unique() {
		this[0].sort( (a,b) => a - b );
		let unique = [];
		if (this[0].length > 1) {
			this[0].reduce( (a,b,i,arr) => {
				if (a - b) {
					unique.push( a );
					if (arr[arr.length - 1] === arr[i]) {
						unique.push( b );
					}
				} else {
					if (arr.length === 2) {
						unique.push( b );
					}
				}
				return b;
			} );
		} else {
			if (!this[0].length) {
				throw new Error( 'The array does not have a suitable length!' );
			}
			unique = this[0];
		}
		return unique;
	}
}


/**
 * Getting a random integer between two values.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 * @param  {Number} min The minimum is inclusive.
 * @param  {Number} max The maximum is exclusive.
 * @return {Number} Random number in range.
 * @private
 */
function getRandomInt(min,max) {
	return Math.floor( Math.random() * (max - min) ) + min;
}
