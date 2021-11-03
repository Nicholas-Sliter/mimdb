/**
 * Backend utility functions
 * 
 * Borrowed from Practicle7. This practice of using a golden copy of .json will be replaced later by database.
 * 
 * The assumption is that the working data store is found in data/films.json and we have a "golden copy" in data/mockData.json.
 */

import fs from "fs";
import path from "path";
import process from "process";


export function resetData() {
  const dataDirectory = path.join(process.cwd(), "data");
  const orig = path.join(dataDirectory, "data.json");
  const dest = path.join(dataDirectory, "tempData.json");
  fs.copyFileSync(orig, dest);
}


export function readData() {
  const dataDirectory = path.join(process.cwd(), "data");
  const fullPath = path.join(dataDirectory, "tempData.json");
  if (!fs.existsSync(fullPath)) {
    resetData();
  }
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const films = JSON.parse(fileContents);

  return films;
}

export function saveData(films) {
  const dataDirectory = path.join(process.cwd(), "data");
  const fullPath = path.join(dataDirectory, "tempData.json");
  if (!fs.existsSync(fullPath)) {
    resetData();
  }
  fs.writeFileSync(fullPath, JSON.stringify(films), "utf8");
}





