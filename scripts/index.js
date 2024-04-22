import { renderUI } from "/scripts/components/userInterfaceRender.js";
import { renderModal } from "/scripts/components/previewRender.js";
import { renderSoundButton } from "/scripts/components/soundRender.js";

document.addEventListener("DOMContentLoaded", () => {
  renderSoundButton();
  renderModal();
  renderUI();
});
