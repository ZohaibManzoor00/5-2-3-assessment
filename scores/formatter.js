const fs = require('fs');
const path = require('path');

const addUpLintErrors = (errorTotal, { filePath, errorCount, warningCount, fatalErrorCount }) => {
  const ignoreRegex = /(spec|playground)/;
  const newErrorTotal = errorTotal + errorCount + warningCount + fatalErrorCount;

  return filePath.match(ignoreRegex) ? errorTotal : newErrorTotal;
};

const findEslintErrors = (eslintResultsByFile) => {
  const scorePath = path.join(__dirname, 'scores.json');
  let scores;
  try {
    scores = JSON.parse(fs.readFileSync(scorePath));
    scores.metadata = scores.metadata || {};
  } catch (error) {
    return error.message;
  }

  scores.metadata.numOfLintingErrors = eslintResultsByFile.reduce(addUpLintErrors, 0);

  fs.writeFileSync(scorePath, JSON.stringify(scores));
  return null;
};

module.exports = findEslintErrors;
