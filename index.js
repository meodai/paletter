class Paletter {
  /**
   * Creates an instance of Paletter.
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
      (!Paletter.isValidColor(entry[1]))
    );
    
    if (invalidColors.length) {
      console.log('following colors are invalid:', invalidColors);
    }
  }
  
  _getPaletteKey (palette, key) {
    return `${palette}${this.options.separator}${key}`
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
        parsedPalette[palette][key] = this.getColor(this._getPaletteKey(palette, key));
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
   * Gets color value string and return if its a link to an other palette value
   * @param {String} value 
   * @return {Boolean}
   */
  _isPaletteLink (value) {
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
  _getKeyReference (palette, key) {
    let paletteRef;
    
    if (this.palette.hasOwnProperty(palette)) {
      paletteRef = this.palette[palette];
    } else {
      return console.log(`no palette called "${palette}"`);
    }
    
    if (paletteRef.hasOwnProperty(key)) { 
      return paletteRef[key];
    } else {
      return console.log(`no color called "${key}" in "${palette}"`);
    }
  } 

  /**
   * @param {String} paletteKey typically contains a palette--key string
   * @param {Array} [callStack=[]] Stores all previous calls to make sure we don't infinite loop
   * @return {String} color string stored in color object
   */
  getColor (paletteKey, callStack = []) {
    if(callStack.indexOf(paletteKey) > -1) {
      return console.log('you have inifinite rucrstion in your palette');
    }
    
    const parsedKey = this._parseKey(paletteKey);
    const colorKey = this._getKeyReference(parsedKey.palette, parsedKey.color);
    
    if (this._isPaletteLink(colorKey)) {
      return this.getColor(colorKey, callStack.concat([paletteKey]));
    } else {
      return this.colors[colorKey];
    }
  };
  
  /**
   * Returns all connections of between palettes
   * @returns {Array} List of all connections
   */
  getConnections () {
    let connections = [];
    for (let paletteKey in this.palette) {
      let palette = this.palette[paletteKey];
      for (let colorName in palette) {
        let colorValue = palette[colorName];
        if (this._isPaletteLink(colorValue)) {
          let parsedTargetKey = this._parseKey(colorValue);
          connections.push({
            from: {
              key: this._getPaletteKey(paletteKey, colorName),
              ref: this._parseKey(colorValue)
            },
            to: {
              key: colorValue,
              ref: this._getKeyReference( parsedTargetKey.palette, parsedTargetKey.color )
            }
          })
        }
      }
    }
    return connections;
  };
  
}