module.exports = function (obj, links, varPrefix = '', separator = '--') {
  let CSSvars = ':root {\n';
  for (let palette in obj) {
    let prefix = `--${varPrefix}${palette}`;
    for (let key in obj[palette] ) {
      let color = obj[palette][key];
      const linkFromKey = links.find(c => (c.from.key == `${palette}${separator}${key}`));
      CSSvars += `  ${prefix}-${key}: ${linkFromKey ? `var(--${linkFromKey.to.key.replace(separator,'-')},${color})` : color};\n`;  
    }
  }
  CSSvars += '}';

  return CSSvars;
};