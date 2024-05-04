import { getComplementaryColors } from "../helpers/colors.js";

export function renderColorPalette(color) {
  const colorPalette = getComplementaryColors(color);

  const box = document.createElement("div");
  box.style.position = "absolute";
  box.style.width = "320px";
  box.style.height = "auto";

  Object.keys(colorPalette).forEach((colorPaletteKey) => {
    const colorBox = document.createElement("div");
    colorBox.style.width = "100%";
    colorBox.style.height = "50px";
    colorBox.style.backgroundColor = colorPalette[colorPaletteKey];
    box.appendChild(colorBox);
  });

  document.body.appendChild(box);
}
