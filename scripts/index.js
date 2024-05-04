import { renderUI } from "./components/userInterfaceRender.js";
import { renderModal } from "./components/previewRender.js";
import { renderFunctionalRow } from "./components/functionalRow.js";
import { initTheme } from "../assets/themes/themes.js";
// import { renderSoundButton } from "./components/soundRender.js";
import { renderColorPalette } from "./components/colorPalette.js";
import { bindDisintegration } from "./helpers/disintegration.js";

document.addEventListener("DOMContentLoaded", () => {
  // renderSoundButton();
  renderFunctionalRow();
  renderModal();
  renderUI();
  initTheme();

  bindDisintegration();

  const color1 = "#508141";
  const color2 = "#c779fc";
  const color = "#ffaaff";
  // renderColorPalette(color);
});

/* 
{
    "primary": "#800000",
    "secondary": "#008080",
    "accent1": "#804000",
    "accent2": "#808000",
    "accent3": "#408000",
    "neutral1": "#050000",
    "neutral2": "#050000",
    "neutral3": "#050000"
}
*/

/*
{
    "primary": "#508141",
    "secondary": "#724181",
    "accent1": "#418152",
    "accent2": "#418172",
    "accent3": "#417081",
    "neutral1": "#020302",
    "neutral2": "#020302",
    "neutral3": "#020302"
}
*/

/*
{
    "primary": "#508141",
    "secondary": "#724181",
    "accent1": "#418152",
    "accent2": "#418172",
    "accent3": "#417081",
    "neutral1": "#020302",
    "neutral2": "#020402",
    "neutral3": "#030402"
}
*/
