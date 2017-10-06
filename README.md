# paletter
simple JS class to manage color palettes by giving them semantic meaning 
and beeing aware of the connections between the colors in your palettes


## Setup

### Define an object containing all references for color values:
```javascript
const colors = {
  blue: '#00fff1',
  red: '#ff2211',
  black: '#010101',
  yellow: '#f4f142'
  darkGrey: '#212121',
  lime: '#42ff3f',
};
```

### Setup your palettes
```javascript
const palettes = {
  brand: {
    logo: 'blue',
    main: 'black',
    hightlight: 'lime'
  },
  typography: {
    default: 'brand--main', //optional default color
    heading: 'brand--logo', //links to palettes.brand
    title: 'brand--main',
    sub-title: 'darkGrey',
  },
  irregularity : {
    error: 'red',
    warning: 'yellow',
    notification: 'brand--hightlight'
  },
  interaction: {
    default: 'brand--hightlight',
    link: 'brand--logo',
    button: 'brand--hightlight'
  }
  layout: {
    lines: 'darkGrey'
  }
};
```

## Usage:

```javascript
const palette = new Paletter(palettes, colors);

palette('typography'); // => returns the default color (#010101)
palette('irregularity--notification'); // => #42ff3f

palette.getParsed() // will return your full palette with hex values instead of links to other items

palette.getConnections() // returns an array of all links within palettes
```


## Examples:
Create CSS variables for each color:
```javascript
function objToCSSVars (obj) {
  let CSSvars = ':root {';
  for (let palette in obj) {
    let prefix = `--${palette}`;
    for (let key in obj[palette] ) {
      CSSvars += `${prefix}-${key}: ${obj[palette][key]};\n`;  
    }
  }
  CSSvars += '}';
  
  return CSSvars;
};

const cssVars = objToCSSVars(palette.getParsed());
const $style = document.createElement('style');
$style.innerHTML = cssVars;
document.querySelector('head').appendChild($style);
```