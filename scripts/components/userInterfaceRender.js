import { db } from "../storage.js";

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
    const listItemWrapper = document.createElement("div");
    listItemWrapper.classList.add("categories__elements-list__element-wrapper");

    const listItem = document.createElement("div");
    // listItem.title = element.description;
    listItem.classList.add("categories__elements-list__element");
    listItem.classList.add(element.class);

    const listItemImg = document.createElement("img");
    listItemImg.classList.add("categories__elements-list__element-icon");
    listItemImg.src = `/scripts/data/basePackIcons/${element.class}.webp`;
    listItemImg.alt = element.text;
    listItemImg.draggable = false;
    listItem.appendChild(listItemImg);

    const listItemText = document.createElement("span");
    listItemText.classList.add("categories__elements-list__element-text");
    listItemText.textContent = element.text.replaceAll("&nbsp;", " ");

    listItem.appendChild(listItemText);
    listItemWrapper.appendChild(listItem);

    listItem.addEventListener("click", handleAddToSelect);

    list.push(listItemWrapper);
  });

  const possibleElements = db.getPossibleElements();
  possibleElements.forEach((item) => {
    const listItem = document.createElement("div");
    listItem.textContent = "???";
    listItem.title = item.description;

    list.push(listItem);
  });

  listBox.replaceChildren(...list);

  // function handleScroll() {
  //   // console.log(list[0].getBoundingClientRect());
  //   // console.log(list[3].offsetTop - 12 - 50);
  //   // console.log(listBox.scrollTop);
  //   const pad = 12 + 50;
  //   const top = listBox.scrollTop;
  //   const bottom = top + listBox.getBoundingClientRect().height;

  //   const checkOpacity = (el) => {
  //     const elHeight = el.getBoundingClientRect().height;
  //     const offset = 0;

  //     const elTop = el.offsetTop - pad;

  //     let opacityTop = (elTop + elHeight - top - offset) / elHeight;

  //     if (opacityTop < 0) {
  //       opacityTop = 0;
  //     }

  //     if (opacityTop > 1) {
  //       opacityTop = 1;
  //     }

  //     const elBottom = el.offsetTop + elHeight - pad;
  //     let opacityBottom = (bottom - elBottom + elHeight + offset) / elHeight;

  //     if (opacityBottom < 0) {
  //       opacityBottom = 0;
  //     }

  //     if (opacityBottom > 1) {
  //       opacityBottom = 1;
  //     }

  //     return Math.min(Number(opacityTop.toFixed(2)), Number(opacityBottom.toFixed(2)));
  //   };

  //   // console.log(bottom, list[29].offsetTop + list[29].getBoundingClientRect().height - pad);
  //   for (let i = 0; i < list.length; i++) {
  //     const elementChild = list[i].children[0];
  //     const elHeight = list[i].getBoundingClientRect().height;

  //     if (list[i].offsetTop - pad - elHeight / 2 > top && list[i].offsetTop + elHeight - pad + elHeight / 2 < bottom) {
  //       elementChild.style.opacity = 1;
  //       elementChild.style.transform = "translatey(0px)";
  //     } else {
  //       if (list[i].offsetTop - pad - elHeight / 2 < top) {
  //         elementChild.style.opacity = checkOpacity(list[i]);
  //         elementChild.style.transform = `translatey(-${(1 - checkOpacity(list[i])) * 48}px)`;
  //       }

  //       if (list[i].offsetTop + elHeight - 12 > bottom) {
  //         elementChild.style.opacity = checkOpacity(list[i]);
  //         elementChild.style.transform = `translatey(-${(1 - checkOpacity(list[i])) * 48}px) rotatex(-${
  //           (1 - checkOpacity(list[i])) * 90
  //         }deg)`;
  //       }

  //       // elementChild.style.opacity = checkOpacity(list[i]) / 3;
  //       // elementChild.style.height = `${checkOpacity(list[i]) * 48}px`;
  //       // elementChild.style.transform = `translatey(-${(1 - checkOpacity(list[i])) * 48}px)`;
  //     }
  //   }
  // }

  // handleScroll();

  // listBox.addEventListener("scroll", handleScroll);
}

function getSelectsArray() {
  return Array.from(document.querySelectorAll(".worktable__reaction-box__select"));
}

function handleAddToSelect(e) {
  const text = e.currentTarget.textContent;
  const name = e.currentTarget.classList[0];

  const selects = getSelectsArray();

  const emptySelect = selects.find((item) => item.innerHTML === "");

  if (emptySelect) {
    const resultBox = document.querySelector("#worktable__reaction-result");
    // const list = document.querySelector("#categories__elements-list");

    const clone = e.currentTarget.cloneNode(true);
    clone.style.display = "none";
    clone.classList.add("element-select-clone");

    const targetRect = e.currentTarget.getBoundingClientRect();
    const cloneForAnimation = e.currentTarget.cloneNode(true);
    cloneForAnimation.classList.add("element-select-clone");
    cloneForAnimation.style.position = "absolute";
    cloneForAnimation.style.zIndex = "2";
    cloneForAnimation.style.top = `${targetRect.top}px`;
    cloneForAnimation.style.left = `${targetRect.left}px`;
    cloneForAnimation.style.transition = "all 1s ease";
    cloneForAnimation.style.pointerEvents = "none";
    document.body.appendChild(cloneForAnimation);

    const emptySelectRect = emptySelect.getBoundingClientRect();
    const cloneForAnimationRect = cloneForAnimation.getBoundingClientRect();

    cloneForAnimation.style.top = `${
      emptySelectRect.top + Math.floor((emptySelectRect.height - cloneForAnimationRect.height) / 2)
    }px`;
    cloneForAnimation.style.left = `${
      emptySelectRect.left + Math.floor((emptySelectRect.width - cloneForAnimationRect.width) / 2)
    }px`;

    setTimeout(() => {
      cloneForAnimation.remove();
      clone.style.display = "grid";
      // emptySelect.appendChild(clone);
      // clone.style.top = emptySelect.offsetTop;
      // clone.style.left = emptySelect.offsetLeft;
    }, 1000);

    // emptySelect.innerHTML = text;
    // emptySelect.name = name;
    emptySelect.appendChild(clone);
    resultBox.innerHTML = "";
  }
}

export function renderUI() {
  renderCategoriesList();
  renderElementsList();

  // const handleResize = () => {
  //   const list = document.querySelector("#categories__elements-list");
  //   const height = 48 + 12;
  //   list.style.minHeight = `${Math.floor(list.getBoundingClientRect().height / height) * height}px`;
  //   list.style.maxHeight = `${Math.floor(list.getBoundingClientRect().height / height) * height}px`;
  //   console.log(list.getBoundingClientRect());
  // };

  // window.addEventListener("resize", handleResize);
}
