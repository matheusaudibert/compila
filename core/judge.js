const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

function runCode(filepath, languageConfig, input = "") {
  return new Promise((resolve, reject) => {
    const command = languageConfig.run(filepath);

    const process = exec(command, { timeout: 1000 }, (err, stdout, stderr) => {
      if (err) return reject(stderr || err.message);
      resolve(stdout);
    });

    if (input) {
      process.stdin.write(input);
      process.stdin.end();
    }
  });
}

module.exports = { runCode };
