import { renderUI } from "./components/userInterfaceRender.js";
import { renderModal } from "./components/previewRender.js";
import { renderSoundButton } from "./components/soundRender.js";

document.addEventListener("DOMContentLoaded", () => {
  renderSoundButton();
  renderModal();
  renderUI();
});
