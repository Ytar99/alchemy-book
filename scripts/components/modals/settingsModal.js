import { themes, initTheme } from "/assets/themes/themes.js";
import { ModalOverlay } from "./overlay.js";

function createThemeSelector() {
  const themeSelectorContainer = document.createElement("div");
  themeSelectorContainer.id = "settings-theme-selector-container";
  themeSelectorContainer.style.display = "flex";
  themeSelectorContainer.style.flexDirection = "column";
  themeSelectorContainer.style.justifyContent = "start";
  themeSelectorContainer.style.alignItems = "center";
  themeSelectorContainer.style.gap = "8px";
  themeSelectorContainer.style.width = "100%";
  themeSelectorContainer.style.padding = "8px 12px";
  themeSelectorContainer.style.borderRadius = "4px";
  themeSelectorContainer.style.backgroundColor = "#e8e8e8";

  const themeSelectorLabel = document.createElement("label");
  themeSelectorLabel.id = "settings-theme-selector-label";
  themeSelectorLabel.textContent = "Тема: ";
  themeSelectorLabel.style.width = "100%";

  const themeSelector = document.createElement("select");
  themeSelector.id = "settings-theme-selector";
  themeSelector.style.width = "100%";
  themeSelector.style.fontSize = "1rem";
  themeSelector.style.height = "2rem";

  Object.keys(themes).forEach((key) => {
    const option = document.createElement("option");
    const theme = themes[key];
    option.value = key;
    option.textContent = theme.name;
    option.style.fontSize = "1.2rem";

    themeSelector.appendChild(option);
  });

  themeSelector.value = localStorage.getItem("color-theme") || "standard";

  themeSelector.addEventListener("change", initTheme);

  themeSelectorContainer.appendChild(themeSelectorLabel);
  themeSelectorContainer.appendChild(themeSelector);

  return themeSelectorContainer;
}

export function openSettingsModal() {
  const id = "settings-modal";

  function handleCloseModal() {
    const element = document.getElementById(id);
    element.remove();
  }

  const overlay = new ModalOverlay(id, handleCloseModal);
  overlay.render();

  const modal = document.createElement("div");
  modal.id = id;
  modal.style.display = "flex";
  modal.style.flexDirection = "column";
  modal.style.justifyContent = "start";
  modal.style.alignItems = "center";
  modal.style.position = "absolute";
  modal.style.zIndex = "101";
  modal.style.minWidth = "250px";
  modal.style.width = "50%";
  modal.style.maxWidth = "90%";
  modal.style.padding = "8px";
  modal.style.minHeight = "250px";
  modal.style.top = "20%";
  modal.style.left = "50%";
  modal.style.transform = "translateX(-50%)";
  modal.style.fontFamily = "sans-serif";

  modal.style.backgroundColor = "white";
  modal.style.border = "1px solid #ddd";
  modal.style.borderRadius = "12px";

  const title = document.createElement("div");
  title.style.display = "flex";
  title.style.justifyContent = "center";
  title.style.alignItems = "center";
  title.style.padding = "0 12px";
  title.style.fontSize = "1.2rem";
  title.style.fontFamily = "Helvetica, sans-serif";
  title.style.fontWeight = "bold";
  title.textContent = "Настройки";

  const closeButton = document.createElement("div");
  closeButton.style.display = "flex";
  closeButton.style.justifyContent = "center";
  closeButton.style.alignItems = "center";
  closeButton.style.cursor = "pointer";
  closeButton.style.width = "30px";
  closeButton.style.height = "30px";
  closeButton.style.border = "1px solid #808080";
  closeButton.style.color = "#404040";
  closeButton.style.borderRadius = "4px";
  closeButton.style.fontFamily = "sans-serif";
  closeButton.textContent = "X";
  closeButton.addEventListener("click", () => {
    overlay.destroy();
  });

  const header = document.createElement("div");
  header.style.flex = "1";
  header.style.display = "flex";
  header.style.flexDirection = "row";
  header.style.justifyContent = "space-between";
  header.style.alignItems = "center";
  header.style.width = "100%";
  header.style.minHeight = "32px";
  header.style.marginBottom = "16px";
  // header.style.borderBottom = "3px solid #f0f0f0";
  header.appendChild(title);
  header.appendChild(closeButton);
  modal.appendChild(header);

  const content = document.createElement("div");
  content.style.flex = "11";
  content.style.display = "flex";
  content.style.flexDirection = "column";
  content.style.justifyContent = "left";
  content.style.alignItems = "center";
  content.style.gap = "12px";
  content.style.width = "100%";
  content.style.minHeight = "auto";
  modal.appendChild(content);

  const themeSelector = createThemeSelector();
  content.appendChild(themeSelector);

  document.body.appendChild(modal);
}
