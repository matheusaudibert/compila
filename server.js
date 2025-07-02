const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs-extra");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const { runTests } = require("./core/testRunner");
const { submissionsDir } = require("./config");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post("/submit", async (req, res) => {
  const { language, code, problem } = req.body;

  if (!language || !code || !problem) {
    return res.status(400).json({ error: "Campos faltando" });
  }

  const filename = `${uuidv4()}.${language}`;
  const filepath = path.join(submissionsDir, filename);

  try {
    await fs.outputFile(filepath, code);
    const result = await runTests(filepath, language, problem);
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  } finally {
    await fs.remove(filepath).catch(() => {});
  }
});

app.listen(PORT, () => {
  console.log(`Judge API Base rodando em http://localhost:${PORT}`);
});
