module.exports = (obj ,connections, palette, palettes) => {
  let innerHTML = '<section class="styleguide">';
  for(let paletteKey in palettes) {
    innerHTML += `
      <article class="styleguide__palette">
        <h2>${paletteKey}</h2>
        <ol class="styleguide__colors">`;
    for(let color in palettes[paletteKey]) {
      let linkFromKey = connections.find(c => (c.from.key == `${paletteKey}--${color}`));
      let keyString = `${paletteKey}--${color}`;
      let colorInPalette = palette.getColor(keyString);

      innerHTML += `
          <li class="styleguide__color" style="background: ${colorInPalette.value};">
            <div class="styleguide__colorheader">
              <h3>${keyString}</h3>
              <h4>${linkFromKey ? linkFromKey.to.key : colorInPalette.name}</h4>
            </div>
          </li>
      `;
    }
    innerHTML += `</ol></article>`;
  }
  return innerHTML;
};