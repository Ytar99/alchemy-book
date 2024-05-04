import { openSettingsModal } from "./modals/settingsModal.js";
import { createSoundButton } from "./soundRender.js";

function createSettingsButton() {
  const settingsButton = document.createElement("div");
  settingsButton.textContent = "⚙️";
  settingsButton.style.cursor = "pointer";
  settingsButton.style.display = "flex";
  settingsButton.style.flexDirection = "row";
  settingsButton.style.justifyContent = "center";
  settingsButton.style.alignItems = "center";
  // settingsButton.style.width = "48px";
  // settingsButton.style.height = "48px";
  settingsButton.style.backgroundColor = "black";
  settingsButton.style.borderRadius = "12px";
  settingsButton.style.fontSize = "32px";
  settingsButton.style.padding = "8px";

  settingsButton.addEventListener("click", openSettingsModal);

  return settingsButton;
}

export function renderFunctionalRow() {
  const soundButton = createSoundButton();
  const settingsButton = createSettingsButton();

  const functionalRow = document.createElement("div");
  functionalRow.style.display = "flex";
  functionalRow.style.flexDirection = "row";
  functionalRow.style.gap = "8px";

  functionalRow.style.position = "fixed";
  functionalRow.style.bottom = "4px";
  functionalRow.style.left = "4px";

  functionalRow.appendChild(settingsButton);
  functionalRow.appendChild(soundButton);

  document.body.appendChild(functionalRow);
}
