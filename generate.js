#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const Paletter = require('.');
const modes = {
  css: require('./lib/toCSS.js'),
  scss: (palette) => {
    const paletteStr = JSON.stringify(palette, null, 2)
                           .replace(/{/g, '(')
                           .replace(/}/g, ')')
                           .replace(/"/g, '');

    return `$paletter-colors: ${paletteStr};`;
  },
  html: require('./lib/toHTML.js'),
};

const helptext = `
  usage:
    paletterTo --colors ./colors.json --palettes ./palettes.json --mode css >> colors.css
  arguments
    colors: path to JSON containing raw colors as {name: key}
    palettes: path to JSON containing palettes as {key: referene}
    mode: css, scss or html
`;

const args = {
  colors: ['--colors', '-c'],
  palettes: ['--palettes', '-p'],
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
    const path = process.argv[index + 1];
    const file = fs.readFileSync(path);

    colorsContent = isJsFile(path) ? require(path) : JSON.parse(file, 'utf8');
  }
});

if (!colorsContent) {
  throw new Error(`-c --colors argument is required`);
}


let palettesContent;
args.palettes.forEach((palettesArg) => {
  const index = process.argv.indexOf(palettesArg);
  if ( index > -1 ) {
    const path = process.argv[index + 1];
    const file = fs.readFileSync(path);
    palettesContent = isJsFile(path) ? require(path) : JSON.parse(file, 'utf8');
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

const palette = new Paletter(palettesContent, colorsContent);

const connections = palette.getConnections();
const output = modes[mode](
  palette.getParsed(),
  connections,
  palette,
  palettesContent
);

process.stdout.write(output);
