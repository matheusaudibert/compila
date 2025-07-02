const { runCode } = require('./judge');
const { loadTests } = require('./problemLoader');
const { languages } = require('../config');

async function runTests(filepath, language, problemName) {
  const tests = loadTests(problemName);
  const lang = languages[language];
  if (!lang) throw new Error('Linguagem não suportada');

  const results = [];

  for (const [i, test] of tests.cases.entries()) {
    try {
      const output = await runCode(filepath, lang, test.input);
      results.push({
        test: i + 1,
        passed: output.trim() === test.output.trim(),
        output: output.trim(),
        expected: test.output.trim()
      });
    } catch (e) {
      results.push({ test: i + 1, passed: false, error: e.toString() });
    }
  }

  return {
    passed: results.every(r => r.passed),
    results
  };
}

module.exports = { runTests };
