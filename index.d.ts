/**
 * Key of a base Color. eg. green
 */
export type ColorKey = string;

/**
 * Value of a base Color. eg. rgb(155, 220, 140)
 */
export type ColorValue = string;

/**
 * Name of a palette. Eg. Interaction
 */
export type PaletteName = string;

/**
 * Color reference can contain a ColorKey or a string Reference to another
 * color. Eg. interaction--selected for references to other palettes or selected
 */
export type ColorReference = string | ColorKey;

/**
 * Colors consisting of a color name and a ColorReference to a BaseColor
 */
export type Colors = { [colorName: string]: ColorReference }

/**
 * Resolved ColorReference with ColorValue
 */
export type PaletteColor = { name: ColorReference, value: ColorValue }

/**
 * Paletter options
 */
export type options = { separator: string, modifier: string, defaultColorKey: string }

export type ColorNode = { key: string, ref: string }
export type Connection = { from: ColorNode, to: ColorNode }

/**
 * Palettes consisting of a name and colors.
 */
export type Palettes = { [paletteName: string]: Colors }

export type ColorData = {
  colors: Colors,
  palettes: Palettes
}

declare class Paletter {

  public palette: Palettes;

  constructor(palettes: Palettes, colors: Colors, options?: options);

  getColor(paletteKey: ColorReference, callStack?: any[]): PaletteColor;

  getConnections(): Connection[];

  getParsed(): { [paletteName: string]: { [colorName: string]: PaletteColor } };

  static isValidColor(value: any): boolean;

}

export default Paletter;
