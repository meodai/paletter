/* eslint-disable guard-for-in */
import { parse, converter, wcagContrast, differenceCiede2000 } from 'culori';

const toHsl = converter('hsl');
const toOKLCH = converter('oklch');

/**
 * Rules to choose a color from a list of colors
 */
const rules = {
  'best-contrast': (referenceColor, colorsToChooseFrom) => {
    return colorsToChooseFrom.reduce((prev, curr) => {
      const contrast = wcagContrast(referenceColor, curr);
      if (contrast > prev.contrast) {
        return {
          contrast,
          color: curr,
        };
      }
      return prev;
    }, {contrast: 0, color: null}).color;
  },
  'worst-contrast': (referenceColor, colorsToChooseFrom) => {
    return colorsToChooseFrom.reduce((prev, curr) => {
      const contrast = wcagContrast(referenceColor, curr);
      if (contrast < prev.contrast) {
        return {
          contrast,
          color: curr,
        };
      }
      return prev;
    }, {contrast: Infinity, color: null}).color;
  },
  'random': (referenceColor, colorsToChooseFrom) => {
    return colorsToChooseFrom[
      Math.floor(Math.random() * colorsToChooseFrom.length)
    ];
  },
  'closest': (referenceColor, colorsToChooseFrom) => {
    return colorsToChooseFrom.reduce((prev, curr) => {
      const distance = differenceCiede2000(referenceColor, curr);
      if (distance < prev.distance) {
        return {
          distance,
          color: curr,
        };
      }
      return prev;
    }, {distance: Infinity, color: null}).color;
  },
  'furthest': (referenceColor, colorsToChooseFrom) => {
    return colorsToChooseFrom.reduce((prev, curr) => {
      const distance = differenceCiede2000(referenceColor, curr);
      if (distance > prev.distance) {
        return {
          distance,
          color: curr,
        };
      }
      return prev;
    }, {distance: 0, color: null}).color;
  },
  'lightest': (referenceColor, colorsToChooseFrom) => {
    return colorsToChooseFrom.reduce((prev, curr) => {
      const prevHsl = toOKLCH(prev);
      const currHsl = toOKLCH(curr);
      if (currHsl.l > prevHsl.l) {
        return curr;
      }
      return prev;
    });
  },
  'darkest': (referenceColor, colorsToChooseFrom) => {
    return colorsToChooseFrom.reduce((prev, curr) => {
      const prevHsl = toOKLCH(prev);
      const currHsl = toOKLCH(curr);
      if (currHsl.l < prevHsl.l) {
        return curr;
      }
      return prev;
    });
  },
  'dullest': (referenceColor, colorsToChooseFrom) => {
    return colorsToChooseFrom.reduce((prev, curr) => {
      const prevHsl = toOKLCH(prev);
      const currHsl = toOKLCH(curr);
      if (currHsl.c < prevHsl.c) {
        return curr;
      }
      return prev;
    });
  },
  'most-vivid': (referenceColor, colorsToChooseFrom) => {
    return colorsToChooseFrom.reduce((prev, curr) => {
      const prevHsl = toOKLCH(prev);
      const currHsl = toOKLCH(curr);
      if (currHsl.c > prevHsl.c) {
        return curr;
      }
      return prev;
    });
  },
  'most-complementary': (referenceColor, colorsToChooseFrom) => {
    return colorsToChooseFrom.reduce((prev, curr) => {
      const prevHsl = toHsl(prev);
      const currHsl = toHsl(curr);
      if (Math.abs(currHsl.h - prevHsl.h) > 180) {
        return curr;
      }
      return prev;
    });
  },
};

/**
 * Modifiers to change a color value
 */
const mods = {
  'lighten': (color, amount) => {
    const hsl = toOKLCH(color);
    hsl.l += amount;
    return hsl;
  },
  'darken': (color, amount) => {
    const hsl = toOKLCH(color);
    hsl.l -= amount;
    return hsl;
  },
  'saturate': (color, amount) => {
    const hsl = toOKLCH(color);
    hsl.c += amount;
    return hsl;
  },
  'desaturate': (color, amount) => {
    const hsl = toOKLCH(color);
    hsl.c -= amount;
    return hsl;
  },
  'rotate': (color, amount) => {
    const hsl = toHsl(color);
    hsl.h += amount;
    return hsl;
  },
};


