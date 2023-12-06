// function that places rectangles around a circle
// expects an array of objects with width and height w, h
// [{w,h}, {w,h}, {w,h} ...]

/*
  * Diagonal function
  * @param {object} rect - rectangle object containing width and height (w, h)
  * @return {number} - diagonal of the rectangle
  **/
const diagonal = (rect) => Math.sqrt(Math.pow(rect.w, 2) + Math.pow(rect.h, 2));

/**
 * TableView Function
 * Arranges rectangles around a circle
 * @param  {Array}  sizes - The sizes of the rectangles
 * @param  {Object} options - The options for the table layout
 * @return {Object} - The table items and the table bounding rectangle
 **/
export const tableView = (sizes, {
  gap = 0,
  useMaxDiagonal = true,
} = {}) => {
  let tableItems = [...sizes];

  const maxHeight = Math.max(...tableItems.map((item) => item.h));
  const maxWidth = Math.max(...tableItems.map((item) => item.w));
  const maxSide = Math.max(maxHeight, maxWidth);

  let diagonalsTotal = 0;

  tableItems = tableItems.map((item) => {
    const [w, h] = [item.w, item.h];
    const itemMaxSide = Math.max(w, h);
    const itemDiagonal = diagonal(
      useMaxDiagonal ? {w: itemMaxSide, h: itemMaxSide} : item
    );
    diagonalsTotal += itemDiagonal;
    item.diagonal = itemDiagonal;
    item.diagonalHalf = itemDiagonal / 2;

    return item;
  });

  const cumulatedGaps = gap * (tableItems.length - 1);
  const circumference = diagonalsTotal + cumulatedGaps;
  const diameter = Math.max(circumference / Math.PI, maxSide + gap * 2);

  const tableBoundingRect = {
    w: diameter + maxWidth + gap * 2,
    h: diameter + maxHeight + gap * 2,
    r: diameter / 2,
  };

  tableBoundingRect.centerX = tableBoundingRect.w / 2;
  tableBoundingRect.centerY = tableBoundingRect.h / 2;

    /// calculate each diagonals center in percent
  const centersPercent = [];

  tableItems.reduce((rem, item, i) => {
    const center = item.diagonalHalf;
    const currentPercent = (rem + center) / (circumference - cumulatedGaps);
    centersPercent.push(currentPercent);
    return rem + item.diagonal;
  }, 0);

  tableItems = tableItems.map((item, i) => {
    item.angle = 360 * centersPercent[i] % 360;
    item.angleRadians = item.angle * (Math.PI / 180);

    item.cx =
      tableBoundingRect.centerX + (diameter / 2) * Math.cos(item.angleRadians);
    item.cy =
      tableBoundingRect.centerY + (diameter / 2) * Math.sin(item.angleRadians);

    const top = item.cy - item.h / 2;
    const bottom = item.cy + item.h / 2;
    const left = item.cx - item.w / 2;
    const right = item.cx + item.w / 2;

    item.top = top;
    item.left = left;
    item.bottom = bottom;
    item.right = right;

    return item;
  });

  return {
    tableItems,
    tableBoundingRect,
  };
};
