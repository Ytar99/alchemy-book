import { db } from "./storage.js";

export function createSelect(id) {
  function handleClearSelect(e) {
    e.target.innerHTML = "";
    e.target.name = "";
  }

  const select = document.createElement("div");
  select.id = "select" + id.toString();
  select.classList.add("element-select");
  select.style.border = "1px solid gray";
  select.style.width = "100%";
  select.style.height = "32px";
  select.style.cursor = "pointer";
  select.title = "Кликни для очистки";
  select.addEventListener("click", handleClearSelect);

  return select;
}

function getSelectsArray() {
  return Array.from(document.querySelectorAll(".element-select"));
}

function handleAddToSelect(e) {
  const text = e.target.textContent;
  const name = e.target.classList[0];

  const selects = getSelectsArray();

  const emptySelect = selects.find((item) => item.innerHTML === "");

  if (emptySelect) {
    const resultBox = document.querySelector("#result-box");

    emptySelect.innerHTML = text;
    emptySelect.name = name;
    resultBox.innerHTML = "";
  }
}

function handleResult() {
  const selects = getSelectsArray();
  const isAllSelectsFilled = selects.every((item) => item.innerHTML !== "");

  if (isAllSelectsFilled) {
    const recept = selects.map((item) => item.name);

    const result = db.checkReaction(recept);
    const resultBox = document.querySelector("#result-box");
    const elementsBox = document.querySelector("#elements-box");

    if (result) {
      db.makeReaction(recept);

      resultBox.innerHTML = result.text;
      resultBox.style.backgroundColor = "#aaffaa";
      const list = createList();
      elementsBox.appendChild(list);

      setTimeout(() => {
        resultBox.style.backgroundColor = "";
        resultBox.innerHTML = "";
      }, 3000);
    } else {
      resultBox.style.backgroundColor = "#ffaaaa";
      resultBox.innerHTML = "Реакция не удалась";

      setTimeout(() => {
        resultBox.style.backgroundColor = "";
        resultBox.innerHTML = "";
      }, 1000);
    }

    selects.forEach((item) => {
      item.innerHTML = "";
    });
  }
}

function createList() {
  const oldList = document.querySelector("#elements-list-box");

  if (oldList) {
    oldList.remove();
  }

  const list = document.createElement("ul");
  list.id = "js-modal-list";
  list.style.border = "1px solid black";
  list.style.minHeight = "100px";
  list.style.maxHeight = "32dvh";
  list.style.overflowY = "auto";

  const title = document.createElement("h2");
  title.id = "js-modal-title";
  title.textContent = `Открыто элементов: ${db.openedElements.length}/${db.elementsList.length}`;

  function addColor(e) {
    e.target.style.backgroundColor = "lightgray";
  }

  function removeColor(e) {
    e.target.style.backgroundColor = "";
  }

  db.openedElements.forEach((item) => {
    const element = db.getElementById(item);

    const listItem = document.createElement("li");
    listItem.style.cursor = "pointer";
    listItem.innerHTML = element.text;
    listItem.title = element.description;
    listItem.classList.add(element.class);

    listItem.addEventListener("click", handleAddToSelect);
    listItem.addEventListener("mouseenter", addColor);
    listItem.addEventListener("mouseout", removeColor);

    list.appendChild(listItem);
  });

  const possibleElements = db.getPossibleElements();
  possibleElements.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.style.cursor = "pointer";
    listItem.innerHTML = "???";
    listItem.title = item.description;

    listItem.addEventListener("mouseenter", addColor);
    listItem.addEventListener("mouseout", removeColor);

    list.appendChild(listItem);
  });

  const elementsListBox = document.createElement("div");
  elementsListBox.id = "elements-list-box";

  elementsListBox.appendChild(title);
  elementsListBox.appendChild(list);

  return elementsListBox;
}

