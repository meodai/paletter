(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('chroma-js')) :
	typeof define === 'function' && define.amd ? define(['chroma-js'], factory) :
	(global.Paletter = factory(global.chroma));
}(this, (function (chroma) { 'use strict';

chroma = chroma && chroma.hasOwnProperty('default') ? chroma['default'] : chroma;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Paletter = function () {
  /**
   * Creates an instance of Paletter.
   * @param {Object} paletteObj colors palettes 
   * @param {Object} colors Raw color values
   * @param {Object} [options={}] Default options 
   */
  function Paletter(paletteObj, colors) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, Paletter);

    this.defaults = {
      separator: '--',
      defaultColorKey: 'default'
    };
    this.options = Object.assign({}, options, this.defaults);
    this.colors = Object.assign({}, colors);
    this.palette = Object.assign({}, paletteObj);
    this._validateColors();
  }

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
          parsedPalette[palette][key] = this.getColor('' + palette + this.options.separator + key);
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
     * @return {Object} containing a property with the palette palette and color key
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
     * 
     * @param {String} paletteKey typically contains a palette--key string
     * @param {Array} [callStack=[]] Stores all previous calls to make sure we don't infinite loop
     * @return {String} color string stored in color object
     */

  }, {
    key: 'getColor',
    value: function getColor(paletteKey) {
      var callStack = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      if (callStack.indexOf(paletteKey) > -1) {
        return console.log('you have inifinite rucrstion in your palette');
      }
      var parsedKey = this._parseKey(paletteKey);
      var palette = void 0,
          color = void 0;

      if (this.palette.hasOwnProperty(parsedKey.palette)) {
        palette = this.palette[parsedKey.palette];
      } else {
        return console.log('no palette called ' + parsedKey.palette);
      }

      if (palette.hasOwnProperty(parsedKey.color)) {
        color = palette[parsedKey.color];
        if (color.indexOf(this.options.separator) !== -1) {
          return this.getColor(color, callStack.concat([paletteKey]));
        } else {
          return this.colors[color];
        }
      } else {
        return console.log('no color called ' + parsedKey.color + ' in ' + parsedKey.palette);
      }
    }
  }], [{
    key: 'isValidColor',


    /**
     * makes sure a a color is valid by creating a chroma instance of that color
     * @static
     * @param {String} value color value as rgb, hex, hsl... string 
     * @return {Boolean} 
     */
    value: function isValidColor(value) {
      try {
        chroma(value);
      } catch (error) {
        return false;
      }
      return true;
    }
  }]);

  return Paletter;
}();

return Paletter;

})));
