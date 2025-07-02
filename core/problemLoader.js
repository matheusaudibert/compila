const fs = require("fs");
const path = require("path");
const { problemsDir } = require("../config");

function loadTests(problemName) {
  const testPath = path.join(problemsDir, problemName, "tests.json");
  if (!fs.existsSync(testPath)) throw new Error("Problema não encontrado");
  return JSON.parse(fs.readFileSync(testPath));
}

module.exports = { loadTests };
