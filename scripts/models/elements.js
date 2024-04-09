import basePack from "/scripts/data/basePack.json" assert { type: "json" };

import { isArraysEqual } from "/scripts/helpers/arrays.js";

const elements = [...basePack];

export function getAllElements() {
  return elements || [];
}

export function getAllBasicElements() {
  const baseElements = elements?.filter((elem) => {
    return elem?.isBase;
  });

  return baseElements || [];
}

export function getById(id) {
  return elements?.find((elem) => elem.id === id) || null;
}

export function checkReaction(elementsArray) {
  const searchResult = elements?.find((elem) => {
    if (elem?.isBase) return false;

    return elem?.recept?.find((item) => {
      return isArraysEqual(item, elementsArray);
    });
  });

  if (searchResult) {
    return searchResult;
  }

  return null;
}

export function saveData(elements) {
  localStorage.setItem("dataAL:opened", JSON.stringify(elements));
}
