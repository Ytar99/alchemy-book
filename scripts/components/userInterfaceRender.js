import { db } from "/scripts/storage.js";

function renderCategoriesList() {
  function handleSelectCategory(e) {
    db.currentCategory = e.target.name;

    const categoryTitle = document.querySelector("#categories__elements-list__title");
    const categoriesItems = document.querySelectorAll(".categories__category-box");

    categoriesItems.forEach((category) => {
      if (e.target.name === category.name) {
        category.classList.add("category-active");
        categoryTitle.textContent = category.textContent;
      } else {
        category.classList.remove("category-active");
      }
    });

    renderElementsList();
  }

  const categoryTitle = document.querySelector("#categories__elements-list__title");
  const categoriesListBox = document.querySelector("#categories__list");

  const categories = db.getOpenedCategories();

  const newCategories = [{ code: "", text: "Все" }, ...categories];
  const categoriesList = [];

  newCategories.forEach((category) => {
    const listItem = document.createElement("div");
    listItem.textContent = category.text;
    listItem.name = category.code;
    listItem.classList.add("categories__category-box");
    if (db.currentCategory === category.code) {
      listItem.classList.add("category-active");
      categoryTitle.textContent = category.text;
    }

    listItem.addEventListener("click", handleSelectCategory);

    categoriesList.push(listItem);
  });

  categoriesListBox.replaceChildren(...categoriesList);
}

function renderElementsList() {
  const list = [];

  const listBox = document.querySelector("#categories__elements-list");

  const elements = db.getOpenedElements(db.currentCategory);
  elements.forEach((element) => {
    const listItem = document.createElement("div");
    listItem.title = element.description;
    listItem.classList.add("categories__elements-list__element");
    listItem.classList.add(element.class);

    const listItemText = document.createElement("span");
    listItemText.classList.add("categories__elements-list__element-text");
    listItemText.textContent = element.text.replace("&nbsp;", " ");

    listItem.appendChild(listItemText);

    list.push(listItem);
  });

  const possibleElements = db.getPossibleElements();
  possibleElements.forEach((item) => {
    const listItem = document.createElement("div");
    listItem.textContent = "???";
    listItem.title = item.description;

    list.push(listItem);
  });

  listBox.replaceChildren(...list);
}

export function renderUI() {
  renderCategoriesList();
  renderElementsList();
}
