(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Paletter = factory());
})(this, (function () { 'use strict';

	const modes = {};

	const parsers = [];
	const colorProfiles = {};

	const getMode = mode => modes[mode];

	/* eslint-disable-next-line no-control-regex */
	const IdentStartCodePoint = /[^\x00-\x7F]|[a-zA-Z_]/;

	/* eslint-disable-next-line no-control-regex */
	const IdentCodePoint = /[^\x00-\x7F]|[-\w]/;

	const Tok = {
		Function: 'function',
		Ident: 'ident',
		Number: 'number',
		Percentage: 'percentage',
		ParenClose: ')',
		None: 'none',
		Hue: 'hue',
		Alpha: 'alpha'
	};

	let _i = 0;

	/*
		4.3.10. Check if three code points would start a number
		https://drafts.csswg.org/css-syntax/#starts-with-a-number
	 */
	function is_num(chars) {
		let ch = chars[_i];
		let ch1 = chars[_i + 1];
		if (ch === '-' || ch === '+') {
			return /\d/.test(ch1) || (ch1 === '.' && /\d/.test(chars[_i + 2]));
		}
		if (ch === '.') {
			return /\d/.test(ch1);
		}
		return /\d/.test(ch);
	}

	/*
		Check if the stream starts with an identifier.
	 */

	function is_ident(chars) {
		if (_i >= chars.length) {
			return false;
		}
		let ch = chars[_i];
		if (IdentStartCodePoint.test(ch)) {
			return true;
		}
		if (ch === '-') {
			if (chars.length - _i < 2) {
				return false;
			}
			let ch1 = chars[_i + 1];
			if (ch1 === '-' || IdentStartCodePoint.test(ch1)) {
				return true;
			}
			return false;
		}
		return false;
	}

	/*
		4.3.3. Consume a numeric token
		https://drafts.csswg.org/css-syntax/#consume-numeric-token
	 */

	const huenits = {
		deg: 1,
		rad: 180 / Math.PI,
		grad: 9 / 10,
		turn: 360
	};

	function num(chars) {
		let value = '';
		if (chars[_i] === '-' || chars[_i] === '+') {
			value += chars[_i++];
		}
		value += digits(chars);
		if (chars[_i] === '.' && /\d/.test(chars[_i + 1])) {
			value += chars[_i++] + digits(chars);
		}
		if (chars[_i] === 'e' || chars[_i] === 'E') {
			if (
				(chars[_i + 1] === '-' || chars[_i + 1] === '+') &&
				/\d/.test(chars[_i + 2])
			) {
				value += chars[_i++] + chars[_i++] + digits(chars);
			} else if (/\d/.test(chars[_i + 1])) {
				value += chars[_i++] + digits(chars);
			}
		}
		if (is_ident(chars)) {
			let id = ident(chars);
			if (id === 'deg' || id === 'rad' || id === 'turn' || id === 'grad') {
				return { type: Tok.Hue, value: value * huenits[id] };
			}
			return undefined;
		}
		if (chars[_i] === '%') {
			_i++;
			return { type: Tok.Percentage, value: +value };
		}
		return { type: Tok.Number, value: +value };
	}

	/*
		Consume digits.
	 */
	function digits(chars) {
		let v = '';
		while (/\d/.test(chars[_i])) {
			v += chars[_i++];
		}
		return v;
	}

	/*
		Consume an identifier.
	 */
	function ident(chars) {
		let v = '';
		while (_i < chars.length && IdentCodePoint.test(chars[_i])) {
			v += chars[_i++];
		}
		return v;
	}

	/*
		Consume an ident-like token.
	 */
	function identlike(chars) {
		let v = ident(chars);
		if (chars[_i] === '(') {
			_i++;
			return { type: Tok.Function, value: v };
		}
		if (v === 'none') {
			return { type: Tok.None, value: undefined };
		}
		return { type: Tok.Ident, value: v };
	}

	function tokenize(str = '') {
		let chars = str.trim();
		let tokens = [];
		let ch;

		/* reset counter */
		_i = 0;

		while (_i < chars.length) {
			ch = chars[_i++];

			/*
				Consume whitespace without emitting it
			 */
			if (ch === '\n' || ch === '\t' || ch === ' ') {
				while (
					_i < chars.length &&
					(chars[_i] === '\n' || chars[_i] === '\t' || chars[_i] === ' ')
				) {
					_i++;
				}
				continue;
			}

			if (ch === ',') {
				return undefined;
			}

			if (ch === ')') {
				tokens.push({ type: Tok.ParenClose });
				continue;
			}

			if (ch === '+') {
				_i--;
				if (is_num(chars)) {
					tokens.push(num(chars));
					continue;
				}
				return undefined;
			}

			if (ch === '-') {
				_i--;
				if (is_num(chars)) {
					tokens.push(num(chars));
					continue;
				}
				if (is_ident(chars)) {
					tokens.push({ type: Tok.Ident, value: ident(chars) });
					continue;
				}
				return undefined;
			}

			if (ch === '.') {
				_i--;
				if (is_num(chars)) {
					tokens.push(num(chars));
					continue;
				}
				return undefined;
			}

			if (ch === '/') {
				while (
					_i < chars.length &&
					(chars[_i] === '\n' || chars[_i] === '\t' || chars[_i] === ' ')
				) {
					_i++;
				}
				let alpha;
				if (is_num(chars)) {
					alpha = num(chars);
					if (alpha.type !== Tok.Hue) {
						tokens.push({ type: Tok.Alpha, value: alpha });
						continue;
					}
				}
				if (is_ident(chars)) {
					if (ident(chars) === 'none') {
						tokens.push({
							type: Tok.Alpha,
							value: { type: Tok.None, value: undefined }
						});
						continue;
					}
				}
				return undefined;
			}

			if (/\d/.test(ch)) {
				_i--;
				tokens.push(num(chars));
				continue;
			}

			if (IdentStartCodePoint.test(ch)) {
				_i--;
				tokens.push(identlike(chars));
				continue;
			}

			/*
				Treat everything not already handled as an error.
			 */
			return undefined;
		}

		return tokens;
	}

	function parseColorSyntax(tokens) {
		tokens._i = 0;
		let token = tokens[tokens._i++];
		if (!token || token.type !== Tok.Function || token.value !== 'color') {
			return undefined;
		}
		token = tokens[tokens._i++];
		if (token.type !== Tok.Ident) {
			return undefined;
		}
		const mode = colorProfiles[token.value];
		if (!mode) {
			return undefined;
		}
		const res = { mode };
		const coords = consumeCoords(tokens, false);
		if (!coords) {
			return undefined;
		}
		const channels = getMode(mode).channels;
		for (let ii = 0, c; ii < channels.length; ii++) {
			c = coords[ii];
			if (c.type !== Tok.None) {
				res[channels[ii]] = c.type === Tok.Number ? c.value : c.value / 100;
			}
		}
		return res;
	}

	function consumeCoords(tokens, includeHue) {
		const coords = [];
		let token;
		while (tokens._i < tokens.length) {
			token = tokens[tokens._i++];
			if (
				token.type === Tok.None ||
				token.type === Tok.Number ||
				token.type === Tok.Alpha ||
				token.type === Tok.Percentage ||
				(includeHue && token.type === Tok.Hue)
			) {
				coords.push(token);
				continue;
			}
			if (token.type === Tok.ParenClose) {
				if (tokens._i < tokens.length) {
					return undefined;
				}
				continue;
			}
			return undefined;
		}

		if (coords.length < 3 || coords.length > 4) {
			return undefined;
		}

		if (coords.length === 4) {
			if (coords[3].type !== Tok.Alpha) {
				return undefined;
			}
			coords[3] = coords[3].value;
		}
		if (coords.length === 3) {
			coords.push({ type: Tok.None, value: undefined });
		}

		return coords.every(c => c.type !== Tok.Alpha) ? coords : undefined;
	}

	function parseModernSyntax(tokens, includeHue) {
		tokens._i = 0;
		let token = tokens[tokens._i++];
		if (!token || token.type !== Tok.Function) {
			return undefined;
		}
		let coords = consumeCoords(tokens, includeHue);
		if (!coords) {
			return undefined;
		}
		coords.unshift(token.value);
		return coords;
	}

	const parse = color => {
		if (typeof color !== 'string') {
			return undefined;
		}
		const tokens = tokenize(color);
		const parsed = tokens ? parseModernSyntax(tokens, true) : undefined;
		let result = undefined;
		let i = 0;
		let len = parsers.length;
		while (i < len) {
			if ((result = parsers[i++](color, parsed)) !== undefined) {
				return result;
			}
		}
		return tokens ? parseColorSyntax(tokens) : undefined;
	};

	var parse$1 = parse;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/** Main paletter class */

	var Paletter = function () {
	  // palettename--name
	  /**
	   * Creates an instance of Paletter.
	   * @param {Object} paletteObj colors palettes
	   * @param {Object} colors Raw color values {name: value}
	   * @param {Object} [options={}] Default options
	   */
	  function Paletter(paletteObj, colors) {
	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    _classCallCheck(this, Paletter);

	    this.defaults = {
	      separator: '--',
	      modifier: '',
	      defaultColorKey: 'default',
	      validateColors: true
	    };
	    this.options = Object.assign({}, this.defaults, options);
	    this.colors = Object.assign({}, colors);
	    this.palette = Object.assign({}, paletteObj);

	    if (this.options.validateColors) {
	      this._validateColors();
	    }
	  }

	  /**
	   * makes sure a a color is valid by creating a chroma instance of that color
	   * @static
	   * @param {string|number} value color value as rgb, hex, hsl... string
	   * @return {Boolean}
	   */


	  _createClass(Paletter, [{
	    key: '_validateColors',


	    /**
	     * Makes sure all colors passed to the Palette are valid
	     */
	    value: function _validateColors() {
	      var invalidColors = Object.entries(this.colors).filter(function (entry) {
	        return !Paletter.isValidColor(entry[1]);
	      });

	      if (invalidColors.length) {
	        console.log('following colors are invalid:', invalidColors);
	      }
	    }

	    /**
	     * returns a string containg the palette plus color within it
	     * @param {String} palette palette name
	     * @param {String} key color key within palette
	     * @return {String}
	     */

	  }, {
	    key: '_getPaletteKey',
	    value: function _getPaletteKey(palette, key) {
	      return '' + palette + this.options.separator + key;
	    }

	    /**
	     * remaps all the color names to the actual color value
	     * @param {Object} palettes You palette object
	     * @return {Object} parsed palette with color values instead of links
	     */

	  }, {
	    key: '_parsePalette',
	    value: function _parsePalette(palettes) {
	      var parsedPalette = {};
	      for (var palette in palettes) {
	        parsedPalette[palette] = {};
	        for (var key in palettes[palette]) {
	          parsedPalette[palette][key] = this.getColor(this._getPaletteKey(palette, key)).value;
	        }
	      }
	      return parsedPalette;
	    }

	    /**
	     * @return {Object} palette parsed by _parsePalette
	     */

	  }, {
	    key: 'getParsed',
	    value: function getParsed() {
	      return this._parsePalette(this.palette);
	    }

	    /**
	     * parses key passed to the getColor method
	     * @param {String} paletteKey
	     * @return {Object} containing a property with the palette palette and
	     *                  color key
	     */

	  }, {
	    key: '_parseKey',
	    value: function _parseKey(paletteKey) {
	      var parts = paletteKey.split(this.options.separator);
	      return {
	        palette: parts[0],
	        color: parts[0].length > 1 && parts[1] ? parts[1] : this.options.defaultColorKey
	      };
	    }

	    /**
	     * Gets color value string and return if its a link to an other palette value
	     * @param {String} value
	     * @return {Boolean}
	     */

	  }, {
	    key: '_isPaletteLink',
	    value: function _isPaletteLink(value) {
	      return value.indexOf(this.options.separator) !== -1;
	    }

	    /**
	     * returns a color value from this.palette
	     * and checks if the palette and color exists
	     *
	     * @param {String} palette name of the palette (property name of this.palette)
	     * @param {String} key name of the color within a palette
	     *                     (property name of this.palette[paletteKey])
	     * @return {String} color value
	     */

	  }, {
	    key: '_getKeyReference',
	    value: function _getKeyReference(palette, key) {
	      var paletteRef = void 0;

	      if (this.palette.hasOwnProperty(palette)) {
	        paletteRef = this.palette[palette];
	      } else {
	        throw new Error('no palette called "' + palette + '"');
	      }

	      if (paletteRef.hasOwnProperty(key)) {
	        return paletteRef[key];
	      } else {
	        throw new Error('no color called "' + key + '" in "' + palette + '"');
	      }
	    }

	    /**
	     * @param {String} paletteKey typically contains a palette--key string
	     * @param {Array} [callStack=[]] Stores all previous calls to make sure we
	     *                               don't infinite loop
	     * @return {Object} val: color string stored in color object, name: name in
	     *                  color palette
	     */

	  }, {
	    key: 'getColor',
	    value: function getColor(paletteKey) {
	      var callStack = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	      if (callStack.indexOf(paletteKey) > -1) {
	        throw new Error('you have infinite recursion in your palette');
	      }

	      var parsedKey = this._parseKey(paletteKey);
	      var colorKey = this._getKeyReference(parsedKey.palette, parsedKey.color);

	      if (this._isPaletteLink(colorKey)) {
	        return this.getColor(colorKey, callStack.concat([paletteKey]));
	      } else {
	        return {
	          value: this.colors[colorKey],
	          name: colorKey
	        };
	      }
	    }

	    /**
	     * Returns all connections of between palettes
	     * @return {Array} List of all connections
	     */

	  }, {
	    key: 'getConnections',
	    value: function getConnections() {
	      var connections = [];
	      for (var paletteKey in this.palette) {
	        var palette = this.palette[paletteKey];
	        for (var colorName in palette) {
	          var colorValue = palette[colorName];
	          if (this._isPaletteLink(colorValue)) {
	            var parsedTargetKey = this._parseKey(colorValue);
	            connections.push({
	              from: {
	                key: this._getPaletteKey(paletteKey, colorName),
	                ref: this._parseKey(colorValue)
	              },
	              to: {
	                key: colorValue,
	                ref: this._getKeyReference(parsedTargetKey.palette, parsedTargetKey.color)
	              }
	            });
	          }
	        }
	      }
	      return connections;
	    }
	  }], [{
	    key: 'isValidColor',
	    value: function isValidColor(value) {
	      return parse$1(value) !== undefined;
	    }
	  }]);

	  return Paletter;
	}();

	return Paletter;

}));