function createActionsBox() {
  const actionsBox = document.createElement("div");
  actionsBox.id = "actions-box";
  actionsBox.style.display = "flex";
  actionsBox.style.flexWrap = "wrap";
  actionsBox.style.gap = "4px";
  actionsBox.style.boxShadow = "0 0 4px inset gray";
  actionsBox.style.backgroundColor = "lightgray";
  actionsBox.style.padding = "4px";

  function fillSelectsWithRandom() {
    const selects = getSelectsArray();

    selects.forEach((item) => {
      const randomElement = db.getRandomOpenedElement();

      item.innerHTML = randomElement.text;
      item.name = randomElement.class;
    });
  }

  function resetProgress() {
    let userChoice = confirm("Вы уверены, что хотите сбросить весь прогресс?");

    if (userChoice) {
      db.resetProgress();

      const elementsBox = document.querySelector("#elements-box");
      const list = createList();
      elementsBox.appendChild(list);
    }
  }

  function openAllElements() {
    let userChoice = confirm("Вы уверены, что хотите открыть все элементы?");

    if (userChoice) {
      db.openAllElements();

      const elementsBox = document.querySelector("#elements-box");
      const list = createList();
      elementsBox.appendChild(list);
    }
  }

  const buttons = [
    { id: "btn-random", label: "Случайная комбинация", handler: fillSelectsWithRandom },
    { id: "btn-reset-progress", label: "Сбросить весь прогресс", handler: resetProgress },
    { id: "btn-open-all", label: "Открыть все элементы", handler: openAllElements },
  ];

  buttons.forEach((item) => {
    const button = document.createElement("button");
    button.id = item.id;
    button.textContent = item.label;
    button.addEventListener("click", item.handler);

    actionsBox.appendChild(button);
  });

  return actionsBox;
}

export function renderModal() {
  function changeModalState() {
    const box = document.querySelector("#elements-box");

    if (box.style.display === "none") {
      box.style.display = "block";
    } else {
      box.style.display = "none";
    }
  }

  const modal = document.createElement("div");
  modal.id = "js-modal";
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.right = "0";
  modal.style.width = "300px";
  modal.style.backgroundColor = "white";
  modal.style.border = "1px solid black";

  const jsButton = document.createElement("div");
  jsButton.style.position = "relative";
  jsButton.style.width = "100%";
  jsButton.style.height = "24px";
  jsButton.style.backgroundColor = "lightgray";
  jsButton.style.border = "1px solid black";
  jsButton.style.textAlign = "center";
  jsButton.style.cursor = "pointer";
  jsButton.textContent = "Show JS part";
  jsButton.addEventListener("click", changeModalState);

  const box = document.createElement("div");
  box.id = "elements-box";
  box.style.display = "none";
  box.style.padding = "8px";
  box.style.boxSizing = "border-box";

  const reactionBox = document.createElement("div");
  reactionBox.style.padding = "8px";
  reactionBox.style.display = "flex";
  reactionBox.style.flexDirection = "column";
  reactionBox.style.justifyContent = "start";
  reactionBox.style.alignItems = "center";
  reactionBox.style.gap = "8px";

  const selects = [];
  for (let i = 0; i < 2; i++) {
    const select = createSelect(i + 1);
    selects.push(select);
  }

  const resultButton = document.createElement("div");
  resultButton.id = "result-button";
  resultButton.style.border = "1px solid gray";
  resultButton.style.width = "32px";
  resultButton.style.height = "32px";
  resultButton.style.display = "flex";
  resultButton.style.textAlign = "center";
  resultButton.style.justifyContent = "center";
  resultButton.style.alignItems = "center";
  resultButton.style.fontSize = "2rem";
  resultButton.style.fontWeight = "bold";
  resultButton.style.borderRadius = "50%";
  resultButton.style.cursor = "pointer";
  resultButton.textContent = "=";
  resultButton.addEventListener("click", handleResult);

  const resultBox = document.createElement("div");
  resultBox.id = "result-box";
  resultBox.style.border = "1px solid gray";
  resultBox.style.width = "100%";
  resultBox.style.height = "32px";

  selects.forEach((item) => {
    reactionBox.appendChild(item);
  });

  reactionBox.appendChild(resultButton);
  reactionBox.appendChild(resultBox);

  modal.appendChild(jsButton);
  modal.appendChild(box);
  box.appendChild(reactionBox);

  const actionsBox = createActionsBox();
  box.appendChild(actionsBox);

  const list = createList();
  box.appendChild(list);

  // for (let i = 1; i < 560; i++) {
  //   db.addOpenedElement(i);
  // }

  document.body.appendChild(modal);
}
