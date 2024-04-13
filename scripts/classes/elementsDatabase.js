import { containsAllElements, getRandomFromArray, isArraysEqual } from "../helpers/arrays.js";

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
          possibleElements.push(elem);
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
