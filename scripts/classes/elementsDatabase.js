import { isArraysEqual } from "../helpers/arrays.js";

export class ElementsDatabase {
  name = "";
  saveName = "";
  openedElements = [];
  elementsList = [];

  constructor(name, elementsList) {
    this.elementsList = elementsList;
    this.name = name;
    this.saveName = `dataAL:${name}:opened`;

    this.restoreSavedData();
  }

  get openedElements() {
    return [...this.openedElements];
  }

  set openedElements(elements) {
    if (Array.isArray(elements)) {
      this.openedElements = elements;
      sortOpenedElements();
      this.saveData();
    } else {
      console.error(elements, " is not array");
    }
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

  getAllBasicElements() {
    return (
      this.elementsList.filter((elem) => {
        return elem?.isBase;
      }) || []
    );
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

    if (!savedData || savedData.length === 0) {
      const baseElements = this.getAllBasicElements().map((item) => item.id);
      this.openedElements = baseElements;
    } else {
      this.openedElements = savedData;
    }
  }
}
