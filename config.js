const path = require("path");

// Adiciona um prefixo de comando para limitar recursos em sistemas Unix-like.
// No Windows, o prefixo será vazio para evitar erros.
const isWindows = process.platform === "win32";
const resourceLimitPrefix = isWindows ? "" : "ulimit -v 262144; ulimit -t 2;"; // Limite de ~256MB de memória e 2s de CPU em Unix

module.exports = {
  problemsDir: "./problems",
  submissionsDir: "./submissions",
  languages: {
    py: {
      run: (filepath) => `${resourceLimitPrefix}python "${filepath}"`.trim(),
    },
    cpp: {
      compile: (filepath) => {
        const baseName = filepath.replace(".cpp", "");
        return `g++ "${filepath}" -o "${baseName}.exe"`;
      },
      run: (filepath) => {
        const baseName = filepath.replace(".cpp", "");
        return `${resourceLimitPrefix}"${baseName}.exe"`.trim();
      },
    },
    java: {
      compile: (filepath) => `javac "${filepath}"`,
      run: (filepath) => {
        const dirName = path.dirname(filepath);
        // O nome da classe principal em Java deve ser 'Main' por convenção.
        const className = "Main";
        // O -Xmx da JVM funciona em todas as plataformas. O prefixo ulimit só será adicionado em ambientes não-Windows.
        return `${resourceLimitPrefix}java -Xmx256m -cp "${dirName}" ${className}`.trim();
      },
    },
  },
};
