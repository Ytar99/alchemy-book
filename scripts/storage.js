// import basePack from "./data/basePack.json" assert { type: "json" };
import { basePack } from "./data/basePack.js";

import { ElementsDatabase } from "./classes/elementsDatabase.js";

export const db = new ElementsDatabase(basePack);
