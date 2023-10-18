#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const toCss = require('./lib/toCSS.js');
const toSCSSvars = require('./lib/toSCSSvars.js');

const Paletter = require('.');

const modes = {
  css: (parsedPalette, connections) => {
    return toCss(
      parsedPalette,
      connections
    );
  },
  scss: (palette) => {
    const paletteStr = JSON.stringify(palette, null, 2)
                           .replace(/{/g, '(')
                           .replace(/}/g, ')')
                           .replace(/"/g, '');

    return `$paletter-colors: ${paletteStr};`;
  },
  scssvars: (parsedPalette, connections) => {
    return toSCSSvars(
      parsedPalette,
      connections
    )
  },
  html: require('./lib/toHTML.js'),
};

const helptext = `
  usage:
    paletterTo --colors ./colors.json --palettes ./palettes.json --mode css >> colors.css
  arguments
    colors: path to JSON containing raw colors as {name: key}
    palettes: path to JSON containing palettes as {key: reference}
    mode: css, scss or html
    novalidation: disable validation of colors
`;

const args = {
  colors: ['--colors', '-c'],
  palettes: ['--palettes', '-p'],
  noValidation: ['--novalidation', '-n'],
  mode: ['--mode', '-m'],
  help: ['--help', '-h'],
};

const defaults = {
  mode: 'css',
};

const isJsFile = (pathName) => {
  const fileName = path.basename(pathName);
  return path.extname(fileName) === '.js';
};

args.help.forEach((helpArg) => {
  if ( process.argv.includes(helpArg) ) {
    console.log(helptext);
    process.exit(1);
  }
});

let colorsContent;
args.colors.forEach((colorsArg) => {
  const index = process.argv.indexOf(colorsArg);
  if ( index > -1 ) {
    const filePath = process.argv[index + 1];
    const file = fs.readFileSync(filePath);

    colorsContent = isJsFile(filePath) ?
      require(path.join(process.cwd(), filePath)) : JSON.parse(file, 'utf8');
  }
});

if (!colorsContent) {
  throw new Error(`-c --colors argument is required`);
}


let palettesContent;
args.palettes.forEach((palettesArg) => {
  const index = process.argv.indexOf(palettesArg);
  if ( index > -1 ) {
    const filePath = process.argv[index + 1];
    const file = fs.readFileSync(filePath);

    palettesContent = isJsFile(filePath)
      ? require(path.join(process.cwd(), filePath)) : JSON.parse(file, 'utf8');
  }
});

if (!palettesContent) {
  throw new Error(`-p --palettes argument is required`);
}

let mode = defaults.mode;
args.mode.forEach((modeArg) => {
  const index = process.argv.indexOf(modeArg);
  if ( index > -1 ) {
    mode = process.argv[index + 1].toLocaleLowerCase();
  }
});

const palette = new Paletter(palettesContent, colorsContent, {
  validateColors: !args.noValidation.length,
});

const connections = palette.getConnections();
const output = modes[mode](
  palette.getParsed(),
  connections,
  palette,
  palettesContent
);

process.stdout.write(output);
