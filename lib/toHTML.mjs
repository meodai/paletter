export const toHTML = ({obj, connections, palette, palettes} = {}) => {
  const css = `
  .styleguide__colors {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .styleguide {
    margin: .5rem;
    font-family: sans-serif;
  }
  .styleguide__color {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    -webkit-box-flex: 0;
        -ms-flex: 0 0 25%;
            flex: 0 0 25%;
    padding-top: 20%;
    border-radius: 0.4rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    overflow: hidden;
    -webkit-box-shadow: inset 0 0 0 0.2rem #fff, 0 2px 6px rgba(33, 33, 33, 0.2);
            box-shadow: inset 0 0 0 0.2rem #fff, 0 2px 6px rgba(33, 33, 33, 0.2);
  }

  .styleguide__color h1, .styleguide__color h2, .styleguide__color h3, .styleguide__color h4 {
    margin: 0;
    padding: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 100%;
  }
  .styleguide__color h3 {
    margin-bottom: 0.1em;
  }
  .styleguide__color h4 {
    font-weight: normal;
  }
  .styleguide__colorheader {
    background: #fff;
    padding: .75rem;
    -webkit-box-flex: 1;
        -ms-flex-positive: 1;
            flex-grow: 1;
    width: 100%;
    overflow: hidden;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
  }`;

  let innerHTML = `<style>${css}</style><section class="styleguide">`;
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
