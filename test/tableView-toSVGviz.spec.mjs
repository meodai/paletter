import {jest} from '@jest/globals';
import Paletter from '../index.mjs';
import {tableView} from '../lib/tableView.mjs';
import {toSVGviz} from '../lib/toSVGviz.mjs';

describe('tableView', () => {
  it('should render table layout with basic rectangles', () => {
    const testSizes = [
      {w: 100, h: 50},
      {w: 120, h: 60},
      {w: 80, h: 40},
    ];

    const result = tableView(testSizes);

    expect(result).toBeDefined();
    expect(result.tableItems).toBeDefined();
    expect(result.tableBoundingRect).toBeDefined();
    expect(result.tableItems).toHaveLength(3);

    // Check that each table item has required properties
    result.tableItems.forEach((item) => {
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
    const testSizes = [{w: 50, h: 50}];
    const options = {gap: 10, useMaxDiagonal: false, padding: 0.5};

    const result = tableView(testSizes, options);

    expect(result).toBeDefined();
    expect(result.tableItems).toHaveLength(1);
  });

  it('should handle empty input', () => {
    const result = tableView([]);

    expect(result).toBeDefined();
    expect(result.tableItems).toHaveLength(0);
    expect(result.tableBoundingRect).toBeDefined();
  });
});

describe('toSVGviz', () => {
  it('should render SVG visualization with valid palette data', () => {
    // Create test data similar to the existing test data structure
    const testPalettes = {
      brand: {
        main: 'black',
        accent: 'blue',
      },
      ui: {
        background: 'white',
        text: 'brand__main',
      },
    };

    const testColors = {
      black: '#000000',
      blue: '#0066cc',
      white: '#ffffff',
    };

    const paletter = new Paletter(testPalettes, testColors);

    // Create test connections
    const testConnections = [
      {
        from: {key: 'brand__main'},
        to: {key: 'ui__text'},
      },
    ];

    const result = toSVGviz({
      obj: {},
      connections: testConnections,
      palette: paletter,
      palettes: testPalettes,
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
      brand: {
        main: 'black',
      },
    };

    const testColors = {
      black: '#000000',
    };

    const paletter = new Paletter(testPalettes, testColors);

    const result = toSVGviz({
      obj: {},
      connections: [],
      palette: paletter,
      palettes: testPalettes,
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
    expect(result).toContain('<svg');
    expect(result).toContain('</svg>');
  });

  it('should render without throwing errors', () => {
    const testPalettes = {
      simple: {
        color1: 'red',
        color2: 'blue',
      },
    };

    const testColors = {
      red: '#ff0000',
      blue: '#0000ff',
    };

    const paletter = new Paletter(testPalettes, testColors);

    expect(() => {
      toSVGviz({
        obj: {},
        connections: [],
        palette: paletter,
        palettes: testPalettes,
      });
    }).not.toThrow();
  });
});
