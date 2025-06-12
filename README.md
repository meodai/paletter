# Paletter 🎨

**A simple, flexible JavaScript library for managing color palettes with semantic meaning and connections between colors.**

---

## Features

- Define color palettes with semantic links and references
- Resolve color dependencies and connections automatically
- Export palettes to CSS, SCSS, HTML, or SVG visualizations
- Validate color values
- CLI for exporting palettes

---

## Installation

```bash
npm install paletter
```

---

## Quick Start

```js
import Paletter from 'paletter';

const colors = {
  blue: '#00fff1',
  red: '#ff2211',
  black: '#010101',
  yellow: '#f4f142',
  darkGrey: '#212121',
  lime: '#42ff3f',
  white: '#ffffff'
};

const palettes = {
  brand: {
    logo: 'blue',
    main: 'black',
    highlight: 'lime'
  },
  typography: {
    default: 'brand__main',
    heading: 'brand__logo',
    title: 'brand__main',
    subTitle: 'darkGrey',
  },
  irregularity: {
    error: 'red',
    warning: 'yellow',
    notification: 'brand__highlight'
  },
  interaction: {
    default: 'brand__highlight',
    link: 'brand__logo',
    button: 'brand__highlight'
  },
  'interaction--inverted': {
    default: 'white',
  },
  layout: {
    lines: 'darkGrey'
  }
};

const palette = new Paletter(palettes, colors);

console.log(palette.get('typography')); // => returns the default color (#010101)
console.log(palette.get('irregularity__notification')); // => { value: '#42ff3f', name: 'lime' }
```

---

## API

### `new Paletter(palettes, colors, options?)`

- `palettes`: Object defining palette structure and links
- `colors`: Object of color name-value pairs
- `options`: (optional) { separator, modifier, defaultColorKey, validateColors }

### Methods

#### `getParsed(): Object`

Returns the full palette with hex values instead of links.

```js
const parsedPalette = palette.getParsed();
// { brand: { logo: '#00fff1', main: '#010101', highlight: '#42ff3f' }, ... }
```

#### `getColor(paletteKey: string, callStack = []): { value: string, name: string }`

Recursively resolves a palette key to its final color value.

```js
const color = palette.getColor('typography__default');
// { value: '#010101', name: 'black' }
```

#### `getConnections(): Array`

Returns an array of all links within palettes.

```js
const connections = palette.getConnections();
// [ { from: { key, ref }, to: { key, ref } }, ... ]
```

#### `getConnection(paletteKey: string): Array`

Returns all connections from the given palette key.

```js
const connection = palette.getConnection('typography__default');
```

#### `getPaletteKey(palette: string, key: string): string`

Returns the palette key for a given palette and key.

```js
const paletteKey = palette.getPaletteKey('main', 'primary'); // 'main__primary'
```

#### `static isValidColor(value: string): boolean`

Checks if a color value is valid.

```js
const isValid = Paletter.isValidColor('#0000ff'); // true
```

---

## Example: Export CSS Variables

```js
function objToCSSVars(obj, links) {
  let CSSvars = ':root {\n';
  for (let palette in obj) {
    let prefix = `--${palette}`;
    for (let key in obj[palette]) {
      let color = obj[palette][key];
      const linkFromKey = links.find(c => c.from.key == `${palette}--${key}`);
      CSSvars += `  ${prefix}-${key}: ${linkFromKey ? `var(--${linkFromKey.to.key.replace('--','-')},${color})` : color};\n`;
    }
  }
  CSSvars += '}';
  return CSSvars;
}

const connections = palette.getConnections();
const cssVars = objToCSSVars(palette.getParsed(), connections);
const $style = document.createElement('style');
$style.innerHTML = cssVars;
document.querySelector('head').appendChild($style);
```

---

## CLI Usage

### Export to CSS (with variables)

```bash
npx paletterTo --colors ./colors.json --palettes ./palettes.json --mode css > colors.css
```

### Export SVG Visualization

```bash
npx paletterTo --colors ./colors.json --palettes ./palettes.json --mode svg > connections.svg
```

![svg export](./connections.svg)

#### Arguments

- `--colors`: Path to JSON or JS file exporting colors as `{ name: value }`
- `--palettes`: Path to JSON or JS file exporting palettes as `{ key: reference }`
- `--mode`: `css`, `scss`, or `html` (for CSS output), or `svg` (for visualization)

#### Using JavaScript files as arguments

```js
// colors.js
module.exports = {
  blue: '#00fff1'
};
```

---

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to open an issue or submit a pull request.

---

## License

MIT © [meodai](https://github.com/meodai)
