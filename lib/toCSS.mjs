/**
 * Returns the key of an object that matches a given value.
 *
 * @param {Object} object - The object to search.
 * @param {*} value - The value to search for.
 * @return {string|undefined} - Key of the matching value or undefined if no match
 */
function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

export const toCSS = ({
  obj, links,
  varPrefix = 'c-', separator = '__', cssContext = ':root',
  colors = {},
} = {}) => {
  let CSSvars = `${cssContext} {\n`;

  for (let color in colors) {
    if (Object.prototype.hasOwnProperty.call(colors, color)) {
      CSSvars += `  --${varPrefix}${color}: ${colors[color]};\n`;
    }
  }

  CSSvars += '\n';

  for (let palette in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, palette)) {
      const prefix = `--${varPrefix}${palette}`;
      for (let key in obj[palette]) {
        if (Object.prototype.hasOwnProperty.call(obj[palette], key)) {
          let color = obj[palette][key];
          const linkFromKey = links.find(
            (c) => (c.from.key === `${palette}${separator}${key}`)
          );

          let colorVar = getKeyByValue(colors, color);

          const cssColorValueVar = `--${varPrefix}${colorVar}`;

          const varName = `${prefix}__${key}`;
          const varValue = linkFromKey
            ? `var(--${linkFromKey.to.key.replace(separator, '_')}, ${cssColorValueVar})`
            : `var(${cssColorValueVar})`;
          CSSvars += `  ${varName}: ${varValue};\n`;
        }
      }
    }
  }
  CSSvars += '}';
  return CSSvars;
};
