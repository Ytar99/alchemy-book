import basePack from "/scripts/data/basePack.json" assert { type: "json" };

import { ElementsDatabase } from "./classes/elementsDatabase.class.js";

export const db = new ElementsDatabase("standard", [...basePack]);
