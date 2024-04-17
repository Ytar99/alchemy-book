import { renderModal, renderSoundButton } from "./render.js";

renderModal();
renderSoundButton();

// --------------
const btn = document.querySelector("#btn");
function handleClick() {
  alert("Hello");
}
btn.addEventListener("click", handleClick);
