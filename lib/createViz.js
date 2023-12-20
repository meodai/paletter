
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
  return `
  <circle
    cx="${item.cx}" cy="${item.cy}" r="${item.diagonalHalf}"
    fill="none" stroke="black" stroke-width="1" />
  <rect
    width="${item.w}" height="${item.h}"
    x="${item.left}" y="${item.top}"
    fill="${item.c}" stroke="black" stroke-width="1"
  />
  `;
}

function generateShape(minW, maxW, minH, maxH, i) {
  return {
    w: minW + Math.random() * (maxW - minW),
    h: minH + Math.random() * (maxH - minH),
    c: `lch(95 40 ${i * 360})`,
  }
}

const randomShapes = new Array(6).fill('').map(
  (_, i) => generateShape(
    110,
    550,
    200,
    550,
    (i  + 1)/ 6
  )
);

const table = tableView(randomShapes, { useMaxDiagonal: true, gap: 0});

console.log(table);

const tableItems = `<g>${table.tableItems.map(tableItemToSVG).join('')}</g>`;
console.log(
  createSVG(table.tableBoundingRect.w, table.tableBoundingRect.h,
    `<circle cx="${table.tableBoundingRect.centerX}" cy="${table.tableBoundingRect.centerY}" r="${table.tableBoundingRect.r}" fill="none" stroke="black"/>`
      + tableItems
  )
)
