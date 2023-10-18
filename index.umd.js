(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('culori')) :
	typeof define === 'function' && define.amd ? define(['culori'], factory) :
	(global.Paletter = factory(global.culori));
}(this, (function (culori) { 'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable guard-for-in */
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
      return culori.parse(value) !== undefined;
    }
  }]);

  return Paletter;
}();

return Paletter;

})));
