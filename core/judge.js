const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

function execute(command, options = {}) {
  return new Promise((resolve, reject) => {
    exec(command, options, (err, stdout, stderr) => {
      if (err) {
        console.error(`Erro ao executar o comando: ${command}`);
        console.error(`Detalhes do erro: ${stderr || err.message}`);
        fs.writeFileSync(
          "error.log",
          `Comando: ${command}\nErro: ${stderr || err.message}`
        );
        return reject(stderr || err.message);
      }
      resolve(stdout);
    });
  });
}

function runCode(filepath, languageConfig, input = "") {
  return new Promise(async (resolve, reject) => {
    try {
      if (languageConfig.compile) {
        await execute(languageConfig.compile(filepath));
      }

      const runCommand = languageConfig.run(filepath);
      const process = exec(
        runCommand,
        { timeout: 2000 },
        (err, stdout, stderr) => {
          if (err) {
            if (err.signal === "SIGTERM") {
              return reject("Time Limit Exceeded");
            }
            return reject(stderr || err.message);
          }
          resolve(stdout);
        }
      );

      if (input) {
        process.stdin.write(input);
        process.stdin.end();
      }
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = { runCode };
