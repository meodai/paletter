module.exports = function (obj, links, varPrefix = '', separator = '--') {
  let SCSSVars = '';
  for (let palette in obj) {
    let prefix = `$${varPrefix}${palette}`;
    for (let key in obj[palette]) {
      let color = obj[palette][key];
      const linkFromKey = links.find((c) => (c.from.key == `${palette}${separator}${key}`));
      SCSSVars += `  ${prefix}-${key}: ${linkFromKey ? `$${linkFromKey.to.key.replace(separator, '-')}` : color};\n`;
    }
  };

  return SCSSVars;
};
