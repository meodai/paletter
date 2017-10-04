import chroma from 'chroma-js';

export class Paletter {
  /**
   * Creates an instance of Palette.
   * @param {Object} paletteObj colors palettes 
   * @param {Object} colors Raw color values
   * @param {Object} [options={}] Default options 
   */
  constructor (paletteObj, colors, options = {}) {
    this.defaults = {
      separator: '--',
      defaultColorKey: 'default',
    };
    this.options = Object.assign({}, options, this.defaults)
    this.colors = Object.assign({}, colors);
    this.palette = Object.assign({}, paletteObj);
    this._validateColors();
  };
  
  /**
   * makes sure a a color is valid by creating a chroma instance of that color
   * @static
   * @param {String} value color value as rgb, hex, hsl... string 
   * @return {Boolean} 
   */
  static isValidColor (value) {
    try { 
      chroma(value);
    } catch (error) {
      return false;
    } 
    return true;
  };
  
  /**
   * Makes sure all colors passed to the Palette are valid
   */
  _validateColors () {
    const invalidColors = Object.entries(this.colors).filter(entry => 
      (!Palette.isValidColor(entry[1]))
    );
    
    if (invalidColors.length) {
      console.log('following colors are invalid:', invalidColors);
    }
  }
  
  /**
   * remaps all the color names to the actual color value
   * @param {Object} palettes You palette object 
   * @return {Object} parsed palette with color values instead of links
   */
  _parsePalette (palettes) {
    const parsedPalette = {};
    for(let palette in palettes) {
      parsedPalette[palette] = {};
      for(let key in palettes[palette]) {
        parsedPalette[palette][key] = this.getColor(`${palette}${this.options.separator}${key}`);
      } 
    }
    return parsedPalette;
  }

  /** 
   * @return {Object} palette parsed by _parsePalette
   */
  getParsed () {
    return this._parsePalette(this.palette);
  }

  /**
   * parses key passed to the getColor method
   * @param {String} paletteKey  
   * @return {Object} containing a property with the palette palette and color key
   */
  _parseKey (paletteKey) {
    const parts = paletteKey.split(this.options.separator);
    return {
      palette: parts[0],
      color: parts[0].length > 1 && parts[1] ? parts[1] : this.options.defaultColorKey,
    }
  }

  /**
   * 
   * @param {String} paletteKey typically contains a palette--key string
   * @param {Array} [callStack=[]] Stores all previous calls to make sure we don't infinite loop
   * @return {String} color string stored in color object
   */
  getColor (paletteKey, callStack = []) {
    if(callStack.indexOf(paletteKey) > -1) {
      return console.log('you have inifinite rucrstion in your palette');
    }
    const parsedKey = this._parseKey(paletteKey);
    let palette, color;
    
    if (this.palette.hasOwnProperty(parsedKey.palette)) {
      palette = this.palette[parsedKey.palette];
    } else {
      return console.log(`no palette called ${parsedKey.palette}`);
    }
    
    if (palette.hasOwnProperty(parsedKey.color)) {
      color = palette[parsedKey.color]
      if (color.indexOf(this.options.separator) !== -1) {
        return this.getColor(color, callStack.concat([paletteKey]));
      } else {
        return this.colors[color];
      }
    } else {
      return console.log(`no color called ${parsedKey.color} in ${parsedKey.palette}`);
    }
  }
}