import {jest} from '@jest/globals';
import Paletter from '../index.mjs';
import {tableView} from '../lib/tableView.mjs';
import {toSVGviz} from '../lib/toSVGviz.mjs';

import palettes from './palettes.json';
import colors from './colors.json';

describe('Paletter', () => {
  describe('Constructor', () => {
    it('should have default values', () => {
      const paletter = new Paletter(palettes, colors);

      console.log(paletter.options)

      expect(paletter.options).toBeTruthy();
      expect(paletter.options.separator).toBe('__');
      expect(paletter.options.modifier).toBe('--');
      expect(paletter.options.defaultColorKey).toBe('default');
      expect(paletter.options.validateColors).toBe(true);
    });

    it('should override default values', () => {
      const options = {
        separator: '.',
        modifier: 'a',
        defaultColorKey: 'notDefault',
        validateColors: false,
      };
      const paletter = new Paletter(palettes, colors, options);

      expect(paletter.options.separator).toBe(options.separator);
      expect(paletter.options.modifier).toBe(options.modifier);
      expect(paletter.options.defaultColorKey).toBe(options.defaultColorKey);
      expect(paletter.options.validateColors).toBe(options.validateColors);
    });
  });

  describe('isValidColor', () => {
    it('should return true when color is valid', () => {
      expect(Paletter.isValidColor('abc')).toBeTruthy();
      expect(Paletter.isValidColor('rgba(0,0,0,0)')).toBeTruthy();
      expect(Paletter.isValidColor('#fff')).toBeTruthy();
      expect(Paletter.isValidColor('#000000')).toBeTruthy();

      expect(Paletter.isValidColor(1234)).toBeFalsy();
      expect(Paletter.isValidColor('#00000')).toBeFalsy();
    });
  });

  describe('_validateColors', () => {
    it('should check all colors and print invalid', () => {
      const invalidColors = Object.assign({}, colors, {invalid: '#00g'});
      const paletter = new Paletter(palettes, invalidColors);

      jest.spyOn(console, 'log');

      paletter._validateColors();
      expect(console.log).toHaveBeenCalledWith(
        expect.any(String), [['invalid', '#00g']]);
    });
  });

  describe('getPaletteKey', () => {
    it('should generate correct key', () => {
      const separator = '.';
      const paletter = new Paletter({}, {}, {separator});
      expect(paletter.getPaletteKey('test', 'key'))
        .toBe(`test${separator}key`);
    });
  });

  describe('getParsed', () => {
    it('should return parsed palette', () => {
      const paletter = new Paletter(palettes, colors);
      const parsedPalette = paletter.getParsed();

      expect(parsedPalette.typography.default).toBe('#010101');
      expect(parsedPalette.interaction.link).toBe('oklch(50% 0.25 260)');
    });

    it('should not fail for empty palette links', () => {
      const testPalette = Object.assign({}, palettes, {test: {lines: ''}});
      const paletter = new Paletter(testPalette, colors);
      const parsedPalette = paletter.getParsed();

      expect(parsedPalette.test.lines).toBe(undefined);
    });

    it('should not fail for not defined colors', () => {
      const testPalette = Object.assign({}, palettes, {test: {lines: 'test'}});
      const paletter = new Paletter(testPalette, colors);
      const parsedPalette = paletter.getParsed();

      expect(parsedPalette.test.lines).toBe(undefined);
    });

    it('should throw an error for circle palette links', () => {
      const testPalette = {
        test1: {link: 'test2__link'},
        test2: {link: 'test1__link'},
      };
      const paletter = new Paletter(testPalette, colors);

      expect(() => {
        paletter.getParsed();
      }).toThrowError('you have infinite recursion in your palette');
    });
  });

  describe('getColor', () => {
    it('should throw an error on infinite loops', () => {
      const testPalette = {
        test1: {link: 'test2__link'},
        test2: {link: 'test1__link'},
      };
      const paletter = new Paletter(testPalette, colors);

      expect(() => {
        paletter.getColor('test1__link', []);
      }).toThrowError('you have infinite recursion in your palette');
    });

    it('should return correct color', () => {
      const paletter = new Paletter(palettes, colors);
      const brandMain = paletter.getColor('brand__main');
      const expectedColor = {name: 'black', value: colors.black};

      expect(brandMain).toEqual(expectedColor);

      const typoDefault = paletter.getColor('typography__default');
      expect(typoDefault).toEqual(expectedColor);
    });

    it('should throw an error when palette not exists', () => {
      const testPalette = {
        test1: {link: 'test3__link'},
        test2: {link: 'test1__link'},
      };

      expect(() => {
        new Paletter(testPalette, colors);
      }).toThrowError('no palette called "test3"');
    });

    it('should return correct color when modifier is used in the palette key',
    () => {
      const testPalette = {
        'test1': {
          link: 'black',
        },
        'test1--mod': {
          link: 'white',
        },
      };
      const paletter = new Paletter(testPalette, colors);

      const brandMain = paletter.getColor('test1--mod__link');
      const expectedColor = {name: 'white', value: colors.white};

      expect(brandMain).toEqual(expectedColor);
    });

    it('should throw an error when palette key not exists', () => {
      const testPalette = {
        ja: {link: 'test1__link'},
        test1: {link: 'red'},
        test2: {link: 'test1__link'},
      };
      const paletter = new Paletter(testPalette, colors);

      expect(() => {
        paletter.getColor('test1__link2', []);
      }).toThrowError('no color called "link2" in "test1"');
    });
  });

  describe('getConnections', () => {
    it('should return correct connections', () => {
      const testPalettes = {test: {line: 'black'}, test2: {line: 'test__line'}};
      const testColors = {black: '#000'};
      const paletter = new Paletter(testPalettes, testColors);
      const [resultConnection] = paletter.getConnections();

      const expectedConnection = {
        from: {key: 'test2__line', ref: {color: 'line', palette: 'test'}},
        to: {key: 'test__line', ref: 'black'},
      };

      expect(resultConnection).toEqual(expectedConnection);
    });
  });

  describe('paletteKeys', () => {
    it('should return an array of palette keys', () => {
      const paletter = new Paletter(palettes, colors);
      const keys = paletter.paletteKeys;

      expect(Array.isArray(keys)).toBe(true);
      expect(keys).toEqual(expect.arrayContaining(Object.keys(palettes)));
    });
  });

  describe('getConnection', () => {
    it('should return a list of connections from the given palette key', () => {
      const testConnections = [
        {from:
          {key: 'test1__link',
           ref: {color: 'link', palette: 'test'}}, to: {key: 'test2__link',
           ref: {color: 'link', palette: 'test'}}},
        {from:
          {key: 'test2__link',
           ref: {color: 'link', palette: 'test'}}, to: {key: 'test3__link',
           ref: {color: 'link', palette: 'test'}}},
        {from:
          {key: 'test1__link',
           ref: {color: 'link', palette: 'test'}}, to: {key: 'test4__link',
           ref: {color: 'link', palette: 'test'}}},
      ];
      const paletter = new Paletter(palettes, colors);
      paletter.connections = testConnections;

      const result = paletter.getConnection('test1__link');
      const expected = [
        {from:
          {key: 'test1__link',
           ref: {color: 'link', palette: 'test'}}, to: {key: 'test2__link',
           ref: {color: 'link', palette: 'test'}}},
        {from:
          {key: 'test1__link',
           ref: {color: 'link', palette: 'test'}}, to: {key: 'test4__link',
           ref: {color: 'link', palette: 'test'}}},
      ];

      expect(result).toEqual(expected);
    });

    it(`should return an empty array if no connections are found for the
    given palette key`, () => {
      const testConnections = [
        {from:
          {key: 'test1__link',
           ref: {color: 'link', palette: 'test'}}, to: {key: 'test2__link',
           ref: {color: 'link', palette: 'test'}}},
        {from:
          {key: 'test2__link',
           ref: {color: 'link', palette: 'test'}}, to: {key: 'test3__link',
           ref: {color: 'link', palette: 'test'}}},
        {from:
          {key: 'test1__link',
           ref: {color: 'link', palette: 'test'}}, to: {key: 'test4__link',
           ref: {color: 'link', palette: 'test'}}},
      ];
      const paletter = new Paletter(palettes, colors);
      paletter.connections = testConnections;

      const result = paletter.getConnection('test5__link');
      const expected = [];

      expect(result).toEqual(expected);
    });
  });

  describe('parseKey', () => {
    it('should return an object with the palette and color key', () => {
      const testPaletteKey = 'test1__link';
      const expected = {
        palette: 'test1',
        color: 'link',
      };

      const paletter = new Paletter(palettes, colors);
      const result = paletter.parseKey(testPaletteKey);

      expect(result).toEqual(expected);
    });

    it(`should return an object with the palette and default color
    key if no color key is provided`, () => {
      const testPaletteKey = 'test2';
      const expected = {
        palette: 'test2',
        color: 'default',
      };

      const paletter = new Paletter(palettes, colors);
      const result = paletter.parseKey(testPaletteKey);

      expect(result).toEqual(expected);
    });
  });

  describe('tableView', () => {
    it('should render table layout with basic rectangles', () => {
      const testSizes = [
        { w: 100, h: 50 },
        { w: 120, h: 60 },
        { w: 80, h: 40 }
      ];

      const result = tableView(testSizes);

      expect(result).toBeDefined();
      expect(result.tableItems).toBeDefined();
      expect(result.tableBoundingRect).toBeDefined();
      expect(result.tableItems).toHaveLength(3);

      // Check that each table item has required properties
      result.tableItems.forEach(item => {
        expect(item).toHaveProperty('w');
        expect(item).toHaveProperty('h');
        expect(item).toHaveProperty('top');
        expect(item).toHaveProperty('left');
        expect(item).toHaveProperty('cx');
        expect(item).toHaveProperty('cy');
        expect(item).toHaveProperty('angle');
      });

      // Check bounding rectangle properties
      expect(result.tableBoundingRect).toHaveProperty('w');
      expect(result.tableBoundingRect).toHaveProperty('h');
      expect(result.tableBoundingRect).toHaveProperty('centerX');
      expect(result.tableBoundingRect).toHaveProperty('centerY');
      expect(result.tableBoundingRect.w).toBeGreaterThan(0);
      expect(result.tableBoundingRect.h).toBeGreaterThan(0);
    });

    it('should handle options correctly', () => {
      const testSizes = [{ w: 50, h: 50 }];
      const options = { gap: 10, useMaxDiagonal: false, padding: 0.5 };

      const result = tableView(testSizes, options);

      expect(result).toBeDefined();
      expect(result.tableItems).toHaveLength(1);
    });
  });

  describe('toSVGviz', () => {
    it('should render SVG visualization with valid palette data', () => {
      // Create test data similar to the existing test data structure
      const testPalettes = {
        "brand": {
          "main": "black",
          "accent": "blue"
        },
        "ui": {
          "background": "white",
          "text": "brand__main"
        }
      };

      const testColors = {
        "black": "#000000",
        "blue": "#0066cc",
        "white": "#ffffff"
      };

      const paletter = new Paletter(testPalettes, testColors);

      // Create test connections
      const testConnections = [
        {
          from: { key: "brand__main" },
          to: { key: "ui__text" }
        }
      ];

      const result = toSVGviz({
        obj: {},
        connections: testConnections,
        palette: paletter,
        palettes: testPalettes
      });

      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
      expect(result).toContain('<svg');
      expect(result).toContain('xmlns="http://www.w3.org/2000/svg"');
      expect(result).toContain('viewBox');
      expect(result).toContain('</svg>');

      // Check for key SVG elements that should be present
      expect(result).toContain('class="connections');
      expect(result).toContain('class="tables');
      expect(result).toContain('<style>');

      // Verify it contains palette-related classes
      expect(result).toContain('palette-table');
    });

    it('should handle empty connections gracefully', () => {
      const testPalettes = {
        "brand": {
          "main": "black"
        }
      };

      const testColors = {
        "black": "#000000"
      };

      const paletter = new Paletter(testPalettes, testColors);

      const result = toSVGviz({
        obj: {},
        connections: [],
        palette: paletter,
        palettes: testPalettes
      });

      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
      expect(result).toContain('<svg');
      expect(result).toContain('</svg>');
    });
  });
});
