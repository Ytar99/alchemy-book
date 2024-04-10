import { renderModal } from "./render.js";

renderModal();

// --------------
const btn = document.querySelector("#btn");
function handleClick() {
  alert("Hello");
}
btn.addEventListener("click", handleClick);
