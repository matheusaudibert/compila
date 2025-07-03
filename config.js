const path = require("path");

// Dentro do contêiner Docker (ambiente Linux), podemos usar ulimit.
const resourceLimitPrefix = "ulimit -v 262144; ulimit -t 2;"; // Limite de ~256MB de memória e 2s de CPU

module.exports = {
  problemsDir: "./problems",
  submissionsDir: "./submissions",
  languages: {
    py: {
      run: (filepath) => `${resourceLimitPrefix} python3 "${filepath}"`.trim(),
    },
    cpp: {
      compile: (filepath) => {
        const baseName = filepath.replace(".cpp", "");
        return `g++ "${filepath}" -o "${baseName}.exe"`;
      },
      run: (filepath) => {
        const baseName = filepath.replace(".cpp", "");
        // O executável estará no mesmo diretório que o .cpp
        return `${resourceLimitPrefix} ./${baseName}.exe`.trim();
      },
    },
    java: {
      compile: (filepath) => `javac "${filepath}"`,
      run: (filepath) => {
        const dirName = path.dirname(filepath);
        // O nome da classe principal em Java deve ser 'Main' por convenção.
        const className = "Main";
        // O -Xmx da JVM funciona em todas as plataformas. O prefixo ulimit será adicionado.
        return `${resourceLimitPrefix} java -Xmx256m -cp "${dirName}" ${className}`.trim();
      },
    },
  },
};
