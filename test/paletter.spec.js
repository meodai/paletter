import Paletter from '../index';

import palettes from './palettes.json';
import colors from './colors.json';

describe('Paletter', () => {
  describe('Constructor', () => {
    it('should have default values', () => {
      const paletter = new Paletter(palettes, colors);

      expect(paletter.options).toBeTruthy();
      expect(paletter.options.separator).toBe('--');
      expect(paletter.options.modifier).toBe('');
      expect(paletter.options.defaultColorKey).toBe('default');
    });

    it('should override default values', () => {
      const options = {
        separator: '.',
        modifier: 'a',
        defaultColorKey: 'notDefault',
      };
      const paletter = new Paletter(palettes, colors, options);

      expect(paletter.options.separator).toBe(options.separator);
      expect(paletter.options.modifier).toBe(options.modifier);
      expect(paletter.options.defaultColorKey).toBe(options.defaultColorKey);
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

  describe('_getPaletteKey', () => {
    it('should generate correct key', () => {
      const separator = '.';
      const paletter = new Paletter({}, {}, {separator});
      expect(paletter._getPaletteKey('test', 'key'))
        .toBe(`test${separator}key`);
    });
  });

  describe('getParsed', () => {
    it('should return parsed palette', () => {
      const paletter = new Paletter(palettes, colors);
      const parsedPalette = paletter.getParsed();

      expect(parsedPalette.typography.default).toBe('#010101');
      expect(parsedPalette.interaction.link).toBe('#00fff1');
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
        test1: {link: 'test2--link'},
        test2: {link: 'test1--link'},
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
        test1: {link: 'test2--link'},
        test2: {link: 'test1--link'},
      };
      const paletter = new Paletter(testPalette, colors);

      expect(() => {
        paletter.getColor('test1--link', []);
      }).toThrowError('you have infinite recursion in your palette');
    });

    it('should return correct color', () => {
      const paletter = new Paletter(palettes, colors);
      const brandMain = paletter.getColor('brand--main');
      const expectedColor = {name: 'black', value: colors.black};

      expect(brandMain).toEqual(expectedColor);

      const typoDefault = paletter.getColor('typography--default');
      expect(typoDefault).toEqual(expectedColor);
    });

    it('should throw an error when palette not exists', () => {
      const testPalette = {
        test1: {link: 'test3--link'},
        test2: {link: 'test1--link'},
      };
      const paletter = new Paletter(testPalette, colors);

      expect(() => {
        paletter.getColor('test3--link', []);
      }).toThrowError('no palette called "test3"');
    });

    it('should throw an error when palette key not exists', () => {
      const testPalette = {
        test1: {link: 'test3--link'},
        test2: {link: 'test1--link'},
      };
      const paletter = new Paletter(testPalette, colors);

      expect(() => {
        paletter.getColor('test1--link2', []);
      }).toThrowError('no color called "link2" in "test1"');
    });
  });

  describe('getConnections', () => {
    it('should return correct connections', () => {
      const testPalettes = {test: {line: 'black'}, test2: {line: 'test--line'}};
      const testColors = {black: '#000'};
      const paletter = new Paletter(testPalettes, testColors);
      const [resultConnection] = paletter.getConnections();

      const expectedConnection = {
        from: {key: 'test2--line', ref: {color: 'line', palette: 'test'}},
        to: {key: 'test--line', ref: 'black'},
      };

      expect(resultConnection).toEqual(expectedConnection);
    });
  });
});
