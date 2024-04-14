import { containsAllElements, getRandomFromArray, isArraysEqual } from "../helpers/arrays.js";

export class ElementsDatabase {
  name = "";
  saveName = "";
  openedElements = [];
  elementsList = [];
  categories = [];
  currentCategory = "";

  constructor(pack) {
    const { name, elements, categories } = pack;
    this.elementsList = elements;
    this.name = name;
    this.categories = categories;
    this.saveName = `dataAL:${name}:opened`;

    this.restoreSavedData();
  }

  get openedElements() {
    return [...this.openedElements];
  }

  set openedElements(elements) {
    if (Array.isArray(elements)) {
      this.openedElements = elements;
      this.sortOpenedElements();
      this.saveData();
    } else {
      console.error(elements, " is not array");
    }
  }

  getOpenedElements(category = "") {
    const ids = this.openedElements;
    const elements = ids.reduce((acc, item) => {
      const element = this.getElementById(item);
      if (category) {
        if (element?.category?.includes(category)) {
          return [...acc, element];
        }

        return acc;
      } else {
        return [...acc, element];
      }
    }, []);

    return elements;
  }

  getOpenedCategories() {
    const elements = this.getOpenedElements();
    const openedCategories = this.extractAllCategories(elements);

    const resultCategories = openedCategories.map((category) => this.categories.find((item) => item.code === category));

    return resultCategories;
  }

  addOpenedElement(elementId) {
    if (!this.openedElements.includes(elementId)) {
      const elem = this.getElementById(elementId);

      if (elem) {
        this.openedElements.push(elementId);
        this.sortOpenedElements();
        this.saveData();
      }
    }
  }

  sortOpenedElements() {
    this.openedElements.sort((a, b) => a - b);
  }

  getElementById(id) {
    return this.elementsList.find((item) => item.id === id) || null;
  }

  getRandomOpenedElement() {
    const randomElementId = getRandomFromArray(this.openedElements);
    const randomElement = this.getElementById(randomElementId);

    return randomElement || null;
  }

  getAllBasicElements() {
    return (
      this.elementsList.filter((elem) => {
        return elem?.isBase;
      }) || []
    );
  }

  getListOfOpenedElements() {
    const list = [];

    this.openedElements.forEach((id) => {
      const elem = this.getElementById(id);

      if (elem) {
        list.push(elem);
      }
    });

    return list;
  }

  getPossibleElements() {
    const listOfOpenedElements = this.getListOfOpenedElements();
    const elementsList = this.elementsList;

    const classes = listOfOpenedElements.map((elem) => elem.class);
    const possibleElements = [];

    elementsList.forEach((elem) => {
      const successReaction = elem?.recept?.find((recept) => containsAllElements(classes, recept));

      if (successReaction) {
        if (!this.openedElements.includes(elem.id)) {
          if (this.currentCategory) {
            if (elem.category?.includes(this.currentCategory)) {
              possibleElements.push(elem);
            }
          } else {
            possibleElements.push(elem);
          }
        }
      }
    });

    return possibleElements;
  }

  resetProgress() {
    localStorage.removeItem(this.saveName);
    this.restoreSavedData();
  }

  openAllElements() {
    localStorage.removeItem(this.saveName);
    this.openedElements = this.elementsList.map((elem) => elem.id);
    this.saveData();
  }

  getCategoriesCodes() {
    return this.categories.map((category) => category.code);
  }

  extractAllCategories(itemsList = null) {
    const elementsList = itemsList || this.elementsList;
    const categories = new Set(
      elementsList
        .filter((item) => item?.category)
        .map((item) => item?.category)
        .flat()
    );

    return Array.from(categories);
  }

  checkReaction(elementsArray) {
    return (
      this.elementsList.find((elem) => {
        if (elem?.isBase) return false;

        return elem?.recept?.find((item) => {
          return isArraysEqual(item, elementsArray);
        });
      }) || null
    );
  }

  makeReaction(elementsArray) {
    const resultElement = this.checkReaction(elementsArray);

    if (resultElement !== null) {
      this.addOpenedElement(resultElement.id);
      return true;
    }

    return false;
  }

  saveData() {
    localStorage.setItem(this.saveName, JSON.stringify(this.openedElements));
  }

  restoreSavedData() {
    const savedData = JSON.parse(localStorage.getItem(this.saveName)) || [];
    this.currentCategory = "";

    if (!savedData || savedData.length === 0) {
      const baseElements = this.getAllBasicElements().map((item) => item.id);
      this.openedElements = baseElements;
      this.saveData();
    } else {
      this.openedElements = savedData;
    }
  }
}
