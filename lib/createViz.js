import {tableView} from './tableView.js';

const svgNamespace = 'http://www.w3.org/2000/svg'

/**
 * createSVG - create a new SVG element with a viewBox
 * @param {number} w - width of the viewBox
 * @param {number} h - height of the viewBox
 * @param {string} block - block of SVG elements
 * @return {SVGElement} - SVG element with a viewBox
 */
function createSVG(w, h, block) {
  return `<svg xmlns="${svgNamespace}" viewBox="0 0 ${w} ${h}">${block}</svg>`;
};

/**
 * tableItemToSVG - convert a table item to an SVG element
 * @param {object} item - table item
 * @return {string} - SVG element
 */
function tableItemToSVG(item) {
  return `<rect width="${item.w}" height="${item.h}" x="${item.top}" y="${item.left}" />`;
}

const table = tableView([
  {w: Math.random() * 100, h: Math.random() * 100},
  {w: Math.random() * 100, h: Math.random() * 100},
  {w: Math.random() * 100, h: Math.random() * 100},
  {w: Math.random() * 100, h: Math.random() * 100},
  {w: Math.random() * 100, h: Math.random() * 100},
]);


const tableItems = `<g>${table.tableItems.map(tableItemToSVG).join('')}</g>`;

console.log(
  createSVG(table.tableBoundingRect.w, table.tableBoundingRect.h, tableItems)
)
