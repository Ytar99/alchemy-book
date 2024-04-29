import { renderUI } from "./components/userInterfaceRender.js";
import { renderModal } from "./components/previewRender.js";
import { renderFunctionalRow } from "./components/functionalRow.js";
import { initTheme } from "../assets/themes/themes.js";
// import { renderSoundButton } from "./components/soundRender.js";

document.addEventListener("DOMContentLoaded", () => {
  // renderSoundButton();
  renderFunctionalRow();
  renderModal();
  renderUI();
  initTheme();
});
