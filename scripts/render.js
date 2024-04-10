import { db } from "/scripts/storage.js";

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

  const select1 = document.createElement("div");
  select1.style.border = "1px solid gray";
  select1.style.width = "100%";
  select1.style.height = "48px";
  select1.style.cursor = "pointer";
  select1.title = "Кликни для очистки";
  select1.addEventListener("click", handleClearSelect);

  const select2 = document.createElement("div");
  select2.style.border = "1px solid gray";
  select2.style.width = "100%";
  select2.style.height = "48px";
  select2.style.cursor = "pointer";
  select2.title = "Кликни для очистки";
  select2.addEventListener("click", handleClearSelect);

  const resultButton = document.createElement("div");
  resultButton.style.border = "1px solid gray";
  resultButton.style.width = "48px";
  resultButton.style.height = "48px";
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
  resultBox.style.border = "1px solid gray";
  resultBox.style.width = "100%";
  resultBox.style.height = "48px";

  function handleAddToSelect(e) {
    const text = e.target.textContent;
    const name = e.target.classList[0];

    if (select1.innerHTML === "") {
      select1.innerHTML = text;
      select1.name = name;
      resultBox.innerHTML = "";
      return;
    }

    if (select2.innerHTML === "") {
      select2.innerHTML = text;
      select2.name = name;
      resultBox.innerHTML = "";
      return;
    }
  }

  function handleClearSelect(e) {
    e.target.innerHTML = "";
    e.target.name = "";
  }

  function handleResult() {
    if (select1.innerHTML !== "" && select2.innerHTML !== "") {
      const recept = [select1.name, select2.name];

      const result = db.checkReaction(recept);

      if (result) {
        db.makeReaction(recept);

        resultBox.innerHTML = result.text;
        resultBox.style.backgroundColor = "#aaffaa";
        renderList();

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

      select1.innerHTML = "";
      select2.innerHTML = "";
    }
  }

  function renderList() {
    const oldTitle = document.querySelector("#js-modal-title");
    const oldList = document.querySelector("#js-modal-list");

    if (oldTitle) {
      oldTitle.remove();
    }

    if (oldList) {
      oldList.remove();
    }

    const list = document.createElement("ul");
    list.id = "js-modal-list";
    list.style.border = "1px solid black";
    list.style.maxHeight = "500px";
    list.style.overflowY = "auto";

    const title = document.createElement("h2");
    title.id = "js-modal-title";
    title.textContent = `Открыто элементов: ${db.openedElements.length}/${db.elementsList.length}`;

    db.openedElements.forEach((item) => {
      const element = db.getElementById(item);

      const listItem = document.createElement("li");
      listItem.style.cursor = "pointer";
      listItem.textContent = element.text;
      listItem.classList.add(element.class);

      function addColor(e) {
        e.target.style.backgroundColor = "lightgray";
      }

      function removeColor(e) {
        e.target.style.backgroundColor = "";
      }

      listItem.addEventListener("click", handleAddToSelect);
      listItem.addEventListener("mouseenter", addColor);
      listItem.addEventListener("mouseout", removeColor);

      list.appendChild(listItem);
    });

    box.appendChild(title);
    box.appendChild(list);
  }

  reactionBox.appendChild(select1);
  reactionBox.appendChild(select2);
  reactionBox.appendChild(resultButton);
  reactionBox.appendChild(resultBox);

  modal.appendChild(jsButton);
  modal.appendChild(box);
  box.appendChild(reactionBox);

  renderList();

  document.body.appendChild(modal);
}
