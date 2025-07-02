module.exports = {
  problemsDir: "./problems",
  submissionsDir: "./submissions",
  languages: {
    py: {
      run: (filepath) => `python ${filepath}`,
    },
    cpp: {
      run: (filepath) =>
        `g++ ${filepath} -o ${filepath}.out && ${filepath}.out`,
    },
  },
};
