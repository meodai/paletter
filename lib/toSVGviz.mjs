import { tableView } from '../lib/tableView.js';

const svgNamespace = 'http://www.w3.org/2000/svg';

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
 * Creates a table item from a palette.
 *
 * @param {string} title - The title of the table item
 * @param {object} entires - The entries of the table item
 * @param {Palette} paletterInstance - The palette instance
 * @param {object} options - The options for configuring the table item
 * @param {number} options.widthPerLetter - The width per letter in pixels
 * @param {number} options.fontSize - The font size in pixels. Default is 10
 * @param {number} options.lineheight - The line height. Default is 1.5
 * @param {number[]} options.padding - The padding in pixels. Default is [10, 5]
 * @return {object} - The table item object
 */
function createTableItemFromPalette(
  title,
  entires,
  paletterInstance,
  {
    widthPerLetter = 7,
    fontSize = 10,
    lineheight = 1.5,
    padding = [10, 5],
  } = {}
) {
  const allLabels = [title, ...Object.keys(entires)];
  const maxLabelLength = Math.max(...allLabels.map((label) => label.length));
  const heightPerItem = fontSize * lineheight + padding[1] * 2;
  const w = maxLabelLength * widthPerLetter + padding[0] * 2;
  const h = allLabels.length * heightPerItem;

  const topPositions = {};

  // add a row as rect and text per entry & title
  const labels = allLabels.map((label, i) => {
    const isHeader = label === title;
    const rectTop = i * heightPerItem;
    const textTop = rectTop + heightPerItem / 2 + fontSize / 2 - 1;
    topPositions[label] = {
      rectTop,
      textTop,
      height: heightPerItem,
    };

    let colorValueName = '';
    if (!isHeader) {
      const paletteKey = paletterInstance.getPaletteKey(title, label);
      colorValueName = paletterInstance.getColor(paletteKey).name;
    }
    const rect = `<rect class="palette-table__row ${
      isHeader ? 'palette-table__row--header' : ''}" width="${w}" height="${
      heightPerItem}" y="${rectTop}"
      data-colortarget="${colorValueName}"
    />`;

    const text = `<text class="palette-table__label ${
      isHeader ? 'palette-table__label--header' : ''}" x="${padding[0]}" y="${
      textTop}" font-size="${fontSize}" data-colortarget="${colorValueName}">${
        label}</text>`;

    return rect + text;
  });

  const outerGroup = (left, top) => `<g transform="translate(${left}, ${
  top})"><rect class="palette-table" width="${w}" height="${h}" />${
    labels.join('')}</g>`;

  return {
    tableTitle: title,
    w,
    h,
    group: outerGroup,
    topPositions,
  };
}

export const toSVGviz = ({obj, connections, palette, palettes} = {}) => {
  // create a table for each palette
  const tableEntires = palette.paletteKeys.map((paletteKey) => {
    const pal = palette.palette[paletteKey];

    return createTableItemFromPalette(
      paletteKey, pal, palette
    );
  });

  // create a table for the connections
  const table = tableView(tableEntires, {useMaxDiagonal: true, gap: 0});

  const allTableEntries = {};

  table.tableItems.map((tableItem, i) => {
    Object.keys(tableItem.topPositions).forEach((label) => {
      if (label !== tableItem.tableTitle) {
        const paletteKey = palette.getPaletteKey(tableItem.tableTitle, label);
        const isLeft = tableItem.left < table.tableBoundingRect.centerX;
        const pointX = isLeft ? tableItem.left + tableItem.w : tableItem.left;
        const pointY = tableItem.topPositions[label].rectTop
                       + tableItem.topPositions[label].height /
                       2 + tableItem.top;

        const resolvedColor = palette.getColor(paletteKey);

        allTableEntries[paletteKey] = {
          key: paletteKey,
          x: pointX,
          y: pointY,
          isLeft,
          color: resolvedColor.value,
          colorName: resolvedColor.name,
        };
      }
    });
  });

    const tableItems = `
  <g class="connections-bg" stroke-width="3.5" fill="none">
    ${connections.map((connection) => {
      const fromPoint = allTableEntries[connection.from.key];
      const toPoint = allTableEntries[connection.to.key];
      const yDiff = Math.abs(fromPoint.y - toPoint.y);
      const amp = 40 + (yDiff * 0.3);
      const path = `M ${
        fromPoint.x} ${fromPoint.y} C ${
        fromPoint.x + (fromPoint.isLeft ? amp : -amp)} ${
        fromPoint.y}, ${toPoint.x + (toPoint.isLeft ? amp : -amp)} ${
        toPoint.y}, ${toPoint.x} ${toPoint.y}`;
      return `<path
        d="${path}"
        data-colortarget="${fromPoint.colorName}"
        stroke="#000"
      />`;
    }).join('')
    }
  </g>
  <g class="connections" stroke-width="2" fill="none">
    ${connections.map((connection) => {
      const fromPoint = allTableEntries[connection.from.key];
      const toPoint = allTableEntries[connection.to.key];
      const yDiff = Math.abs(fromPoint.y - toPoint.y);
      const amp = 40 + (yDiff * 0.3);
      const path = `M ${fromPoint.x} ${fromPoint.y} C ${
        fromPoint.x + (fromPoint.isLeft ? amp : -amp)} ${fromPoint.y}, ${
        toPoint.x + (toPoint.isLeft ? amp : -amp)} ${toPoint.y}, ${toPoint.x} ${
        toPoint.y}`;
      return `<path d="${path}" stroke="${
        fromPoint.color}" data-colortarget="${fromPoint.colorName}" />`;
    }).join('')
    }
  </g>
  <g class="tables">${table.tableItems.map((tableItem, i) => {
    return tableItem.group(tableItem.left, tableItem.top);
  }).join('')}</g>
  <g class="dots">
    ${
      Object.keys(allTableEntries).map((key) => {
        const entry = allTableEntries[key];
        return `<circle cx="${entry.x}" cy="${entry.y}" r="5" fill="${
          entry.color}" stroke="black" stroke-width="1" />`;
      }).join('')
    }
  </g>`;

  return createSVG(table.tableBoundingRect.w, table.tableBoundingRect.h,
    `<style>
  .palette-table {
    fill: white;
    stroke: black;
    stroke-width: 1;
  }
  .palette-table__row {
    fill: none;
    stroke: black;
    stroke-width: 1;
  }
  text {
    font-family: monospace;
  }
  .palette-table__label {
    fill: black;
  }
  .palette-table__label--header {
    font-weight: bold;
    fill: white
  }
  .palette-table__row--header {
    fill: black;
  }
</style>
    <!--circle cx="${table.tableBoundingRect.centerX}" cy="${
    table.tableBoundingRect.centerY}" r="${
    table.tableBoundingRect.r}" fill="none" stroke="black"/-->`
    + tableItems
  );
};
