import { getAllBasicElements, getAllElements, getById, saveData } from "./models/elements.js";

let openedElements = [];

function initGame() {
  const savedData = JSON.parse(localStorage.getItem("dataAL:opened")) || [];

  if (!savedData || savedData.length === 0) {
    const baseElements = getAllBasicElements().map((item) => item.id);
    localStorage.setItem("dataAL:opened", JSON.stringify(baseElements));
    openedElements = baseElements;
  } else {
    openedElements = openedElements.concat(savedData);
  }
}

const btn = document.querySelector("#btn");

function handleClick() {
  if (!openedElements.includes(5)) {
    openedElements.push(5);
    saveData(openedElements);
  }

  const oldBox = document.querySelector("#elements-box");

  if (oldBox) {
    oldBox.remove();
  }

  const box = document.createElement("div");
  box.id = "elements-box";

  const list = document.createElement("ul");
  const title = document.createElement("h2");
  title.textContent = `Открыто элементов: ${openedElements.length}/${getAllElements().length}`;

  openedElements.forEach((item) => {
    const element = getById(item);

    const listItem = document.createElement("li");
    listItem.textContent = element.text;
    listItem.classList.add(element.class);

    list.appendChild(listItem);
  });

  document.body.appendChild(box);
  box.appendChild(title);
  box.appendChild(list);
}

initGame();

btn.addEventListener("click", handleClick);