/** Main paletter class */
export default class Paletter {
  // palettename
  /**
   * Creates an instance of Paletter.
   * @param {Object} paletteObj colors palettes
   * @param {Object} colors Raw color values {name: value}
   * @param {Object} [options={}] Default options
   */
  constructor(paletteObj, colors, options = {}) {
    this.defaults = {
      separator: '__',
      modifier: '--',
      ruleSymbol: '@',
      validateColors: true,
    };
    this.options = Object.assign({}, this.defaults, options);
    this.colors = Object.assign({}, colors);
    this.palette = Object.assign({}, paletteObj);
    this.rules = new Map();

    if (this.options.validateColors) {
      this._validateColors();
    }

    this.connections = this._parseConnections();
  }

  /**
   * makes sure a a color is valid by creating a chroma instance of that color
   * @static
   * @param {string|number} value color value as rgb, hex, hsl... string
   * @return {Boolean}
   */
  static isValidColor(value) {
    return parse(value) !== undefined;
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
   * Returns the palette key for a given palette and key
   * @param {string} palette The name of the palette
   * @param {string} key The key of the color within the palette
   * @return {string} The palette key
   */
  getPaletteKey(palette, key) {
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
          this.getColor(this.getPaletteKey(palette, key)).value;
      }
    }

    // check if there are any modifiers in the palette and if so,
    // extend the the modifier palette with the original palette
    for (let palette in palettes) {
      if (this._isPaletteModifier(palette)) {
        const paletteName = palette.split(this.options.modifier)[0];
        parsedPalette[palette] = Object.assign(
          {},
          parsedPalette[paletteName],
          parsedPalette[palette]
        );
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
   * @return {Array} array of palette keys
   */
  get paletteKeys() {
    return Object.keys(this.palette);
  }

  /**
   * parses key passed to the getColor method
   * @param {String} paletteKey
   * @return {Object} containing a property with the palette palette and
   *                  color key
   */
  parseKey(paletteKey) {
    let ruleName = null;
    let palette = null;
    let color = null;
    let parts = [];

    if (paletteKey.indexOf(this.options.ruleSymbol) !== -1) {
      parts = paletteKey.split(this.options.ruleSymbol);
      palette = parts[0];
      ruleName = parts[1];
    } else if (paletteKey.indexOf(this.options.separator) !== -1) {
      parts = paletteKey.split(this.options.separator);
      palette = parts[0];
      color = parts[1];
    }

    if (ruleName) {
      if (!this.rules.has(ruleName)) {
        throw new Error(`Invalid rule name "${ruleName}", make sure you
        register the rule with the registerRule method`);
      }
    }

    if (!palette || !color) {
      throw new Error(`Invalid palette key "${paletteKey}", make sure you
      to use palettename${this.options.separator}colorname or palettename${
        this.options.ruleSymbol}rulename`);
    }

    return {
      palette,
      color,
      rule: ruleName,
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
   * Checks if a palette contains a modifier
   * @param {string} palette The name of the palette
   * @return {boolean} True if the palette contains a modifier, false otherwise
   */
  _isPaletteModifier(palette) {
    return palette.indexOf(this.options.modifier) !== -1;
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

    if (Object.prototype.hasOwnProperty.call(this.palette, palette)) {
      paletteRef = this.palette[palette];
    } else {
      throw new Error(`no palette called "${palette}"`);
    }

    if (Object.prototype.hasOwnProperty.call(paletteRef, key)) {
      return paletteRef[key];
    } else {
      throw new Error(`no color called "${key}" in "${palette}"`);
    }
  }

  /**
   * @param {String} paletteKey typically contains a palette__key string
   * @param {Array} [callStack=[]] Stores all previous calls to make sure we
   *                               don't infinite loop
   * @return {Object} val: color string stored in color object, name: name in
   *                  color palette
   */
  getColor(paletteKey, callStack = []) {
    if (callStack.indexOf(paletteKey) > -1) {
      throw new Error(`you have infinite recursion in your palette ${
        callStack.join(' -> ')}`);
    }

    const parsedKey = this.parseKey(paletteKey);
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
  _parseConnections() {
    const connections = [];
    for (const paletteKey in this.palette) {
      const palette = this.palette[paletteKey];
      for (const colorName in palette) {
        const colorValue = palette[colorName];
        if (this._isPaletteLink(colorValue)) {
          const parsedTargetKey = this.parseKey(colorValue);
          connections.push({
            from: {
              key: this.getPaletteKey(paletteKey, colorName),
              ref: this.parseKey(colorValue),
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

  /**
   * @return {Array} List of all connections
   */
  getConnections() {
    return this.connections;
  }

  /**
   * @param {String} paletteKey typically contains a palette__key string
   * @return {Array} List of all connections from the given palette
   */
  getConnection(paletteKey) {
    return this.connections.filter((connection) =>
      connection.from.key === paletteKey
    );
  }

  registerRule(ruleName, ruleFunction) {
    this.rules.set(ruleName, ruleFunction);
  }
}
