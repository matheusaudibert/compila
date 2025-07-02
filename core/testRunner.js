const { runCode } = require("./judge");
const { loadTests } = require("./problemLoader");
const { languages } = require("../config");

async function runTests(filepath, language, problemName) {
  const tests = loadTests(problemName);
  const lang = languages[language];
  if (!lang) throw new Error("Linguagem não suportada");

  const results = [];

  for (const [i, test] of tests.cases.entries()) {
    try {
      const startTime = Date.now();
      const output = await runCode(filepath, lang, test.input);
      const endTime = Date.now();
      const executionTime = endTime - startTime;

      results.push({
        test: i + 1,
        passed: output.trim() === test.output.trim(),
        output: output.trim(),
        expected: test.output.trim(),
        executionTime: executionTime,
      });
    } catch (e) {
      const executionTime = 0; // Erro na execução
      results.push({
        test: i + 1,
        passed: false,
        error: e.toString(),
        executionTime: executionTime,
      });
    }
  }

  return {
    passed: results.every((r) => r.passed),
    results,
  };
}

module.exports = { runTests };
