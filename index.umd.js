(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Paletter = factory());
})(this, (function () { 'use strict';

	const parseNumber = (color, len) => {
		if (typeof color !== 'number') return;

		// hex3: #c93 -> #cc9933
		if (len === 3) {
			return {
				mode: 'rgb',
				r: (((color >> 8) & 0xf) | ((color >> 4) & 0xf0)) / 255,
				g: (((color >> 4) & 0xf) | (color & 0xf0)) / 255,
				b: ((color & 0xf) | ((color << 4) & 0xf0)) / 255
			};
		}

		// hex4: #c931 -> #cc993311
		if (len === 4) {
			return {
				mode: 'rgb',
				r: (((color >> 12) & 0xf) | ((color >> 8) & 0xf0)) / 255,
				g: (((color >> 8) & 0xf) | ((color >> 4) & 0xf0)) / 255,
				b: (((color >> 4) & 0xf) | (color & 0xf0)) / 255,
				alpha: ((color & 0xf) | ((color << 4) & 0xf0)) / 255
			};
		}

		// hex6: #f0f1f2
		if (len === 6) {
			return {
				mode: 'rgb',
				r: ((color >> 16) & 0xff) / 255,
				g: ((color >> 8) & 0xff) / 255,
				b: (color & 0xff) / 255
			};
		}

		// hex8: #f0f1f2ff
		if (len === 8) {
			return {
				mode: 'rgb',
				r: ((color >> 24) & 0xff) / 255,
				g: ((color >> 16) & 0xff) / 255,
				b: ((color >> 8) & 0xff) / 255,
				alpha: (color & 0xff) / 255
			};
		}
	};

	var parseNumber$1 = parseNumber;

	const named = {
		aliceblue: 0xf0f8ff,
		antiquewhite: 0xfaebd7,
		aqua: 0x00ffff,
		aquamarine: 0x7fffd4,
		azure: 0xf0ffff,
		beige: 0xf5f5dc,
		bisque: 0xffe4c4,
		black: 0x000000,
		blanchedalmond: 0xffebcd,
		blue: 0x0000ff,
		blueviolet: 0x8a2be2,
		brown: 0xa52a2a,
		burlywood: 0xdeb887,
		cadetblue: 0x5f9ea0,
		chartreuse: 0x7fff00,
		chocolate: 0xd2691e,
		coral: 0xff7f50,
		cornflowerblue: 0x6495ed,
		cornsilk: 0xfff8dc,
		crimson: 0xdc143c,
		cyan: 0x00ffff,
		darkblue: 0x00008b,
		darkcyan: 0x008b8b,
		darkgoldenrod: 0xb8860b,
		darkgray: 0xa9a9a9,
		darkgreen: 0x006400,
		darkgrey: 0xa9a9a9,
		darkkhaki: 0xbdb76b,
		darkmagenta: 0x8b008b,
		darkolivegreen: 0x556b2f,
		darkorange: 0xff8c00,
		darkorchid: 0x9932cc,
		darkred: 0x8b0000,
		darksalmon: 0xe9967a,
		darkseagreen: 0x8fbc8f,
		darkslateblue: 0x483d8b,
		darkslategray: 0x2f4f4f,
		darkslategrey: 0x2f4f4f,
		darkturquoise: 0x00ced1,
		darkviolet: 0x9400d3,
		deeppink: 0xff1493,
		deepskyblue: 0x00bfff,
		dimgray: 0x696969,
		dimgrey: 0x696969,
		dodgerblue: 0x1e90ff,
		firebrick: 0xb22222,
		floralwhite: 0xfffaf0,
		forestgreen: 0x228b22,
		fuchsia: 0xff00ff,
		gainsboro: 0xdcdcdc,
		ghostwhite: 0xf8f8ff,
		gold: 0xffd700,
		goldenrod: 0xdaa520,
		gray: 0x808080,
		green: 0x008000,
		greenyellow: 0xadff2f,
		grey: 0x808080,
		honeydew: 0xf0fff0,
		hotpink: 0xff69b4,
		indianred: 0xcd5c5c,
		indigo: 0x4b0082,
		ivory: 0xfffff0,
		khaki: 0xf0e68c,
		lavender: 0xe6e6fa,
		lavenderblush: 0xfff0f5,
		lawngreen: 0x7cfc00,
		lemonchiffon: 0xfffacd,
		lightblue: 0xadd8e6,
		lightcoral: 0xf08080,
		lightcyan: 0xe0ffff,
		lightgoldenrodyellow: 0xfafad2,
		lightgray: 0xd3d3d3,
		lightgreen: 0x90ee90,
		lightgrey: 0xd3d3d3,
		lightpink: 0xffb6c1,
		lightsalmon: 0xffa07a,
		lightseagreen: 0x20b2aa,
		lightskyblue: 0x87cefa,
		lightslategray: 0x778899,
		lightslategrey: 0x778899,
		lightsteelblue: 0xb0c4de,
		lightyellow: 0xffffe0,
		lime: 0x00ff00,
		limegreen: 0x32cd32,
		linen: 0xfaf0e6,
		magenta: 0xff00ff,
		maroon: 0x800000,
		mediumaquamarine: 0x66cdaa,
		mediumblue: 0x0000cd,
		mediumorchid: 0xba55d3,
		mediumpurple: 0x9370db,
		mediumseagreen: 0x3cb371,
		mediumslateblue: 0x7b68ee,
		mediumspringgreen: 0x00fa9a,
		mediumturquoise: 0x48d1cc,
		mediumvioletred: 0xc71585,
		midnightblue: 0x191970,
		mintcream: 0xf5fffa,
		mistyrose: 0xffe4e1,
		moccasin: 0xffe4b5,
		navajowhite: 0xffdead,
		navy: 0x000080,
		oldlace: 0xfdf5e6,
		olive: 0x808000,
		olivedrab: 0x6b8e23,
		orange: 0xffa500,
		orangered: 0xff4500,
		orchid: 0xda70d6,
		palegoldenrod: 0xeee8aa,
		palegreen: 0x98fb98,
		paleturquoise: 0xafeeee,
		palevioletred: 0xdb7093,
		papayawhip: 0xffefd5,
		peachpuff: 0xffdab9,
		peru: 0xcd853f,
		pink: 0xffc0cb,
		plum: 0xdda0dd,
		powderblue: 0xb0e0e6,
		purple: 0x800080,

		// Added in CSS Colors Level 4:
		// https://drafts.csswg.org/css-color/#changes-from-3
		rebeccapurple: 0x663399,

		red: 0xff0000,
		rosybrown: 0xbc8f8f,
		royalblue: 0x4169e1,
		saddlebrown: 0x8b4513,
		salmon: 0xfa8072,
		sandybrown: 0xf4a460,
		seagreen: 0x2e8b57,
		seashell: 0xfff5ee,
		sienna: 0xa0522d,
		silver: 0xc0c0c0,
		skyblue: 0x87ceeb,
		slateblue: 0x6a5acd,
		slategray: 0x708090,
		slategrey: 0x708090,
		snow: 0xfffafa,
		springgreen: 0x00ff7f,
		steelblue: 0x4682b4,
		tan: 0xd2b48c,
		teal: 0x008080,
		thistle: 0xd8bfd8,
		tomato: 0xff6347,
		turquoise: 0x40e0d0,
		violet: 0xee82ee,
		wheat: 0xf5deb3,
		white: 0xffffff,
		whitesmoke: 0xf5f5f5,
		yellow: 0xffff00,
		yellowgreen: 0x9acd32
	};

	var named$1 = named;

	// Also supports the `transparent` color as defined in:
	// https://drafts.csswg.org/css-color/#transparent-black
	const parseNamed = color => {
		return parseNumber$1(named$1[color.toLowerCase()], 6);
	};

	var parseNamed$1 = parseNamed;

	const hex = /^#?([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})$/i;

	const parseHex = color => {
		let match;
		// eslint-disable-next-line no-cond-assign
		return (match = color.match(hex))
			? parseNumber$1(parseInt(match[1], 16), match[1].length)
			: undefined;
	};

	var parseHex$1 = parseHex;

	/*
		Basic building blocks for color regexes
		---------------------------------------

		These regexes are expressed as strings
		to be interpolated in the color regexes.
	 */

	// <number>
	const num$1 = '([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)';

	// <percentage>
	const per = `${num$1}%`;

	// <number-percentage> (<alpha-value>)
	const num_per = `(?:${num$1}%|${num$1})`;

	// <hue>
	const hue$1 = `(?:${num$1}(deg|grad|rad|turn)|${num$1})`;

	const c = `\\s*,\\s*`; // comma

	/*
		rgb() regular expressions for legacy format
		Reference: https://drafts.csswg.org/css-color/#rgb-functions
	 */
	const rgb_num_old = new RegExp(
		`^rgba?\\(\\s*${num$1}${c}${num$1}${c}${num$1}\\s*(?:,\\s*${num_per}\\s*)?\\)$`
	);

	const rgb_per_old = new RegExp(
		`^rgba?\\(\\s*${per}${c}${per}${c}${per}\\s*(?:,\\s*${num_per}\\s*)?\\)$`
	);

	const parseRgbLegacy = color => {
		let res = { mode: 'rgb' };
		let match;
		if ((match = color.match(rgb_num_old))) {
			if (match[1] !== undefined) {
				res.r = match[1] / 255;
			}
			if (match[2] !== undefined) {
				res.g = match[2] / 255;
			}
			if (match[3] !== undefined) {
				res.b = match[3] / 255;
			}
		} else if ((match = color.match(rgb_per_old))) {
			if (match[1] !== undefined) {
				res.r = match[1] / 100;
			}
			if (match[2] !== undefined) {
				res.g = match[2] / 100;
			}
			if (match[3] !== undefined) {
				res.b = match[3] / 100;
			}
		} else {
			return undefined;
		}

		if (match[4] !== undefined) {
			res.alpha = match[4] / 100;
		} else if (match[5] !== undefined) {
			res.alpha = +match[5];
		}

		return res;
	};

	var parseRgbLegacy$1 = parseRgbLegacy;

	const prepare = (color, mode) =>
		color === undefined
			? undefined
			: typeof color !== 'object'
			? parse$1(color)
			: color.mode !== undefined
			? color
			: mode
			? { ...color, mode }
			: undefined;

	var prepare$1 = prepare;

	const converter =
		(target_mode = 'rgb') =>
		color =>
			(color = prepare$1(color, target_mode)) !== undefined
				? // if the color's mode corresponds to our target mode
				  color.mode === target_mode
					? // then just return the color
					  color
					: // otherwise check to see if we have a dedicated
					// converter for the target mode
					converters[color.mode][target_mode]
					? // and return its result...
					  converters[color.mode][target_mode](color)
					: // ...otherwise pass through RGB as an intermediary step.
					// if the target mode is RGB...
					target_mode === 'rgb'
					? // just return the RGB
					  converters[color.mode].rgb(color)
					: // otherwise convert color.mode -> RGB -> target_mode
					  converters.rgb[target_mode](converters[color.mode].rgb(color))
				: undefined;

	var converter$1 = converter;

	const converters = {};
	const modes = {};

	const parsers = [];
	const colorProfiles = {};

	const identity = v => v;

	const useMode = definition => {
		converters[definition.mode] = {
			...converters[definition.mode],
			...definition.toMode
		};

		Object.keys(definition.fromMode || {}).forEach(k => {
			if (!converters[k]) {
				converters[k] = {};
			}
			converters[k][definition.mode] = definition.fromMode[k];
		});

		// Color space channel ranges
		if (!definition.ranges) {
			definition.ranges = {};
		}

		if (!definition.difference) {
			definition.difference = {};
		}

		definition.channels.forEach(channel => {
			// undefined channel ranges default to the [0, 1] interval
			if (definition.ranges[channel] === undefined) {
				definition.ranges[channel] = [0, 1];
			}

			if (!definition.interpolate[channel]) {
				throw new Error(`Missing interpolator for: ${channel}`);
			}

			if (typeof definition.interpolate[channel] === 'function') {
				definition.interpolate[channel] = {
					use: definition.interpolate[channel]
				};
			}

			if (!definition.interpolate[channel].fixup) {
				definition.interpolate[channel].fixup = identity;
			}
		});

		modes[definition.mode] = definition;
		(definition.parse || []).forEach(parser => {
			useParser(parser, definition.mode);
		});

		return converter$1(definition.mode);
	};

	const getMode = mode => modes[mode];

	const useParser = (parser, mode) => {
		if (typeof parser === 'string') {
			if (!mode) {
				throw new Error(`'mode' required when 'parser' is a string`);
			}
			colorProfiles[parser] = mode;
		} else if (typeof parser === 'function') {
			if (parsers.indexOf(parser) < 0) {
				parsers.push(parser);
			}
		}
	};

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

	function parseRgb(color, parsed) {
		if (!parsed || (parsed[0] !== 'rgb' && parsed[0] !== 'rgba')) {
			return undefined;
		}
		const res = { mode: 'rgb' };
		const [, r, g, b, alpha] = parsed;
		if (r.type === Tok.Hue || g.type === Tok.Hue || b.type === Tok.Hue) {
			return undefined;
		}
		if (r.type !== Tok.None) {
			res.r = r.type === Tok.Number ? r.value / 255 : r.value / 100;
		}
		if (g.type !== Tok.None) {
			res.g = g.type === Tok.Number ? g.value / 255 : g.value / 100;
		}
		if (b.type !== Tok.None) {
			res.b = b.type === Tok.Number ? b.value / 255 : b.value / 100;
		}
		if (alpha.type !== Tok.None) {
			res.alpha = alpha.type === Tok.Number ? alpha.value : alpha.value / 100;
		}

		return res;
	}

	const parseTransparent = c =>
		c === 'transparent'
			? { mode: 'rgb', r: 0, g: 0, b: 0, alpha: 0 }
			: undefined;

	var parseTransparent$1 = parseTransparent;

	const lerp = (a, b, t) => a + t * (b - a);

	const get_classes = arr => {
		let classes = [];
		for (let i = 0; i < arr.length - 1; i++) {
			let a = arr[i];
			let b = arr[i + 1];
			if (a === undefined && b === undefined) {
				classes.push(undefined);
			} else if (a !== undefined && b !== undefined) {
				classes.push([a, b]);
			} else {
				classes.push(a !== undefined ? [a, a] : [b, b]);
			}
		}
		return classes;
	};

	const interpolatorPiecewise = interpolator => arr => {
		let classes = get_classes(arr);
		return t => {
			let cls = t * classes.length;
			let idx = t >= 1 ? classes.length - 1 : Math.max(Math.floor(cls), 0);
			let pair = classes[idx];
			return pair === undefined
				? undefined
				: interpolator(pair[0], pair[1], cls - idx);
		};
	};

	const interpolatorLinear = interpolatorPiecewise(lerp);

	const fixupAlpha = arr => {
		let some_defined = false;
		let res = arr.map(v => {
			if (v !== undefined) {
				some_defined = true;
				return v;
			}
			return 1;
		});
		return some_defined ? res : arr;
	};

	/*
		sRGB color space
	 */

	const definition$q = {
		mode: 'rgb',
		channels: ['r', 'g', 'b', 'alpha'],
		parse: [
			parseRgb,
			parseHex$1,
			parseRgbLegacy$1,
			parseNamed$1,
			parseTransparent$1,
			'srgb'
		],
		serialize: 'srgb',
		interpolate: {
			r: interpolatorLinear,
			g: interpolatorLinear,
			b: interpolatorLinear,
			alpha: { use: interpolatorLinear, fixup: fixupAlpha }
		},
		gamut: true
	};

	var modeRgb = definition$q;

	/*
		Convert A98 RGB values to CIE XYZ D65

		References:
			* https://drafts.csswg.org/css-color/#color-conversion-code
			* http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
			* https://www.adobe.com/digitalimag/pdfs/AdobeRGB1998.pdf
	*/

	const linearize$2 = v => Math.pow(Math.abs(v), 563 / 256) * Math.sign(v);

	const convertA98ToXyz65 = a98 => {
		let r = linearize$2(a98.r);
		let g = linearize$2(a98.g);
		let b = linearize$2(a98.b);
		let res = {
			mode: 'xyz65',
			x:
				0.5766690429101305 * r +
				0.1855582379065463 * g +
				0.1882286462349947 * b,
			y:
				0.297344975250536 * r +
				0.6273635662554661 * g +
				0.0752914584939979 * b,
			z:
				0.0270313613864123 * r +
				0.0706888525358272 * g +
				0.9913375368376386 * b
		};
		if (a98.alpha !== undefined) {
			res.alpha = a98.alpha;
		}
		return res;
	};

	var convertA98ToXyz65$1 = convertA98ToXyz65;

	/*
		Convert CIE XYZ D65 values to A98 RGB

		References:
			* https://drafts.csswg.org/css-color/#color-conversion-code
			* http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
	*/

	const gamma$2 = v => Math.pow(Math.abs(v), 256 / 563) * Math.sign(v);

	const convertXyz65ToA98 = ({ x, y, z, alpha }) => {
		let res = {
			mode: 'a98',
			r: gamma$2(
				x * 2.0415879038107465 -
					y * 0.5650069742788597 -
					0.3447313507783297 * z
			),
			g: gamma$2(
				x * -0.9692436362808798 +
					y * 1.8759675015077206 +
					0.0415550574071756 * z
			),
			b: gamma$2(
				x * 0.0134442806320312 -
					y * 0.1183623922310184 +
					1.0151749943912058 * z
			)
		};
		if (alpha !== undefined) {
			res.alpha = alpha;
		}
		return res;
	};

	var convertXyz65ToA98$1 = convertXyz65ToA98;

	const fn$3 = c => {
		const abs = Math.abs(c);
		if (abs < 0.04045) {
			return c / 12.92;
		}
		return (Math.sign(c) || 1) * Math.pow((abs + 0.055) / 1.055, 2.4);
	};

	const convertRgbToLrgb = ({ r, g, b, alpha }) => {
		let res = {
			mode: 'lrgb',
			r: fn$3(r),
			g: fn$3(g),
			b: fn$3(b)
		};
		if (alpha !== undefined) res.alpha = alpha;
		return res;
	};

	var convertRgbToLrgb$1 = convertRgbToLrgb;

	/*
		Convert sRGB values to CIE XYZ D65

		References:
			* https://drafts.csswg.org/css-color/#color-conversion-code
			* http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
			* https://observablehq.com/@danburzo/color-matrix-calculator
	*/


	const convertRgbToXyz65 = rgb => {
		let { r, g, b, alpha } = convertRgbToLrgb$1(rgb);
		let res = {
			mode: 'xyz65',
			x:
				0.4123907992659593 * r +
				0.357584339383878 * g +
				0.1804807884018343 * b,
			y:
				0.2126390058715102 * r +
				0.715168678767756 * g +
				0.0721923153607337 * b,
			z:
				0.0193308187155918 * r +
				0.119194779794626 * g +
				0.9505321522496607 * b
		};
		if (alpha !== undefined) {
			res.alpha = alpha;
		}
		return res;
	};

	var convertRgbToXyz65$1 = convertRgbToXyz65;

	const fn$2 = c => {
		const abs = Math.abs(c);
		if (abs > 0.0031308) {
			return (Math.sign(c) || 1) * (1.055 * Math.pow(abs, 1 / 2.4) - 0.055);
		}
		return c * 12.92;
	};

	const convertLrgbToRgb = ({ r, g, b, alpha }, mode = 'rgb') => {
		let res = {
			mode,
			r: fn$2(r),
			g: fn$2(g),
			b: fn$2(b)
		};
		if (alpha !== undefined) res.alpha = alpha;
		return res;
	};

	var convertLrgbToRgb$1 = convertLrgbToRgb;

	/*
		CIE XYZ D65 values to sRGB.

		References:
			* https://drafts.csswg.org/css-color/#color-conversion-code
			* http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
			* https://observablehq.com/@danburzo/color-matrix-calculator
	*/


	const convertXyz65ToRgb = ({ x, y, z, alpha }) => {
		let res = convertLrgbToRgb$1({
			r:
				x * 3.2409699419045226 -
				y * 1.5373831775700939 -
				0.4986107602930034 * z,
			g:
				x * -0.9692436362808796 +
				y * 1.8759675015077204 +
				0.0415550574071756 * z,
			b:
				x * 0.0556300796969936 -
				y * 0.2039769588889765 +
				1.0569715142428784 * z
		});
		if (alpha !== undefined) {
			res.alpha = alpha;
		}
		return res;
	};

	var convertXyz65ToRgb$1 = convertXyz65ToRgb;

	const definition$p = {
		...modeRgb,
		mode: 'a98',
		parse: ['a98-rgb'],
		serialize: 'a98-rgb',

		fromMode: {
			rgb: color => convertXyz65ToA98$1(convertRgbToXyz65$1(color)),
			xyz65: convertXyz65ToA98$1
		},

		toMode: {
			rgb: color => convertXyz65ToRgb$1(convertA98ToXyz65$1(color)),
			xyz65: convertA98ToXyz65$1
		}
	};

	var modeA98 = definition$p;

	const normalizeHue = hue => ((hue = hue % 360) < 0 ? hue + 360 : hue);

	var normalizeHue$1 = normalizeHue;

	const hue = (hues, fn) => {
		return hues
			.map((hue, idx, arr) => {
				if (hue === undefined) {
					return hue;
				}
				let normalized = normalizeHue$1(hue);
				if (idx === 0 || hues[idx - 1] === undefined) {
					return normalized;
				}
				return fn(normalized - normalizeHue$1(arr[idx - 1]));
			})
			.reduce((acc, curr) => {
				if (
					!acc.length ||
					curr === undefined ||
					acc[acc.length - 1] === undefined
				) {
					acc.push(curr);
					return acc;
				}
				acc.push(curr + acc[acc.length - 1]);
				return acc;
			}, []);
	};

	const fixupHueShorter = arr =>
		hue(arr, d => (Math.abs(d) <= 180 ? d : d - 360 * Math.sign(d)));

	const M = [-0.14861, 1.78277, -0.29227, -0.90649, 1.97294, 0];

	const degToRad = Math.PI / 180;
	const radToDeg = 180 / Math.PI;

	/*
		Convert a RGB color to the Cubehelix HSL color space.

		This computation is not present in Green's paper:
		https://arxiv.org/pdf/1108.5083.pdf

		...but can be derived from the inverse, HSL to RGB conversion.

		It matches the math in Mike Bostock's D3 implementation:

		https://github.com/d3/d3-color/blob/master/src/cubehelix.js
	 */


	let DE = M[3] * M[4];
	let BE = M[1] * M[4];
	let BCAD = M[1] * M[2] - M[0] * M[3];

	const convertRgbToCubehelix = ({ r, g, b, alpha }) => {
		let l = (BCAD * b + r * DE - g * BE) / (BCAD + DE - BE);
		let x = b - l;
		let y = (M[4] * (g - l) - M[2] * x) / M[3];

		let res = {
			mode: 'cubehelix',
			l: l,
			s:
				l === 0 || l === 1
					? undefined
					: Math.sqrt(x * x + y * y) / (M[4] * l * (1 - l))
		};

		if (res.s) res.h = Math.atan2(y, x) * radToDeg - 120;
		if (alpha !== undefined) res.alpha = alpha;

		return res;
	};

	var convertRgbToCubehelix$1 = convertRgbToCubehelix;

	const convertCubehelixToRgb = ({ h, s, l, alpha }) => {
		let res = { mode: 'rgb' };

		h = (h === undefined ? 0 : h + 120) * degToRad;

		let amp = s === undefined ? 0 : s * l * (1 - l);

		let cosh = Math.cos(h);
		let sinh = Math.sin(h);

		res.r = l + amp * (M[0] * cosh + M[1] * sinh);
		res.g = l + amp * (M[2] * cosh + M[3] * sinh);
		res.b = l + amp * (M[4] * cosh + M[5] * sinh);

		if (alpha !== undefined) res.alpha = alpha;
		return res;
	};

	var convertCubehelixToRgb$1 = convertCubehelixToRgb;

	const differenceHueSaturation = (std, smp) => {
		if (std.h === undefined || smp.h === undefined || !std.s || !smp.s) {
			return 0;
		}
		let std_h = normalizeHue$1(std.h);
		let smp_h = normalizeHue$1(smp.h);
		let dH = Math.sin((((smp_h - std_h + 360) / 2) * Math.PI) / 180);
		return 2 * Math.sqrt(std.s * smp.s) * dH;
	};

	const differenceHueNaive = (std, smp) => {
		if (std.h === undefined || smp.h === undefined) {
			return 0;
		}
		let std_h = normalizeHue$1(std.h);
		let smp_h = normalizeHue$1(smp.h);
		if (Math.abs(smp_h - std_h) > 180) {
			// todo should this be normalized once again?
			return std_h - (smp_h - 360 * Math.sign(smp_h - std_h));
		}
		return smp_h - std_h;
	};

	const differenceHueChroma = (std, smp) => {
		if (std.h === undefined || smp.h === undefined || !std.c || !smp.c) {
			return 0;
		}
		let std_h = normalizeHue$1(std.h);
		let smp_h = normalizeHue$1(smp.h);
		let dH = Math.sin((((smp_h - std_h + 360) / 2) * Math.PI) / 180);
		return 2 * Math.sqrt(std.c * smp.c) * dH;
	};

	const averageAngle = val => {
		// See: https://en.wikipedia.org/wiki/Mean_of_circular_quantities
		let sum = val.reduce(
			(sum, val) => {
				if (val !== undefined) {
					let rad = (val * Math.PI) / 180;
					sum.sin += Math.sin(rad);
					sum.cos += Math.cos(rad);
				}
				return sum;
			},
			{ sin: 0, cos: 0 }
		);
		return (Math.atan2(sum.sin, sum.cos) * 180) / Math.PI;
	};

	/* 
		Dave Green's Cubehelix
		----------------------

		Green, D. A., 2011, "A colour scheme for the display of astronomical intensity images", 
		Bulletin of the Astronomical Society of India, 39, 289. (2011BASI...39..289G at ADS.) 

		https://www.mrao.cam.ac.uk/%7Edag/CUBEHELIX/
		https://arxiv.org/pdf/1108.5083.pdf

		Although Cubehelix was defined to be a method to obtain a colour scheme,
		it actually contains a definition of a colour space, as identified by 
		Mike Bostock and implemented in D3.js.

		Green's paper introduces the following terminology:

		* 	a `lightness` dimension in the interval [0, 1] 
			on which we interpolate to obtain the colour scheme
		*	a `start` colour that is analogous to a Hue in HSL space
		*	a number of `rotations` around the Hue cylinder.
		*	a `hue` parameter which should more appropriately be called `saturation`
		
		As such, the original definition of the Cubehelix scheme is actually an
		interpolation between two colors in the Cubehelix space:

		H: start 				H: start + 360 * rotations
		S: hue 			->		S: hue
		L: 0					L: 1

		We can therefore extend the interpolation to any two colors in this space,
		with a variable Saturation and a Lightness interval other than the fixed 0 -> 1.
	*/


	const definition$o = {
		mode: 'cubehelix',
		channels: ['h', 's', 'l', 'alpha'],
		parse: ['--cubehelix'],
		serialize: '--cubehelix',

		ranges: {
			h: [0, 360],
			s: [0, 4.614],
			l: [0, 1]
		},

		fromMode: {
			rgb: convertRgbToCubehelix$1
		},

		toMode: {
			rgb: convertCubehelixToRgb$1
		},

		interpolate: {
			h: {
				use: interpolatorLinear,
				fixup: fixupHueShorter
			},
			s: interpolatorLinear,
			l: interpolatorLinear,
			alpha: {
				use: interpolatorLinear,
				fixup: fixupAlpha
			}
		},

		difference: {
			h: differenceHueSaturation
		},

		average: {
			h: averageAngle
		}
	};

	var modeCubehelix = definition$o;

	/* 
		References: 
			* https://drafts.csswg.org/css-color/#lab-to-lch
			* https://drafts.csswg.org/css-color/#color-conversion-code
	*/
	const convertLabToLch = ({ l, a, b, alpha }, mode = 'lch') => {
		let c = Math.sqrt(a * a + b * b);
		let res = { mode, l, c };
		if (c) res.h = normalizeHue$1((Math.atan2(b, a) * 180) / Math.PI);
		if (alpha !== undefined) res.alpha = alpha;
		return res;
	};

	var convertLabToLch$1 = convertLabToLch;

	/* 
		References: 
			* https://drafts.csswg.org/css-color/#lch-to-lab
			* https://drafts.csswg.org/css-color/#color-conversion-code
	*/
	const convertLchToLab = ({ l, c, h, alpha }, mode = 'lab') => {
		let res = {
			mode,
			l,
			a: c ? c * Math.cos((h / 180) * Math.PI) : 0,
			b: c ? c * Math.sin((h / 180) * Math.PI) : 0
		};
		if (alpha !== undefined) res.alpha = alpha;
		return res;
	};

	var convertLchToLab$1 = convertLchToLab;

	const k$1 = Math.pow(29, 3) / Math.pow(3, 3);
	const e$1 = Math.pow(6, 3) / Math.pow(29, 3);

	/*
		The XYZ tristimulus values (white point)
		of standard illuminants for the CIE 1931 2° 
		standard observer.

		See: https://en.wikipedia.org/wiki/Standard_illuminant
	 */

	const D50 = {
		X: 0.3457 / 0.3585,
		Y: 1,
		Z: (1 - 0.3457 - 0.3585) / 0.3585
	};

	const D65 = {
		X: 0.3127 / 0.329,
		Y: 1,
		Z: (1 - 0.3127 - 0.329) / 0.329
	};

	let fn$1 = v => (Math.pow(v, 3) > e$1 ? Math.pow(v, 3) : (116 * v - 16) / k$1);

	const convertLab65ToXyz65 = ({ l, a, b, alpha }) => {
		let fy = (l + 16) / 116;
		let fx = a / 500 + fy;
		let fz = fy - b / 200;

		let res = {
			mode: 'xyz65',
			x: fn$1(fx) * D65.X,
			y: fn$1(fy) * D65.Y,
			z: fn$1(fz) * D65.Z
		};

		if (alpha !== undefined) {
			res.alpha = alpha;
		}

		return res;
	};

	var convertLab65ToXyz65$1 = convertLab65ToXyz65;

	const convertLab65ToRgb = lab => convertXyz65ToRgb$1(convertLab65ToXyz65$1(lab));

	var convertLab65ToRgb$1 = convertLab65ToRgb;

	const f$1 = value => (value > e$1 ? Math.cbrt(value) : (k$1 * value + 16) / 116);

	const convertXyz65ToLab65 = ({ x, y, z, alpha }) => {
		let f0 = f$1(x / D65.X);
		let f1 = f$1(y / D65.Y);
		let f2 = f$1(z / D65.Z);

		let res = {
			mode: 'lab65',
			l: 116 * f1 - 16,
			a: 500 * (f0 - f1),
			b: 200 * (f1 - f2)
		};

		if (alpha !== undefined) {
			res.alpha = alpha;
		}

		return res;
	};

	var convertXyz65ToLab65$1 = convertXyz65ToLab65;

	const convertRgbToLab65 = rgb => {
		let res = convertXyz65ToLab65$1(convertRgbToXyz65$1(rgb));

		// Fixes achromatic RGB colors having a _slight_ chroma due to floating-point errors
		// and approximated computations in sRGB <-> CIELab.
		// See: https://github.com/d3/d3-color/pull/46
		if (rgb.r === rgb.b && rgb.b === rgb.g) {
			res.a = res.b = 0;
		}
		return res;
	};

	var convertRgbToLab65$1 = convertRgbToLab65;

	const kE = 1;
	const kCH = 1;
	const θ = (26 / 180) * Math.PI;
	const cosθ = Math.cos(θ);
	const sinθ = Math.sin(θ);
	const factor = 100 / Math.log(139 / 100); // ~ 303.67

	/*
		Convert DIN99o LCh to CIELab D65
		--------------------------------
	 */

	const convertDlchToLab65 = ({ l, c, h, alpha }) => {
		let res = {
			mode: 'lab65',
			l: (Math.exp((l * kE) / factor) - 1) / 0.0039
		};

		if (h === undefined) {
			res.a = res.b = 0;
		} else {
			let G = (Math.exp(0.0435 * c * kCH * kE) - 1) / 0.075;
			let e = G * Math.cos((h / 180) * Math.PI - θ);
			let f = G * Math.sin((h / 180) * Math.PI - θ);
			res.a = e * cosθ - (f / 0.83) * sinθ;
			res.b = e * sinθ + (f / 0.83) * cosθ;
		}

		if (alpha !== undefined) res.alpha = alpha;
		return res;
	};

	var convertDlchToLab65$1 = convertDlchToLab65;

	/*
		Convert CIELab D65 to DIN99o LCh
		================================
	 */

	const convertLab65ToDlch = ({ l, a, b, alpha }) => {
		let e = a * cosθ + b * sinθ;
		let f = 0.83 * (b * cosθ - a * sinθ);
		let G = Math.sqrt(e * e + f * f);
		let res = {
			mode: 'dlch',
			l: (factor / kE) * Math.log(1 + 0.0039 * l),
			c: Math.log(1 + 0.075 * G) / (0.0435 * kCH * kE)
		};

		if (res.c) {
			res.h = normalizeHue$1(((Math.atan2(f, e) + θ) / Math.PI) * 180);
		}

		if (alpha !== undefined) res.alpha = alpha;
		return res;
	};

	var convertLab65ToDlch$1 = convertLab65ToDlch;

	const convertDlabToLab65 = c => convertDlchToLab65$1(convertLabToLch$1(c, 'dlch'));
	const convertLab65ToDlab = c => convertLchToLab$1(convertLab65ToDlch$1(c), 'dlab');

	const definition$n = {
		mode: 'dlab',

		parse: ['--din99o-lab'],
		serialize: '--din99o-lab',

		toMode: {
			lab65: convertDlabToLab65,
			rgb: c => convertLab65ToRgb$1(convertDlabToLab65(c))
		},

		fromMode: {
			lab65: convertLab65ToDlab,
			rgb: c => convertLab65ToDlab(convertRgbToLab65$1(c))
		},

		channels: ['l', 'a', 'b', 'alpha'],

		ranges: {
			l: [0, 100],
			a: [-40.09, 45.501],
			b: [-40.469, 44.344]
		},

		interpolate: {
			l: interpolatorLinear,
			a: interpolatorLinear,
			b: interpolatorLinear,
			alpha: {
				use: interpolatorLinear,
				fixup: fixupAlpha
			}
		}
	};

	var modeDlab = definition$n;

	const definition$m = {
		mode: 'dlch',

		parse: ['--din99o-lch'],
		serialize: '--din99o-lch',

		toMode: {
			lab65: convertDlchToLab65$1,
			dlab: c => convertLchToLab$1(c, 'dlab'),
			rgb: c => convertLab65ToRgb$1(convertDlchToLab65$1(c))
		},

		fromMode: {
			lab65: convertLab65ToDlch$1,
			dlab: c => convertLabToLch$1(c, 'dlch'),
			rgb: c => convertLab65ToDlch$1(convertRgbToLab65$1(c))
		},

		channels: ['l', 'c', 'h', 'alpha'],

		ranges: {
			l: [0, 100],
			c: [0, 51.484],
			h: [0, 360]
		},

		interpolate: {
			l: interpolatorLinear,
			c: interpolatorLinear,
			h: {
				use: interpolatorLinear,
				fixup: fixupHueShorter
			},
			alpha: {
				use: interpolatorLinear,
				fixup: fixupAlpha
			}
		},

		difference: {
			h: differenceHueChroma
		},

		average: {
			h: averageAngle
		}
	};

	var modeDlch = definition$m;

	// Based on: https://en.wikipedia.org/wiki/HSL_and_HSV#Converting_to_RGB

	function convertHsiToRgb({ h, s, i, alpha }) {
		h = normalizeHue$1(h);
		let f = Math.abs(((h / 60) % 2) - 1);
		let res;
		switch (Math.floor(h / 60)) {
			case 0:
				res = {
					r: i * (1 + s * (3 / (2 - f) - 1)),
					g: i * (1 + s * ((3 * (1 - f)) / (2 - f) - 1)),
					b: i * (1 - s)
				};
				break;
			case 1:
				res = {
					r: i * (1 + s * ((3 * (1 - f)) / (2 - f) - 1)),
					g: i * (1 + s * (3 / (2 - f) - 1)),
					b: i * (1 - s)
				};
				break;
			case 2:
				res = {
					r: i * (1 - s),
					g: i * (1 + s * (3 / (2 - f) - 1)),
					b: i * (1 + s * ((3 * (1 - f)) / (2 - f) - 1))
				};
				break;
			case 3:
				res = {
					r: i * (1 - s),
					g: i * (1 + s * ((3 * (1 - f)) / (2 - f) - 1)),
					b: i * (1 + s * (3 / (2 - f) - 1))
				};
				break;
			case 4:
				res = {
					r: i * (1 + s * ((3 * (1 - f)) / (2 - f) - 1)),
					g: i * (1 - s),
					b: i * (1 + s * (3 / (2 - f) - 1))
				};
				break;
			case 5:
				res = {
					r: i * (1 + s * (3 / (2 - f) - 1)),
					g: i * (1 - s),
					b: i * (1 + s * ((3 * (1 - f)) / (2 - f) - 1))
				};
				break;
			default:
				res = { r: i * (1 - s), g: i * (1 - s), b: i * (1 - s) };
		}

		res.mode = 'rgb';
		if (alpha !== undefined) res.alpha = alpha;
		return res;
	}

	// Based on: https://en.wikipedia.org/wiki/HSL_and_HSV#Formal_derivation

	function convertRgbToHsi({ r, g, b, alpha }) {
		let M = Math.max(r, g, b),
			m = Math.min(r, g, b);
		let res = {
			mode: 'hsi',
			s: r + g + b === 0 ? 0 : 1 - (3 * m) / (r + g + b),
			i: (r + g + b) / 3
		};
		if (M - m !== 0)
			res.h =
				(M === r
					? (g - b) / (M - m) + (g < b) * 6
					: M === g
					? (b - r) / (M - m) + 2
					: (r - g) / (M - m) + 4) * 60;
		if (alpha !== undefined) res.alpha = alpha;
		return res;
	}

	const definition$l = {
		mode: 'hsi',

		toMode: {
			rgb: convertHsiToRgb
		},

		parse: ['--hsi'],
		serialize: '--hsi',

		fromMode: {
			rgb: convertRgbToHsi
		},

		channels: ['h', 's', 'i', 'alpha'],

		ranges: {
			h: [0, 360]
		},

		gamut: 'rgb',

		interpolate: {
			h: { use: interpolatorLinear, fixup: fixupHueShorter },
			s: interpolatorLinear,
			i: interpolatorLinear,
			alpha: { use: interpolatorLinear, fixup: fixupAlpha }
		},

		difference: {
			h: differenceHueSaturation
		},

		average: {
			h: averageAngle
		}
	};

	var modeHsi = definition$l;

	// Based on: https://en.wikipedia.org/wiki/HSL_and_HSV#Converting_to_RGB

	function convertHslToRgb({ h, s, l, alpha }) {
		h = normalizeHue$1(h);
		let m1 = l + s * (l < 0.5 ? l : 1 - l);
		let m2 = m1 - (m1 - l) * 2 * Math.abs(((h / 60) % 2) - 1);
		let res;
		switch (Math.floor(h / 60)) {
			case 0:
				res = { r: m1, g: m2, b: 2 * l - m1 };
				break;
			case 1:
				res = { r: m2, g: m1, b: 2 * l - m1 };
				break;
			case 2:
				res = { r: 2 * l - m1, g: m1, b: m2 };
				break;
			case 3:
				res = { r: 2 * l - m1, g: m2, b: m1 };
				break;
			case 4:
				res = { r: m2, g: 2 * l - m1, b: m1 };
				break;
			case 5:
				res = { r: m1, g: 2 * l - m1, b: m2 };
				break;
			default:
				res = { r: 2 * l - m1, g: 2 * l - m1, b: 2 * l - m1 };
		}
		res.mode = 'rgb';
		if (alpha !== undefined) res.alpha = alpha;
		return res;
	}

	// Based on: https://en.wikipedia.org/wiki/HSL_and_HSV#Formal_derivation

	function convertRgbToHsl({ r, g, b, alpha }) {
		let M = Math.max(r, g, b),
			m = Math.min(r, g, b);
		let res = {
			mode: 'hsl',
			s: M === m ? 0 : (M - m) / (1 - Math.abs(M + m - 1)),
			l: 0.5 * (M + m)
		};
		if (M - m !== 0)
			res.h =
				(M === r
					? (g - b) / (M - m) + (g < b) * 6
					: M === g
					? (b - r) / (M - m) + 2
					: (r - g) / (M - m) + 4) * 60;
		if (alpha !== undefined) res.alpha = alpha;
		return res;
	}

	const hueToDeg = (val, unit) => {
		switch (unit) {
			case 'deg':
				return +val;
			case 'rad':
				return (val / Math.PI) * 180;
			case 'grad':
				return (val / 10) * 9;
			case 'turn':
				return val * 360;
		}
	};

	var hueToDeg$1 = hueToDeg;

	/*
		hsl() regular expressions for legacy format
		Reference: https://drafts.csswg.org/css-color/#the-hsl-notation
	 */
	const hsl_old = new RegExp(
		`^hsla?\\(\\s*${hue$1}${c}${per}${c}${per}\\s*(?:,\\s*${num_per}\\s*)?\\)$`
	);

	const parseHslLegacy = color => {
		let match = color.match(hsl_old);
		if (!match) return;
		let res = { mode: 'hsl' };

		if (match[3] !== undefined) {
			res.h = +match[3];
		} else if (match[1] !== undefined && match[2] !== undefined) {
			res.h = hueToDeg$1(match[1], match[2]);
		}

		if (match[4] !== undefined) {
			res.s = Math.min(Math.max(0, match[4] / 100), 1);
		}

		if (match[5] !== undefined) {
			res.l = Math.min(Math.max(0, match[5] / 100), 1);
		}

		if (match[6] !== undefined) {
			res.alpha = match[6] / 100;
		} else if (match[7] !== undefined) {
			res.alpha = +match[7];
		}
		return res;
	};

	var parseHslLegacy$1 = parseHslLegacy;

	function parseHsl(color, parsed) {
		if (!parsed || (parsed[0] !== 'hsl' && parsed[0] !== 'hsla')) {
			return undefined;
		}
		const res = { mode: 'hsl' };
		const [, h, s, l, alpha] = parsed;

		if (h.type !== Tok.None) {
			if (h.type === Tok.Percentage) {
				return undefined;
			}
			res.h = h.value;
		}

		if (s.type !== Tok.None) {
			if (s.type === Tok.Hue) {
				return undefined;
			}
			res.s = s.type === Tok.Number ? s.value : s.value / 100;
		}

		if (l.type !== Tok.None) {
			if (l.type === Tok.Hue) {
				return undefined;
			}
			res.l = l.type === Tok.Number ? l.value : l.value / 100;
		}

		if (alpha.type !== Tok.None) {
			res.alpha = alpha.type === Tok.Number ? alpha.value : alpha.value / 100;
		}

		return res;
	}

	const definition$k = {
		mode: 'hsl',

		toMode: {
			rgb: convertHslToRgb
		},

		fromMode: {
			rgb: convertRgbToHsl
		},

		channels: ['h', 's', 'l', 'alpha'],

		ranges: {
			h: [0, 360]
		},

		gamut: 'rgb',

		parse: [parseHsl, parseHslLegacy$1],
		serialize: c =>
			`hsl(${c.h || 0} ${c.s !== undefined ? c.s * 100 + '%' : 'none'} ${
			c.l !== undefined ? c.l * 100 + '%' : 'none'
		}${c.alpha < 1 ? ` / ${c.alpha}` : ''})`,

		interpolate: {
			h: { use: interpolatorLinear, fixup: fixupHueShorter },
			s: interpolatorLinear,
			l: interpolatorLinear,
			alpha: { use: interpolatorLinear, fixup: fixupAlpha }
		},

		difference: {
			h: differenceHueSaturation
		},

		average: {
			h: averageAngle
		}
	};

	var modeHsl = definition$k;

	// Based on: https://en.wikipedia.org/wiki/HSL_and_HSV#Converting_to_RGB

	function convertHsvToRgb({ h, s, v, alpha }) {
		h = normalizeHue$1(h);
		let f = Math.abs(((h / 60) % 2) - 1);
		let res;
		switch (Math.floor(h / 60)) {
			case 0:
				res = { r: v, g: v * (1 - s * f), b: v * (1 - s) };
				break;
			case 1:
				res = { r: v * (1 - s * f), g: v, b: v * (1 - s) };
				break;
			case 2:
				res = { r: v * (1 - s), g: v, b: v * (1 - s * f) };
				break;
			case 3:
				res = { r: v * (1 - s), g: v * (1 - s * f), b: v };
				break;
			case 4:
				res = { r: v * (1 - s * f), g: v * (1 - s), b: v };
				break;
			case 5:
				res = { r: v, g: v * (1 - s), b: v * (1 - s * f) };
				break;
			default:
				res = { r: v * (1 - s), g: v * (1 - s), b: v * (1 - s) };
		}
		res.mode = 'rgb';
		if (alpha !== undefined) res.alpha = alpha;
		return res;
	}

	// Based on: https://en.wikipedia.org/wiki/HSL_and_HSV#Formal_derivation

	function convertRgbToHsv({ r, g, b, alpha }) {
		let M = Math.max(r, g, b),
			m = Math.min(r, g, b);
		let res = {
			mode: 'hsv',
			s: M === 0 ? 0 : 1 - m / M,
			v: M
		};
		if (M - m !== 0)
			res.h =
				(M === r
					? (g - b) / (M - m) + (g < b) * 6
					: M === g
					? (b - r) / (M - m) + 2
					: (r - g) / (M - m) + 4) * 60;
		if (alpha !== undefined) res.alpha = alpha;
		return res;
	}

	const definition$j = {
		mode: 'hsv',

		toMode: {
			rgb: convertHsvToRgb
		},

		parse: ['--hsv'],
		serialize: '--hsv',

		fromMode: {
			rgb: convertRgbToHsv
		},

		channels: ['h', 's', 'v', 'alpha'],

		ranges: {
			h: [0, 360]
		},

		gamut: 'rgb',

		interpolate: {
			h: { use: interpolatorLinear, fixup: fixupHueShorter },
			s: interpolatorLinear,
			v: interpolatorLinear,
			alpha: { use: interpolatorLinear, fixup: fixupAlpha }
		},

		difference: {
			h: differenceHueSaturation
		},

		average: {
			h: averageAngle
		}
	};

	var modeHsv = definition$j;

	/*
		HWB to RGB converter
		--------------------

		References:
			* https://drafts.csswg.org/css-color/#hwb-to-rgb
			* https://en.wikipedia.org/wiki/HWB_color_model
			* http://alvyray.com/Papers/CG/HWB_JGTv208.pdf
	 */


	function convertHwbToRgb({ h, w, b, alpha }) {
		// normalize w + b to 1
		if (w + b > 1) {
			let s = w + b;
			w /= s;
			b /= s;
		}
		return convertHsvToRgb({
			h: h,
			s: b === 1 ? 1 : 1 - w / (1 - b),
			v: 1 - b,
			alpha: alpha
		});
	}

	/*
		RGB to HWB converter
		--------------------

		References:
			* https://drafts.csswg.org/css-color/#hwb-to-rgb
			* https://en.wikipedia.org/wiki/HWB_color_model
			* http://alvyray.com/Papers/CG/HWB_JGTv208.pdf
	 */


	function convertRgbToHwb(rgba) {
		let hsv = convertRgbToHsv(rgba);
		if (hsv === undefined) return undefined;
		let res = {
			mode: 'hwb',
			w: (1 - hsv.s) * hsv.v,
			b: 1 - hsv.v
		};
		if (hsv.h !== undefined) res.h = hsv.h;
		if (hsv.alpha !== undefined) res.alpha = hsv.alpha;
		return res;
	}

	function ParseHwb(color, parsed) {
		if (!parsed || parsed[0] !== 'hwb') {
			return undefined;
		}
		const res = { mode: 'hwb' };
		const [, h, w, b, alpha] = parsed;

		if (h.type !== Tok.None) {
			if (h.type === Tok.Percentage) {
				return undefined;
			}
			res.h = h.value;
		}

		if (w.type !== Tok.None) {
			if (w.type === Tok.Hue) {
				return undefined;
			}
			res.w = w.type === Tok.Number ? w.value : w.value / 100;
		}

		if (b.type !== Tok.None) {
			if (b.type === Tok.Hue) {
				return undefined;
			}
			res.b = b.type === Tok.Number ? b.value : b.value / 100;
		}

		if (alpha.type !== Tok.None) {
			res.alpha = alpha.type === Tok.Number ? alpha.value : alpha.value / 100;
		}

		return res;
	}

	const definition$i = {
		mode: 'hwb',

		toMode: {
			rgb: convertHwbToRgb
		},

		fromMode: {
			rgb: convertRgbToHwb
		},

		channels: ['h', 'w', 'b', 'alpha'],

		ranges: {
			h: [0, 360]
		},

		gamut: 'rgb',

		parse: [ParseHwb],
		serialize: c =>
			`hwb(${c.h || 0} ${c.w * 100}% ${c.b * 100}%${
			c.alpha < 1 ? ` / ${c.alpha}` : ''
		})`,

		interpolate: {
			h: { use: interpolatorLinear, fixup: fixupHueShorter },
			w: interpolatorLinear,
			b: interpolatorLinear,
			alpha: { use: interpolatorLinear, fixup: fixupAlpha }
		},

		difference: {
			h: differenceHueNaive
		},

		average: {
			h: averageAngle
		}
	};

	var modeHwb = definition$i;

	const n$1 = 0.1593017578125; // = 2610 / Math.pow(2, 14);
	const p$1 = 134.03437499999998; // = 1.7 * 2523 / Math.pow(2, 5);
	const c1$1 = 0.8359375; // = 3424 / Math.pow(2, 12);
	const c2$1 = 18.8515625; // = 2413 / Math.pow(2, 7);
	const c3$1 = 18.6875; // = 2392 / Math.pow(2, 7);
	const d0$1 = 1.6295499532821566e-11;

	/* `v` may be negative, in which case return 0 instead of NaN */
	const pq = v => {
		let vn = Math.pow(v / 10000, n$1);
		return Math.pow((c1$1 + c2$1 * vn) / (1 + c3$1 * vn), p$1) || 0;
	};

	// Convert to Absolute XYZ
	const abs = v => Math.max(v * 203, 0);

	const convertXyz65ToJab = ({ x, y, z, alpha }) => {
		x = abs(x);
		y = abs(y);
		z = abs(z);

		let xp = 1.15 * x - 0.15 * z;
		let yp = 0.66 * y + 0.34 * x;

		let l = pq(0.41478972 * xp + 0.579999 * yp + 0.014648 * z);
		let m = pq(-0.20151 * xp + 1.120649 * yp + 0.0531008 * z);
		let s = pq(-0.0166008 * xp + 0.2648 * yp + 0.6684799 * z);

		let i = (l + m) / 2;

		let res = {
			mode: 'jab',
			j: (0.44 * i) / (1 - 0.56 * i) - d0$1,
			a: 3.524 * l - 4.066708 * m + 0.542708 * s,
			b: 0.199076 * l + 1.096799 * m - 1.295875 * s
		};

		if (alpha !== undefined) {
			res.alpha = alpha;
		}

		return res;
	};

	var convertXyz65ToJab$1 = convertXyz65ToJab;

	const n = 0.1593017578125; // = 2610 / Math.pow(2, 14);
	const p = 134.03437499999998; // = 1.7 * 2523 / Math.pow(2, 5);
	const c1 = 0.8359375; // = 3424 / Math.pow(2, 12);
	const c2 = 18.8515625; // = 2413 / Math.pow(2, 7);
	const c3 = 18.6875; // = 2392 / Math.pow(2, 7);
	const d0 = 1.6295499532821566e-11;

	/* `v` may be negative, in which case return 0 instead of NaN */
	const pq_inv = v => {
		let vp = Math.pow(v, 1 / p);
		return 10000 * Math.pow((c1 - vp) / (c3 * vp - c2), 1 / n) || 0;
	};

	const rel = v => v / 203;

	const convertJabToXyz65 = ({ j, a, b, alpha }) => {
		let i = (j + d0) / (0.44 + 0.56 * (j + d0));

		let l = pq_inv(i + 0.13860504 * a + 0.058047316 * b);
		let m = pq_inv(i - 0.13860504 * a - 0.058047316 * b);
		let s = pq_inv(i - 0.096019242 * a - 0.8118919 * b);

		let res = {
			mode: 'xyz65',
			x: rel(
				1.661373024652174 * l -
					0.914523081304348 * m +
					0.23136208173913045 * s
			),
			y: rel(
				-0.3250758611844533 * l +
					1.571847026732543 * m -
					0.21825383453227928 * s
			),
			z: rel(-0.090982811 * l - 0.31272829 * m + 1.5227666 * s)
		};

		if (alpha !== undefined) {
			res.alpha = alpha;
		}

		return res;
	};

	var convertJabToXyz65$1 = convertJabToXyz65;

	/*
		Convert sRGB to JzAzBz.

		For achromatic sRGB colors, adjust the equivalent JzAzBz color
		to be achromatic as well, insteading of having a very slight chroma.
	 */


	const convertRgbToJab = rgb => {
		let res = convertXyz65ToJab$1(convertRgbToXyz65$1(rgb));
		if (rgb.r === rgb.b && rgb.b === rgb.g) {
			res.a = res.b = 0;
		}
		return res;
	};

	var convertRgbToJab$1 = convertRgbToJab;

	const convertJabToRgb = color => convertXyz65ToRgb$1(convertJabToXyz65$1(color));

	var convertJabToRgb$1 = convertJabToRgb;

	/*
		The JzAzBz color space.

		Based on:

		Muhammad Safdar, Guihua Cui, Youn Jin Kim, and Ming Ronnier Luo, 
		"Perceptually uniform color space for image signals 
		including high dynamic range and wide gamut," 
		Opt. Express 25, 15131-15151 (2017) 

		https://doi.org/10.1364/OE.25.015131
	 */


	const definition$h = {
		mode: 'jab',
		channels: ['j', 'a', 'b', 'alpha'],

		parse: ['--jzazbz'],
		serialize: '--jzazbz',

		fromMode: {
			rgb: convertRgbToJab$1,
			xyz65: convertXyz65ToJab$1
		},

		toMode: {
			rgb: convertJabToRgb$1,
			xyz65: convertJabToXyz65$1
		},

		ranges: {
			j: [0, 0.222],
			a: [-0.109, 0.129],
			b: [-0.185, 0.134]
		},

		interpolate: {
			j: interpolatorLinear,
			a: interpolatorLinear,
			b: interpolatorLinear,
			alpha: { use: interpolatorLinear, fixup: fixupAlpha }
		}
	};

	var modeJab = definition$h;

	const convertJabToJch = ({ j, a, b, alpha }) => {
		let c = Math.sqrt(a * a + b * b);
		let res = {
			mode: 'jch',
			j,
			c
		};
		if (c) {
			res.h = normalizeHue$1((Math.atan2(b, a) * 180) / Math.PI);
		}
		if (alpha !== undefined) {
			res.alpha = alpha;
		}
		return res;
	};

	var convertJabToJch$1 = convertJabToJch;

	const convertJchToJab = ({ j, c, h, alpha }) => {
		let res = {
			mode: 'jab',
			j,
			a: c ? c * Math.cos((h / 180) * Math.PI) : 0,
			b: c ? c * Math.sin((h / 180) * Math.PI) : 0
		};
		if (alpha !== undefined) res.alpha = alpha;
		return res;
	};

	var convertJchToJab$1 = convertJchToJab;

	const definition$g = {
		mode: 'jch',

		parse: ['--jzczhz'],
		serialize: '--jzczhz',

		toMode: {
			jab: convertJchToJab$1,
			rgb: c => convertJabToRgb$1(convertJchToJab$1(c))
		},

		fromMode: {
			rgb: c => convertJabToJch$1(convertRgbToJab$1(c)),
			jab: convertJabToJch$1
		},

		channels: ['j', 'c', 'h', 'alpha'],

		ranges: {
			j: [0, 0.221],
			c: [0, 0.19],
			h: [0, 360]
		},

		interpolate: {
			h: { use: interpolatorLinear, fixup: fixupHueShorter },
			c: interpolatorLinear,
			j: interpolatorLinear,
			alpha: { use: interpolatorLinear, fixup: fixupAlpha }
		},

		difference: {
			h: differenceHueChroma
		},

		average: {
			h: averageAngle
		}
	};

	var modeJch = definition$g;

	const k = Math.pow(29, 3) / Math.pow(3, 3);
	const e = Math.pow(6, 3) / Math.pow(29, 3);

	let fn = v => (Math.pow(v, 3) > e ? Math.pow(v, 3) : (116 * v - 16) / k);

	const convertLabToXyz50 = ({ l, a, b, alpha }) => {
		let fy = (l + 16) / 116;
		let fx = a / 500 + fy;
		let fz = fy - b / 200;

		let res = {
			mode: 'xyz50',
			x: fn(fx) * D50.X,
			y: fn(fy) * D50.Y,
			z: fn(fz) * D50.Z
		};

		if (alpha !== undefined) {
			res.alpha = alpha;
		}

		return res;
	};

	var convertLabToXyz50$1 = convertLabToXyz50;

	/*
		CIE XYZ D50 values to sRGB.

		References:
			* https://drafts.csswg.org/css-color/#color-conversion-code
			* http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
	*/


	const convertXyz50ToRgb = ({ x, y, z, alpha }) => {
		let res = convertLrgbToRgb$1({
			r:
				x * 3.1341359569958707 -
				y * 1.6173863321612538 -
				0.4906619460083532 * z,
			g:
				x * -0.978795502912089 +
				y * 1.916254567259524 +
				0.03344273116131949 * z,
			b:
				x * 0.07195537988411677 -
				y * 0.2289768264158322 +
				1.405386058324125 * z
		});
		if (alpha !== undefined) {
			res.alpha = alpha;
		}
		return res;
	};

	var convertXyz50ToRgb$1 = convertXyz50ToRgb;

	const convertLabToRgb = lab => convertXyz50ToRgb$1(convertLabToXyz50$1(lab));

	var convertLabToRgb$1 = convertLabToRgb;

	/*
		Convert sRGB values to CIE XYZ D50

		References:
			* https://drafts.csswg.org/css-color/#color-conversion-code
			* http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
		
	*/


	const convertRgbToXyz50 = rgb => {
		let { r, g, b, alpha } = convertRgbToLrgb$1(rgb);
		let res = {
			mode: 'xyz50',
			x:
				0.436065742824811 * r +
				0.3851514688337912 * g +
				0.14307845442264197 * b,
			y:
				0.22249319175623702 * r +
				0.7168870538238823 * g +
				0.06061979053616537 * b,
			z:
				0.013923904500943465 * r +
				0.09708128566574634 * g +
				0.7140993584005155 * b
		};
		if (alpha !== undefined) {
			res.alpha = alpha;
		}
		return res;
	};

	var convertRgbToXyz50$1 = convertRgbToXyz50;

	const f = value => (value > e ? Math.cbrt(value) : (k * value + 16) / 116);

	const convertXyz50ToLab = ({ x, y, z, alpha }) => {
		let f0 = f(x / D50.X);
		let f1 = f(y / D50.Y);
		let f2 = f(z / D50.Z);

		let res = {
			mode: 'lab',
			l: 116 * f1 - 16,
			a: 500 * (f0 - f1),
			b: 200 * (f1 - f2)
		};

		if (alpha !== undefined) {
			res.alpha = alpha;
		}

		return res;
	};

	var convertXyz50ToLab$1 = convertXyz50ToLab;

	const convertRgbToLab = rgb => {
		let res = convertXyz50ToLab$1(convertRgbToXyz50$1(rgb));

		// Fixes achromatic RGB colors having a _slight_ chroma due to floating-point errors
		// and approximated computations in sRGB <-> CIELab.
		// See: https://github.com/d3/d3-color/pull/46
		if (rgb.r === rgb.b && rgb.b === rgb.g) {
			res.a = res.b = 0;
		}
		return res;
	};

	var convertRgbToLab$1 = convertRgbToLab;

	function parseLab(color, parsed) {
		if (!parsed || parsed[0] !== 'lab') {
			return undefined;
		}
		const res = { mode: 'lab' };
		const [, l, a, b, alpha] = parsed;
		if (l.type === Tok.Hue || a.type === Tok.Hue || b.type === Tok.Hue) {
			return undefined;
		}
		if (l.type !== Tok.None) {
			res.l = l.value;
		}
		if (a.type !== Tok.None) {
			res.a = a.type === Tok.Number ? a.value : (a.value * 125) / 100;
		}
		if (b.type !== Tok.None) {
			res.b = b.type === Tok.Number ? b.value : (b.value * 125) / 100;
		}
		if (alpha.type !== Tok.None) {
			res.alpha = alpha.type === Tok.Number ? alpha.value : alpha.value / 100;
		}

		return res;
	}

	const definition$f = {
		mode: 'lab',

		toMode: {
			xyz50: convertLabToXyz50$1,
			rgb: convertLabToRgb$1
		},

		fromMode: {
			xyz50: convertXyz50ToLab$1,
			rgb: convertRgbToLab$1
		},

		channels: ['l', 'a', 'b', 'alpha'],

		ranges: {
			l: [0, 100],
			a: [-100, 100],
			b: [-100, 100]
		},

		parse: [parseLab],
		serialize: c =>
			`lab(${c.l !== undefined ? c.l : 'none'} ${
			c.a !== undefined ? c.a : 'none'
		} ${c.b !== undefined ? c.b : 'none'}${
			c.alpha < 1 ? ` / ${c.alpha}` : ''
		})`,

		interpolate: {
			l: interpolatorLinear,
			a: interpolatorLinear,
			b: interpolatorLinear,
			alpha: { use: interpolatorLinear, fixup: fixupAlpha }
		}
	};

	var modeLab = definition$f;

	const definition$e = {
		...modeLab,
		mode: 'lab65',

		parse: ['--lab-d65'],
		serialize: '--lab-d65',

		toMode: {
			xyz65: convertLab65ToXyz65$1,
			rgb: convertLab65ToRgb$1
		},

		fromMode: {
			xyz65: convertXyz65ToLab65$1,
			rgb: convertRgbToLab65$1
		},

		ranges: {
			l: [0, 100],
			a: [-86.182, 98.234],
			b: [-107.86, 94.477]
		}
	};

	var modeLab65 = definition$e;

	function parseLch(color, parsed) {
		if (!parsed || parsed[0] !== 'lch') {
			return undefined;
		}
		const res = { mode: 'lch' };
		const [, l, c, h, alpha] = parsed;
		if (l.type !== Tok.None) {
			if (l.type === Tok.Hue) {
				return undefined;
			}
			res.l = l.value;
		}
		if (c.type !== Tok.None) {
			res.c = Math.max(
				0,
				c.type === Tok.Number ? c.value : (c.value * 150) / 100
			);
		}
		if (h.type !== Tok.None) {
			if (h.type === Tok.Percentage) {
				return undefined;
			}
			res.h = h.value;
		}
		if (alpha.type !== Tok.None) {
			res.alpha = alpha.type === Tok.Number ? alpha.value : alpha.value / 100;
		}

		return res;
	}

	const definition$d = {
		mode: 'lch',

		toMode: {
			lab: convertLchToLab$1,
			rgb: c => convertLabToRgb$1(convertLchToLab$1(c))
		},

		fromMode: {
			rgb: c => convertLabToLch$1(convertRgbToLab$1(c)),
			lab: convertLabToLch$1
		},

		channels: ['l', 'c', 'h', 'alpha'],

		ranges: {
			l: [0, 100],
			c: [0, 150],
			h: [0, 360]
		},

		parse: [parseLch],
		serialize: c =>
			`lch(${c.l !== undefined ? c.l : 'none'} ${
			c.c !== undefined ? c.c : 'none'
		} ${c.h || 0}${c.alpha < 1 ? ` / ${c.alpha}` : ''})`,

		interpolate: {
			h: { use: interpolatorLinear, fixup: fixupHueShorter },
			c: interpolatorLinear,
			l: interpolatorLinear,
			alpha: { use: interpolatorLinear, fixup: fixupAlpha }
		},

		difference: {
			h: differenceHueChroma
		},

		average: {
			h: averageAngle
		}
	};

	var modeLch = definition$d;

	const definition$c = {
		...modeLch,
		mode: 'lch65',

		parse: ['--lch-d65'],
		serialize: '--lch-d65',

		toMode: {
			lab65: c => convertLchToLab$1(c, 'lab65'),
			rgb: c => convertLab65ToRgb$1(convertLchToLab$1(c, 'lab65'))
		},

		fromMode: {
			rgb: c => convertLabToLch$1(convertRgbToLab65$1(c), 'lch65'),
			lab65: c => convertLabToLch$1(c, 'lch65')
		},

		ranges: {
			l: [0, 100],
			c: [0, 133.807],
			h: [0, 360]
		}
	};

	var modeLch65 = definition$c;

	const convertLuvToLchuv = ({ l, u, v, alpha }) => {
		let c = Math.sqrt(u * u + v * v);
		let res = {
			mode: 'lchuv',
			l: l,
			c: c
		};
		if (c) {
			res.h = normalizeHue$1((Math.atan2(v, u) * 180) / Math.PI);
		}
		if (alpha !== undefined) {
			res.alpha = alpha;
		}
		return res;
	};

	var convertLuvToLchuv$1 = convertLuvToLchuv;

	const convertLchuvToLuv = ({ l, c, h, alpha }) => {
		let res = {
			mode: 'luv',
			l: l,
			u: c ? c * Math.cos((h / 180) * Math.PI) : 0,
			v: c ? c * Math.sin((h / 180) * Math.PI) : 0
		};
		if (alpha !== undefined) {
			res.alpha = alpha;
		}
		return res;
	};

	var convertLchuvToLuv$1 = convertLchuvToLuv;

	const u_fn$1 = (x, y, z) => (4 * x) / (x + 15 * y + 3 * z);
	const v_fn$1 = (x, y, z) => (9 * y) / (x + 15 * y + 3 * z);

	const un$1 = u_fn$1(D50.X, D50.Y, D50.Z);
	const vn$1 = v_fn$1(D50.X, D50.Y, D50.Z);

	const l_fn = value => (value <= e ? k * value : 116 * Math.cbrt(value) - 16);

	const convertXyz50ToLuv = ({ x, y, z, alpha }) => {
		let l = l_fn(y / D50.Y);
		let u = u_fn$1(x, y, z);
		let v = v_fn$1(x, y, z);

		// guard against NaNs produced by `xyz(0 0 0)` black
		if (!isFinite(u) || !isFinite(v)) {
			l = u = v = 0;
		} else {
			u = 13 * l * (u - un$1);
			v = 13 * l * (v - vn$1);
		}

		let res = {
			mode: 'luv',
			l,
			u,
			v
		};

		if (alpha !== undefined) {
			res.alpha = alpha;
		}

		return res;
	};

	var convertXyz50ToLuv$1 = convertXyz50ToLuv;

	const u_fn = (x, y, z) => (4 * x) / (x + 15 * y + 3 * z);
	const v_fn = (x, y, z) => (9 * y) / (x + 15 * y + 3 * z);

	const un = u_fn(D50.X, D50.Y, D50.Z);
	const vn = v_fn(D50.X, D50.Y, D50.Z);

	const convertLuvToXyz50 = ({ l, u, v, alpha }) => {
		let up = u / (13 * l) + un;
		let vp = v / (13 * l) + vn;
		let y = D50.Y * (l <= 8 ? l / k : Math.pow((l + 16) / 116, 3));
		let x = (y * (9 * up)) / (4 * vp);
		let z = (y * (12 - 3 * up - 20 * vp)) / (4 * vp);

		let res = { mode: 'xyz50', x, y, z };
		if (alpha !== undefined) {
			res.alpha = alpha;
		}

		return res;
	};

	var convertLuvToXyz50$1 = convertLuvToXyz50;

	/*
		CIELChuv color space
		--------------------

		Reference: 

			https://en.wikipedia.org/wiki/CIELUV
	 */


	const convertRgbToLchuv = rgb =>
		convertLuvToLchuv$1(convertXyz50ToLuv$1(convertRgbToXyz50$1(rgb)));
	const convertLchuvToRgb = lchuv =>
		convertXyz50ToRgb$1(convertLuvToXyz50$1(convertLchuvToLuv$1(lchuv)));

	const definition$b = {
		mode: 'lchuv',

		toMode: {
			luv: convertLchuvToLuv$1,
			rgb: convertLchuvToRgb
		},

		fromMode: {
			rgb: convertRgbToLchuv,
			luv: convertLuvToLchuv$1
		},

		channels: ['l', 'c', 'h', 'alpha'],

		parse: ['--lchuv'],
		serialize: '--lchuv',

		ranges: {
			l: [0, 100],
			c: [0, 176.956],
			h: [0, 360]
		},

		interpolate: {
			h: { use: interpolatorLinear, fixup: fixupHueShorter },
			c: interpolatorLinear,
			l: interpolatorLinear,
			alpha: { use: interpolatorLinear, fixup: fixupAlpha }
		},

		difference: {
			h: differenceHueChroma
		},

		average: {
			h: averageAngle
		}
	};

	var modeLchuv = definition$b;

	const definition$a = {
		...modeRgb,
		mode: 'lrgb',

		toMode: {
			rgb: convertLrgbToRgb$1
		},

		fromMode: {
			rgb: convertRgbToLrgb$1
		},

		parse: ['srgb-linear'],
		serialize: 'srgb-linear'
	};

	var modeLrgb = definition$a;

	/*
		CIELUV color space
		------------------

		Reference: 

			https://en.wikipedia.org/wiki/CIELUV
	 */


	const definition$9 = {
		mode: 'luv',

		toMode: {
			xyz50: convertLuvToXyz50$1,
			rgb: luv => convertXyz50ToRgb$1(convertLuvToXyz50$1(luv))
		},

		fromMode: {
			xyz50: convertXyz50ToLuv$1,
			rgb: rgb => convertXyz50ToLuv$1(convertRgbToXyz50$1(rgb))
		},

		channels: ['l', 'u', 'v', 'alpha'],

		parse: ['--luv'],
		serialize: '--luv',

		ranges: {
			l: [0, 100],
			u: [-84.936, 175.042],
			v: [-125.882, 87.243]
		},

		interpolate: {
			l: interpolatorLinear,
			u: interpolatorLinear,
			v: interpolatorLinear,
			alpha: { use: interpolatorLinear, fixup: fixupAlpha }
		}
	};

	var modeLuv = definition$9;

	const convertLrgbToOklab = ({ r, g, b, alpha }) => {
		let L = Math.cbrt(
			0.41222147079999993 * r + 0.5363325363 * g + 0.0514459929 * b
		);
		let M = Math.cbrt(
			0.2119034981999999 * r + 0.6806995450999999 * g + 0.1073969566 * b
		);
		let S = Math.cbrt(
			0.08830246189999998 * r + 0.2817188376 * g + 0.6299787005000002 * b
		);

		let res = {
			mode: 'oklab',
			l: 0.2104542553 * L + 0.793617785 * M - 0.0040720468 * S,
			a: 1.9779984951 * L - 2.428592205 * M + 0.4505937099 * S,
			b: 0.0259040371 * L + 0.7827717662 * M - 0.808675766 * S
		};

		if (alpha !== undefined) {
			res.alpha = alpha;
		}

		return res;
	};

	var convertLrgbToOklab$1 = convertLrgbToOklab;

	const convertRgbToOklab = rgb => {
		let res = convertLrgbToOklab$1(convertRgbToLrgb$1(rgb));
		if (rgb.r === rgb.b && rgb.b === rgb.g) {
			res.a = res.b = 0;
		}
		return res;
	};

	var convertRgbToOklab$1 = convertRgbToOklab;

	const convertOklabToLrgb = ({ l, a, b, alpha }) => {
		let L = Math.pow(
			l * 0.99999999845051981432 +
				0.39633779217376785678 * a +
				0.21580375806075880339 * b,
			3
		);
		let M = Math.pow(
			l * 1.0000000088817607767 -
				0.1055613423236563494 * a -
				0.063854174771705903402 * b,
			3
		);
		let S = Math.pow(
			l * 1.0000000546724109177 -
				0.089484182094965759684 * a -
				1.2914855378640917399 * b,
			3
		);

		let res = {
			mode: 'lrgb',
			r:
				+4.076741661347994 * L -
				3.307711590408193 * M +
				0.230969928729428 * S,
			g:
				-1.2684380040921763 * L +
				2.6097574006633715 * M -
				0.3413193963102197 * S,
			b:
				-0.004196086541837188 * L -
				0.7034186144594493 * M +
				1.7076147009309444 * S
		};

		if (alpha !== undefined) {
			res.alpha = alpha;
		}

		return res;
	};

	var convertOklabToLrgb$1 = convertOklabToLrgb;

	const convertOklabToRgb = c => convertLrgbToRgb$1(convertOklabToLrgb$1(c));

	var convertOklabToRgb$1 = convertOklabToRgb;

	/*
		Adapted from code by Björn Ottosson,
		released under the MIT license:

		Copyright (c) 2021 Björn Ottosson

		Permission is hereby granted, free of charge, to any person obtaining a copy of
		this software and associated documentation files (the "Software"), to deal in
		the Software without restriction, including without limitation the rights to
		use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
		of the Software, and to permit persons to whom the Software is furnished to do
		so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	 */


	function toe(x) {
		const k_1 = 0.206;
		const k_2 = 0.03;
		const k_3 = (1 + k_1) / (1 + k_2);
		return (
			0.5 *
			(k_3 * x -
				k_1 +
				Math.sqrt((k_3 * x - k_1) * (k_3 * x - k_1) + 4 * k_2 * k_3 * x))
		);
	}

	function toe_inv(x) {
		const k_1 = 0.206;
		const k_2 = 0.03;
		const k_3 = (1 + k_1) / (1 + k_2);
		return (x * x + k_1 * x) / (k_3 * (x + k_2));
	}

	// Finds the maximum saturation possible for a given hue that fits in sRGB
	// Saturation here is defined as S = C/L
	// a and b must be normalized so a^2 + b^2 == 1
	function compute_max_saturation(a, b) {
		// Max saturation will be when one of r, g or b goes below zero.

		// Select different coefficients depending on which component goes below zero first
		let k0, k1, k2, k3, k4, wl, wm, ws;

		if (-1.88170328 * a - 0.80936493 * b > 1) {
			// Red component
			k0 = +1.19086277;
			k1 = +1.76576728;
			k2 = +0.59662641;
			k3 = +0.75515197;
			k4 = +0.56771245;
			wl = +4.0767416621;
			wm = -3.3077115913;
			ws = +0.2309699292;
		} else if (1.81444104 * a - 1.19445276 * b > 1) {
			// Green component
			k0 = +0.73956515;
			k1 = -0.45954404;
			k2 = +0.08285427;
			k3 = +0.1254107;
			k4 = +0.14503204;
			wl = -1.2684380046;
			wm = +2.6097574011;
			ws = -0.3413193965;
		} else {
			// Blue component
			k0 = +1.35733652;
			k1 = -0.00915799;
			k2 = -1.1513021;
			k3 = -0.50559606;
			k4 = +0.00692167;
			wl = -0.0041960863;
			wm = -0.7034186147;
			ws = +1.707614701;
		}

		// Approximate max saturation using a polynomial:
		let S = k0 + k1 * a + k2 * b + k3 * a * a + k4 * a * b;

		// Do one step Halley's method to get closer
		// this gives an error less than 10e6, except for some blue hues where the dS/dh is close to infinite
		// this should be sufficient for most applications, otherwise do two/three steps

		let k_l = +0.3963377774 * a + 0.2158037573 * b;
		let k_m = -0.1055613458 * a - 0.0638541728 * b;
		let k_s = -0.0894841775 * a - 1.291485548 * b;

		{
			let l_ = 1 + S * k_l;
			let m_ = 1 + S * k_m;
			let s_ = 1 + S * k_s;

			let l = l_ * l_ * l_;
			let m = m_ * m_ * m_;
			let s = s_ * s_ * s_;

			let l_dS = 3 * k_l * l_ * l_;
			let m_dS = 3 * k_m * m_ * m_;
			let s_dS = 3 * k_s * s_ * s_;

			let l_dS2 = 6 * k_l * k_l * l_;
			let m_dS2 = 6 * k_m * k_m * m_;
			let s_dS2 = 6 * k_s * k_s * s_;

			let f = wl * l + wm * m + ws * s;
			let f1 = wl * l_dS + wm * m_dS + ws * s_dS;
			let f2 = wl * l_dS2 + wm * m_dS2 + ws * s_dS2;

			S = S - (f * f1) / (f1 * f1 - 0.5 * f * f2);
		}

		return S;
	}

	function find_cusp(a, b) {
		// First, find the maximum saturation (saturation S = C/L)
		let S_cusp = compute_max_saturation(a, b);

		// Convert to linear sRGB to find the first point where at least one of r,g or b >= 1:
		let rgb = convertOklabToLrgb$1({ l: 1, a: S_cusp * a, b: S_cusp * b });
		let L_cusp = Math.cbrt(1 / Math.max(rgb.r, rgb.g, rgb.b));
		let C_cusp = L_cusp * S_cusp;

		return [L_cusp, C_cusp];
	}

	// Finds intersection of the line defined by
	// L = L0 * (1 - t) + t * L1;
	// C = t * C1;
	// a and b must be normalized so a^2 + b^2 == 1
	function find_gamut_intersection(a, b, L1, C1, L0, cusp = null) {
		if (!cusp) {
			// Find the cusp of the gamut triangle
			cusp = find_cusp(a, b);
		}

		// Find the intersection for upper and lower half seprately
		let t;
		if ((L1 - L0) * cusp[1] - (cusp[0] - L0) * C1 <= 0) {
			// Lower half

			t = (cusp[1] * L0) / (C1 * cusp[0] + cusp[1] * (L0 - L1));
		} else {
			// Upper half

			// First intersect with triangle
			t = (cusp[1] * (L0 - 1)) / (C1 * (cusp[0] - 1) + cusp[1] * (L0 - L1));

			// Then one step Halley's method
			{
				let dL = L1 - L0;
				let dC = C1;

				let k_l = +0.3963377774 * a + 0.2158037573 * b;
				let k_m = -0.1055613458 * a - 0.0638541728 * b;
				let k_s = -0.0894841775 * a - 1.291485548 * b;

				let l_dt = dL + dC * k_l;
				let m_dt = dL + dC * k_m;
				let s_dt = dL + dC * k_s;

				// If higher accuracy is required, 2 or 3 iterations of the following block can be used:
				{
					let L = L0 * (1 - t) + t * L1;
					let C = t * C1;

					let l_ = L + C * k_l;
					let m_ = L + C * k_m;
					let s_ = L + C * k_s;

					let l = l_ * l_ * l_;
					let m = m_ * m_ * m_;
					let s = s_ * s_ * s_;

					let ldt = 3 * l_dt * l_ * l_;
					let mdt = 3 * m_dt * m_ * m_;
					let sdt = 3 * s_dt * s_ * s_;

					let ldt2 = 6 * l_dt * l_dt * l_;
					let mdt2 = 6 * m_dt * m_dt * m_;
					let sdt2 = 6 * s_dt * s_dt * s_;

					let r =
						4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s - 1;
					let r1 =
						4.0767416621 * ldt -
						3.3077115913 * mdt +
						0.2309699292 * sdt;
					let r2 =
						4.0767416621 * ldt2 -
						3.3077115913 * mdt2 +
						0.2309699292 * sdt2;

					let u_r = r1 / (r1 * r1 - 0.5 * r * r2);
					let t_r = -r * u_r;

					let g =
						-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s - 1;
					let g1 =
						-1.2684380046 * ldt +
						2.6097574011 * mdt -
						0.3413193965 * sdt;
					let g2 =
						-1.2684380046 * ldt2 +
						2.6097574011 * mdt2 -
						0.3413193965 * sdt2;

					let u_g = g1 / (g1 * g1 - 0.5 * g * g2);
					let t_g = -g * u_g;

					let b =
						-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s - 1;
					let b1 =
						-0.0041960863 * ldt -
						0.7034186147 * mdt +
						1.707614701 * sdt;
					let b2 =
						-0.0041960863 * ldt2 -
						0.7034186147 * mdt2 +
						1.707614701 * sdt2;

					let u_b = b1 / (b1 * b1 - 0.5 * b * b2);
					let t_b = -b * u_b;

					t_r = u_r >= 0 ? t_r : 10e5;
					t_g = u_g >= 0 ? t_g : 10e5;
					t_b = u_b >= 0 ? t_b : 10e5;

					t += Math.min(t_r, Math.min(t_g, t_b));
				}
			}
		}

		return t;
	}

	function get_ST_max(a_, b_, cusp = null) {
		if (!cusp) {
			cusp = find_cusp(a_, b_);
		}
		let L = cusp[0];
		let C = cusp[1];
		return [C / L, C / (1 - L)];
	}

	function get_Cs(L, a_, b_) {
		let cusp = find_cusp(a_, b_);

		let C_max = find_gamut_intersection(a_, b_, L, 1, L, cusp);
		let ST_max = get_ST_max(a_, b_, cusp);

		let S_mid =
			0.11516993 +
			1 /
				(+7.4477897 +
					4.1590124 * b_ +
					a_ *
						(-2.19557347 +
							1.75198401 * b_ +
							a_ *
								(-2.13704948 -
									10.02301043 * b_ +
									a_ *
										(-4.24894561 +
											5.38770819 * b_ +
											4.69891013 * a_))));

		let T_mid =
			0.11239642 +
			1 /
				(+1.6132032 -
					0.68124379 * b_ +
					a_ *
						(+0.40370612 +
							0.90148123 * b_ +
							a_ *
								(-0.27087943 +
									0.6122399 * b_ +
									a_ *
										(+0.00299215 -
											0.45399568 * b_ -
											0.14661872 * a_))));

		let k = C_max / Math.min(L * ST_max[0], (1 - L) * ST_max[1]);

		let C_a = L * S_mid;
		let C_b = (1 - L) * T_mid;
		let C_mid =
			0.9 *
			k *
			Math.sqrt(
				Math.sqrt(
					1 / (1 / (C_a * C_a * C_a * C_a) + 1 / (C_b * C_b * C_b * C_b))
				)
			);

		C_a = L * 0.4;
		C_b = (1 - L) * 0.8;
		let C_0 = Math.sqrt(1 / (1 / (C_a * C_a) + 1 / (C_b * C_b)));
		return [C_0, C_mid, C_max];
	}

	/*
		Adapted from code by Björn Ottosson,
		released under the MIT license:

		Copyright (c) 2021 Björn Ottosson

		Permission is hereby granted, free of charge, to any person obtaining a copy of
		this software and associated documentation files (the "Software"), to deal in
		the Software without restriction, including without limitation the rights to
		use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
		of the Software, and to permit persons to whom the Software is furnished to do
		so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	 */


	function convertOklabToOkhsl(lab) {
		const ret = { mode: 'okhsl', l: toe(lab.l) };

		if (lab.alpha !== undefined) {
			ret.alpha = lab.alpha;
		}
		let c = Math.sqrt(lab.a * lab.a + lab.b * lab.b);
		if (!c) {
			ret.s = 0;
			return ret;
		}
		let [C_0, C_mid, C_max] = get_Cs(lab.l, lab.a / c, lab.b / c);
		let s;
		if (c < C_mid) {
			let k_0 = 0;
			let k_1 = 0.8 * C_0;
			let k_2 = 1 - k_1 / C_mid;
			let t = (c - k_0) / (k_1 + k_2 * (c - k_0));
			s = t * 0.8;
		} else {
			let k_0 = C_mid;
			let k_1 = (0.2 * C_mid * C_mid * 1.25 * 1.25) / C_0;
			let k_2 = 1 - k_1 / (C_max - C_mid);
			let t = (c - k_0) / (k_1 + k_2 * (c - k_0));
			s = 0.8 + 0.2 * t;
		}
		if (s) {
			ret.s = s;
			ret.h = normalizeHue$1((Math.atan2(lab.b, lab.a) * 180) / Math.PI);
		}
		return ret;
	}

	/*
		Adapted from code by Björn Ottosson,
		released under the MIT license:

		Copyright (c) 2021 Björn Ottosson

		Permission is hereby granted, free of charge, to any person obtaining a copy of
		this software and associated documentation files (the "Software"), to deal in
		the Software without restriction, including without limitation the rights to
		use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
		of the Software, and to permit persons to whom the Software is furnished to do
		so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	 */


	function convertOkhslToOklab(hsl) {
		let l = toe_inv(hsl.l);

		const ret = { mode: 'oklab', l };

		if (hsl.alpha !== undefined) {
			ret.alpha = hsl.alpha;
		}

		if (!hsl.s || hsl.l === 1) {
			ret.a = ret.b = 0;
			return ret;
		}

		let a_ = Math.cos((hsl.h / 180) * Math.PI);
		let b_ = Math.sin((hsl.h / 180) * Math.PI);
		let [C_0, C_mid, C_max] = get_Cs(l, a_, b_);
		let t, k_0, k_1, k_2;
		if (hsl.s < 0.8) {
			t = 1.25 * hsl.s;
			k_0 = 0;
			k_1 = 0.8 * C_0;
			k_2 = 1 - k_1 / C_mid;
		} else {
			t = 5 * (hsl.s - 0.8);
			k_0 = C_mid;
			k_1 = (0.2 * C_mid * C_mid * 1.25 * 1.25) / C_0;
			k_2 = 1 - k_1 / (C_max - C_mid);
		}
		let C = k_0 + (t * k_1) / (1 - k_2 * t);
		ret.a = C * a_;
		ret.b = C * b_;

		return ret;
	}

	const modeOkhsl = {
		...modeHsl,
		mode: 'okhsl',
		channels: ['h', 's', 'l', 'alpha'],
		parse: ['--okhsl'],
		serialize: '--okhsl',
		fromMode: {
			oklab: convertOklabToOkhsl,
			rgb: c => convertOklabToOkhsl(convertRgbToOklab$1(c))
		},
		toMode: {
			oklab: convertOkhslToOklab,
			rgb: c => convertOklabToRgb$1(convertOkhslToOklab(c))
		}
	};

	var modeOkhsl$1 = modeOkhsl;

	/*
		Adapted from code by Björn Ottosson,
		released under the MIT license:

		Copyright (c) 2021 Björn Ottosson

		Permission is hereby granted, free of charge, to any person obtaining a copy of
		this software and associated documentation files (the "Software"), to deal in
		the Software without restriction, including without limitation the rights to
		use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
		of the Software, and to permit persons to whom the Software is furnished to do
		so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	 */


	function convertOklabToOkhsv(lab) {
		let c = Math.sqrt(lab.a * lab.a + lab.b * lab.b);

		let l = lab.l;
		// TODO: c = 0
		let a_ = c ? lab.a / c : 1;
		let b_ = c ? lab.b / c : 1;

		let [S_max, T] = get_ST_max(a_, b_);
		let S_0 = 0.5;
		let k = 1 - S_0 / S_max;

		let t = T / (c + l * T);
		let L_v = t * l;
		let C_v = t * c;

		let L_vt = toe_inv(L_v);
		let C_vt = (C_v * L_vt) / L_v;

		let rgb_scale = convertOklabToLrgb$1({ l: L_vt, a: a_ * C_vt, b: b_ * C_vt });
		let scale_L = Math.cbrt(
			1 / Math.max(rgb_scale.r, rgb_scale.g, rgb_scale.b, 0)
		);

		l = l / scale_L;
		c = ((c / scale_L) * toe(l)) / l;
		l = toe(l);

		const ret = {
			mode: 'okhsv',
			s: c ? ((S_0 + T) * C_v) / (T * S_0 + T * k * C_v) : 0,
			v: l ? l / L_v : 0
		};
		if (ret.s) {
			ret.h = normalizeHue$1((Math.atan2(lab.b, lab.a) * 180) / Math.PI);
		}
		if (lab.alpha !== undefined) {
			ret.alpha = lab.alpha;
		}
		return ret;
	}

	/*
		Copyright (c) 2021 Björn Ottosson

		Permission is hereby granted, free of charge, to any person obtaining a copy of
		this software and associated documentation files (the "Software"), to deal in
		the Software without restriction, including without limitation the rights to
		use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
		of the Software, and to permit persons to whom the Software is furnished to do
		so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	 */


	function convertOkhsvToOklab(hsv) {
		const ret = { mode: 'oklab' };
		if (hsv.alpha !== undefined) {
			ret.alpha = hsv.alpha;
		}

		// Hue may be missing for achromatic colors
		const h = hsv.h || 0;

		const a_ = Math.cos((h / 180) * Math.PI);
		const b_ = Math.sin((h / 180) * Math.PI);

		const [S_max, T] = get_ST_max(a_, b_);
		const S_0 = 0.5;
		const k = 1 - S_0 / S_max;
		const L_v = 1 - (hsv.s * S_0) / (S_0 + T - T * k * hsv.s);
		const C_v = (hsv.s * T * S_0) / (S_0 + T - T * k * hsv.s);

		const L_vt = toe_inv(L_v);
		const C_vt = (C_v * L_vt) / L_v;
		const rgb_scale = convertOklabToLrgb$1({
			l: L_vt,
			a: a_ * C_vt,
			b: b_ * C_vt
		});
		const scale_L = Math.cbrt(
			1 / Math.max(rgb_scale.r, rgb_scale.g, rgb_scale.b, 0)
		);

		const L_new = toe_inv(hsv.v * L_v);
		const C = (C_v * L_new) / L_v;

		ret.l = L_new * scale_L;
		ret.a = C * a_ * scale_L;
		ret.b = C * b_ * scale_L;

		return ret;
	}

	const modeOkhsv = {
		...modeHsv,
		mode: 'okhsv',
		channels: ['h', 's', 'v', 'alpha'],
		parse: ['--okhsv'],
		serialize: '--okhsv',
		fromMode: {
			oklab: convertOklabToOkhsv,
			rgb: c => convertOklabToOkhsv(convertRgbToOklab$1(c))
		},
		toMode: {
			oklab: convertOkhsvToOklab,
			rgb: c => convertOklabToRgb$1(convertOkhsvToOklab(c))
		}
	};

	var modeOkhsv$1 = modeOkhsv;

	function parseOklab(color, parsed) {
		if (!parsed || parsed[0] !== 'oklab') {
			return undefined;
		}
		const res = { mode: 'oklab' };
		const [, l, a, b, alpha] = parsed;
		if (l.type === Tok.Hue || a.type === Tok.Hue || b.type === Tok.Hue) {
			return undefined;
		}
		if (l.type !== Tok.None) {
			res.l = l.type === Tok.Number ? l.value : l.value / 100;
		}
		if (a.type !== Tok.None) {
			res.a = a.type === Tok.Number ? a.value : (a.value * 0.4) / 100;
		}
		if (b.type !== Tok.None) {
			res.b = b.type === Tok.Number ? b.value : (b.value * 0.4) / 100;
		}
		if (alpha.type !== Tok.None) {
			res.alpha = alpha.type === Tok.Number ? alpha.value : alpha.value / 100;
		}

		return res;
	}

	/*
		Oklab, a perceptual color space for image processing by Björn Ottosson
		Reference: https://bottosson.github.io/posts/oklab/
	 */

	const definition$8 = {
		...modeLab,
		mode: 'oklab',

		toMode: {
			lrgb: convertOklabToLrgb$1,
			rgb: convertOklabToRgb$1
		},

		fromMode: {
			lrgb: convertLrgbToOklab$1,
			rgb: convertRgbToOklab$1
		},

		ranges: {
			l: [0, 1],
			a: [-0.4, 0.4],
			b: [-0.4, 0.4]
		},

		parse: [parseOklab],
		serialize: c =>
			`oklab(${c.l !== undefined ? c.l : 'none'} ${
			c.a !== undefined ? c.a : 'none'
		} ${c.b !== undefined ? c.b : 'none'}${
			c.alpha < 1 ? ` / ${c.alpha}` : ''
		})`
	};

	var modeOklab = definition$8;

	function parseOklch(color, parsed) {
		if (!parsed || parsed[0] !== 'oklch') {
			return undefined;
		}
		const res = { mode: 'oklch' };
		const [, l, c, h, alpha] = parsed;
		if (l.type !== Tok.None) {
			if (l.type === Tok.Hue) {
				return undefined;
			}
			res.l = l.type === Tok.Number ? l.value : l.value / 100;
		}
		if (c.type !== Tok.None) {
			res.c = Math.max(
				0,
				c.type === Tok.Number ? c.value : (c.value * 0.4) / 100
			);
		}
		if (h.type !== Tok.None) {
			if (h.type === Tok.Percentage) {
				return undefined;
			}
			res.h = h.value;
		}
		if (alpha.type !== Tok.None) {
			res.alpha = alpha.type === Tok.Number ? alpha.value : alpha.value / 100;
		}

		return res;
	}

	const definition$7 = {
		...modeLch,
		mode: 'oklch',

		toMode: {
			oklab: c => convertLchToLab$1(c, 'oklab'),
			rgb: c => convertOklabToRgb$1(convertLchToLab$1(c, 'oklab'))
		},

		fromMode: {
			rgb: c => convertLabToLch$1(convertRgbToOklab$1(c), 'oklch'),
			oklab: c => convertLabToLch$1(c, 'oklch')
		},

		parse: [parseOklch],
		serialize: c =>
			`oklch(${c.l !== undefined ? c.l : 'none'} ${
			c.c !== undefined ? c.c : 'none'
		} ${c.h || 0}${c.alpha < 1 ? ` / ${c.alpha}` : ''})`,

		ranges: {
			l: [0, 1],
			c: [0, 0.4],
			h: [0, 360]
		}
	};

	var modeOklch = definition$7;

	/*
		Convert Display P3 values to CIE XYZ D65

		References:
			* https://drafts.csswg.org/css-color/#color-conversion-code
			* http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
	*/


	const convertP3ToXyz65 = rgb => {
		let { r, g, b, alpha } = convertRgbToLrgb$1(rgb);
		let res = {
			mode: 'xyz65',
			x:
				0.486570948648216 * r +
				0.265667693169093 * g +
				0.1982172852343625 * b,
			y:
				0.2289745640697487 * r +
				0.6917385218365062 * g +
				0.079286914093745 * b,
			z: 0.0 * r + 0.0451133818589026 * g + 1.043944368900976 * b
		};
		if (alpha !== undefined) {
			res.alpha = alpha;
		}
		return res;
	};

	var convertP3ToXyz65$1 = convertP3ToXyz65;

	/*
		CIE XYZ D65 values to Display P3.

		References:
			* https://drafts.csswg.org/css-color/#color-conversion-code
			* http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
	*/


	const convertXyz65ToP3 = ({ x, y, z, alpha }) => {
		let res = convertLrgbToRgb$1(
			{
				r:
					x * 2.4934969119414263 -
					y * 0.9313836179191242 -
					0.402710784450717 * z,
				g:
					x * -0.8294889695615749 +
					y * 1.7626640603183465 +
					0.0236246858419436 * z,
				b:
					x * 0.0358458302437845 -
					y * 0.0761723892680418 +
					0.9568845240076871 * z
			},
			'p3'
		);
		if (alpha !== undefined) {
			res.alpha = alpha;
		}
		return res;
	};

	var convertXyz65ToP3$1 = convertXyz65ToP3;

	const definition$6 = {
		...modeRgb,
		mode: 'p3',
		parse: ['display-p3'],
		serialize: 'display-p3',

		fromMode: {
			rgb: color => convertXyz65ToP3$1(convertRgbToXyz65$1(color)),
			xyz65: convertXyz65ToP3$1
		},

		toMode: {
			rgb: color => convertXyz65ToRgb$1(convertP3ToXyz65$1(color)),
			xyz65: convertP3ToXyz65$1
		}
	};

	var modeP3 = definition$6;

	/*
		Convert CIE XYZ D50 values to ProPhoto RGB

		References:
			* https://drafts.csswg.org/css-color/#color-conversion-code
			* http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
	*/

	const gamma$1 = v => {
		let abs = Math.abs(v);
		if (abs >= 1 / 512) {
			return Math.sign(v) * Math.pow(abs, 1 / 1.8);
		}
		return 16 * v;
	};

	const convertXyz50ToProphoto = ({ x, y, z, alpha }) => {
		let res = {
			mode: 'prophoto',
			r: gamma$1(
				x * 1.3457868816471585 -
					y * 0.2555720873797946 -
					0.0511018649755453 * z
			),
			g: gamma$1(
				x * -0.5446307051249019 +
					y * 1.5082477428451466 +
					0.0205274474364214 * z
			),
			b: gamma$1(x * 0.0 + y * 0.0 + 1.2119675456389452 * z)
		};
		if (alpha !== undefined) {
			res.alpha = alpha;
		}
		return res;
	};

	var convertXyz50ToProphoto$1 = convertXyz50ToProphoto;

	/*
		Convert ProPhoto RGB values to CIE XYZ D50

		References:
			* https://drafts.csswg.org/css-color/#color-conversion-code
			* http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
	*/

	const linearize$1 = v => {
		let abs = Math.abs(v);
		if (abs >= 16 / 512) {
			return Math.sign(v) * Math.pow(abs, 1.8);
		}
		return v / 16;
	};

	const convertProphotoToXyz50 = prophoto => {
		let r = linearize$1(prophoto.r);
		let g = linearize$1(prophoto.g);
		let b = linearize$1(prophoto.b);
		let res = {
			mode: 'xyz50',
			x:
				0.7977666449006423 * r +
				0.1351812974005331 * g +
				0.0313477341283922 * b,
			y:
				0.2880748288194013 * r +
				0.7118352342418731 * g +
				0.0000899369387256 * b,
			z: 0 * r + 0 * g + 0.8251046025104602 * b
		};
		if (prophoto.alpha !== undefined) {
			res.alpha = prophoto.alpha;
		}
		return res;
	};

	var convertProphotoToXyz50$1 = convertProphotoToXyz50;

	/*
		ProPhoto RGB Color space

		References:
			* https://en.wikipedia.org/wiki/ProPhoto_RGB_color_space
	 */

	const definition$5 = {
		...modeRgb,
		mode: 'prophoto',
		parse: ['prophoto-rgb'],
		serialize: 'prophoto-rgb',

		fromMode: {
			xyz50: convertXyz50ToProphoto$1,
			rgb: color => convertXyz50ToProphoto$1(convertRgbToXyz50$1(color))
		},

		toMode: {
			xyz50: convertProphotoToXyz50$1,
			rgb: color => convertXyz50ToRgb$1(convertProphotoToXyz50$1(color))
		}
	};

	var modeProphoto = definition$5;

	/*
		Convert CIE XYZ D65 values to Rec. 2020

		References:
			* https://drafts.csswg.org/css-color/#color-conversion-code
			* http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
			* https://www.itu.int/rec/R-REC-BT.2020/en
	*/

	const α$1 = 1.09929682680944;
	const β$1 = 0.018053968510807;
	const gamma = v => {
		const abs = Math.abs(v);
		if (abs > β$1) {
			return (Math.sign(v) || 1) * (α$1 * Math.pow(abs, 0.45) - (α$1 - 1));
		}
		return 4.5 * v;
	};

	const convertXyz65ToRec2020 = ({ x, y, z, alpha }) => {
		let res = {
			mode: 'rec2020',
			r: gamma(
				x * 1.7166511879712683 -
					y * 0.3556707837763925 -
					0.2533662813736599 * z
			),
			g: gamma(
				x * -0.6666843518324893 +
					y * 1.6164812366349395 +
					0.0157685458139111 * z
			),
			b: gamma(
				x * 0.0176398574453108 -
					y * 0.0427706132578085 +
					0.9421031212354739 * z
			)
		};
		if (alpha !== undefined) {
			res.alpha = alpha;
		}
		return res;
	};

	var convertXyz65ToRec2020$1 = convertXyz65ToRec2020;

	/*
		Convert Rec. 2020 values to CIE XYZ D65

		References:
			* https://drafts.csswg.org/css-color/#color-conversion-code
			* http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
			* https://www.itu.int/rec/R-REC-BT.2020/en
	*/

	const α = 1.09929682680944;
	const β = 0.018053968510807;

	const linearize = v => {
		let abs = Math.abs(v);
		if (abs < β * 4.5) {
			return v / 4.5;
		}
		return (Math.sign(v) || 1) * Math.pow((abs + α - 1) / α, 1 / 0.45);
	};

	const convertRec2020ToXyz65 = rec2020 => {
		let r = linearize(rec2020.r);
		let g = linearize(rec2020.g);
		let b = linearize(rec2020.b);
		let res = {
			mode: 'xyz65',
			x:
				0.6369580483012911 * r +
				0.1446169035862083 * g +
				0.1688809751641721 * b,
			y:
				0.262700212011267 * r +
				0.6779980715188708 * g +
				0.059301716469862 * b,
			z: 0 * r + 0.0280726930490874 * g + 1.0609850577107909 * b
		};
		if (rec2020.alpha !== undefined) {
			res.alpha = rec2020.alpha;
		}
		return res;
	};

	var convertRec2020ToXyz65$1 = convertRec2020ToXyz65;

	const definition$4 = {
		...modeRgb,
		mode: 'rec2020',

		fromMode: {
			xyz65: convertXyz65ToRec2020$1,
			rgb: color => convertXyz65ToRec2020$1(convertRgbToXyz65$1(color))
		},

		toMode: {
			xyz65: convertRec2020ToXyz65$1,
			rgb: color => convertXyz65ToRgb$1(convertRec2020ToXyz65$1(color))
		},

		parse: ['rec2020'],
		serialize: 'rec2020'
	};

	var modeRec2020 = definition$4;

	const bias = 0.00379307325527544933;
	const bias_cbrt = Math.cbrt(bias);

	const transfer$1 = v => Math.cbrt(v) - bias_cbrt;

	const convertRgbToXyb = color => {
		const { r, g, b, alpha } = convertRgbToLrgb$1(color);
		const l = transfer$1(0.3 * r + 0.622 * g + 0.078 * b + bias);
		const m = transfer$1(0.23 * r + 0.692 * g + 0.078 * b + bias);
		const s = transfer$1(
			0.24342268924547819 * r +
				0.20476744424496821 * g +
				0.5518098665095536 * b +
				bias
		);
		const res = {
			mode: 'xyb',
			x: (l - m) / 2,
			y: (l + m) / 2,
			/* Apply default chroma from luma (subtract Y from B) */
			b: s - (l + m) / 2
		};
		if (alpha !== undefined) res.alpha = alpha;
		return res;
	};

	var convertRgbToXyb$1 = convertRgbToXyb;

	const transfer = v => Math.pow(v + bias_cbrt, 3);

	const convertXybToRgb = ({ x, y, b, alpha }) => {
		const l = transfer(x + y) - bias;
		const m = transfer(y - x) - bias;
		/* Account for chroma from luma: add Y back to B */
		const s = transfer(b + y) - bias;

		const res = convertLrgbToRgb$1({
			r:
				11.031566904639861 * l -
				9.866943908131562 * m -
				0.16462299650829934 * s,
			g:
				-3.2541473810744237 * l +
				4.418770377582723 * m -
				0.16462299650829934 * s,
			b:
				-3.6588512867136815 * l +
				2.7129230459360922 * m +
				1.9459282407775895 * s
		});
		if (alpha !== undefined) res.alpha = alpha;
		return res;
	};

	var convertXybToRgb$1 = convertXybToRgb;

	/*
		The XYB color space, used in JPEG XL.
		Reference: https://ds.jpeg.org/whitepapers/jpeg-xl-whitepaper.pdf
	*/

	const definition$3 = {
		mode: 'xyb',
		channels: ['x', 'y', 'b', 'alpha'],
		parse: ['--xyb'],
		serialize: '--xyb',

		toMode: {
			rgb: convertXybToRgb$1
		},

		fromMode: {
			rgb: convertRgbToXyb$1
		},

		ranges: {
			x: [-0.0154, 0.0281],
			y: [0, 0.8453],
			b: [-0.2778, 0.388]
		},

		interpolate: {
			x: interpolatorLinear,
			y: interpolatorLinear,
			b: interpolatorLinear,
			alpha: { use: interpolatorLinear, fixup: fixupAlpha }
		}
	};

	var modeXyb = definition$3;

	/*
		The XYZ D50 color space
		-----------------------
	 */


	const definition$2 = {
		mode: 'xyz50',
		parse: ['xyz-d50'],
		serialize: 'xyz-d50',

		toMode: {
			rgb: convertXyz50ToRgb$1,
			lab: convertXyz50ToLab$1
		},

		fromMode: {
			rgb: convertRgbToXyz50$1,
			lab: convertLabToXyz50$1
		},

		channels: ['x', 'y', 'z', 'alpha'],

		ranges: {
			x: [0, 0.964],
			y: [0, 0.999],
			z: [0, 0.825]
		},

		interpolate: {
			x: interpolatorLinear,
			y: interpolatorLinear,
			z: interpolatorLinear,
			alpha: { use: interpolatorLinear, fixup: fixupAlpha }
		}
	};

	var modeXyz50 = definition$2;

	/*
		Chromatic adaptation of CIE XYZ from D65 to D50 white point
		using the Bradford method.

		References:
			* https://drafts.csswg.org/css-color/#color-conversion-code
			* http://www.brucelindbloom.com/index.html?Eqn_ChromAdapt.html	
	*/

	const convertXyz65ToXyz50 = xyz65 => {
		let { x, y, z, alpha } = xyz65;
		let res = {
			mode: 'xyz50',
			x:
				1.0479298208405488 * x +
				0.0229467933410191 * y -
				0.0501922295431356 * z,
			y:
				0.0296278156881593 * x +
				0.990434484573249 * y -
				0.0170738250293851 * z,
			z:
				-0.0092430581525912 * x +
				0.0150551448965779 * y +
				0.7518742899580008 * z
		};
		if (alpha !== undefined) {
			res.alpha = alpha;
		}
		return res;
	};

	var convertXyz65ToXyz50$1 = convertXyz65ToXyz50;

	/*
		Chromatic adaptation of CIE XYZ from D50 to D65 white point
		using the Bradford method.

		References:
			* https://drafts.csswg.org/css-color/#color-conversion-code
			* http://www.brucelindbloom.com/index.html?Eqn_ChromAdapt.html	
	*/

	const convertXyz50ToXyz65 = xyz50 => {
		let { x, y, z, alpha } = xyz50;
		let res = {
			mode: 'xyz65',
			x:
				0.9554734527042182 * x -
				0.0230985368742614 * y +
				0.0632593086610217 * z,
			y:
				-0.0283697069632081 * x +
				1.0099954580058226 * y +
				0.021041398966943 * z,
			z:
				0.0123140016883199 * x -
				0.0205076964334779 * y +
				1.3303659366080753 * z
		};
		if (alpha !== undefined) {
			res.alpha = alpha;
		}
		return res;
	};

	var convertXyz50ToXyz65$1 = convertXyz50ToXyz65;

	/*
		The XYZ D65 color space
		-----------------------
	 */


	const definition$1 = {
		mode: 'xyz65',

		toMode: {
			rgb: convertXyz65ToRgb$1,
			xyz50: convertXyz65ToXyz50$1
		},

		fromMode: {
			rgb: convertRgbToXyz65$1,
			xyz50: convertXyz50ToXyz65$1
		},

		ranges: {
			x: [0, 0.95],
			y: [0, 1],
			z: [0, 1.088]
		},

		channels: ['x', 'y', 'z', 'alpha'],

		parse: ['xyz', 'xyz-d65'],
		serialize: 'xyz-d65',

		interpolate: {
			x: interpolatorLinear,
			y: interpolatorLinear,
			z: interpolatorLinear,
			alpha: { use: interpolatorLinear, fixup: fixupAlpha }
		}
	};

	var modeXyz65 = definition$1;

	const convertRgbToYiq = ({ r, g, b, alpha }) => {
		const res = {
			mode: 'yiq',
			y: 0.29889531 * r + 0.58662247 * g + 0.11448223 * b,
			i: 0.59597799 * r - 0.2741761 * g - 0.32180189 * b,
			q: 0.21147017 * r - 0.52261711 * g + 0.31114694 * b
		};
		if (alpha !== undefined) res.alpha = alpha;
		return res;
	};

	var convertRgbToYiq$1 = convertRgbToYiq;

	const convertYiqToRgb = ({ y, i, q, alpha }) => {
		const res = {
			mode: 'rgb',
			r: y + 0.95608445 * i + 0.6208885 * q,
			g: y - 0.27137664 * i - 0.6486059 * q,
			b: y - 1.10561724 * i + 1.70250126 * q
		};
		if (alpha !== undefined) res.alpha = alpha;
		return res;
	};

	var convertYiqToRgb$1 = convertYiqToRgb;

	/*
		YIQ Color Space

		References
		----------

		Wikipedia:
			https://en.wikipedia.org/wiki/YIQ

		"Measuring perceived color difference using YIQ NTSC
		transmission color space in mobile applications"
			
			by Yuriy Kotsarenko, Fernando Ramos in:
			Programación Matemática y Software (2010) 

		Available at:
			
			http://www.progmat.uaem.mx:8080/artVol2Num2/Articulo3Vol2Num2.pdf
	 */

	const definition = {
		mode: 'yiq',

		toMode: {
			rgb: convertYiqToRgb$1
		},

		fromMode: {
			rgb: convertRgbToYiq$1
		},

		channels: ['y', 'i', 'q', 'alpha'],

		parse: ['--yiq'],
		serialize: '--yiq',

		ranges: {
			i: [-0.595, 0.595],
			q: [-0.522, 0.522]
		},

		interpolate: {
			y: interpolatorLinear,
			i: interpolatorLinear,
			q: interpolatorLinear,
			alpha: { use: interpolatorLinear, fixup: fixupAlpha }
		}
	};

	var modeYiq = definition;

	// Color space definitions

	useMode(modeA98);
	useMode(modeCubehelix);
	useMode(modeDlab);
	useMode(modeDlch);
	useMode(modeHsi);
	useMode(modeHsl);
	useMode(modeHsv);
	useMode(modeHwb);
	useMode(modeJab);
	useMode(modeJch);
	useMode(modeLab);
	useMode(modeLab65);
	useMode(modeLch);
	useMode(modeLch65);
	useMode(modeLchuv);
	useMode(modeLrgb);
	useMode(modeLuv);
	useMode(modeOkhsl$1);
	useMode(modeOkhsv$1);
	useMode(modeOklab);
	useMode(modeOklch);
	useMode(modeP3);
	useMode(modeProphoto);
	useMode(modeRec2020);
	useMode(modeRgb);
	useMode(modeXyb);
	useMode(modeXyz50);
	useMode(modeXyz65);
	useMode(modeYiq);

	/* eslint-disable guard-for-in */

	/** Main paletter class */
	class Paletter {
	  // palettename--name
	  /**
	   * Creates an instance of Paletter.
	   * @param {Object} paletteObj colors palettes
	   * @param {Object} colors Raw color values {name: value}
	   * @param {Object} [options={}] Default options
	   */
	  constructor(paletteObj, colors, options = {}) {
	    this.defaults = {
	      separator: '--',
	      modifier: '',
	      defaultColorKey: 'default',
	      validateColors: true,
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
	  static isValidColor(value) {
	    return parse$1(value) !== undefined;
	  }

	  /**
	   * Makes sure all colors passed to the Palette are valid
	   */
	  _validateColors() {
	    const invalidColors = Object.entries(this.colors).filter((entry) =>
	      (!Paletter.isValidColor(entry[1]))
	    );

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
	  _getPaletteKey(palette, key) {
	    return `${palette}${this.options.separator}${key}`;
	  }

	  /**
	   * remaps all the color names to the actual color value
	   * @param {Object} palettes You palette object
	   * @return {Object} parsed palette with color values instead of links
	   */
	  _parsePalette(palettes) {
	    const parsedPalette = {};
	    for (let palette in palettes) {
	      parsedPalette[palette] = {};
	      for (let key in palettes[palette]) {
	        parsedPalette[palette][key] =
	          this.getColor(this._getPaletteKey(palette, key)).value;
	      }
	    }
	    return parsedPalette;
	  }

	  /**
	   * @return {Object} palette parsed by _parsePalette
	   */
	  getParsed() {
	    return this._parsePalette(this.palette);
	  }

	  /**
	   * parses key passed to the getColor method
	   * @param {String} paletteKey
	   * @return {Object} containing a property with the palette palette and
	   *                  color key
	   */
	  _parseKey(paletteKey) {
	    const parts = paletteKey.split(this.options.separator);
	    return {
	      palette: parts[0],
	      color: parts[0].length > 1 && parts[1] ?
	             parts[1] : this.options.defaultColorKey,
	    };
	  }

	  /**
	   * Gets color value string and return if its a link to an other palette value
	   * @param {String} value
	   * @return {Boolean}
	   */
	  _isPaletteLink(value) {
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
	  _getKeyReference(palette, key) {
	    let paletteRef;

	    if (this.palette.hasOwnProperty(palette)) {
	      paletteRef = this.palette[palette];
	    } else {
	      throw new Error(`no palette called "${palette}"`);
	    }

	    if (paletteRef.hasOwnProperty(key)) {
	      return paletteRef[key];
	    } else {
	      throw new Error(`no color called "${key}" in "${palette}"`);
	    }
	  }

	  /**
	   * @param {String} paletteKey typically contains a palette--key string
	   * @param {Array} [callStack=[]] Stores all previous calls to make sure we
	   *                               don't infinite loop
	   * @return {Object} val: color string stored in color object, name: name in
	   *                  color palette
	   */
	  getColor(paletteKey, callStack = []) {
	    if (callStack.indexOf(paletteKey) > -1) {
	      throw new Error('you have infinite recursion in your palette');
	    }

	    const parsedKey = this._parseKey(paletteKey);
	    const colorKey = this._getKeyReference(parsedKey.palette, parsedKey.color);

	    if (this._isPaletteLink(colorKey)) {
	      return this.getColor(colorKey, callStack.concat([paletteKey]));
	    } else {
	      return {
	        value: this.colors[colorKey],
	        name: colorKey,
	      };
	    }
	  }

	  /**
	   * Returns all connections of between palettes
	   * @return {Array} List of all connections
	   */
	  getConnections() {
	    const connections = [];
	    for (const paletteKey in this.palette) {
	      const palette = this.palette[paletteKey];
	      for (const colorName in palette) {
	        const colorValue = palette[colorName];
	        if (this._isPaletteLink(colorValue)) {
	          const parsedTargetKey = this._parseKey(colorValue);
	          connections.push({
	            from: {
	              key: this._getPaletteKey(paletteKey, colorName),
	              ref: this._parseKey(colorValue),
	            },
	            to: {
	              key: colorValue,
	              ref: this._getKeyReference(
	                parsedTargetKey.palette,
	                parsedTargetKey.color
	              ),
	            },
	          });
	        }
	      }
	    }
	    return connections;
	  }
	}

	return Paletter;

}));
